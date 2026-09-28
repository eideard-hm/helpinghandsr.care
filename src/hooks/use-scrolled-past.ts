'use client';

import { useEffect, useState } from 'react';

/**
 * True once the page has scrolled further than `offset` pixels.
 * Pass a function to derive the offset from the viewport (e.g. a share of its height).
 */
export function useScrolledPast(offset: number | (() => number)) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const threshold = () => (typeof offset === 'function' ? offset() : offset);
    const onScroll = () => setPast(window.scrollY > threshold());

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [offset]);

  return past;
}
