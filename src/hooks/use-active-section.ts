'use client';

import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently crossing the middle of the viewport.
 * @param ids Section ids, in document order.
 * @param resetKey Value that re-scans the DOM when it changes (e.g. the pathname).
 */
export function useActiveSection(ids: readonly string[], resetKey?: string) {
  const [active, setActive] = useState<string | null>(null);
  const idsKey = ids.join('|');

  useEffect(() => {
    const sections = idsKey
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    setActive(null);
    if (!sections.length || !('IntersectionObserver' in window)) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setActive(sections.find((el) => visible.has(el.id))?.id ?? null);
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [idsKey, resetKey]);

  return active;
}
