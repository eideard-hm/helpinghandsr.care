'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import {
  AnimatePresence,
  motion,
  type PanInfo,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import {
  IconChevronLeft,
  IconChevronRight,
  IconPlayerPause,
  IconPlayerPlay,
  IconQuote,
  IconStarFilled,
} from '@tabler/icons-react';

import type { Review } from '@/generated/prisma';
import { cn } from '@/lib/cn';

// Fixed time zone so the server and the browser render the same date.
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'Asia/Dubai',
});

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

const variants: Variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
    transition: { duration: 0.25, ease: 'easeIn' },
  }),
};

type Props = {
  items: Review[];
  autoPlayMs?: number;
  className?: string;
};

const controlClass =
  'inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-white text-ink shadow-sm ring-1 ring-black/10 transition-colors hover:bg-brand hover:text-white';

export function TestimonialsSlider({
  items,
  autoPlayMs = 6000,
  className = '',
}: Props) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [stopped, setStopped] = useState(false);
  const reduce = useReducedMotion();
  const timer = useRef<number | null>(null);
  const canSlide = items.length > 1;
  const autoplay = canSlide && !reduce && !stopped && !hovered;

  const goTo = useCallback(
    (next: number, direction = 1) => {
      setDir(direction);
      setIndex((next + items.length) % items.length);
    },
    [items.length]
  );

  useEffect(() => {
    if (!autoplay) return;
    timer.current = window.setTimeout(() => goTo(index + 1, 1), autoPlayMs);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [index, autoplay, autoPlayMs, goTo]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -60 || velocity < -300) goTo(index + 1, 1);
    else if (offset > 60 || velocity > 300) goTo(index - 1, -1);
  };

  const r = items[index];

  return (
    <div
      className={cn('relative flex h-full flex-col', className)}
      role='region'
      aria-roledescription='carousel'
      aria-label='Client testimonials'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div className='relative flex-1 overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-10'>
        <IconQuote
          className='absolute top-6 right-6 size-14 text-brand-2/70 md:size-20'
          aria-hidden
        />

        <AnimatePresence
          custom={dir}
          mode='popLayout'
          initial={false}
        >
          <motion.figure
            key={r.id}
            custom={dir}
            variants={variants}
            initial='enter'
            animate='center'
            exit='exit'
            drag={canSlide ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={onDragEnd}
            className={cn(
              'relative',
              canSlide && 'cursor-grab active:cursor-grabbing'
            )}
            role='group'
            aria-roledescription='slide'
            aria-label={`${index + 1} of ${items.length}`}
          >
            <div
              className='flex gap-1'
              role='img'
              aria-label={`Rated ${r.rating} out of 5`}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <IconStarFilled
                  key={i}
                  size={20}
                  className={i < r.rating ? 'text-accent' : 'text-gray-200'}
                  aria-hidden
                />
              ))}
            </div>

            <blockquote className='mt-6 pr-6 text-lg leading-8 text-ink/85 md:text-xl md:leading-9'>
              <p>&ldquo;{r.content}&rdquo;</p>
            </blockquote>

            <figcaption className='mt-8 flex items-center gap-4'>
              <span
                className='inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-brand font-semibold text-white'
                aria-hidden
              >
                {getInitials(r.name)}
              </span>
              <span>
                <span className='block font-display text-lg font-semibold text-title-indigo'>
                  {r.name}
                </span>
                <time
                  dateTime={new Date(r.createdAt).toISOString()}
                  className='block text-sm text-gray-500'
                >
                  {dateFormatter.format(new Date(r.createdAt))}
                </time>
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {canSlide && (
        <div className='mt-5 flex items-center justify-between gap-4'>
          <div className='flex items-center gap-2'>
            {items.map((item, i) => (
              <button
                key={item.id}
                type='button'
                aria-label={`Show testimonial ${i + 1} of ${items.length}`}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => goTo(i, i > index ? 1 : -1)}
                className='group inline-flex size-6 cursor-pointer items-center justify-center'
              >
                <span
                  className={cn(
                    'h-2.5 rounded-full transition-all duration-300',
                    i === index
                      ? 'w-6 bg-brand'
                      : 'w-2.5 bg-gray-300 group-hover:bg-gray-400'
                  )}
                />
              </button>
            ))}
          </div>

          <div className='flex items-center gap-2'>
            {!reduce && (
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
                    aria-hidden
                  />
                ) : (
                  <IconPlayerPause
                    size={18}
                    aria-hidden
                  />
                )}
              </button>
            )}
            <button
              type='button'
              aria-label='Previous testimonial'
              onClick={() => goTo(index - 1, -1)}
              className={controlClass}
            >
              <IconChevronLeft
                size={20}
                aria-hidden
              />
            </button>
            <button
              type='button'
              aria-label='Next testimonial'
              onClick={() => goTo(index + 1, 1)}
              className={controlClass}
            >
              <IconChevronRight
                size={20}
                aria-hidden
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
