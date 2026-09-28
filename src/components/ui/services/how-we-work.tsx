'use client';

import { motion } from 'framer-motion';

export function HowWeWork({ details }: { details: string[] }) {
  return (
    <div>
      <h3 className='mb-4 text-lg font-bold text-title-indigo'>How we work</h3>
      <ol className='space-y-3'>
        {details.map((detail, i) => (
          <motion.li
            key={detail}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className='flex items-start gap-3 rounded-xl border-l-4 border-brand bg-gray-50 p-4'
          >
            <span className='inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white'>
              {i + 1}
            </span>
            <p className='leading-relaxed text-gray-700'>{detail}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
