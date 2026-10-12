'use client';

import { motion } from 'framer-motion';

import { WhatsAppButton } from '@/components/common/whatsapp-btn';
import { steps } from '@/data/steps';

export function Steps({ waLink }: { waLink: string }) {
  return (
    <>
      <div className='relative'>
        <div
          className='absolute top-14 right-[12.5%] left-[12.5%] hidden h-0.5 bg-linear-to-r from-brand-2 via-brand/50 to-brand-2 lg:block'
          aria-hidden
        />

        <ol className='relative grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {steps.map((step, index) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.45 }}
              viewport={{ once: true, amount: 0.4 }}
              className='group rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-gray-200/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10'
            >
              <div className='relative mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/25 transition-transform duration-300 group-hover:scale-105'>
                <step.icon
                  className='size-8'
                  aria-hidden
                />
                <span className='absolute -top-2 -right-2 flex size-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-ink ring-4 ring-white'>
                  <span className='sr-only'>Step </span>
                  {index + 1}
                </span>
              </div>
              <h3 className='text-lg font-bold text-title-indigo'>
                {step.title}
              </h3>
              <p className='mt-2 text-sm leading-6 text-gray-600'>
                {step.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        viewport={{ once: true }}
        className='relative isolate mt-14 overflow-hidden rounded-3xl bg-ink px-6 py-12 text-center text-white md:px-12 md:py-16'
      >
        <div
          className='absolute -top-24 -left-24 -z-10 size-72 rounded-full bg-brand/40 blur-3xl'
          aria-hidden
        />
        <div
          className='absolute -right-20 -bottom-28 -z-10 size-72 rounded-full bg-title-indigo/60 blur-3xl'
          aria-hidden
        />

        <h3 className='text-2xl font-bold text-balance !text-white md:text-3xl'>
          Ready to experience relief?
        </h3>
        <p className='mx-auto mt-4 max-w-2xl text-base leading-7 text-white/80 md:text-lg'>
          Tell us where it hurts, your location and your preferred time. You
          will receive a tailored recommendation and direct confirmation on
          WhatsApp.
        </p>
        <div className='mt-8 flex justify-center'>
          <WhatsAppButton
            waLink={waLink}
            label='Book your session'
            size='large'
            variant='light'
          />
        </div>
      </motion.div>
    </>
  );
}
