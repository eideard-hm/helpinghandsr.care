import Image from 'next/image';
import Link from 'next/link';

import {
  IconClockHour4,
  IconMail,
  IconMapPin,
  IconPhone,
} from '@tabler/icons-react';

import { env } from '@/config/env';
import { NAV_ITEMS } from '@/data/navigation';
import { CONTACT } from '@/data/site';
import { SocialMediaItems } from './social-media-items';
import { WhatsAppButton } from './whatsapp-btn';

const FOOTER_TREATMENTS = [
  `${env.brand} Therapy`,
  'Sports Massage & Stretching',
  'Deep Tissue Massage',
  'Cupping Therapy',
  'Reflexology Therapy',
  'Lymphatic Drainage',
  'Anti-Cellulite Massage',
];

const headingClass =
  'mb-4 font-sans text-sm font-semibold tracking-wide !text-white uppercase';
const linkClass =
  'inline-flex min-h-8 items-center transition-colors hover:text-brand-2';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className='container mx-auto max-w-7xl px-4'>
      <div className='grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.9fr_1.1fr_1.3fr] lg:gap-8'>
        <div>
          <Link
            href='/'
            className='inline-flex items-center gap-3 rounded-2xl'
            aria-label={`${env.brandSEO} home`}
          >
            <span className='inline-flex size-16 items-center justify-center rounded-2xl bg-white p-1.5 shadow-lg'>
              <Image
                src='/zeinmotiontm.webp'
                alt=''
                width={120}
                height={120}
                className='size-full object-contain'
              />
            </span>
            <span>
              <span className='block font-display text-xl font-bold text-white'>
                {env.brand}
              </span>
              <span className='block text-sm text-accent'>
                {env.brandLogotype}
              </span>
            </span>
          </Link>

          <p className='mt-5 max-w-sm text-sm leading-6'>
            Premium massage at home in {CONTACT.city}. Home visits,
            personalized care and tailored treatments to relieve stiffness and
            stress, and to help prevent injuries and chronic pain.
          </p>

          <SocialMediaItems
            variant='dark'
            includeContact={false}
            classList='mt-6'
          />
        </div>

        <nav aria-label='Footer'>
          <h2 className={headingClass}>Explore</h2>
          <ul className='space-y-1.5 text-sm'>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}`}
                  className={linkClass}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href='/testimonials'
                className={linkClass}
              >
                Write a testimonial
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className={headingClass}>Treatments</h2>
          <ul className='space-y-1.5 text-sm'>
            {FOOTER_TREATMENTS.map((treatment) => (
              <li key={treatment}>
                <Link
                  href='/#services'
                  className={linkClass}
                >
                  {treatment}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={headingClass}>Book a session</h2>
          <WhatsAppButton
            label='Book on WhatsApp'
            variant='light'
          />

          <ul className='mt-6 space-y-3 text-sm'>
            <li>
              <a
                href={CONTACT.phoneHref}
                className='inline-flex min-h-7 items-center gap-3 transition-colors hover:text-brand-2'
              >
                <IconPhone
                  size={18}
                  className='shrink-0 text-brand-2'
                  aria-hidden
                />
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className='inline-flex min-h-7 items-center gap-3 break-all transition-colors hover:text-brand-2'
              >
                <IconMail
                  size={18}
                  className='shrink-0 text-brand-2'
                  aria-hidden
                />
                {CONTACT.email}
              </a>
            </li>
            <li className='flex items-start gap-3'>
              <IconMapPin
                size={18}
                className='mt-0.5 shrink-0 text-brand-2'
                aria-hidden
              />
              <span>
                {CONTACT.city}, UAE
                <span className='block text-white/60'>
                  Home, hotel &amp; residence visits
                </span>
              </span>
            </li>
            <li className='flex items-center gap-3'>
              <IconClockHour4
                size={18}
                className='shrink-0 text-brand-2'
                aria-hidden
              />
              {CONTACT.availability}
            </li>
          </ul>
        </div>
      </div>

      <div className='flex flex-col gap-2 border-t border-white/10 py-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between'>
        <p>
          &copy; {year} {env.brand}. All rights reserved.
        </p>
        <p>
          Created and developed by{' '}
          <a
            href='https://edier-hm.netlify.app/en/'
            target='_blank'
            rel='noopener noreferrer'
            className='font-medium text-white/80 underline underline-offset-4 transition-colors hover:text-white'
          >
            Edier Hernandez
          </a>
        </p>
      </div>
    </div>
  );
}
