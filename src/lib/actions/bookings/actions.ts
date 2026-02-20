import { prisma } from '@/lib/prisma';
import { GoogleCalendarProvider } from '@/providers/google-calendar';

const gcal = new GoogleCalendarProvider();

export async function createBusinessCalendarEvent(bookingId: string) {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: {
      id: true,
      businessId: true,
      startAt: true,
      endAt: true,
      addressText: true,
      customerName: true,
      email: true,
      phone: true,
      serviceNameSnapshot: true,
      notes: true,
      gcalEventId: true,
      business: {
        select: { timezone: true, primaryCalendarId: true, name: true },
      },
    },
  });

  if (!booking) return;
  if (booking.gcalEventId) return; // idempotent
  if (!booking.business.primaryCalendarId) return;

  const gc = await prisma.googleCalendar.findUnique({
    where: { id: booking.business.primaryCalendarId },
    select: { id: true, calendarId: true, googleOAuthAccountId: true },
  });
  if (!gc) return;

  const oauth = await prisma.googleOAuthAccount.findUnique({
    where: { id: gc.googleOAuthAccountId },
    select: { accessToken: true, refreshToken: true, expiryDate: true },
  });
  if (!oauth?.refreshToken) return;

  const auth = gcal.getOAuthClientForStoredTokens({
    accessToken: oauth.accessToken,
    refreshToken: oauth.refreshToken,
    expiryDate: oauth.expiryDate,
  });

  const event = await gcal.createCalendarEvent({
    auth,
    calendarId: gc.calendarId,
    event: {
      summary: `${booking.serviceNameSnapshot} - ${booking.customerName}`,
      description: [
        `Customer: ${booking.customerName}`,
        `Phone: ${booking.phone}`,
        booking.email ? `Email: ${booking.email}` : '',
        booking.notes ? `Notes: ${booking.notes}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
      location: booking.addressText ?? undefined,
      start: {
        dateTime: booking.startAt.toISOString(),
        timeZone: booking.business.timezone,
      },
      end: {
        dateTime: booking.endAt.toISOString(),
        timeZone: booking.business.timezone,
      },
      // Keep this off for now if you want ONLY .ics for customer:
      // attendees: booking.email ? [{ email: booking.email }] : undefined,
    },
  });

  if (event.id) {
    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        gcalEventId: event.id,
        googleCalendarId: gc.id, // your DB row id
      },
    });
  }
}
