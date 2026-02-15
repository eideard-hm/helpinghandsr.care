import { prisma } from '@/lib/prisma';

function icsEscape(v: string) {
  return v
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

export async function GET(
  _: Request,
  ctx: { params: Promise<{ bookingId: string }> },
) {
  const { bookingId } = await ctx.params;

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: {
      id: true,
      startAt: true,
      endAt: true,
      addressText: true,
      customerName: true,
      serviceNameSnapshot: true,
      business: { select: { name: true } },
    },
  });

  if (!booking) return new Response('Not found', { status: 404 });

  const dtstamp =
    new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const dtstart =
    booking.startAt.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const dtend =
    booking.endAt.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const summary = icsEscape(
    `${booking.business.name} - ${booking.serviceNameSnapshot}`,
  );
  const description = icsEscape(`Booking for ${booking.customerName}`);
  const location = booking.addressText ? icsEscape(booking.addressText) : '';

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Booking App//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${booking.id}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${dtstart}`,
    `DTEND:${dtend}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    location ? `LOCATION:${location}` : '',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n');

  return new Response(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="booking-${booking.id}.ics"`,
    },
  });
}
