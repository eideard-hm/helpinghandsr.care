'use client';

import { useRef } from 'react';

import { useInView } from 'framer-motion';

import { useVisit } from '@/components/common/visit-provider';
import { cn } from '@/lib/cn';
import { SectionDrawing } from './section-drawing';

type VisitDrawingProps = {
  view: 'room' | 'door';
  className?: string;
};

// Proportions of each crop, so the space is reserved before the drawing mounts.
const ASPECT = { room: 'aspect-[892/509]', door: 'aspect-[560/509]' } as const;

/** The section drawing at the hour chosen anywhere on the page, mounted once it is near the screen. */
export function VisitDrawing({ view, className }: VisitDrawingProps) {
  const { hour, chosen } = useVisit();
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { once: true, margin: '600px 0px' });

  return (
    <div
      ref={ref}
      className={cn(ASPECT[view], className)}
    >
      {near && (
        <SectionDrawing
          hour={hour}
          view={view}
          chosen={chosen}
        />
      )}
    </div>
  );
}
