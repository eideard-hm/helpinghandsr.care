'use client';

import { motion } from 'framer-motion';

import { WhatsAppButton } from '@/components/common/whatsapp-btn';
import { steps } from '@/data/steps';

export function Steps({ waLink }: { waLink: string }) {
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className='text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow'
          >
            <div className='w-16 h-16 mx-auto mb-4 bg-brand/10 rounded-full flex items-center justify-center'>
              <step.icon className='w-8 h-8 text-brand' />
            </div>
            <h3 className='font-semibold text-ink mb-2'>{step.title}</h3>
            <p className='text-gray-600 text-sm'>{step.description}</p>
            <div className='mt-4 text-brand font-semibold'>
              Step {index + 1}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        id='benefits'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
        className='text-center mt-12 bg-brand/5 rounded-2xl p-8'
      >
        <h3 className='text-2xl font-semibold text-ink mb-4'>
          Ready to Experience Relief?
        </h3>
        <p className='text-gray-600 mb-6 max-w-2xl mx-auto'>
          Begin your journey to wellness with our easy booking process and
          expert therapeutic care
        </p>
        <WhatsAppButton waLink={waLink} />
      </motion.div>
    </>
  );
}
