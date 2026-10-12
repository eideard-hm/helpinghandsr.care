import { IconPlus } from '@tabler/icons-react';

import { FAQ_ITEMS } from '@/data/faq';
import { WhatsAppLink } from '../common/whatsapp-link';
import { SheetHeading } from '../common/section-title';

export function Faq() {
  return (
    <section
      id='faq'
      aria-labelledby='faq-title'
      className='bg-shadow py-20 lg:py-28'
    >
      <div className='mx-auto grid max-w-7xl gap-x-10 gap-y-12 px-4 lg:grid-cols-12'>
        <div className='lg:col-span-4'>
          <SheetHeading id='faq-title'>Before you book</SheetHeading>

          <p className='mt-6 max-w-[38ch] text-[1.0625rem] leading-7 text-ink-soft'>
            Something else on your mind?{' '}
            <WhatsAppLink>Ask Richard on WhatsApp</WhatsAppLink>{' '}
            and get a personal answer about treatments, pricing or
            availability.
          </p>
        </div>

        <div className='border-t border-poche lg:col-span-8'>
          {FAQ_ITEMS.map((item, index) => (
            <details
              key={item.question}
              className='group border-b border-poche/25'
              open={index === 0}
            >
              <summary className='flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-semibold text-ink transition-colors hover:text-poche [&::-webkit-details-marker]:hidden'>
                <span>{item.question}</span>
                <IconPlus
                  size={22}
                  stroke={1.5}
                  className='shrink-0 text-poche transition-transform duration-300 ease-settle group-open:rotate-45'
                  aria-hidden
                />
              </summary>
              <p className='max-w-[65ch] pb-6 text-[1.0625rem] leading-7 text-ink-soft'>
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
