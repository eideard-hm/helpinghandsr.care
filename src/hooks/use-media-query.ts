'use client';

import { useSyncExternalStore } from 'react';

/**
 * Whether a media query matches. Returns `null` on the server and during
 * hydration, so callers can render both variants until the browser decides.
 */
export function useMediaQuery(query: string): boolean | null {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => null
  );
}
