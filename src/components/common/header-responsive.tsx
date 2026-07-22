'use client';

import { useEffect, useId, useRef, useState } from 'react';

import Link from 'next/link';

import { IconMenu2, IconX } from '@tabler/icons-react';

import { WhatsAppButton } from './whatsapp-btn';

type HeaderResponsiveProps = {
  waLink: string;
};

export function HeaderResponsive({ waLink }: HeaderResponsiveProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = buttonRef.current;
    document.body.style.overflow = 'hidden';
    firstLinkRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        className='inline-flex h-10 w-10 items-center justify-center rounded-lg border text-[color:var(--ink)]/80 md:hidden'
        aria-controls={panelId}
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
        type='button'
      >
        {open ? (
          <IconX
            size={22}
            aria-hidden
          />
        ) : (
          <IconMenu2
            size={22}
            aria-hidden
          />
        )}
      </button>

      {open && (
        <button
          type='button'
          className='fixed inset-0 z-40 cursor-default bg-black/20 md:hidden'
          aria-label='Close mobile menu'
          onClick={() => setOpen(false)}
        />
      )}

      <div
        id={panelId}
        hidden={!open}
        className='absolute left-0 right-0 top-20 z-50 border-t bg-white/95 shadow-md backdrop-blur md:hidden'
        aria-modal='true'
        role='dialog'
        aria-label='Mobile menu'
      >
        <nav className='mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 text-[color:var(--ink)]'>
          <Link
            ref={firstLinkRef}
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

          <WhatsAppButton
            waLink={waLink}
            classList='mt-2'
          />
        </nav>
      </div>
    </>
  );
}
