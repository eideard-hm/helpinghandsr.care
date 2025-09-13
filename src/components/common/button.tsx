'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  fullWidth?: boolean;
}

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
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center';

    const variants = {
      primary:
        'bg-[color:var(--brand)] text-white hover:bg-teal-800 focus:ring-[color:var(--brand)]',
      secondary:
        'bg-[color:var(--brand-2)] text-[color:var(--ink)] hover:bg-teal-300 focus:ring-[color:var(--brand-2)]',
      outline:
        'border border-[color:var(--brand)] text-[color:var(--brand)] hover:bg-teal-50 focus:ring-[color:var(--brand)]',
      ghost:
        'text-[color:var(--brand)] hover:bg-teal-50 focus:ring-[color:var(--brand)]',
      accent:
        'bg-[color:var(--accent)] text-white hover:bg-orange-600 focus:ring-[color:var(--accent)]',
    };

    const sizes = {
      small: 'px-3 py-1.5 text-sm',
      medium: 'px-4 py-2 text-base',
      large: 'px-6 py-3 text-lg',
    };

    const disabledClasses =
      disabled || isLoading
        ? 'opacity-50 cursor-not-allowed'
        : 'cursor-pointer';

    const widthClass = fullWidth ? 'w-full' : '';

    const buttonClasses = `
      ${baseClasses}
      ${variants[variant]}
      ${sizes[size]}
      ${disabledClasses}
      ${widthClass}
      ${className}
    `
      .replace(/\s+/g, ' ')
      .trim();

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className='animate-spin -ml-1 mr-2 h-4 w-4'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
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
