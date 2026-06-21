import {
  IconClockHour4,
  IconMassage,
  IconReceipt,
  IconSparkles,
} from '@tabler/icons-react';

import { WhatsAppButton } from '../common/whatsapp-btn';
import { SectionTitle } from '../common/section-title';

const PRICING_FACTORS = [
  {
    icon: IconMassage,
    title: 'Treatment Type',
    detail:
      'Choose focused recovery work, full-body therapeutic massage, or the signature ZeinMotion method.',
  },
  {
    icon: IconClockHour4,
    title: 'Session Length',
    detail:
      'The final recommendation depends on your goals, pain level, and how much bodywork is needed.',
  },
  {
    icon: IconSparkles,
    title: 'Optional Add-ons',
    detail:
      'Cupping, reflexology, assisted stretching, or focused area work can be included when appropriate.',
  },
  {
    icon: IconReceipt,
    title: 'Clear Quote First',
    detail:
      'Share your location and preferred treatment on WhatsApp to receive the best option before booking.',
  },
] as const;

export function PricingGuide() {
  return (
    <section className='bg-[color:var(--bg)] py-16'>
      <div className='container mx-auto max-w-7xl px-4'>
        <div className='grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start'>
          <div>
            <SectionTitle subTitle='Simple, transparent booking expectations'>
              Session & Pricing Guide
            </SectionTitle>

            <p className='text-base leading-7 text-gray-700'>
              Every session is tailored to your body, location, and recovery
              goals. Send a quick message with what you need, and you will
              receive a clear recommendation before confirming the visit.
            </p>

            <div className='mt-6'>
              <WhatsAppButton label='Request a Quote' />
            </div>
          </div>

          <div className='grid gap-4 sm:grid-cols-2'>
            {PRICING_FACTORS.map(({ icon: Icon, title, detail }) => (
              <article
                key={title}
                className='rounded-lg border border-gray-200 bg-white p-5 shadow-sm'
              >
                <Icon
                  size={28}
                  className='text-[color:var(--brand)]'
                  aria-hidden
                />
                <h3 className='mt-4 text-base font-semibold text-[color:var(--ink)]'>
                  {title}
                </h3>
                <p className='mt-2 text-sm leading-6 text-gray-600'>
                  {detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
