'use client';

import * as React from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { WEEKDAYS } from '../../../_data';
import { hhmmToMin, minToHHMM } from '../../../_helpers';
import { deleteStaffHourAction, upsertStaffHourAction } from '../_actions';

type Staff = { id: string; name: string; email: string | null };
type HourRow = {
  id: string;
  staffId: string;
  weekday: number;
  startMin: number;
  endMin: number;
  isClosed: boolean;
};

type EditingState =
  | null
  | {
      mode: 'create';
      staffId: string;
      weekday: number;
      startHHMM: string;
      endHHMM: string;
    }
  | { mode: 'edit'; row: HourRow; startHHMM: string; endHHMM: string };

export function StaffHoursPanel({
  staff,
  hours,
  initialView,
  initialStaffId,
}: {
  staff: Staff[];
  hours: HourRow[];
  initialView: 'staff' | 'day';
  initialStaffId: string;
}) {
  const router = useRouter();
  const sp = useSearchParams();

  const [view, setView] = React.useState<'staff' | 'day'>(initialView);
  const [selectedStaffId, setSelectedStaffId] = React.useState(initialStaffId);
  const [editing, setEditing] = React.useState<EditingState>(null);
  const [formError, setFormError] = React.useState<string | null>(null);

  // Group hours by staffId -> weekday
  const staffDayMap = React.useMemo(() => {
    const map = new Map<string, Map<number, HourRow[]>>();
    for (const s of staff) map.set(s.id, new Map<number, HourRow[]>());
    for (const h of hours) {
      if (!map.has(h.staffId)) map.set(h.staffId, new Map());
      const byDay = map.get(h.staffId)!;
      if (!byDay.has(h.weekday)) byDay.set(h.weekday, []);
      byDay.get(h.weekday)!.push(h);
    }
    for (const [, byDay] of map) {
      for (const [d, list] of byDay) {
        list.sort((a, b) => a.startMin - b.startMin);
        byDay.set(d, list);
      }
    }
    return map;
  }, [staff, hours]);

  function syncUrl(next: { view?: string; staffId?: string }) {
    const params = new URLSearchParams(sp.toString());
    if (next.view) params.set('view', next.view);
    if (next.staffId !== undefined) {
      if (next.staffId) params.set('staffId', next.staffId);
      else params.delete('staffId');
    }
    router.replace(`/admin/schedule/staff-hours?${params.toString()}`);
  }

  return (
    <div className='space-y-4'>
      {/* Tabs */}
      <div className='flex flex-wrap items-center gap-2'>
        <button
          className={`h-10 px-4 rounded-xl border ${view === 'staff' ? 'bg-slate-50' : 'bg-white'} border-slate-200`}
          onClick={() => {
            setView('staff');
            syncUrl({ view: 'staff' });
          }}
          type='button'
        >
          By staff
        </button>
        <button
          className={`h-10 px-4 rounded-xl border ${view === 'day' ? 'bg-slate-50' : 'bg-white'} border-slate-200`}
          onClick={() => {
            setView('day');
            syncUrl({ view: 'day' });
          }}
          type='button'
        >
          By weekday
        </button>

        {view === 'staff' && (
          <div className='ml-auto flex items-center gap-2'>
            <span className='text-sm text-slate-600'>Staff</span>
            <select
              value={selectedStaffId}
              onChange={(e) => {
                const id = e.target.value;
                setSelectedStaffId(id);
                setEditing(null);
                setFormError(null);
                syncUrl({ staffId: id });
              }}
              className='h-10 rounded-xl border border-slate-200 px-3 bg-white'
            >
              {staff.map((s) => (
                <option
                  key={s.id}
                  value={s.id}
                >
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {view === 'staff' ? (
        <ByStaffEditor
          staff={staff}
          staffId={selectedStaffId}
          staffDayMap={staffDayMap}
          editing={editing}
          setEditing={setEditing}
          formError={formError}
          setFormError={setFormError}
        />
      ) : (
        <ByDayOverview
          staff={staff}
          staffDayMap={staffDayMap}
        />
      )}
    </div>
  );
}

function ByStaffEditor({
  staff,
  staffId,
  staffDayMap,
  editing,
  setEditing,
  formError,
  setFormError,
}: {
  staff: Staff[];
  staffId: string;
  staffDayMap: Map<string, Map<number, HourRow[]>>;
  editing: EditingState;
  setEditing: (v: EditingState) => void;
  formError: string | null;
  setFormError: (v: string | null) => void;
}) {
  const selectedStaff = staff.find((s) => s.id === staffId);
  const byDay = staffDayMap.get(staffId) ?? new Map<number, HourRow[]>();

  return (
    <div className='space-y-4'>
      <div className='rounded-2xl border border-slate-200 bg-white overflow-hidden'>
        <div className='p-4 border-b border-slate-200 flex items-center justify-between'>
          <div>
            <div className='font-semibold'>
              {selectedStaff?.name ?? 'Staff'}
            </div>
            <div className='text-sm text-slate-500'>
              {selectedStaff?.email ?? ''}
            </div>
          </div>

          <button
            type='button'
            className='h-10 px-4 rounded-xl bg-brand text-white hover:bg-(--brand-600)'
            onClick={() =>
              setEditing({
                mode: 'create',
                staffId,
                weekday: 1,
                startHHMM: '09:00',
                endHHMM: '17:00',
              })
            }
          >
            + Add range
          </button>
        </div>

        {formError && (
          <div className='p-4 text-sm text-red-600 border-b border-slate-200'>
            {formError}
          </div>
        )}

        <div className='p-4 text-sm text-slate-600'>
          Define multiple ranges per day (e.g. 09:00–12:00 and 14:00–18:00).
          Overlaps are blocked.
        </div>
      </div>

      {WEEKDAYS.map((day, weekday) => {
        const list = (byDay.get(weekday) ?? [])
          .slice()
          .sort((a, b) => a.startMin - b.startMin);
        const isClosedDay = list.some((r) => r.isClosed);

        return (
          <section
            key={weekday}
            className='rounded-2xl border border-slate-200 bg-white overflow-hidden'
          >
            <div className='p-4 border-b border-slate-200 flex items-center justify-between'>
              <div>
                <div className='font-semibold'>{day.label}</div>
                <div className='text-sm text-slate-500'>
                  {isClosedDay
                    ? 'Closed'
                    : `${list.filter((r) => !r.isClosed).length} range(s)`}
                </div>
              </div>

              <div className='flex gap-2'>
                <button
                  type='button'
                  className='h-10 px-4 rounded-xl bg-brand text-white hover:bg-[color:var(--brand-600)] disabled:opacity-50'
                  disabled={isClosedDay}
                  onClick={() =>
                    setEditing({
                      mode: 'create',
                      staffId,
                      weekday,
                      startHHMM: '09:00',
                      endHHMM: '17:00',
                    })
                  }
                >
                  + Add range
                </button>

                <button
                  type='button'
                  className='h-10 px-4 rounded-xl border border-slate-200 hover:bg-slate-50'
                  onClick={() => {
                    setEditing(null);
                    setFormError(null);
                    void (async () => {
                      // delete existing ranges
                      for (const r of list) {
                        const fd = new FormData();
                        fd.set('id', r.id);
                        const res = await deleteStaffHourAction(fd);
                        if (!res.ok)
                          setFormError(
                            res.errors.form?.[0] ?? 'Delete failed.',
                          );
                      }
                      // create a "closed" marker row
                      const fd = new FormData();
                      fd.set('staffId', staffId);
                      fd.set('weekday', String(weekday));
                      fd.set('startMin', '0');
                      fd.set('endMin', '0');
                      fd.set('isClosed', 'on');
                      const res = await upsertStaffHourAction(fd);
                      if (!res.ok)
                        setFormError(res.errors.form?.[0] ?? 'Save failed.');
                    })();
                  }}
                >
                  Mark closed
                </button>

                {isClosedDay && (
                  <button
                    type='button'
                    className='h-10 px-4 rounded-xl border border-slate-200 hover:bg-slate-50'
                    onClick={() => {
                      const closed = list.find((r) => r.isClosed);
                      if (!closed) return;
                      void (async () => {
                        const fd = new FormData();
                        fd.set('id', closed.id);
                        const res = await deleteStaffHourAction(fd);
                        if (!res.ok)
                          setFormError(
                            res.errors.form?.[0] ?? 'Delete failed.',
                          );
                      })();
                    }}
                  >
                    Reopen
                  </button>
                )}
              </div>
            </div>

            {/* Inline create editor for this weekday */}
            {editing &&
              editing.mode === 'create' &&
              editing.staffId === staffId &&
              editing.weekday === weekday && (
                <InlineEditor
                  title='New range'
                  staffId={staffId}
                  weekday={weekday}
                  startHHMM={editing.startHHMM}
                  endHHMM={editing.endHHMM}
                  onCancel={() => setEditing(null)}
                  onSaved={() => setEditing(null)}
                  onError={(msg) => setFormError(msg)}
                />
              )}

            <div className='divide-y divide-slate-100'>
              {!list.length && !isClosedDay && (
                <div className='p-4 text-sm text-slate-500'>
                  No ranges. Add one or mark closed.
                </div>
              )}

              {list
                .filter((r) => !r.isClosed)
                .map((r) => {
                  const startHHMM = minToHHMM(r.startMin);
                  const endHHMM = minToHHMM(r.endMin);
                  const isEditingThis =
                    editing?.mode === 'edit' && editing.row.id === r.id;

                  return (
                    <div
                      key={r.id}
                      className='p-4'
                    >
                      <div className='flex items-center justify-between gap-3'>
                        <span className='inline-flex items-center px-3 h-8 rounded-xl bg-slate-100 text-slate-700 text-sm'>
                          {startHHMM} – {endHHMM}
                        </span>

                        <div className='flex gap-2'>
                          <button
                            type='button'
                            className='h-9 px-3 rounded-xl border border-slate-200 hover:bg-slate-50'
                            onClick={() => {
                              setFormError(null);
                              setEditing({
                                mode: 'edit',
                                row: r,
                                startHHMM,
                                endHHMM,
                              });
                            }}
                          >
                            Edit
                          </button>

                          <form
                            action={async (fd) => {
                              setFormError(null);
                              fd.set('id', r.id);
                              const res = await deleteStaffHourAction(fd);
                              if (!res.ok)
                                setFormError(
                                  res.errors.form?.[0] ?? 'Delete failed.',
                                );
                            }}
                          >
                            <button
                              type='submit'
                              className='h-9 px-3 rounded-xl border border-slate-200 hover:bg-slate-50'
                            >
                              Delete
                            </button>
                          </form>
                        </div>
                      </div>

                      {isEditingThis && (
                        <div className='mt-3'>
                          <InlineEditor
                            title='Edit range'
                            id={r.id}
                            staffId={staffId}
                            weekday={weekday}
                            startHHMM={editing.startHHMM}
                            endHHMM={editing.endHHMM}
                            onCancel={() => setEditing(null)}
                            onSaved={() => setEditing(null)}
                            onError={(msg) => setFormError(msg)}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function InlineEditor({
  title,
  id,
  staffId,
  weekday,
  startHHMM,
  endHHMM,
  onCancel,
  onSaved,
  onError,
}: {
  title: string;
  id?: string;
  staffId: string;
  weekday: number;
  startHHMM: string;
  endHHMM: string;
  onCancel: () => void;
  onSaved: () => void;
  onError: (msg: string) => void;
}) {
  return (
    <div className='p-4 border border-slate-200 rounded-2xl bg-slate-50'>
      <div className='text-sm font-medium mb-3'>{title}</div>

      <form
        action={async (fd) => {
          const startMin = hhmmToMin(String(fd.get('startHHMM') ?? '09:00'));
          const endMin = hhmmToMin(String(fd.get('endHHMM') ?? '17:00'));

          fd.set('staffId', staffId);
          fd.set('weekday', String(weekday));
          fd.set('startMin', String(startMin));
          fd.set('endMin', String(endMin));
          if (id) fd.set('id', id);

          const res = await upsertStaffHourAction(fd);
          if (!res.ok) {
            onError(res.errors.form?.[0] ?? 'Save failed.');
            return;
          }
          onSaved();
        }}
        className='grid grid-cols-1 sm:grid-cols-3 gap-3 items-end'
      >
        <label className='grid gap-1 text-sm'>
          Start
          <input
            name='startHHMM'
            type='time'
            defaultValue={startHHMM}
            className='h-10 rounded-xl border border-slate-200 px-3'
          />
        </label>

        <label className='grid gap-1 text-sm'>
          End
          <input
            name='endHHMM'
            type='time'
            defaultValue={endHHMM}
            className='h-10 rounded-xl border border-slate-200 px-3'
          />
        </label>

        <div className='flex gap-2'>
          <button
            className='h-10 px-4 rounded-xl bg-brand text-white hover:bg-[color:var(--brand-600)]'
            type='submit'
          >
            Save
          </button>
          <button
            className='h-10 px-4 rounded-xl border border-slate-200 hover:bg-slate-50'
            type='button'
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>

        <input
          type='hidden'
          name='startMin'
        />
        <input
          type='hidden'
          name='endMin'
        />
      </form>
    </div>
  );
}

function ByDayOverview({
  staff,
  staffDayMap,
}: {
  staff: Staff[];
  staffDayMap: Map<string, Map<number, HourRow[]>>;
}) {
  return (
    <div className='space-y-4'>
      {WEEKDAYS.map((day, weekday) => (
        <section
          key={weekday}
          className='rounded-2xl border border-slate-200 bg-white overflow-hidden'
        >
          <div className='p-4 border-b border-slate-200'>
            <div className='font-semibold'>{day.label}</div>
            <div className='text-sm text-slate-500'>
              All staff availability at a glance
            </div>
          </div>

          <div className='divide-y divide-slate-100'>
            {staff.map((s) => {
              const rows = (staffDayMap.get(s.id)?.get(weekday) ?? [])
                .slice()
                .sort((a, b) => a.startMin - b.startMin);
              const isClosed = rows.some((r) => r.isClosed);
              const ranges = rows.filter((r) => !r.isClosed);

              return (
                <div
                  key={s.id}
                  className='p-4 flex items-start justify-between gap-4'
                >
                  <div>
                    <div className='font-medium'>{s.name}</div>
                    <div className='text-xs text-slate-500'>
                      {s.email ?? ''}
                    </div>
                  </div>

                  <div className='flex flex-wrap justify-end gap-2'>
                    {isClosed && (
                      <span className='inline-flex items-center px-3 h-8 rounded-xl bg-slate-100 text-slate-700 text-sm'>
                        Closed
                      </span>
                    )}

                    {!isClosed && !ranges.length && (
                      <span className='inline-flex items-center px-3 h-8 rounded-xl bg-slate-100 text-slate-700 text-sm'>
                        No ranges
                      </span>
                    )}

                    {!isClosed &&
                      ranges.map((r) => (
                        <span
                          key={r.id}
                          className='inline-flex items-center px-3 h-8 rounded-xl bg-slate-100 text-slate-700 text-sm'
                        >
                          {minToHHMM(r.startMin)}–{minToHHMM(r.endMin)}
                        </span>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
