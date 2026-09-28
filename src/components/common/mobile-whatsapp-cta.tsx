'use client';

import { usePathname } from 'next/navigation';

import { useScrolledPast } from '@/hooks/use-scrolled-past';
import { cn } from '@/lib/cn';
import { WhatsAppButton } from './whatsapp-btn';

// Appears once the hero call to action has scrolled out of view.
const revealOffset = () => window.innerHeight * 0.7;

export function MobileWhatsAppCta() {
  const pathname = usePathname();
  const visible = useScrolledPast(revealOffset);

  if (pathname === '/testimonials') return null;

  return (
    <div
      className={cn(
        'fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 transition-all duration-300 lg:hidden',
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-6 opacity-0'
      )}
      inert={!visible}
    >
      <WhatsAppButton
        label='Book via WhatsApp'
        classList='w-full shadow-xl shadow-ink/20'
        size='large'
      />
    </div>
  );
}
