'use client';

import { motion } from 'framer-motion';

export function HowWeWork({ details }: { details: string[] }) {
  return (
    <div className='space-y-4'>
      <h4 className='text-lg font-semibold'>How We Work</h4>
      {details.map((d, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15 }}
          whileHover={{ scale: 1.01 }}
          className='p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500'
        >
          <div className='flex items-start'>
            <span className='bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0'>
              {i + 1}
            </span>
            <p className='text-gray-700 leading-relaxed'>{d}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
