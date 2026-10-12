'use client';

import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';

import { IconX } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/lib/cn';

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  footer?: React.ReactNode;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  className?: string;
};

const SIZES = {
  sm: 'sm:max-w-md',
  md: 'sm:max-w-lg',
  lg: 'sm:max-w-2xl',
  xl: 'sm:max-w-4xl',
};

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function Dialog({
  open,
  onClose,
  title,
  size = 'md',
  children,
  footer,
  initialFocusRef,
  className = '',
}: DialogProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const lastActive = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    lastActive.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      const target = initialFocusRef?.current ?? panelRef.current;
      target?.focus({ preventScroll: true });
    }, 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      // Keep keyboard focus inside the dialog.
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.offsetParent !== null);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement;

      if (e.shiftKey && (current === first || current === panelRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && current === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      lastActive.current?.focus?.({ preventScroll: true });
    };
  }, [open, initialFocusRef]);

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key='dialog'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-100 flex items-end justify-center bg-ink/60 backdrop-blur-[2px] sm:items-center sm:p-4'
          onClick={onClose}
        >
          <motion.div
            ref={panelRef}
            role='dialog'
            aria-modal='true'
            aria-labelledby={title ? titleId : undefined}
            tabIndex={-1}
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{
              y: 0,
              opacity: 1,
              scale: 1,
              transition: { duration: 0.25, ease: 'easeOut' },
            }}
            exit={{
              y: 40,
              opacity: 0,
              transition: { duration: 0.2, ease: 'easeIn' },
            }}
            className={cn(
              'flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl ring-1 ring-black/5 outline-none sm:max-h-[90dvh] sm:rounded-2xl',
              SIZES[size],
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <div className='flex shrink-0 items-center justify-between gap-4 border-b border-gray-100 px-5 py-4'>
                <h2
                  id={titleId}
                  className='text-xl font-bold text-title-indigo'
                >
                  {title}
                </h2>
                <button
                  type='button'
                  onClick={onClose}
                  aria-label='Close dialog'
                  className='inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-ink'
                >
                  <IconX
                    className='size-5'
                    aria-hidden
                  />
                </button>
              </div>
            )}

            <div className='min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5'>
              {children}
            </div>

            {footer && (
              <div className='shrink-0 border-t border-gray-100 bg-gray-50 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]'>
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
