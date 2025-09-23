'use client';

import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import type { Benefits as BenefitsType } from '@/data/services';

export const Benefits = ({
  benefits,
  isMain = false,
}: {
    benefits: BenefitsType[];
  isMain?: boolean;
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const containerStyles = isMain
    ? 'mb-8 p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border-2 border-green-200 shadow-lg'
    : 'mb-6';
  
  const titleStyles = isMain
    ? 'text-xl font-bold mb-4 flex items-center text-green-700'
    : 'text-lg font-semibold mb-4 flex items-center';

  const benefitItemStyles = isMain
    ? 'bg-white rounded-xl p-4 cursor-pointer hover:shadow-md transition-all duration-300 border border-green-100 hover:border-green-300'
    : 'bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-green-50 transition-colors';

  const benefitTitleStyles = isMain
    ? 'font-bold text-green-800 text-lg'
    : 'font-medium text-gray-800';

  return (
    <div className={containerStyles}>
      <h4 className={titleStyles}>
        <svg
          className={`w-5 h-5 mr-2 ${
            isMain ? 'text-green-600' : 'text-green-500'
          }`}
          fill='currentColor'
          viewBox='0 0 20 20'
        >
          <path
            fillRule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
            clipRule='evenodd'
          />
        </svg>
        {isMain
          ? '🌟 Premium Benefits Included'
          : 'What is Included / Benefits'}
      </h4>

      <div className={isMain ? 'space-y-3' : 'space-y-2'}>
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
              <span className='font-medium text-gray-800'>{benefit.title}</span>
              <motion.div
                animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  className={`w-5 h-5 ${
                    isMain ? 'text-green-600' : 'text-gray-500'
                  }`}
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
                  <div
                    className={`pt-2 ${isMain ? 'text-green-700' : 'text-gray-600'}`}
                  >
                    <ul className='list-disc list-inside space-y-1'>
                      {benefit.details.map((detail, detailIndex) => (
                        <li key={detailIndex}>{detail}</li>
                      ))}
                    </ul>
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
