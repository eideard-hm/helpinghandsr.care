import { IconHelpCircle } from '@tabler/icons-react';

import { FAQ_ITEMS } from '@/data/faq';
import { SectionTitle } from '../common/section-title';

export function Faq() {
  return (
    <section className='bg-white py-16'>
      <div className='container mx-auto max-w-7xl px-4'>
        <SectionTitle subTitle='Quick answers before you book'>
          Frequently Asked Questions
        </SectionTitle>

        <div className='grid gap-3 md:grid-cols-2'>
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              className='group rounded-lg border border-gray-200 bg-gray-50 p-4'
            >
              <summary className='flex cursor-pointer list-none items-start gap-3 font-semibold text-[color:var(--ink)]'>
                <IconHelpCircle
                  size={20}
                  className='mt-0.5 shrink-0 text-[color:var(--brand)]'
                  aria-hidden
                />
                <span>{item.question}</span>
              </summary>
              <p className='mt-3 pl-8 text-sm leading-6 text-gray-600'>
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
