'use client';

import { forwardRef } from 'react';

import { IconArrowRight, IconBrandWhatsapp } from '@tabler/icons-react';

import { cn } from '@/lib/cn';
import { waLinkAtHour, waLinkWithEnv } from '@/lib/whatsapp';
import { useOptionalVisit } from './visit-provider';

interface WhatsAppButtonProps {
  waLink?: string;
  classList?: string;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  /** `primary` sits on the limewash ground; `light` is the same green action keylined for the indigo ground. */
  variant?: 'primary' | 'secondary' | 'outline' | 'light';
}

const SIZE_CLASSES = {
  small: 'min-h-11 gap-2.5 px-4 text-xs',
  medium: 'min-h-12 gap-3 px-5 text-[0.8125rem]',
  large: 'min-h-14 gap-3.5 px-6 text-sm',
} as const;

const VARIANT_CLASSES = {
  primary: 'bg-life text-white hover:bg-life-deep',
  secondary:
    'border border-limewash/80 bg-life text-white hover:bg-life-deep',
  outline:
    'border border-poche text-poche hover:bg-poche hover:text-limewash',
  light: 'border border-limewash/80 bg-life text-white hover:bg-life-deep',
} as const;

const ICON_SIZE = { small: 17, medium: 19, large: 21 } as const;

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
    const visit = useOptionalVisit();
    // The hour joins the message only once the visitor has chosen one.
    const href = waLinkAtHour(waLink, visit?.chosen ? visit.hour : undefined);

    return (
      <a
        ref={ref}
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className={cn(
          'group/wa inline-flex items-center justify-center font-medium lettering transition-colors duration-200',
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
        <IconArrowRight
          size={ICON_SIZE[size] - 2}
          className='shrink-0 transition-transform duration-300 ease-settle group-hover/wa:translate-x-1'
          aria-hidden
        />
      </a>
    );
  }
);

WhatsAppButton.displayName = 'WhatsAppButton';
