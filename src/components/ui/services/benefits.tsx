'use client';

import { useId, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import {
  IconChevronDown,
  IconCircleCheck,
  IconStar,
} from '@tabler/icons-react';

import type { Benefits as BenefitsType } from '@/data/services';
import { cn } from '@/lib/cn';

export const Benefits = ({
  benefits,
  isMain = false,
}: {
  benefits: BenefitsType[];
  isMain?: boolean;
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div
      className={cn(
        'rounded-2xl p-5 ring-1',
        isMain ? 'bg-brand-2/20 ring-brand-2' : 'bg-gray-50 ring-gray-100'
      )}
    >
      <h3 className='mb-4 flex items-center gap-2 text-lg font-bold text-title-indigo'>
        {isMain ? (
          <IconStar
            size={20}
            className='text-accent'
            aria-hidden
          />
        ) : (
          <IconCircleCheck
            size={20}
            className='text-brand'
            aria-hidden
          />
        )}
        {isMain ? 'Premium benefits included' : 'What is included'}
      </h3>

      <ul className='space-y-2'>
        {benefits.map((benefit, index) => {
          const expanded = expandedIndex === index;
          const panelId = `${baseId}-panel-${index}`;

          return (
            <li
              key={benefit.title}
              className='overflow-hidden rounded-xl bg-white ring-1 ring-black/5'
            >
              <h4 className='font-sans text-base'>
                <button
                  type='button'
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setExpandedIndex(expanded ? null : index)}
                  className='flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 px-4 py-3 text-left font-semibold text-ink transition-colors hover:text-brand'
                >
                  {benefit.title}
                  <IconChevronDown
                    size={20}
                    className={cn(
                      'shrink-0 text-brand transition-transform duration-300',
                      expanded && 'rotate-180'
                    )}
                    aria-hidden
                  />
                </button>
              </h4>

              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    id={panelId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className='overflow-hidden'
                  >
                    <ul className='space-y-1.5 px-4 pb-4 text-sm leading-6 text-gray-600'>
                      {benefit.details.map((detail) => (
                        <li
                          key={detail}
                          className='flex gap-2.5'
                        >
                          <span
                            className='mt-2.5 size-1.5 shrink-0 rounded-full bg-accent'
                            aria-hidden
                          />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
