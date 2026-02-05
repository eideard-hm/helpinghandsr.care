import { listBusinessHours } from './_queries';
import { BusinessHoursPanel } from './ui/business-hours-panel';

export default async function BusinessHoursPage() {
  const rows = await listBusinessHours();

  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-semibold text-title-indigo'>
        Horarios del negocio
      </h1>
      <p className='text-slate-600'>
        Define múltiples franjas por día (ej. 09:00–12:00 y 14:00–18:00). El
        sistema evita cruces.
      </p>
      <BusinessHoursPanel rows={rows} />
    </div>
  );
}
