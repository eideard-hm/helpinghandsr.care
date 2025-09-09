'use client';

import { useEffect, useId, useState } from 'react';

import { WhatsAppButton } from './whatsapp-btn';

type HeaderResponsiveProps = {
  waLink: string;
};

export function HeaderResponsive({ waLink }: HeaderResponsiveProps) {
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
        className='md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border text-[color:var(--ink)]/80'
        aria-controls={panelId}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
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
        className='md:hidden border-t bg-white/95 backdrop-blur absolute top-28 left-0 right-0 shadow-md'
      >
        <nav className='mx-auto max-w-7xl px-4 py-3 flex flex-col gap-3 text-[color:var(--ink)]'>
          <a
            href='#services'
            onClick={() => setOpen(false)}
            className='py-2'
          >
            Services
          </a>
          <a
            href='#how-it-works'
            onClick={() => setOpen(false)}
            className='py-2'
          >
            How it works
          </a>
          <a
            href='#benefits'
            onClick={() => setOpen(false)}
            className='py-2'
          >
            Benefits
          </a>
          <a
            href='#testimonials'
            onClick={() => setOpen(false)}
            className='py-2'
          >
            Testimonials
          </a>

          <WhatsAppButton
            waLink={waLink}
            classList='mt-2'
          />
        </nav>
      </div>
    </>
  );
}
