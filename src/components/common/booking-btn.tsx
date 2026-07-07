'use client';

import { forwardRef } from 'react';

import Link from 'next/link';

import { IconCalendar } from '@tabler/icons-react';

interface BookingButtonProps {
  bookingUrl?: string;
  classList?: string;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'outline' | 'info';
  useNextLink?: boolean;
  external?: boolean;
  onClick?: () => void;
}

export const BookingButton = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  BookingButtonProps
>(
  (
    {
      bookingUrl = '/zz',
      classList,
      label = 'Book Now',
      size = 'medium',
      variant = 'primary',
      useNextLink = true,
      external = false,
      onClick,
    }: BookingButtonProps,
    ref,
  ) => {
    const sizeClasses = {
      small: 'px-4 py-2 text-sm',
      medium: 'px-6 py-3 text-base',
      large: 'px-8 py-4 text-lg',
    };

    const variantClasses = {
      primary:
        'bg-accent text-ink hover:bg-accent-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus:ring-2 focus:ring-accent focus:ring-offset-2',
      secondary:
        'bg-brand-2 text-ink hover:bg-teal-200 hover:shadow-md focus:ring-2 focus:ring-brand-2 focus:ring-offset-2',
      outline:
        'border-2 border-accent text-accent hover:bg-accent hover:text-ink hover:shadow-md focus:ring-2 focus:ring-accent focus:ring-offset-2',
      info: 'bg-info text-white hover:bg-blue-600 hover:shadow-md focus:ring-2 focus:ring-info focus:ring-offset-2',
    };

    const iconSize = {
      small: 18,
      medium: 22,
      large: 26,
    };

    const baseClasses = `
      inline-flex items-center justify-center rounded-xl font-bold 
      shadow-md transition-all duration-200 
      disabled:opacity-50 disabled:cursor-not-allowed
      ${sizeClasses[size]}
      ${variantClasses[variant]}
      ${classList}
    `;

    const commonProps = {
      ref: ref as any,
      className: baseClasses,
      'aria-label': `Go to booking page: ${label}`,
      onClick,
    };

    if (external) {
      return (
        <a
          href={bookingUrl}
          target='_blank'
          rel='noopener noreferrer'
          {...commonProps}
        >
          <IconCalendar
            size={iconSize[size]}
            className='mr-3 shrink-0'
            stroke={1.5}
          />
          <span className='whitespace-nowrap tracking-wide'>{label}</span>
        </a>
      );
    }

    if (useNextLink) {
      return (
        <Link
          href={bookingUrl}
          {...commonProps}
        >
          <IconCalendar
            size={iconSize[size]}
            className='mr-3 shrink-0'
            stroke={1.5}
          />
          <span className='whitespace-nowrap tracking-wide'>{label}</span>
        </Link>
      );
    }

    return (
      <a
        href={bookingUrl}
        {...commonProps}
      >
        <IconCalendar
          size={iconSize[size]}
          className='mr-3 shrink-0'
          stroke={1.5}
        />
        <span className='whitespace-nowrap tracking-wide'>{label}</span>
      </a>
    );
  },
);

BookingButton.displayName = 'BookingButton';
