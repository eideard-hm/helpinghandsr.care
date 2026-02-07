import { listBusinessHours } from './_queries';
import { BusinessHoursPanel } from './ui/business-hours-panel';

export default async function BusinessHoursPage() {
  const rows = await listBusinessHours();

  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-semibold text-title-indigo'>
        Business Hours
      </h1>
      <p className='text-slate-600'>
        Define multiple time slots per day (e.g., 09:00–12:00 and 14:00–18:00).
        The system prevents overlaps.
      </p>
      <BusinessHoursPanel rows={rows} />
    </div>
  );
}
