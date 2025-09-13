import Image from 'next/image';

import { env } from '@/config/env';
import { waLink } from '@/lib/whatsapp';
import { NavLinks } from '../ui/nav-links';
import { WhatsAppButton } from './whatsapp-btn';
import { HeaderResponsive } from './header-responsive';

export function Header() {
  const waHref = waLink(env.whatsAppNumber, env.waMessage);

  return (
    <>
      <div className='mx-auto max-w-7xl px-4 h-28 flex items-center justify-between'>
        <a className='font-semibold tracking-tight text-[color:var(--ink)]'>
          <Image
            className='aspect-square object-contain'
            src='/zeinmotiontm.webp'
            alt={`Logo from ${env.brand} | ${env.brandLogotype}`}
            width={100}
            height={100}
            priority
          />
        </a>

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
