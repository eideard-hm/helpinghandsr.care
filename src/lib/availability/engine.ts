import 'server-only';

import { fromZonedTime, toZonedTime } from 'date-fns-tz';

import { prisma } from '@/lib/prisma';
import { minToHHMM } from '@/app/(admin)/admin/_helpers';

type AvailabilityInput = {
  businessId: string;
  serviceId: string;
  date: string; // YYYY-MM-DD as business day
  staffId?: string;
};

type Slot = {
  startAt: string; // ISO
  endAt: string; // ISO
};

function overlaps(
  a: { start: Date; end: Date },
  b: { start: Date; end: Date },
) {
  return a.start < b.end && b.start < a.end;
}

function addMinutes(d: Date, min: number) {
  return new Date(d.getTime() + min * 60_000);
}

function clampIntervals(
  base: Array<{ startMin: number; endMin: number }>,
  blocks: Array<{ startMin: number; endMin: number }>,
) {
  // subtract blocks from base intervals (minute domain)
  let result = base.map((x) => ({ ...x }));
  for (const block of blocks) {
    const next: Array<{ startMin: number; endMin: number }> = [];
    for (const it of result) {
      // no overlap
      if (block.endMin <= it.startMin || block.startMin >= it.endMin) {
        next.push(it);
        continue;
      }
      // block fully covers interval
      if (block.startMin <= it.startMin && block.endMin >= it.endMin) {
        continue;
      }
      // cut left
      if (block.startMin <= it.startMin && block.endMin < it.endMin) {
        next.push({ startMin: block.endMin, endMin: it.endMin });
        continue;
      }
      // cut right
      if (block.startMin > it.startMin && block.endMin >= it.endMin) {
        next.push({ startMin: it.startMin, endMin: block.startMin });
        continue;
      }
      // split into two
      next.push({ startMin: it.startMin, endMin: block.startMin });
      next.push({ startMin: block.endMin, endMin: it.endMin });
    }
    result = next;
  }
  return result
    .filter((i) => i.endMin > i.startMin)
    .sort((a, b) => a.startMin - b.startMin);
}

