'use server';

import { ActionResult } from '@/lib/actions/action-result';
import { prisma } from '@/lib/prisma';
import { GoogleCalendarProvider } from '@/providers/google-calendar';
import {
  cancelBookingSchema,
  confirmBookingSchema,
  createBookingHoldSchema,
} from './_schema';

// Minimal: hold expires after 10 minutes
const HOLD_MINUTES = 10;

function addMinutes(d: Date, min: number) {
  return new Date(d.getTime() + min * 60_000);
}

function intervalsOverlap(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
  return aStart < bEnd && bStart < aEnd;
}

/**
 * Creates a HOLD booking if the slot is still available.
 * This is the MVP "lock" to avoid double booking.
 */
export async function createBookingHoldAction(input: unknown): Promise<
  ActionResult<{
    bookingId: string;
    holdExpiresAtISO: string;
    startAtISO: string;
    endAtISO: string;
  }>
> {
  const parsed = createBookingHoldSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      errors: {
        fields: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      },
    };
  }

  const data = parsed.data;
  const now = new Date();

  try {
    const result = await prisma.$transaction(
      async (tx) => {
        // 1) Validate business + service
        const service = await tx.service.findFirst({
          where: {
            id: data.serviceId,
            businessId: data.businessId,
            active: true,
          },
          select: {
            id: true,
            name: true,
            durationMin: true,
            price: true,
            businessId: true,
          },
        });

        if (!service) {
          return { ok: false as const, error: 'Service not found.' };
        }

        // 2) Optional staff validation
        if (data.staffId) {
          const staff = await tx.staff.findFirst({
            where: {
              id: data.staffId,
              businessId: data.businessId,
              isActive: true,
            },
            select: { id: true },
          });
          if (!staff)
            return {
              ok: false as const,
              error: 'Staff not found or inactive.',
            };
        }

        // 3) Compute endAt from service.durationMin
        const startAt = new Date(data.startAtISO);
        const endAt = addMinutes(startAt, service.durationMin);

        // 4) Check collisions against existing bookings
        // Decide which statuses block time:
        // - CONFIRMED always blocks
        // - HOLD blocks if not expired
        // - REQUESTED optional (MVP: block to reduce risk)
        const blocking = await tx.booking.findMany({
          where: {
            businessId: data.businessId,
            ...(data.staffId ? { staffId: data.staffId } : {}),
            startAt: { lt: endAt },
            endAt: { gt: startAt },
            OR: [
              { status: 'CONFIRMED' },
              { status: 'REQUESTED' },
              { status: 'HOLD', holdExpiresAt: { gt: now } },
            ],
          },
          select: { startAt: true, endAt: true },
        });

        const hasOverlap = blocking.some((b) =>
          intervalsOverlap(startAt, endAt, b.startAt, b.endAt),
        );
        if (hasOverlap) {
          return {
            ok: false as const,
            error: 'This slot is no longer available.',
          };
        }

        // 5) Create HOLD booking
        const holdExpiresAt = addMinutes(now, HOLD_MINUTES);

        const booking = await tx.booking.create({
          data: {
            businessId: data.businessId,
            serviceId: service.id,
            staffId: data.staffId ?? null,

            status: 'HOLD',
            holdExpiresAt,

            customerName: data.customerName,
            phone: data.phone,
            email: data.email ?? null,

            addressText: data.addressText ?? null,
            lat: data.lat ?? null,
            lng: data.lng ?? null,
            placeId: data.placeId ?? null,

            startAt,
            endAt,

            // Snapshots (important for future-proofing)
            serviceNameSnapshot: service.name,
            serviceDurationMinSnapshot: service.durationMin,
            servicePriceSnapshot: service.price,

            notes: data.notes ?? null,
          },
          select: { id: true, holdExpiresAt: true, startAt: true, endAt: true },
        });

        return {
          ok: true as const,
          booking,
        };
      },
      { isolationLevel: 'Serializable' },
    ); // helps concurrency in Postgres

    if (!result.ok) {
      return { ok: false, errors: { form: [result.error] } };
    }

    return {
      ok: true,
      data: {
        bookingId: result.booking.id,
        holdExpiresAtISO: result.booking.holdExpiresAt!.toISOString(),
        startAtISO: result.booking.startAt.toISOString(),
        endAtISO: result.booking.endAt.toISOString(),
      },
    };
  } catch (e: any) {
    // In serializable mode, Postgres can abort a transaction under contention.
    // Client should simply retry.
    const msg = e?.message?.includes('could not serialize access')
      ? 'High traffic: please try again.'
      : 'Could not create booking hold.';
    return { ok: false, errors: { form: [msg] } };
  }
}

