import type { Metadata } from 'next';

import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Booking confirmed',
  description: 'Your appointment has been successfully booked.',
  keywords: [
    'booking confirmed',
    'appointment booked',
    'booking success',
    'appointment confirmation',
    'booking details',
    'appointment details',
    'booking information',
    'appointment information',
    'booking summary',
    'appointment summary',
  ],
};
export default async function BookingConfirmedPage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const { bookingId } = await params;

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: {
      id: true,
      status: true,
      customerName: true,
      startAt: true,
      endAt: true,
      addressText: true,
      business: { select: { name: true, timezone: true } },
      serviceNameSnapshot: true,
    },
  });

  if (!booking) return <div className='p-6'>Booking not found.</div>;

  return (
    <div className='min-h-screen bg-bg text-ink'>
      <div className='max-w-2xl mx-auto p-4 md:p-8 space-y-6'>
        <h1 className='text-2xl font-semibold text-title-indigo'>
          Booking confirmed
        </h1>

        <div className='rounded-2xl border border-slate-200 bg-white p-4 space-y-2'>
          <div className='text-sm text-slate-600'>Business</div>
          <div className='font-medium'>{booking.business.name}</div>

          <div className='text-sm text-slate-600 mt-3'>Service</div>
          <div className='font-medium'>{booking.serviceNameSnapshot}</div>

          <div className='text-sm text-slate-600 mt-3'>Customer</div>
          <div className='font-medium'>{booking.customerName}</div>

          <div className='text-sm text-slate-600 mt-3'>When</div>
          <div className='font-medium'>
            {new Intl.DateTimeFormat(undefined, {
              dateStyle: 'full',
              timeStyle: 'short',
              timeZone: booking.business.timezone,
            }).format(booking.startAt)}
          </div>

          {booking.addressText && (
            <>
              <div className='text-sm text-slate-600 mt-3'>Address</div>
              <div className='font-medium'>{booking.addressText}</div>
            </>
          )}

          <div className='mt-4 flex gap-2'>
            <a
              className='h-10 px-4 inline-flex items-center rounded-xl bg-brand text-white hover:bg-(--brand-600)'
              href={`/booking/confirmed/${booking.id}/ics`}
            >
              Add to calendar (.ics)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
