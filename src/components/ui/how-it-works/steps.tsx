'use client';

import { useVisit } from '@/components/common/visit-provider';
import { VISIT_STEPS } from '@/data/steps';
import { cn } from '@/lib/cn';

/** The visit read down a time axis; the arrival carries the hour chosen above. */
export function Steps() {
  const { hour, chosen } = useVisit();

  return (
    <ol className='border-l border-poche/60 lg:col-span-7'>
      {VISIT_STEPS.map((step) => {
        const arrival = step.when === 'arrival';

        return (
          <li
            key={step.title}
            className='relative grid gap-x-8 gap-y-1 py-7 pl-8 sm:grid-cols-[7.5rem_1fr] sm:pl-10'
          >
            {/* Tick on the axis; the arrival is the moment in the light. */}
            <span
              className={cn(
                'absolute left-0',
                arrival
                  ? 'top-9 -ml-1.75 size-3.5 bg-sun'
                  : 'top-10.5 h-px w-5 bg-poche/60'
              )}
              aria-hidden
            />

            <p
              className={cn(
                'pt-1 text-poche',
                arrival
                  ? 'text-2xl font-normal stamp'
                  : 'text-xs font-medium lettering'
              )}
            >
              {arrival ? (
                <>
                  {chosen ? (
                    <>
                      <span className='sr-only'>At </span>
                      {hour.time}
                    </>
                  ) : (
                    'Your hour'
                  )}
                </>
              ) : (
                step.when
              )}
            </p>

            <div>
              <h3 className='text-2xl text-poche lettering-display'>
                {step.title}
              </h3>
              <p className='mt-2 max-w-[52ch] text-[1.0625rem] leading-7 text-ink-soft'>
                {step.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
