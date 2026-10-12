'use client';

import { useId, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { IconPlus } from '@tabler/icons-react';

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
    <div>
      <h3 className='text-xl text-poche lettering-display'>
        {isMain ? 'Premium benefits included' : 'What is included'}
      </h3>

      <ul className='mt-3 border-t border-poche'>
        {benefits.map((benefit, index) => {
          const expanded = expandedIndex === index;
          const panelId = `${baseId}-panel-${index}`;

          return (
            <li
              key={benefit.title}
              className='border-b border-mortar'
            >
              <h4>
                <button
                  type='button'
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setExpandedIndex(expanded ? null : index)}
                  className='flex min-h-13 w-full cursor-pointer items-center justify-between gap-4 py-3 text-left text-[1.0625rem] font-semibold text-ink transition-colors hover:text-poche'
                >
                  {benefit.title}
                  <IconPlus
                    size={20}
                    stroke={1.5}
                    className={cn(
                      'shrink-0 text-poche transition-transform duration-300 ease-settle',
                      expanded && 'rotate-45'
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
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className='overflow-hidden'
                  >
                    <ul className='space-y-2 pb-5 text-[0.9375rem] leading-7 text-ink-soft'>
                      {benefit.details.map((detail) => (
                        <li key={detail}>{detail}</li>
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
