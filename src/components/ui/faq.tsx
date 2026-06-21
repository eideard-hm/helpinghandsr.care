import { IconHelpCircle } from '@tabler/icons-react';

import { SectionTitle } from '../common/section-title';

const FAQ_ITEMS = [
  {
    question: 'Do you provide massage at home in Abu Dhabi?',
    answer:
      'Yes. Sessions are delivered at your home, hotel, or residence across Abu Dhabi, with the equipment needed for a professional treatment.',
  },
  {
    question: 'How do I book a session?',
    answer:
      'Send a WhatsApp message with your preferred service, location, and available time. You will receive direct confirmation and preparation details.',
  },
  {
    question: 'Which treatment should I choose?',
    answer:
      'If you are unsure, start with ZeinMotion Therapy. It combines assessment, deep tissue work, sports massage, assisted stretching, and reflexology based on your needs.',
  },
  {
    question: 'Can you help with chronic pain or stiffness?',
    answer:
      'Yes. The treatment approach focuses on muscle tension, mobility restrictions, posture-related discomfort, sports recovery, and stress-related stiffness.',
  },
  {
    question: 'How is pricing handled?',
    answer:
      'Pricing depends on the treatment type, session length, location, and any add-ons such as cupping. Send a WhatsApp message for the best option for your needs.',
  },
] as const;

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
