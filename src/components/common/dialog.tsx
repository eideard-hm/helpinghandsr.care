'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { IconX } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';

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
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

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
  const panelRef = useRef<HTMLDivElement>(null);
  const lastActive = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    lastActive.current = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const target = initialFocusRef?.current ?? panelRef.current;
      target?.focus();
    }, 0);
    return () => {
      document.body.style.overflow = prev;
      lastActive.current?.focus?.();
    };
  }, [open, initialFocusRef]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const onBackdropClick = () => onClose();

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key='dialog'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-[2px] p-4'
          aria-modal='true'
          role='dialog'
          aria-labelledby={title ? 'dialog-title' : undefined}
          onClick={onBackdropClick}
        >
          <motion.div
            ref={panelRef}
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
            className={`w-full ${SIZES[size]} outline-none`}
            onClick={stop}
          >
            <div
              className={`relative w-full rounded-2xl bg-white shadow-xl ring-1 ring-black/5 max-h-[90dvh] grid grid-rows-[auto,1fr,auto] ${className}`}
            >
              {title && (
                <div className='flex items-center justify-between px-5 py-4 border-b'>
                  {title ? (
                    <h2
                      id='dialog-title'
                      className='text-lg font-semibold text-[color:var(--ink)]'
                    >
                      {title}
                    </h2>
                  ) : (
                    <span />
                  )}
                  <button
                    onClick={onClose}
                    aria-label='Close dialog'
                    className='rounded-full p-2 hover:bg-black/5 cursor-pointer'
                  >
                    <IconX className='size-5' />
                  </button>
                </div>
              )}

              <div className='px-5 py-5 overflow-y-auto'>{children}</div>

              {footer && (
                <div className='px-5 py-4 border-t bg-gray-50'>{footer}</div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
