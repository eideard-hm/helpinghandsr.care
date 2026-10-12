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
import { SocialMediaItems } from './social-media-items';
import { WhatsAppButton } from './whatsapp-btn';

export function Header() {
  const pathname = usePathname();
  const scrolled = useScrolledPast(8);
  const activeId = useActiveSection(NAV_SECTION_IDS, pathname);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b bg-limewash transition-colors duration-300',
        scrolled ? 'border-poche' : 'border-mortar'
      )}
    >
      <div className='mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 lg:h-22'>
        <Link
          href='/'
          className='shrink-0'
        >
          <Image
            className='size-14 object-contain lg:size-18'
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
          <ul className='flex items-center gap-8'>
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;

              return (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative inline-flex min-h-11 items-center text-xs font-medium transition-colors duration-200 lettering hover:text-poche',
                      // A gold mark under the room the visitor is in.
                      'after:absolute after:bottom-1.5 after:left-0 after:h-0.75 after:w-full after:origin-left after:bg-sun after:transition-transform after:duration-500 after:ease-settle',
                      isActive
                        ? 'text-poche after:scale-x-100'
                        : 'text-ink-soft after:scale-x-0'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className='hidden items-center gap-2 lg:flex'>
          <SocialMediaItems />
          <WhatsAppButton
            label='Book on WhatsApp'
            classList='ml-3'
          />
        </div>

        <HeaderResponsive />
      </div>
    </header>
  );
}
