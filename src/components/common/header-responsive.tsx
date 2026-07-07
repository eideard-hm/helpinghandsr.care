'use client';

import { useEffect, useId, useState } from 'react';

import Link from 'next/link';

import { BookingButton } from './booking-btn';

type HeaderResponsiveProps = {
  bookingUrl: string;
};

export function HeaderResponsive({ bookingUrl }: HeaderResponsiveProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <button
        className='inline-flex h-10 w-10 items-center justify-center rounded-lg border text-[color:var(--ink)]/80 md:hidden'
        aria-controls={panelId}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        type='button'
      >
        <svg
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          aria-hidden
        >
          <path
            d='M4 6h16M4 12h16M4 18h16'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
          />
        </svg>
        <span className='sr-only'>Open Menu</span>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className='absolute left-0 right-0 top-24 border-t bg-white/95 shadow-md backdrop-blur md:hidden'
        aria-modal='true'
        role='dialog'
        aria-label='Mobile menu'
      >
        <nav className='mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 text-[color:var(--ink)]'>
          <Link
            href='/#services'
            onClick={() => setOpen(false)}
            className='py-2'
          >
            Services
          </Link>

          <Link
            href='/#how-it-works'
            onClick={() => setOpen(false)}
            className='py-2'
          >
            How it works
          </Link>

          <Link
            href='/#benefits'
            onClick={() => setOpen(false)}
            className='py-2'
          >
            Benefits
          </Link>

          <Link
            href='/#testimonials'
            onClick={() => setOpen(false)}
            className='py-2'
          >
            Testimonials
          </Link>

          <Link
            href='/#about'
            onClick={() => setOpen(false)}
            className='py-2'
          >
            About
          </Link>

          <BookingButton
            bookingUrl={bookingUrl}
            classList='mt-2'
          />
        </nav>
      </div>
    </>
  );
}
