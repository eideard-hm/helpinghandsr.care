import { IconBuildingCommunity, IconMap2 } from '@tabler/icons-react';

import { WhatsAppButton } from '../common/whatsapp-btn';
import { SectionTitle } from '../common/section-title';

const AREAS = [
  'Al Reem Island',
  'Yas Island',
  'Saadiyat Island',
  'Khalifa City',
  'Al Raha',
  'Al Maryah Island',
  'Corniche',
  'Mohammed Bin Zayed City',
] as const;

export function ServiceAreas() {
  return (
    <section className='bg-white py-16'>
      <div className='container mx-auto max-w-7xl px-4'>
        <div className='grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center'>
          <div>
            <SectionTitle subTitle='Home massage coverage in Abu Dhabi'>
              Service Areas
            </SectionTitle>

            <p className='text-base leading-7 text-gray-700'>
              Home visits are available across Abu Dhabi. If your area is not
              listed, send your location on WhatsApp and confirm availability
              before booking.
            </p>

            <div className='mt-6'>
              <WhatsAppButton label='Check My Area' />
            </div>
          </div>

          <div className='rounded-lg border border-gray-200 bg-gray-50 p-5'>
            <div className='mb-4 flex items-center gap-3'>
              <span className='inline-flex size-10 items-center justify-center rounded-lg bg-[color:var(--brand)] text-white'>
                <IconMap2
                  size={22}
                  aria-hidden
                />
              </span>
              <h3 className='text-lg font-semibold text-[color:var(--ink)]'>
                Common Visit Locations
              </h3>
            </div>

            <div className='grid gap-3 sm:grid-cols-2'>
              {AREAS.map((area) => (
                <div
                  key={area}
                  className='flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm text-gray-700'
                >
                  <IconBuildingCommunity
                    size={18}
                    className='shrink-0 text-[color:var(--brand)]'
                    aria-hidden
                  />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
