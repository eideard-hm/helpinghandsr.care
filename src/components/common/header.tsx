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
    <div className='mx-auto flex h-24 max-w-7xl items-center justify-between px-4 md:h-32'>
      <Link href='/'>
        <Image
          className='size-20 aspect-square object-contain md:size-[7.5rem]'
          src='/zeinmotiontm.webp'
          alt={`Logo from ${env.brand} | ${env.brandLogotype}`}
          width={120}
          height={120}
          priority
        />
      </Link>

      <NavLinks classList='hidden md:flex md:gap-6' />

      <WhatsAppButton
        waLink={waHref}
        classList='hidden! md:inline-flex!'
      />

      <HeaderResponsive waLink={waHref} />
    </div>
  );
}
