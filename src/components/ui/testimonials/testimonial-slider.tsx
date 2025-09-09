'use client';

import { useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion, PanInfo, type Variants } from 'framer-motion';

import type { Review } from '@/generated/prisma';

const STAR = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 ${filled ? 'fill-yellow-400' : 'fill-gray-300'}`}>
    <path d="M12 2l3.09 6.26 6.91.6-5 4.52 1.54 6.62L12 17.77 5.46 20l1.54-6.62-5-4.52 6.91-.6L12 2z"/>
  </svg>
);

const variants: Variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } }),
};

type Props = {
  items: Review[];
  autoPlayMs?: number;  // default 4500
  className?: string;
};

export function TestimonialsSlider({ items, autoPlayMs = 4500, className = '' }: Props) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);

  const goTo = (next: number, direction = 1) => {
    setDir(direction);
    setIndex((next + items.length) % items.length);
  };

  // autoplay con pausa al hover
  useEffect(() => {
    if (paused || items.length <= 1) return;
    timer.current = window.setTimeout(() => goTo(index + 1, 1), autoPlayMs);
    return () => { if (timer.current) window.clearTimeout(timer.current); };
  }, [index, paused, autoPlayMs, items.length]);

  const onDragEnd = (_: any, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -60 || velocity < -300) goTo(index + 1, 1);
    else if (offset > 60 || velocity > 300) goTo(index - 1, -1);
  };

  const r = items[index];

  return (
    <section
      className={`relative isolate ${className}`}
      aria-roledescription='carousel'
      aria-label='Testimonials'
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      {/* Card */}
      <div className='mx-auto max-w-3xl'>
        <div className='relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5'>
          <AnimatePresence
            custom={dir}
            mode='popLayout'
          >
            <motion.div
              key={r.id}
              custom={dir}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={onDragEnd}
              className='cursor-grab active:cursor-grabbing'
            >
              {/* Header: avatar + name + rating */}
              <div className='flex items-center gap-4'>
                <div className='size-12 rounded-full bg-[color:var(--brand)]/10' />
                <div className='flex-1'>
                  <div className='flex items-center gap-2'>
                    <h4 className='font-semibold text-[color:var(--ink)]'>
                      {r.name}
                    </h4>
                  </div>
                  <div className='mt-1 flex items-center gap-1'>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <STAR
                        key={i}
                        filled={i < r.rating}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <p className='mt-4 text-[15px] leading-relaxed text-gray-700'>
                “{r.content}”
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Arrows */}
      {items.length > 1 && (
        <>
          <button
            aria-label='Anterior'
            onClick={() => goTo(index - 1, -1)}
            className='absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow ring-1 ring-black/5 hover:bg-white'
          >
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
            >
              <path
                d='M15 18l-6-6 6-6'
                stroke='currentColor'
                strokeWidth='2'
                fill='none'
                strokeLinecap='round'
              />
            </svg>
          </button>
          <button
            aria-label='Siguiente'
            onClick={() => goTo(index + 1, 1)}
            className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow ring-1 ring-black/5 hover:bg-white'
          >
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
            >
              <path
                d='M9 6l6 6-6 6'
                stroke='currentColor'
                strokeWidth='2'
                fill='none'
                strokeLinecap='round'
              />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {items.length > 1 && (
        <div className='mt-4 flex justify-center gap-2'>
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir al slide ${i + 1}`}
              onClick={() => goTo(i, i > index ? 1 : -1)}
              className={`h-2.5 w-2.5 rounded-full transition
                ${
                  i === index
                    ? 'bg-[color:var(--brand)]'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
