import Image from 'next/image';
import Link from 'next/link';

import { env } from '@/config/env';
import { waLink } from '@/lib/whatsapp';
import { NavLinks } from '../ui/nav-links';
import { HeaderResponsive } from './header-responsive';
import { WhatsAppButton } from './whatsapp-btn';

export function Header() {
  const waHref = waLink(env.whatsAppNumber, env.waMessage);

  return (
    <>
      <div className='mx-auto max-w-7xl px-4 h-28 flex items-center justify-between'>
        <Link href='/'>
          <Image
            className='aspect-square object-contain'
            src='/zeinmotiontm.webp'
            alt={`Logo from ${env.brand} | ${env.brandLogotype}`}
            width={100}
            height={100}
            priority
          />
        </Link>

        <NavLinks classList='hidden md:flex md:gap-6' />

        <WhatsAppButton
          waLink={waHref}
          classList='hidden! md:inline-flex!'
        />

        {/* Responsive */}
        <HeaderResponsive waLink={waHref} />
      </div>
    </>
  );
}
