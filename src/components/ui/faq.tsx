import { IconMessageCircle, IconPlus } from '@tabler/icons-react';

import { FAQ_ITEMS } from '@/data/faq';
import { waLinkWithEnv } from '@/lib/whatsapp';
import { SectionTitle } from '../common/section-title';

export function Faq() {
  return (
    <section
      id='faq'
      aria-labelledby='faq-title'
      className='bg-white py-16 md:py-24'
    >
      <div className='container mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16'>
        <div>
          <SectionTitle
            id='faq-title'
            eyebrow='FAQ'
            subTitle='Quick answers before you book your home visit.'
            className='mb-8'
          >
            Frequently Asked Questions
          </SectionTitle>

          <div className='rounded-2xl bg-bg p-6 ring-1 ring-gray-200/70'>
            <span className='inline-flex size-11 items-center justify-center rounded-xl bg-brand text-white'>
              <IconMessageCircle
                size={22}
                aria-hidden
              />
            </span>
            <p className='mt-4 font-display text-lg font-semibold text-title-indigo'>
              Still have a question?
            </p>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Send a message and get a personal answer about treatments,
              pricing or availability.
            </p>
            <a
              href={waLinkWithEnv()}
              target='_blank'
              rel='noopener noreferrer'
              className='mt-4 inline-flex min-h-11 items-center font-semibold text-brand underline decoration-brand/30 underline-offset-4 transition-colors hover:decoration-brand'
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>

        <div className='space-y-3'>
          {FAQ_ITEMS.map((item, index) => (
            <details
              key={item.question}
              className='group rounded-2xl bg-bg ring-1 ring-gray-200/70 transition-colors open:bg-white open:shadow-lg open:shadow-ink/5 open:ring-brand/30'
              open={index === 0}
            >
              <summary className='flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 font-semibold text-ink transition-colors hover:text-brand [&::-webkit-details-marker]:hidden'>
                <span>{item.question}</span>
                <span className='inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-brand ring-1 ring-gray-200 transition-transform duration-300 group-open:rotate-45 group-open:bg-brand group-open:text-white group-open:ring-brand'>
                  <IconPlus
                    size={18}
                    aria-hidden
                  />
                </span>
              </summary>
              <p className='px-5 pb-5 text-[15px] leading-7 text-gray-600'>
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
