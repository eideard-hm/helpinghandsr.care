'use client';

import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

export const Benefits = ({ benefits }: { benefits: string[] }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className='mb-6'>
      <h4 className='text-lg font-semibold mb-4 flex items-center'>
        <svg
          className='w-5 h-5 mr-2 text-green-500'
          fill='currentColor'
          viewBox='0 0 20 20'
        >
          <path
            fillRule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
            clipRule='evenodd'
          />
        </svg>
        Key Benefits
      </h4>

      <div className='space-y-2'>
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className='bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-green-50 transition-colors'
            onClick={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
          >
            <div className='flex items-center justify-between'>
              <span className='font-medium text-gray-800'>{benefit}</span>
              <motion.div
                animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  className='w-5 h-5 text-gray-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </motion.div>
            </div>

            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className='overflow-hidden'
                >
                  <div className='pt-2 text-gray-600'>
                    <p>
                      This benefit helps you achieve better results by providing
                      specialized expertise and personalized attention to your
                      needs.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
