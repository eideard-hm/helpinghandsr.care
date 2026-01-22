'use client';

import { motion } from 'framer-motion';

export function SectionTitle({
  children,
  subTitle,
}: {
  children: React.ReactNode;
  subTitle?: string;
}) {
  return (
    <div className='mb-12'>
      <motion.h2
        className='text-3xl md:text-4xl font-bold text-title-indigo mb-4 text-center md:text-start'
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {children}
      </motion.h2>

      {subTitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: 'easeOut',
          }}
          className='text-lg text-ink max-w-2xl mx-auto md:max-w-none md:text-start'
        >
          {subTitle}
        </motion.p>
      )}
    </div>
  );
}
