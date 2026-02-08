'use client';

import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { createTimeOffAction, deleteTimeOffAction } from '../_actions';
import { useHeaderTitle } from '@/app/providers/header-title.provider';
import { hhmmToMin, minToHHMM } from '../../../_helpers';

export function TimeOffPanel({
  staff,
  rows,
}: {
  staff: Array<{ id: string; name: string }>;
  rows: any[];
}) {
  const [allDay, setAllDay] = useState(true);
  const { setTitle } = useHeaderTitle();

  useEffect(() => {
    setTitle('Time Off');
  }, [setTitle]);

  return (
    <div className='rounded-2xl border border-slate-200 bg-white overflow-hidden'>
      <div className='p-4 border-b border-slate-200 font-medium'>
        Create new time off
      </div>

      <div className='p-4 border-b border-slate-200 bg-slate-50'>
        <form
          action={async (fd) => {
            if (!allDay) {
              const startMin = hhmmToMin(
                String(fd.get('startHHMM') ?? '12:00'),
              );
              const endMin = hhmmToMin(String(fd.get('endHHMM') ?? '13:00'));
              fd.set('startMin', String(startMin));
              fd.set('endMin', String(endMin));
            }
            const res = await createTimeOffAction(fd);
            if (!res.ok) {
              toast.error(res.errors.form?.[0] ?? 'Something went wrong.');
              return;
            }
          }}
          className='grid grid-cols-1 md:grid-cols-6 gap-3 items-end'
        >
          <label className='grid gap-1 text-sm md:col-span-2'>
            Date (business day)
            <input
              name='date'
              type='date'
              className='h-10 rounded-xl border border-slate-200 px-3'
              required
            />
          </label>

          <label className='grid gap-1 text-sm md:col-span-2'>
            Applies to (optional)
            <select
              name='staffId'
              className='h-10 rounded-xl border border-slate-200 px-3'
            >
              <option value=''>Business (global)</option>
              {staff.map((s) => (
                <option
                  key={s.id}
                  value={s.id}
                >
                  {s.name}
                </option>
              ))}
            </select>
          </label>

          <label className='flex items-center gap-2 h-10 md:col-span-1'>
            <input
              name='allDay'
              type='checkbox'
              defaultChecked
              onChange={(e) => setAllDay(e.currentTarget.checked)}
            />
            All day
          </label>

          <label className='grid gap-1 text-sm md:col-span-1'>
            Reason
            <input
              name='reason'
              className='h-10 rounded-xl border border-slate-200 px-3'
              placeholder='Festivo / Vacaciones…'
            />
          </label>

          {!allDay && (
            <>
              <label className='grid gap-1 text-sm md:col-span-2'>
                Start
                <input
                  name='startHHMM'
                  type='time'
                  defaultValue='12:00'
                  className='h-10 rounded-xl border border-slate-200 px-3'
                />
              </label>
              <label className='grid gap-1 text-sm md:col-span-2'>
                End
                <input
                  name='endHHMM'
                  type='time'
                  defaultValue='13:00'
                  className='h-10 rounded-xl border border-slate-200 px-3'
                />
              </label>
              <input
                type='hidden'
                name='startMin'
              />
              <input
                type='hidden'
                name='endMin'
              />
            </>
          )}

          <div className='md:col-span-6'>
            <button className='h-10 px-4 rounded-xl bg-brand text-white hover:bg-(--brand-600)'>
              Save block
            </button>
          </div>
        </form>
      </div>

      <div className='p-4 font-medium'>Blocks</div>

      <div className='divide-y divide-slate-100'>
        {rows.map((r) => (
          <div
            key={r.id}
            className='p-4 flex items-center justify-between'
          >
            <div className='space-y-1'>
              <div className='font-medium'>
                {r.staff?.name ? `Staff: ${r.staff.name}` : 'Business'} —{' '}
                {new Date(r.date).toISOString().slice(0, 10)}
              </div>
              <div className='text-sm text-slate-600'>
                {r.startMin == null
                  ? 'All day'
                  : `${minToHHMM(r.startMin)}–${minToHHMM(r.endMin)}`}
                {r.reason ? ` · ${r.reason}` : ''}
              </div>
            </div>

            <form
              action={async (fd) => {
                fd.set('id', r.id);
                const res = await deleteTimeOffAction(fd);
                if (!res.ok) {
                  toast.error(res.errors.form?.[0] ?? 'Something went wrong.');
                  return;
                }
              }}
            >
              <button className='h-9 px-3 rounded-xl border border-slate-200 hover:bg-slate-50'>
                Delete
              </button>
            </form>
          </div>
        ))}
        {!rows.length && (
          <div className='p-6 text-center text-slate-500'>
            There are no blocks yet.
          </div>
        )}
      </div>
    </div>
  );
}
