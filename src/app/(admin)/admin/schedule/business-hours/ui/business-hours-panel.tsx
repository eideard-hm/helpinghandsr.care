// src/app/(admin)/admin/schedule/business-hours/ui/business-hours-panel.tsx
'use client';

import * as React from 'react';
import {
  upsertBusinessHourAction,
  deleteBusinessHourAction,
} from '../_actions';

const WEEKDAYS = [
  { label: 'Domingo', short: 'Dom' },
  { label: 'Lunes', short: 'Lun' },
  { label: 'Martes', short: 'Mar' },
  { label: 'Miércoles', short: 'Mié' },
  { label: 'Jueves', short: 'Jue' },
  { label: 'Viernes', short: 'Vie' },
  { label: 'Sábado', short: 'Sáb' },
];

function minToHHMM(min: number) {
  const h = String(Math.floor(min / 60)).padStart(2, '0');
  const m = String(min % 60).padStart(2, '0');
  return `${h}:${m}`;
}

function hhmmToMin(v: string) {
  const [h, m] = v.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

type Row = {
  id: string;
  weekday: number;
  startMin: number;
  endMin: number;
  isClosed: boolean;
};

type EditingState =
  | { mode: 'create'; weekday: number; startHHMM: string; endHHMM: string }
  | { mode: 'edit'; row: Row; startHHMM: string; endHHMM: string };

export function BusinessHoursPanel({ rows }: { rows: Row[] }) {
  // agrupar por weekday
  const grouped = React.useMemo(() => {
    const map = new Map<number, Row[]>();
    for (let i = 0; i < 7; i++) map.set(i, []);
    rows.forEach((r) => map.get(r.weekday)!.push(r));
    for (const [k, list] of map.entries()) {
      list.sort((a, b) => a.startMin - b.startMin);
      map.set(k, list);
    }
    return map;
  }, [rows]);

  const [editing, setEditing] = React.useState<EditingState | null>(null);

  return (
    <div className='space-y-4'>
      {WEEKDAYS.map((day, weekday) => {
        const list = grouped.get(weekday) ?? [];
        const isClosedDay = list.some((r) => r.isClosed);

        return (
          <section
            key={weekday}
            className='rounded-2xl border border-slate-200 bg-white overflow-hidden'
          >
            <div className='p-4 border-b border-slate-200 flex items-center justify-between'>
              <div>
                <div className='font-semibold text-title-indigo'>
                  {day.label}
                </div>
                <div className='text-sm text-slate-500'>
                  {isClosedDay ? 'Cerrado' : `${list.length} franja(s)`}
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
                      weekday,
                      startHHMM: '09:00',
                      endHHMM: '17:00',
                    })
                  }
                >
                  + Agregar franja
                </button>

                <button
                  type='button'
                  className='h-10 px-4 rounded-xl border border-slate-200 hover:bg-slate-50'
                  onClick={() => {
                    // “Cerrar todo el día”: creamos (o aseguramos) un registro isClosed=true para ese weekday.
                    // Si ya hay franjas, las eliminamos primero (para evitar inconsistencias).
                    setEditing(null);
                    void (async () => {
                      // borrar franjas existentes
                      for (const r of list) {
                        const fd = new FormData();
                        fd.set('id', r.id);
                        await deleteBusinessHourAction(fd);
                      }
                      // crear registro isClosed
                      const fd = new FormData();
                      fd.set('weekday', String(weekday));
                      fd.set('startMin', '0');
                      fd.set('endMin', '0');
                      fd.set('isClosed', 'on');
                      const res = await upsertBusinessHourAction(fd);
                      if (!res.ok) alert(res.errors?._form?.[0] ?? 'Error');
                    })();
                  }}
                >
                  Marcar cerrado
                </button>

                {isClosedDay && (
                  <button
                    type='button'
                    className='h-10 px-4 rounded-xl border border-slate-200 hover:bg-slate-50'
                    onClick={() => {
                      // quitar cerrado => eliminar el registro isClosed
                      const closed = list.find((r) => r.isClosed);
                      if (!closed) return;
                      void (async () => {
                        const fd = new FormData();
                        fd.set('id', closed.id);
                        const res = await deleteBusinessHourAction(fd);
                        if (!res.ok) alert(res.errors?._form?.[0] ?? 'Error');
                      })();
                    }}
                  >
                    Reabrir
                  </button>
                )}
              </div>
            </div>

            {/* Editor inline SOLO para el día actual */}
            {editing &&
              editing.weekday === weekday &&
              editing.mode === 'create' && (
                <InlineEditor
                  key={`create-${weekday}`}
                  title='Nueva franja'
                  weekday={weekday}
                  startHHMM={editing.startHHMM}
                  endHHMM={editing.endHHMM}
                  onCancel={() => setEditing(null)}
                  onSaved={() => setEditing(null)}
                />
              )}

            <div className='divide-y divide-slate-100'>
              {!list.length && !isClosedDay && (
                <div className='p-4 text-sm text-slate-500'>
                  Sin franjas. Agrega una o marca cerrado.
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
                      className='p-4 flex items-center justify-between'
                    >
                      <div className='flex items-center gap-3'>
                        <span className='inline-flex items-center px-3 h-8 rounded-xl bg-slate-100 text-slate-700 text-sm'>
                          {startHHMM} – {endHHMM}
                        </span>
                      </div>

                      <div className='flex gap-2'>
                        <button
                          type='button'
                          className='h-9 px-3 rounded-xl border border-slate-200 hover:bg-slate-50'
                          onClick={() =>
                            setEditing({
                              mode: 'edit',
                              row: r,
                              startHHMM,
                              endHHMM,
                            })
                          }
                        >
                          Editar
                        </button>

                        <form
                          action={async (fd) => {
                            fd.set('id', r.id);
                            const res = await deleteBusinessHourAction(fd);
                            if (!res.ok)
                              alert(res.errors?._form?.[0] ?? 'Error');
                          }}
                        >
                          <button
                            type='submit'
                            className='h-9 px-3 rounded-xl border border-slate-200 hover:bg-slate-50'
                          >
                            Eliminar
                          </button>
                        </form>
                      </div>

                      {isEditingThis && (
                        <div className='w-full mt-3 col-span-full'>
                          <InlineEditor
                            title='Editar franja'
                            weekday={weekday}
                            id={r.id}
                            startHHMM={editing.startHHMM}
                            endHHMM={editing.endHHMM}
                            onCancel={() => setEditing(null)}
                            onSaved={() => setEditing(null)}
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
  weekday,
  id,
  startHHMM,
  endHHMM,
  onCancel,
  onSaved,
}: {
  title: string;
  weekday: number;
  id?: string;
  startHHMM: string;
  endHHMM: string;
  onCancel: () => void;
  onSaved: () => void;
}) {
  return (
    <div className='p-4 border-b border-slate-200 bg-slate-50'>
      <div className='text-sm font-medium mb-3'>{title}</div>

      <form
        action={async (fd) => {
          const startMin = hhmmToMin(String(fd.get('startHHMM') ?? '09:00'));
          const endMin = hhmmToMin(String(fd.get('endHHMM') ?? '17:00'));

          fd.set('weekday', String(weekday));
          fd.set('startMin', String(startMin));
          fd.set('endMin', String(endMin));
          if (id) fd.set('id', id);

          const res = await upsertBusinessHourAction(fd);
          if (!res.ok) {
            alert(res.errors?._form?.[0] ?? 'Error');
            return;
          }
          onSaved();
        }}
        className='grid grid-cols-1 sm:grid-cols-3 gap-3 items-end'
      >
        <label className='grid gap-1 text-sm'>
          Inicio
          <input
            name='startHHMM'
            type='time'
            defaultValue={startHHMM}
            className='h-10 rounded-xl border border-slate-200 px-3'
          />
        </label>

        <label className='grid gap-1 text-sm'>
          Fin
          <input
            name='endHHMM'
            type='time'
            defaultValue={endHHMM}
            className='h-10 rounded-xl border border-slate-200 px-3'
          />
        </label>

        <div className='flex gap-2'>
          <button
            className='h-10 px-4 rounded-xl bg-brand text-white hover:bg-(--brand-600)'
            type='submit'
          >
            Guardar
          </button>
          <button
            className='h-10 px-4 rounded-xl border border-slate-200 hover:bg-slate-50'
            type='button'
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>

        {/* Hidden para action */}
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
