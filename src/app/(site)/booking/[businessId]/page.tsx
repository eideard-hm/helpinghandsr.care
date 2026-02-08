import { prisma } from '@/lib/prisma';
import { BookingWizard } from './ui/booking-wizard';

export default async function PublicBookingPage({
  params,
}: {
  params: Promise<{ businessId: string }>;
}) {
  const { businessId } = await params;

  const business = await prisma.business.findUnique({
    where: { id: businessId },
    select: { id: true, name: true, timezone: true, bufferMin: true },
  });

  if (!business) {
    return <div className='p-6'>Business not found.</div>;
  }

  const services = await prisma.service.findMany({
    where: { businessId: business.id, active: true },
    orderBy: { name: 'asc' },
    select: { id: true, name: true, durationMin: true, price: true },
  });

  const staff = await prisma.staff.findMany({
    where: { businessId: business.id, isActive: true },
    orderBy: { name: 'asc' },
    select: { id: true, name: true },
  });

  return (
    <div className='min-h-screen bg-bg text-ink'>
      <div className='max-w-3xl mx-auto p-4 md:p-8 space-y-6'>
        <header className='space-y-1'>
          <h1 className='text-2xl md:text-3xl font-semibold text-title-indigo'>
            Book an appointment
          </h1>
          <p className='text-slate-600'>
            {business.name} · Timezone:{' '}
            <span className='font-medium'>{business.timezone}</span>
          </p>
        </header>

        <BookingWizard
          business={JSON.stringify(business)}
          services={JSON.stringify(services)}
          staff={staff}
        />
      </div>
    </div>
  );
}
