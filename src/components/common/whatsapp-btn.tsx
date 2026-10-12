'use client';

import { forwardRef } from 'react';

import { IconBrandWhatsapp } from '@tabler/icons-react';

import { cn } from '@/lib/cn';
import { waLinkWithEnv } from '@/lib/whatsapp';

interface WhatsAppButtonProps {
  waLink?: string;
  classList?: string;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'outline' | 'light';
}

const SIZE_CLASSES = {
  small: 'min-h-10 px-3.5 py-1.5 text-sm',
  medium: 'min-h-11 px-4 py-2 text-base',
  large: 'min-h-12 px-6 py-3 text-lg',
} as const;

const VARIANT_CLASSES = {
  primary:
    'bg-brand text-white shadow-md shadow-brand/20 hover:bg-brand-700 hover:shadow-lg focus-visible:ring-brand',
  secondary:
    'bg-brand-2 text-ink hover:bg-teal-300 focus-visible:ring-brand-2',
  outline:
    'border border-brand text-brand hover:bg-brand hover:text-white focus-visible:ring-brand',
  light:
    'bg-white text-ink shadow-md hover:bg-brand-2 focus-visible:ring-white focus-visible:ring-offset-ink',
} as const;

const ICON_SIZE = {
  small: 18,
  medium: 20,
  large: 22,
} as const;

export const WhatsAppButton = forwardRef<
  HTMLAnchorElement,
  WhatsAppButtonProps
>(
  (
    {
      waLink = waLinkWithEnv(),
      classList,
      label = 'WhatsApp',
      size = 'medium',
      variant = 'primary',
    }: WhatsAppButtonProps,
    ref
  ) => {
    return (
      <a
        ref={ref}
        href={waLink}
        target='_blank'
        rel='noopener noreferrer'
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          SIZE_CLASSES[size],
          VARIANT_CLASSES[variant],
          classList
        )}
      >
        <IconBrandWhatsapp
          size={ICON_SIZE[size]}
          className='shrink-0'
          aria-hidden
        />
        <span className='whitespace-nowrap'>{label}</span>
        <span className='sr-only'> (opens WhatsApp)</span>
      </a>
    );
  }
);

WhatsAppButton.displayName = 'WhatsAppButton';
