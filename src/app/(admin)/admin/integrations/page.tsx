import Link from 'next/link';

export default function IntegrationsPage() {
  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-semibold text-title-indigo'>Integrations</h1>

      <div className='rounded-2xl border border-slate-200 bg-white p-4 space-y-2'>
        <div className='font-medium'>Google Calendar</div>
        <p className='text-sm text-slate-600'>
          Connect a calendar to automatically create events when bookings are
          confirmed.
        </p>

        <Link
          href='/admin/integrations/google-calendar/connect'
          className='inline-flex h-10 items-center px-4 rounded-xl bg-brand text-white hover:bg-(--brand-600)'
        >
          Connect Google Calendar
        </Link>
      </div>
    </div>
  );
}
