'use client';

import {
  Fragment,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

import dynamic from 'next/dynamic';

import toast from 'react-hot-toast';

import { confirmBookingAction, createBookingHoldAction } from '../../_actions';

const MapPicker = dynamic(
  () => import('./map-picker').then((m) => m.MapPicker),
  { ssr: false },
);

type Business = {
  id: string;
  name: string;
  timezone: string;
  bufferMin: number;
};
type Service = { id: string; name: string; durationMin: number; price: any };
type Staff = { id: string; name: string };

type Slot = { startAt: string; endAt: string };

function formatTime(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function BookingWizard({
  business,
  services,
  staff,
}: {
  business: string;
  services: string;
  staff: Staff[];
}) {
  const businessParsed = JSON.parse(business) as Business;
  const servicesParsed = JSON.parse(services) as Service[];

  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [serviceId, setServiceId] = useState(servicesParsed[0]?.id ?? '');
  const [staffId, setStaffId] = useState<string>('');
  const [date, setDate] = useState(todayISO());
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [addressText, setAddressText] = useState('');
  const [coords, setCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [placeId, setPlaceId] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [hold, setHold] = useState<{
    bookingId: string;
    holdExpiresAtISO: string;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleAddressPick = useCallback(
    (payload: {
      addressText: string;
      lat: number;
      lng: number;
      placeId?: string | null;
    }) => {
      setAddressText(payload.addressText);
      setCoords({ lat: payload.lat, lng: payload.lng });
      setPlaceId(payload.placeId ?? null);
    },
    [],
  );

  const handleCoordsChange = useCallback(
    (latlng: { lat: number; lng: number }) => {
      setCoords(latlng);
    },
    [],
  );

  async function loadSlots() {
    if (!serviceId || !date) return;
    setSlotsLoading(true);
    setError(null);
    setSelectedSlot(null);

    const qs = new URLSearchParams({
      businessId: businessParsed.id,
      serviceId,
      date,
    });
    if (staffId) qs.set('staffId', staffId);

    const res = await fetch(`/api/availability?${qs.toString()}`, {
      cache: 'no-store',
    });
    const json = await res.json();

    setSlots(Array.isArray(json?.slots) ? json.slots : []);
    setSlotsLoading(false);
  }

  useEffect(() => {
    void loadSlots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId, staffId, date]);

  function canGoStep2() {
    return Boolean(serviceId && date && selectedSlot);
  }

  function canGoStep3() {
    return customerName.trim().length >= 2 && phone.trim().length >= 6;
  }

  function canSubmit() {
    return (
      addressText.trim().length >= 5 && coords != null && selectedSlot != null
    );
  }

  return (
    <div className='space-y-4'>
      <Stepper step={step} />

      {step === 1 && (
        <Card title='Select time'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
            <label className='grid gap-1 text-sm'>
              Service
              <select
                className='h-10 rounded-xl border border-slate-200 px-3 bg-white'
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
              >
                {servicesParsed.map((s) => (
                  <option
                    key={s.id}
                    value={s.id}
                  >
                    {s.name} · {s.durationMin} min
                  </option>
                ))}
              </select>
            </label>

            <label className='grid gap-1 text-sm'>
              Professional (optional)
              <select
                className='h-10 rounded-xl border border-slate-200 px-3 bg-white'
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
              >
                <option value=''>Any available</option>
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

            <label className='grid gap-1 text-sm'>
              Date
              <input
                type='date'
                className='h-10 rounded-xl border border-slate-200 px-3'
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
          </div>

          <div className='mt-4'>
            <div className='text-sm text-slate-600 mb-2'>Available times</div>

            {slotsLoading && (
              <div className='text-sm text-slate-500'>
                Loading availability...
              </div>
            )}

            {!slotsLoading && slots.length === 0 && (
              <div className='text-sm text-slate-500'>
                No slots available for this date.
              </div>
            )}

            <div className='flex flex-wrap gap-2'>
              {slots.map((s) => {
                const isActive = selectedSlot?.startAt === s.startAt;
                return (
                  <button
                    key={s.startAt}
                    type='button'
                    onClick={() => setSelectedSlot(s)}
                    className={[
                      'h-9 px-3 rounded-xl border text-sm',
                      isActive
                        ? 'border-brand bg-brand/10 text-ink'
                        : 'border-slate-200 hover:bg-slate-50',
                    ].join(' ')}
                  >
                    {formatTime(s.startAt)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className='mt-5 flex justify-end'>
            <button
              type='button'
              disabled={!canGoStep2()}
              onClick={() => setStep(2)}
              className='h-10 px-4 rounded-xl bg-brand text-white hover:bg-(--brand-600) disabled:opacity-50'
            >
              Continue
            </button>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card title='Contact details'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            <label className='grid gap-1 text-sm'>
              Full name
              <input
                className='h-10 rounded-xl border border-slate-200 px-3'
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </label>

            <label className='grid gap-1 text-sm'>
              Phone
              <input
                className='h-10 rounded-xl border border-slate-200 px-3'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </label>

            <label className='grid gap-1 text-sm md:col-span-2'>
              Email (optional, for calendar invitation)
              <input
                type='email'
                className='h-10 rounded-xl border border-slate-200 px-3'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>

          <div className='mt-5 flex items-center justify-between'>
            <button
              type='button'
              onClick={() => setStep(1)}
              className='h-10 px-4 rounded-xl border border-slate-200 hover:bg-slate-50'
            >
              Back
            </button>

            <button
              type='button'
              disabled={!canGoStep3()}
              onClick={() => setStep(3)}
              className='h-10 px-4 rounded-xl bg-brand text-white hover:bg-(--brand-600) disabled:opacity-50'
            >
              Continue
            </button>
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card title='Address (at home)'>
          <div className='text-sm text-slate-600'>
            Type your address or select it on the map.
          </div>

          <div className='mt-3 grid grid-cols-1 gap-3'>
            <label className='grid gap-1 text-sm'>
              Address
              <input
                className='h-10 rounded-xl border border-slate-200 px-3'
                value={addressText}
                onChange={(e) => setAddressText(e.target.value)}
                placeholder='Street, number, neighborhood...'
              />
            </label>

            <MapPicker
              addressText={addressText}
              onAddressPick={handleAddressPick}
              onCoordsChange={handleCoordsChange}
            />

            {coords && (
              <div className='text-xs text-slate-500'>
                Selected location: {coords.lat.toFixed(6)},{' '}
                {coords.lng.toFixed(6)}
              </div>
            )}

            {error && <div className='text-sm text-red-600'>{error}</div>}

            <div className='mt-2 flex items-center justify-between'>
              <button
                type='button'
                onClick={() => setStep(2)}
                className='h-10 px-4 rounded-xl border border-slate-200 hover:bg-slate-50'
              >
                Back
              </button>

              <button
                type='button'
                disabled={!canSubmit() || submitting}
                onClick={async () => {
                  if (!selectedSlot || !coords) return;
                  setSubmitting(true);
                  setError(null);

                  const payload = {
                    businessId: businessParsed.id,
                    serviceId,
                    staffId: staffId || undefined,
                    startAtISO: selectedSlot.startAt,

                    customerName,
                    phone,
                    email: email.trim() ? email.trim() : undefined,

                    addressText: addressText.trim()
                      ? addressText.trim()
                      : undefined,
                    lat: coords.lat,
                    lng: coords.lng,
                    placeId: placeId ?? undefined,
                  };

                  const res = await createBookingHoldAction(payload);
                  if (!res.ok) {
                    setError(
                      res.errors.form?.[0] ?? 'Could not reserve this slot.',
                    );
                    setSubmitting(false);
                    return;
                  }

                  setHold({
                    bookingId: res.data.bookingId,
                    holdExpiresAtISO: res.data.holdExpiresAtISO,
                  });

                  const res2 = await confirmBookingAction({
                    bookingId: res.data.bookingId,
                  });
                  if (!res2.ok) {
                    setError(
                      res2.errors.form?.[0] ?? 'Could not confirm booking.',
                    );
                    setSubmitting(false);
                    return;
                  }

                  setSubmitting(false);
                  toast.success('Booking confirmed!');
                  window.location.href = `/booking/confirmed/${res.data.bookingId}`;
                }}
                className='h-10 px-4 rounded-xl bg-ink text-white hover:opacity-90 disabled:opacity-50'
              >
                {submitting ? 'Submitting...' : 'Confirm booking'}
              </button>
            </div>

            {hold && (
              <div className='text-xs text-slate-500'>
                Hold created (MVP). Expires at:{' '}
                {new Date(hold.holdExpiresAtISO).toLocaleTimeString()}
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}

function Stepper({ step }: { step: 1 | 2 | 3 }) {
  const items = [
    { n: 1, label: 'Time' },
    { n: 2, label: 'Contact' },
    { n: 3, label: 'Address' },
  ] as const;

  return (
    <div className='flex items-center gap-2'>
      {items.map((it, idx) => {
        const active = it.n === step;
        const done = it.n < step;
        return (
          <Fragment key={it.n}>
            <div
              className={[
                'flex items-center gap-2 px-3 h-9 rounded-xl border text-sm',
                active
                  ? 'border-brand bg-brand/10'
                  : 'border-slate-200 bg-white',
                done ? 'opacity-90' : '',
              ].join(' ')}
            >
              <span
                className={[
                  'inline-flex items-center justify-center size-6 rounded-lg text-xs font-semibold',
                  active
                    ? 'bg-brand text-white'
                    : 'bg-slate-100 text-slate-700',
                ].join(' ')}
              >
                {it.n}
              </span>
              <span className='font-medium'>{it.label}</span>
            </div>
            {idx < items.length - 1 && (
              <div className='h-px w-6 bg-slate-200' />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className='rounded-2xl border border-slate-200 bg-white overflow-hidden'>
      <div className='p-4 border-b border-slate-200'>
        <div className='font-semibold'>{title}</div>
      </div>
      <div className='p-4'>{children}</div>
    </section>
  );
}
