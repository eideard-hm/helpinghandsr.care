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
        className='mb-4 text-start text-3xl font-bold text-title-indigo md:text-4xl'
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
          className='max-w-2xl text-start text-lg text-ink'
        >
          {subTitle}
        </motion.p>
      )}
    </div>
  );
}
