import Image from 'next/image';
import Link from 'next/link';

import { env } from '@/config/env';
import { waLink } from '@/lib/whatsapp';
import { NavLinks } from '../ui/nav-links';
import { HeaderResponsive } from './header-responsive';
import { WhatsAppButton } from './whatsapp-btn';
import { BookingButton } from './booking-btn';

export function Header() {
  const BOOKING_URL = `/booking/${encodeURIComponent(env.bookingBusinessId)}`;

  return (
    <div className='mx-auto max-w-7xl px-4 h-32 flex items-center justify-between'>
      <Link href='/'>
        <Image
          className='aspect-square object-contain'
          src='/zeinmotiontm.webp'
          alt={`Logo from ${env.brand} | ${env.brandLogotype}`}
          width={120}
          height={120}
          priority
        />
      </Link>

      <NavLinks classList='hidden md:flex md:gap-6' />

      <BookingButton
        bookingUrl={BOOKING_URL}
        classList='hidden! md:inline-flex!'
      />

      <HeaderResponsive bookingUrl={BOOKING_URL} />
    </div>
  );
}
