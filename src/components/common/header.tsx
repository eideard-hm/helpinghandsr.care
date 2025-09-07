import Image from 'next/image';

import { WhatsAppButton } from '../ui/whatsapp-btn';

export function Header() {
  return (
    <div className='mx-auto max-w-7xl px-4 h-28 flex items-center justify-between'>
      <a className='font-semibold tracking-tight text-[color:var(--ink)]'>
        <Image
          className='aspect-square object-contain'
          src='/healinghandsr.webp'
          alt='Logo from Healing Hands.R | Massage Therapist'
          width={100}
          height={100}
          priority
        />
      </a>

      <nav className='hidden md:flex items-center gap-6 text-sm text-[color:var(--ink)]/80'>
        <a
          className='hover:text-[color:var(--ink)]'
          href='#services'
        >
          Services
        </a>
        <a
          className='hover:text[color:var(--ink)]'
          href='#how-it-works'
        >
          How it works
        </a>
        <a
          className='hover:text[color:var(--ink)]'
          href='#benefits'
        >
          Benefits
        </a>
      </nav>

      <WhatsAppButton />
    </div>
  );
}
