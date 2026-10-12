'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useMounted } from '@/hooks/use-mounted';

import {
  AnimatePresence,
  motion,
  type PanInfo,
  useReducedMotion,
} from 'framer-motion';
import {
  IconArrowLeft,
  IconArrowRight,
  IconPlayerPause,
  IconPlayerPlay,
} from '@tabler/icons-react';

import type { Review } from '@/generated/prisma';
import { cn } from '@/lib/cn';

// Fixed time zone so the server and the browser render the same date.
const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'Asia/Dubai',
});

type Props = {
  items: Review[];
  autoPlayMs?: number;
  className?: string;
};

const controlClass =
  'inline-flex size-11 cursor-pointer items-center justify-center border border-poche text-poche transition-colors hover:bg-poche hover:text-limewash';

export function TestimonialsSlider({
  items,
  autoPlayMs = 7000,
  className = '',
}: Props) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [stopped, setStopped] = useState(false);
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const timer = useRef<number | null>(null);
  const canSlide = items.length > 1;
  const autoplay = canSlide && !reduce && !stopped && !hovered;

  const goTo = useCallback(
    (next: number) => setIndex((next + items.length) % items.length),
    [items.length]
  );

  useEffect(() => {
    if (!autoplay) return;
    timer.current = window.setTimeout(() => goTo(index + 1), autoPlayMs);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [index, autoplay, autoPlayMs, goTo]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -300) goTo(index + 1);
    else if (info.offset.x > 60 || info.velocity.x > 300) goTo(index - 1);
  };

  const r = items[index];

  return (
    <div
      className={cn('relative', className)}
      role='region'
      aria-roledescription='carousel'
      aria-label='Client testimonials'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <AnimatePresence
        mode='wait'
        initial={false}
      >
        <motion.figure
          key={r.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          drag={canSlide ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={onDragEnd}
          className={cn(canSlide && 'cursor-grab active:cursor-grabbing')}
          aria-roledescription='slide'
          aria-label={`${index + 1} of ${items.length}`}
        >
          {/* No star rating is shown: ratings stay off the page until they can be verified. */}
          <blockquote className='max-w-[62ch] text-xl leading-9 text-ink lg:text-[1.375rem] lg:leading-10'>
            <p>&ldquo;{r.content}&rdquo;</p>
          </blockquote>

          <figcaption className='mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-1 border-t border-poche pt-4'>
            <span className='text-sm font-medium text-poche lettering'>
              {r.name}
            </span>
            <time
              dateTime={new Date(r.createdAt).toISOString()}
              className='text-sm text-ink-soft stamp'
            >
              {dateFormatter.format(new Date(r.createdAt))}
            </time>
          </figcaption>
        </motion.figure>
      </AnimatePresence>

      {canSlide && (
        <div className='mt-8 flex items-center justify-between gap-4'>
          <p
            className='text-sm text-ink-soft stamp'
            aria-hidden
          >
            {String(index + 1).padStart(2, '0')} /{' '}
            {String(items.length).padStart(2, '0')}
          </p>

          <div className='flex items-center gap-2'>
            {mounted && !reduce && (
              <button
                type='button'
                onClick={() => setStopped((v) => !v)}
                aria-label={
                  stopped ? 'Play testimonials' : 'Pause testimonials'
                }
                className={controlClass}
              >
                {stopped ? (
                  <IconPlayerPlay
                    size={18}
                    stroke={1.5}
                    aria-hidden
                  />
                ) : (
                  <IconPlayerPause
                    size={18}
                    stroke={1.5}
                    aria-hidden
                  />
                )}
              </button>
            )}
            <button
              type='button'
              aria-label='Previous testimonial'
              onClick={() => goTo(index - 1)}
              className={controlClass}
            >
              <IconArrowLeft
                size={20}
                stroke={1.5}
                aria-hidden
              />
            </button>
            <button
              type='button'
              aria-label='Next testimonial'
              onClick={() => goTo(index + 1)}
              className={controlClass}
            >
              <IconArrowRight
                size={20}
                stroke={1.5}
                aria-hidden
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