export async function confirmBookingAction(
  input: unknown,
): Promise<ActionResult<{ bookingId: string }>> {
  const parsed = confirmBookingSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      errors: {
        fields: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      },
    };
  }

  const now = new Date();

  try {
    const booking = await prisma.booking.findUnique({
      where: { id: parsed.data.bookingId },
      select: {
        id: true,
        status: true,
        holdExpiresAt: true,
        gcalEventId: true,
      },
    });

    if (!booking) {
      return { ok: false, errors: { form: ['Booking not found.'] } };
    }

    if (booking.status === 'HOLD') {
      if (!booking.holdExpiresAt || booking.holdExpiresAt <= now) {
        return {
          ok: false,
          errors: { form: ['Hold expired. Please select a new slot.'] },
        };
      }
    }

    if (booking.status !== 'CONFIRMED') {
      await prisma.booking.update({
        where: { id: booking.id },
        data: {
          status: 'CONFIRMED',
          confirmedAt: now,
          holdExpiresAt: null,
        },
      });
    }

    if (!booking.gcalEventId) {
      try {
        await createBusinessCalendarEvent(booking.id);
      } catch (error) {
        console.error('Failed to create business calendar event:', error);
      }
    }

    return { ok: true, data: { bookingId: booking.id } };
  } catch {
    return { ok: false, errors: { form: ['Could not confirm booking.'] } };
  }
}

export async function cancelBookingAction(
  input: unknown,
): Promise<ActionResult<{ bookingId: string }>> {
  const parsed = cancelBookingSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      errors: {
        fields: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      },
    };
  }

  const now = new Date();

  try {
    const booking = await prisma.booking.findUnique({
      where: { id: parsed.data.bookingId },
      select: { id: true, status: true },
    });

    if (!booking)
      return { ok: false, errors: { form: ['Booking not found.'] } };

    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        status: 'CANCELLED',
        cancelledAt: now,
        cancelReason: parsed.data.reason ?? null,
        holdExpiresAt: null,
      },
    });

    return { ok: true, data: { bookingId: booking.id } };
  } catch {
    return { ok: false, errors: { form: ['Could not cancel booking.'] } };
  }
}

export async function createBusinessCalendarEvent(bookingId: string) {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: {
      id: true,
      businessId: true,
      serviceNameSnapshot: true,
      notes: true,
      customerName: true,
      email: true,
      phone: true,
      addressText: true,
      startAt: true,
      endAt: true,
      status: true,
      business: {
        select: {
          id: true,
          name: true,
          timezone: true,
          primaryCalendarId: true,
        },
      },
    },
  });

  if (!booking) {
    throw new Error('Booking not found.');
  }

  if (booking.status !== 'CONFIRMED') {
    throw new Error('Only confirmed bookings can be added to calendar.');
  }

  if (!booking.business.primaryCalendarId) {
    throw new Error('Business has no primary calendar configured.');
  }

  const googleCalendar = await prisma.googleCalendar.findUnique({
    where: { id: booking.business.primaryCalendarId },
    select: {
      id: true,
      calendarId: true,
      googleOAuthAccount: {
        select: {
          accessToken: true,
          refreshToken: true,
          expiryDate: true,
        },
      },
    },
  });

  if (!googleCalendar) {
    throw new Error('Primary Google Calendar not found.');
  }

  const provider = new GoogleCalendarProvider();

  const auth = provider.getOAuthClientForStoredTokens({
    accessToken: googleCalendar.googleOAuthAccount.accessToken,
    refreshToken: googleCalendar.googleOAuthAccount.refreshToken,
    expiryDate: googleCalendar.googleOAuthAccount.expiryDate,
  });

  const descriptionLines = [
    `Booking ID: ${booking.id}`,
    `Customer: ${booking.customerName}`,
    booking.email ? `Email: ${booking.email}` : null,
    booking.phone ? `Phone: ${booking.phone}` : null,
    booking.addressText ? `Address: ${booking.addressText}` : null,
    booking.notes ? `Notes: ${booking.notes}` : null,
  ].filter(Boolean);

  const event = await provider.createCalendarEvent({
    auth,
    calendarId: googleCalendar.calendarId,
    event: {
      summary: `${booking.serviceNameSnapshot} - ${booking.customerName}`,
      description: descriptionLines.join('\n'),
      location: booking.addressText ?? undefined,
      start: {
        dateTime: booking.startAt.toISOString(),
        timeZone: booking.business.timezone,
      },
      end: {
        dateTime: booking.endAt.toISOString(),
        timeZone: booking.business.timezone,
      },
      attendees: booking.email ? [{ email: booking.email }] : undefined,
    },
  });

  if (!event.id) {
    throw new Error('Google Calendar event was created without an id.');
  }

  await prisma.booking.update({
    where: { id: booking.id },
    data: {
      gcalEventId: event.id,
      googleCalendarId: googleCalendar.id,
    },
  });

  return event;
}
