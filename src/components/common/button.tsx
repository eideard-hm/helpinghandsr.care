'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

import { cn } from '@/lib/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const VARIANTS = {
  primary: 'bg-poche text-limewash hover:bg-poche-deep',
  secondary: 'bg-life-tint text-poche-deep hover:bg-white',
  outline: 'border border-poche text-poche hover:bg-poche hover:text-limewash',
  ghost: 'text-poche hover:bg-shadow',
  accent: 'bg-life text-white hover:bg-life-deep',
} as const;

const SIZES = {
  small: 'min-h-11 px-4 text-xs',
  medium: 'min-h-12 px-5 text-[0.8125rem]',
  large: 'min-h-14 px-6 text-sm',
} as const;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'medium',
      isLoading = false,
      fullWidth = false,
      className = '',
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'inline-flex items-center justify-center gap-3 font-medium lettering transition-colors duration-200',
          VARIANTS[variant],
          SIZES[size],
          disabled || isLoading
            ? 'cursor-not-allowed opacity-50'
            : 'cursor-pointer',
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className='h-4 w-4 animate-spin'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            aria-hidden
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
