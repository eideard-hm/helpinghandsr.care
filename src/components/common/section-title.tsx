'use client';

import { motion } from 'framer-motion';

import { cn } from '@/lib/cn';

type SectionTitleProps = {
  children: React.ReactNode;
  subTitle?: string;
  eyebrow?: string;
  id?: string;
  align?: 'start' | 'center';
  className?: string;
};

export function SectionTitle({
  children,
  subTitle,
  eyebrow,
  id,
  align = 'start',
  className,
}: SectionTitleProps) {
  const centered = align === 'center';

  return (
    <motion.div
      className={cn('mb-10 md:mb-12', centered && 'text-center', className)}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.4 }}
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
    >
      {eyebrow && (
        <motion.p
          className={cn(
            'mb-3 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-brand-700 uppercase',
            centered && 'justify-center'
          )}
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
          }}
        >
          <span
            className='h-px w-8 bg-accent'
            aria-hidden
          />
          {eyebrow}
        </motion.p>
      )}

      <motion.h2
        id={id}
        className='text-3xl font-bold text-balance text-title-indigo md:text-4xl'
        variants={{
          hidden: { opacity: 0, y: 12 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' },
          },
        }}
      >
        {children}
      </motion.h2>

      {subTitle && (
        <motion.p
          className={cn(
            'mt-4 max-w-2xl text-lg leading-8 text-gray-600',
            centered && 'mx-auto'
          )}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: 'easeOut' },
            },
          }}
        >
          {subTitle}
        </motion.p>
      )}
    </motion.div>
  );
}
