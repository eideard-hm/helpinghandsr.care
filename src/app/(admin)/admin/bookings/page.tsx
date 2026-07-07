import Link from 'next/link';
import { redirect } from 'next/navigation';

import { prisma } from '@/lib/prisma';
import { authActions } from '@/actions/auth';
import { guardAdminAccess } from '@/lib/auth/admin-guard';

export const dynamic = 'force-dynamic';

export default async function AdminBookingsPage() {
  const user = await authActions.getUser();
  if (!user) redirect('/auth/login?error=NO_SESSION');
  if (!user.email) redirect('/auth/login?error=NO_EMAIL');

  const guard = await guardAdminAccess({
    supabaseUserId: user.id,
    email: user.email,
  });
  if (!guard.ok) {
    await authActions.signOut();
    redirect(`/auth/login?error=${guard.reason}`);
  }

  const rows = await prisma.booking.findMany({
    where: { businessId: guard.businessId },
    orderBy: { startAt: 'asc' },
    take: 100,
    select: {
      id: true,
      status: true,
      customerName: true,
      phone: true,
      startAt: true,
      endAt: true,
      serviceNameSnapshot: true,
    },
  });

  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-semibold text-title-indigo'>Bookings</h1>

      <div className='rounded-2xl border border-slate-200 bg-white overflow-hidden'>
        <div className='divide-y divide-slate-100'>
          {rows.map((b) => (
            <div
              key={b.id}
              className='p-4 flex items-start justify-between gap-4'
            >
              <div className='space-y-1'>
                <div className='font-medium'>
                  {b.customerName} · {b.serviceNameSnapshot}
                </div>
                <div className='text-sm text-slate-600'>
                  {new Intl.DateTimeFormat(undefined, {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  }).format(b.startAt)}{' '}
                  –{' '}
                  {new Intl.DateTimeFormat(undefined, {
                    timeStyle: 'short',
                  }).format(b.endAt)}
                </div>
                <div className='text-xs text-slate-500'>
                  Status: {b.status} · Phone: {b.phone}
                </div>
              </div>

              <Link
                className='h-9 px-3 inline-flex items-center rounded-xl border border-slate-200 hover:bg-slate-50'
                href={`/admin/bookings/${b.id}`}
              >
                View
              </Link>
            </div>
          ))}
          {!rows.length && (
            <div className='p-6 text-center text-slate-500'>
              No bookings yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
