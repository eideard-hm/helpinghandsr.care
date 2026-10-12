'use client';

import { useEffect, useId, useRef, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { IconArrowRight, IconMenu2, IconX } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';

import { NAV_ITEMS } from '@/data/navigation';
import { SocialMediaItems } from './social-media-items';
import { WhatsAppButton } from './whatsapp-btn';

export function HeaderResponsive() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstLinkRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const onResize = () => {
      if (window.matchMedia('(min-width: 64rem)').matches) setOpen(false);
    };

    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        className='inline-flex size-11 items-center justify-center border border-poche text-poche transition-colors hover:bg-poche hover:text-limewash lg:hidden'
        aria-controls={panelId}
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
        type='button'
      >
        {open ? (
          <IconX
            size={22}
            stroke={1.5}
            aria-hidden
          />
        ) : (
          <IconMenu2
            size={22}
            stroke={1.5}
            aria-hidden
          />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key='backdrop'
              className='fixed inset-x-0 top-18 bottom-0 z-30 bg-ink/50 lg:hidden'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden
            />

            <motion.nav
              key='panel'
              id={panelId}
              aria-label='Mobile'
              className='absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-poche bg-limewash lg:hidden'
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <ul className='mx-auto max-w-7xl px-4'>
                {NAV_ITEMS.map((item, index) => (
                  <li
                    key={item.id}
                    className='border-b border-mortar'
                  >
                    <Link
                      ref={index === 0 ? firstLinkRef : undefined}
                      href={`/#${item.id}`}
                      onClick={() => setOpen(false)}
                      className='flex min-h-14 items-center justify-between text-sm font-medium text-poche lettering'
                    >
                      {item.label}
                      <IconArrowRight
                        size={18}
                        stroke={1.5}
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className='mx-auto max-w-7xl space-y-4 px-4 py-5'>
                <WhatsAppButton
                  label='Book on WhatsApp'
                  size='large'
                  classList='w-full'
                />
                <div className='flex items-center justify-between gap-3'>
                  <p className='text-sm text-ink-soft'>Follow ZeinMotion</p>
                  <SocialMediaItems />
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
