import Image from 'next/image';
import Link from 'next/link';

import { env } from '@/config/env';
import { NavLinks } from '../ui/nav-links';
import { BookingButton } from './booking-btn';
import { HeaderResponsive } from './header-responsive';

export function Header() {
  const BOOKING_URL = `/booking/${encodeURIComponent(env.bookingBusinessId)}`;

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

      <BookingButton
        bookingUrl={BOOKING_URL}
        classList='hidden! md:inline-flex!'
      />

      <HeaderResponsive bookingUrl={BOOKING_URL} />
    </div>
  );
}
