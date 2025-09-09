'use client';

import { motion } from 'framer-motion';

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      className='text-3xl md:text-4xl font-bold text-[color:var(--ink)] mb-8'
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.h2>
  );
}
