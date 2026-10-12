'use client';

import { useId } from 'react';

import { motion } from 'framer-motion';

import { useVisit } from '@/components/common/visit-provider';
import { HOURS } from '@/data/visit';
import { cn } from '@/lib/cn';

type HourControlProps = {
  legend?: string;
  /** The ground the control sits on. */
  ground?: 'limewash' | 'poche';
  className?: string;
};

/**
 * A time axis with four hours. Choosing one moves the sun in the section
 * drawing and adds the hour to every WhatsApp message on the page.
 */
export function HourControl({
  legend = 'Around what time should Richard come?',
  ground = 'limewash',
  className,
}: HourControlProps) {
  const { hour, chosen, chooseHour } = useVisit();
  const name = useId();
  const onPoche = ground === 'poche';

  return (
    <fieldset className={className}>
      <legend
        className={cn(
          'text-base font-medium',
          onPoche ? 'text-limewash' : 'text-ink'
        )}
      >
        {legend}
      </legend>

      <div
        className={cn(
          'mt-5 grid grid-cols-4 border-t',
          onPoche ? 'border-on-poche/60' : 'border-poche/50'
        )}
      >
        {HOURS.map((option) => {
          const active = chosen && option.id === hour.id;

          return (
            <label
              key={option.id}
              className={cn(
                'group relative cursor-pointer pt-4 pb-1 pl-3 transition-colors duration-200',
                'has-focus-visible:outline-2 has-focus-visible:outline-offset-2',
                onPoche
                  ? 'has-focus-visible:outline-sun'
                  : 'has-focus-visible:outline-poche',
                active
                  ? onPoche
                    ? 'text-limewash'
                    : 'text-poche'
                  : onPoche
                    ? 'text-on-poche hover:text-limewash'
                    : 'text-ink-soft hover:text-poche'
              )}
            >
              <input
                type='radio'
                name={name}
                value={option.id}
                checked={active}
                onChange={() => chooseHour(option.id)}
                onClick={() => chooseHour(option.id)}
                className='sr-only'
              />
              {/* Tick on the axis; the gold marker rides to the chosen hour. */}
              <span
                className={cn(
                  'absolute top-0 left-0 h-2.5 w-px',
                  onPoche ? 'bg-on-poche/60' : 'bg-poche/50'
                )}
                aria-hidden
              />
              {active && (
                <motion.span
                  layoutId={`${name}-marker`}
                  className='absolute -top-1.5 -left-1.5 size-3 bg-sun'
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  aria-hidden
                />
              )}
              <span className='block text-[0.6875rem] lettering sm:text-xs'>
                {option.label}
              </span>
              <span
                className={cn(
                  'mt-0.5 block text-xl stamp sm:text-2xl',
                  active ? 'font-normal' : 'font-light'
                )}
              >
                {option.time}
              </span>
            </label>
          );
        })}
      </div>

      <p
        className={cn(
          'mt-3 text-sm',
          onPoche ? 'text-on-poche' : 'text-ink-soft'
        )}
      >
        Pick one and it goes into your WhatsApp message. Richard confirms the
        exact time in chat.
      </p>
    </fieldset>
  );
}
