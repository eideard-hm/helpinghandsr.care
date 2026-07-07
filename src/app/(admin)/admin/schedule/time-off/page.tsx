import { listStaffOptions, listTimeOff } from './_queries';
import { TimeOffPanel } from './ui/time-off-panel';

export default async function TimeOffPage() {
  const [staff, rows] = await Promise.all([listStaffOptions(), listTimeOff()]);

  return (
    <div className='space-y-4'>
      <p className='text-slate-600'>
        Use this for date exceptions (holidays, vacations, partial closures).
      </p>
      <TimeOffPanel
        staff={staff}
        rows={rows}
      />
    </div>
  );
}
