'use client';

import { motion } from 'framer-motion';

import { childFade, fadeInUp } from '@/lib/motion';

type ServicesCardProps = {
  title: string;
  children?: React.ReactNode;
};

export function ServicesCard({ title, children }: ServicesCardProps) {
  return (
    <motion.div
      className='bg-white p-6 rounded-2xl shadow-sm ring-1 ring-black/5
                 transition will-change-transform'
      variants={fadeInUp}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.35 }}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.995 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      <motion.h3
        className='text-xl font-semibold mb-2 text-[color:var(--ink)]'
        variants={childFade}
      >
        {title}
      </motion.h3>

      <motion.p
        className='text-gray-600'
        variants={childFade}
      >
        {children}
      </motion.p>
    </motion.div>
  );
}
