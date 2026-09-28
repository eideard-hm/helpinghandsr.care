'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { env } from '@/config/env';
import { NAV_ITEMS, NAV_SECTION_IDS } from '@/data/navigation';
import { useActiveSection } from '@/hooks/use-active-section';
import { useScrolledPast } from '@/hooks/use-scrolled-past';
import { cn } from '@/lib/cn';
import { HeaderResponsive } from './header-responsive';
import { WhatsAppButton } from './whatsapp-btn';

export function Header() {
  const pathname = usePathname();
  const scrolled = useScrolledPast(8);
  const activeId = useActiveSection(NAV_SECTION_IDS, pathname);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b bg-white transition-shadow duration-300',
        scrolled
          ? 'border-gray-200 shadow-[0_8px_24px_-12px_rgba(15,23,42,0.18)]'
          : 'border-gray-100'
      )}
    >
      <div className='mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 lg:h-24'>
        <Link
          href='/'
          className='shrink-0 rounded-lg'
          aria-label={`${env.brandSEO} home`}
        >
          <Image
            className='size-16 object-contain lg:size-20'
            src='/zeinmotiontm.webp'
            alt={`${env.brandSEO} logo - ${env.brandLogotype}`}
            width={120}
            height={120}
            priority
          />
        </Link>

        <nav
          aria-label='Main'
          className='hidden lg:block'
        >
          <ul className='flex items-center gap-1'>
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;

              return (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative inline-flex min-h-11 items-center rounded-lg px-3 text-[15px] font-medium transition-colors duration-200 hover:text-brand',
                      'after:absolute after:inset-x-3 after:bottom-1.5 after:h-0.5 after:origin-left after:rounded-full after:bg-accent after:transition-transform after:duration-300',
                      isActive
                        ? 'text-brand after:scale-x-100'
                        : 'text-ink/80 after:scale-x-0 hover:after:scale-x-100'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <WhatsAppButton
          label='Book on WhatsApp'
          classList='hidden lg:inline-flex'
        />

        <HeaderResponsive />
      </div>
    </header>
  );
}
