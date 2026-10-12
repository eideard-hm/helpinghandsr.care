'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/** False during server rendering and hydration, true afterwards. */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
