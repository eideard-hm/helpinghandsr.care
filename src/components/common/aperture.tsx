'use client';

import { useRef } from 'react';

import Image from 'next/image';

import { useInView } from 'framer-motion';

import { cn } from '@/lib/cn';

type ApertureProps = {
  src: string;
  alt: string;
  sizes: string;
  /** Sets the opening's proportions, e.g. `aspect-4/5`. */
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

/**
 * A photograph set as an opening in the wall. It rests in shadow and comes
 * into colour when it reaches the middle of the screen, where the light is.
 */
export function Aperture({
  src,
  alt,
  sizes,
  className,
  imageClassName,
  priority,
}: ApertureProps) {
  const ref = useRef<HTMLDivElement>(null);
  const lit = useInView(ref, { margin: '-22% 0px -22% 0px' });

  return (
    <div
      ref={ref}
      className={cn('relative overflow-hidden bg-poche', className)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          'object-cover transition-[filter] duration-1000 ease-settle',
          lit ? 'grayscale-0' : 'grayscale',
          imageClassName
        )}
      />
      <span
        className={cn(
          'absolute inset-0 bg-poche mix-blend-multiply transition-opacity duration-1000 ease-settle',
          lit ? 'opacity-0' : 'opacity-50'
        )}
        aria-hidden
      />
      {/* Sunlight on the sill. */}
      <span
        className={cn(
          'absolute inset-x-0 bottom-0 h-1 origin-left bg-sun transition-transform duration-1000 ease-settle',
          lit ? 'scale-x-100' : 'scale-x-0'
        )}
        aria-hidden
      />
    </div>
  );
}
