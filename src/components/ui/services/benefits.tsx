'use client';

import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { IconChevronDown, IconCircleCheck, IconStar } from '@tabler/icons-react';

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
        {isMain ? (
          <IconStar
            size={20}
            className='mr-2 text-green-600'
            aria-hidden
          />
        ) : (
          <IconCircleCheck
            size={20}
            className='mr-2 text-green-500'
            aria-hidden
          />
        )}
        {isMain
          ? 'Premium Benefits Included'
          : 'What Is Included / Benefits'}
      </h4>

      <div className={isMain ? 'space-y-3' : 'space-y-2'}>
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={benefitItemStyles}
            onClick={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
          >
            <div className='flex items-center justify-between'>
              <span className={benefitTitleStyles}>{benefit.title}</span>
              <motion.div
                animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <IconChevronDown
                  size={20}
                  className={isMain ? 'text-green-600' : 'text-gray-500'}
                  aria-hidden
                />
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
                    className={`pt-2 ${
                      isMain ? 'text-green-700' : 'text-gray-600'
                    }`}
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
