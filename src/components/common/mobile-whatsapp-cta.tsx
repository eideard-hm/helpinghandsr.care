'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import { useScrolledPast } from '@/hooks/use-scrolled-past';
import { cn } from '@/lib/cn';
import { WhatsAppButton } from './whatsapp-btn';

// Appears once the first booking action has scrolled out of view.
const revealOffset = () => window.innerHeight * 0.9;

/** True while the closing section, which has its own booking action, is on screen. */
function useClosingInView(pathname: string) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const closing = document.getElementById('closing');
    if (!closing) {
      setInView(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '0px 0px -25% 0px' }
    );
    observer.observe(closing);
    return () => observer.disconnect();
  }, [pathname]);

  return inView;
}

export function MobileWhatsAppCta() {
  const pathname = usePathname();
  const scrolled = useScrolledPast(revealOffset);
  const closingInView = useClosingInView(pathname);
  const visible = scrolled && !closingInView;

  if (pathname === '/testimonials') return null;

  return (
    <div
      id='mobile-cta'
      className={cn(
        'fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 transition-all duration-500 ease-settle lg:hidden',
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-6 opacity-0'
      )}
      inert={!visible}
    >
      <WhatsAppButton
        label='Book on WhatsApp'
        classList='w-full shadow-[0_14px_30px_-12px_rgba(23,24,63,0.6)]'
        size='large'
      />
    </div>
  );
}