export async function getAvailability(input: AvailabilityInput): Promise<{
  businessTz: string;
  slots: Slot[];
}> {
  const business = await prisma.business.findUnique({
    where: { id: input.businessId },
    select: { timezone: true, bufferMin: true },
  });
  if (!business) throw new Error('Business not found');

  const service = await prisma.service.findFirst({
    where: { id: input.serviceId, businessId: input.businessId, active: true },
    select: { durationMin: true, name: true },
  });
  if (!service) throw new Error('Service not found');

  // Day range in business TZ -> UTC instants
  const dayStartUtc = fromZonedTime(
    `${input.date}T00:00:00`,
    business.timezone,
  );
  const dayEndUtc = fromZonedTime(`${input.date}T24:00:00`, business.timezone);

  // Compute weekday in business TZ
  const dayStartInBizTz = toZonedTime(dayStartUtc, business.timezone);
  const weekday = dayStartInBizTz.getDay(); // 0..6

  // 1) Base working intervals: BusinessHour (and StaffHour if staffId)
  const businessHours = await prisma.businessHour.findMany({
    where: { businessId: input.businessId, weekday },
    select: { startMin: true, endMin: true, isClosed: true },
    orderBy: { startMin: 'asc' },
  });

  if (businessHours.some((h) => h.isClosed)) {
    return { businessTz: business.timezone, slots: [] };
  }

  let baseIntervals = businessHours
    .filter((h) => !h.isClosed)
    .map((h) => ({ startMin: h.startMin, endMin: h.endMin }));

  if (input.staffId) {
    // staff must belong to business
    const staff = await prisma.staff.findFirst({
      where: {
        id: input.staffId,
        businessId: input.businessId,
        isActive: true,
      },
      select: { id: true },
    });
    if (!staff) return { businessTz: business.timezone, slots: [] };

    const staffHours = await prisma.staffHour.findMany({
      where: { staffId: input.staffId, weekday },
      select: { startMin: true, endMin: true, isClosed: true },
      orderBy: { startMin: 'asc' },
    });

    if (staffHours.some((h) => h.isClosed)) {
      return { businessTz: business.timezone, slots: [] };
    }

    const staffIntervals = staffHours
      .filter((h) => !h.isClosed)
      .map((h) => ({ startMin: h.startMin, endMin: h.endMin }));

    // Intersection: baseIntervals ∩ staffIntervals
    const intersect: Array<{ startMin: number; endMin: number }> = [];
    for (const a of baseIntervals) {
      for (const b of staffIntervals) {
        const s = Math.max(a.startMin, b.startMin);
        const e = Math.min(a.endMin, b.endMin);
        if (e > s) intersect.push({ startMin: s, endMin: e });
      }
    }
    baseIntervals = intersect.sort((x, y) => x.startMin - y.startMin);
  }

  if (!baseIntervals.length)
    return { businessTz: business.timezone, slots: [] };

  // 2) TimeOff blocks for this business day (global + staff)
  const timeOff = await prisma.timeOff.findMany({
    where: {
      businessId: input.businessId,
      date: dayStartUtc, // because we store as business-day anchor at 00:00 biz tz
      OR: [
        { staffId: null },
        ...(input.staffId ? [{ staffId: input.staffId }] : []),
      ],
    },
    select: { startMin: true, endMin: true },
  });

  const blocks = timeOff.map((t) => {
    // all-day if startMin/endMin null => block whole day
    if (t.startMin == null || t.endMin == null)
      return { startMin: 0, endMin: 1440 };
    return { startMin: t.startMin, endMin: t.endMin };
  });

  // 3) Subtract TimeOff blocks
  let working = clampIntervals(baseIntervals, blocks);
  if (!working.length) return { businessTz: business.timezone, slots: [] };

  // 4) Pull existing bookings in that day range
  const now = new Date();
  const bookings = await prisma.booking.findMany({
    where: {
      businessId: input.businessId,
      startAt: { lt: dayEndUtc },
      endAt: { gt: dayStartUtc },
      ...(input.staffId ? { staffId: input.staffId } : {}),
      OR: [
        { status: 'CONFIRMED' },
        { status: 'REQUESTED' }, // optional; you can remove if you want
        { status: 'HOLD', holdExpiresAt: { gt: now } },
      ],
    },
    select: { startAt: true, endAt: true },
    orderBy: { startAt: 'asc' },
  });

  // Convert bookings to minute-blocks in business day space, add buffer
  const buffer = business.bufferMin;
  const bookingBlocks: Array<{ startMin: number; endMin: number }> =
    bookings.map((b) => {
      // translate booking UTC -> biz TZ -> minute offset from day start
      const sBiz = toZonedTime(b.startAt, business.timezone);
      const eBiz = toZonedTime(b.endAt, business.timezone);

      const startOffset = Math.max(
        0,
        Math.floor((sBiz.getTime() - dayStartInBizTz.getTime()) / 60_000) -
          buffer,
      );
      const endOffset = Math.min(
        1440,
        Math.ceil((eBiz.getTime() - dayStartInBizTz.getTime()) / 60_000) +
          buffer,
      );

      return { startMin: startOffset, endMin: endOffset };
    });

  working = clampIntervals(working, bookingBlocks);
  if (!working.length) return { businessTz: business.timezone, slots: [] };

  // 5) Generate slots (step = service duration; you can later make step smaller)
  const duration = service.durationMin;
  const step = duration; // minimal MVP
  const slots: Slot[] = [];

  for (const it of working) {
    for (
      let startMin = it.startMin;
      startMin + duration <= it.endMin;
      startMin += step
    ) {
      const startBiz = addMinutes(dayStartInBizTz, startMin);
      const endBiz = addMinutes(dayStartInBizTz, startMin + duration);

      // Convert back to UTC instants for storage
      const startUtc = fromZonedTime(
        `${input.date}T${minToHHMM(startMin)}:00`.slice(0, 19), // keep safe
        business.timezone,
      );
      // safer: derive from startBiz (which is a Date in system tz) -> interpret as biz tz is tricky
      // We'll do UTC by adding minutes to dayStartUtc:
      const startUtc2 = addMinutes(dayStartUtc, startMin);
      const endUtc2 = addMinutes(dayStartUtc, startMin + duration);

      slots.push({
        startAt: startUtc2.toISOString(),
        endAt: endUtc2.toISOString(),
      });
    }
  }

  return { businessTz: business.timezone, slots };
}
