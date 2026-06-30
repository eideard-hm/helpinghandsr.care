import { listStaffHours, listStaffOptions } from './_queries';
import { StaffHoursPanel } from './ui/staff-hours-panel';

export default async function StaffHoursPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; staffId?: string }>;
}) {
  const sp = await searchParams;
  const view = sp.view === 'day' ? 'day' : 'staff';

  const [staff, hours] = await Promise.all([
    listStaffOptions(),
    listStaffHours(),
  ]);

  const defaultStaffId =
    sp.staffId && staff.some((s) => s.id === sp.staffId)
      ? sp.staffId
      : (staff[0]?.id ?? '');

  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-semibold text-title-indigo'>Staff hours</h1>

      <StaffHoursPanel
        staff={staff}
        hours={hours}
        initialView={view}
        initialStaffId={defaultStaffId}
      />
    </div>
  );
}
