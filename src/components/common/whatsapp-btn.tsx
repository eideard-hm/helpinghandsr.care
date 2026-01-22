'use client';

import { forwardRef } from 'react';

import { IconBrandWhatsapp } from '@tabler/icons-react';

import { waLinkWithEnv } from '@/lib/whatsapp';

interface WhatsAppButtonProps {
  waLink?: string;
  classList?: string;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'outline';
}

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
    const sizeClasses = {
      small: 'px-3 py-1.5 text-sm',
      medium: 'px-4 py-2 text-base',
      large: 'px-6 py-3 text-lg',
    };

    const variantClasses = {
      primary: 'bg-brand text-white hover:bg-teal-800 focus:ring-brand',
      secondary: 'bg-brand-2 text-ink hover:bg-teal-300 focus:ring-brand-2',
      outline:
        'border border-brand text-brand hover:bg-brand hover:text-white focus:ring-brand',
      accent: 'bg-accent text-white hover:bg-orange-600 focus:ring-accent',
    };

    const iconSize = {
      small: 18,
      medium: 20,
      large: 24,
    };

    return (
      <a
        ref={ref}
        href={waLink}
        target='_blank'
        rel='noopener noreferrer'
        className={`
          inline-flex items-center justify-center rounded-xl font-semibold 
          shadow-md transition-all duration-200 
          hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${classList}
        `}
        aria-label={`Open WhatsApp to ${label.toLowerCase()}`}
      >
        <IconBrandWhatsapp
          size={iconSize[size]}
          className='mr-2 flex-shrink-0'
        />
        <span className='whitespace-nowrap'>{label}</span>
      </a>
    );
  }
);

WhatsAppButton.displayName = 'WhatsAppButton';
