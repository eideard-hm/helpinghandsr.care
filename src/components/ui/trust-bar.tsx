import {
  IconCalendarCheck,
  IconCertificate,
  IconHomeHeart,
  IconMapPin,
} from '@tabler/icons-react';

const TRUST_ITEMS = [
  {
    icon: IconCertificate,
    title: '20+ Years Experience',
    detail: 'Advanced massage and physical therapy techniques.',
  },
  {
    icon: IconHomeHeart,
    title: 'Home Visits',
    detail: 'Professional treatment delivered at your location.',
  },
  {
    icon: IconMapPin,
    title: 'Abu Dhabi Coverage',
    detail: 'Serving homes, hotels, and residences across the city.',
  },
  {
    icon: IconCalendarCheck,
    title: 'WhatsApp Booking',
    detail: 'Quick scheduling with direct confirmation.',
  },
] as const;

export function TrustBar() {
  return (
    <section
      aria-label='Why clients choose us'
      className='bg-white border-y border-gray-100'
    >
      <div className='container mx-auto max-w-7xl px-4 py-8'>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {TRUST_ITEMS.map(({ icon: Icon, title, detail }) => (
            <article
              key={title}
              className='flex items-start gap-3'
            >
              <span className='mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-[color:var(--brand-2)]/20 text-[color:var(--brand)]'>
                <Icon
                  size={22}
                  aria-hidden
                />
              </span>
              <div>
                <h2 className='text-sm font-semibold text-[color:var(--ink)]'>
                  {title}
                </h2>
                <p className='mt-1 text-sm leading-6 text-gray-600'>{detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
