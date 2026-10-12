import Image from 'next/image';
import Link from 'next/link';

import { env } from '@/config/env';
import { NAV_ITEMS } from '@/data/navigation';
import { SERVICES } from '@/data/services';
import { CONTACT, SERVICE_AREAS } from '@/data/site';
import { SocialMediaItems } from './social-media-items';

// Treatments shown on the page link to their card; the rest open a WhatsApp message for that treatment.
const FOOTER_TREATMENTS = SERVICES.map((service) => ({
  title: service.title,
  href: service.visible ? '/#services' : service.waLink,
  external: !service.visible,
}));

const headingClass = 'mb-4 text-xs font-medium text-limewash lettering';
const linkClass =
  'inline-flex min-h-9 items-center text-on-poche transition-colors hover:text-limewash';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className='mx-auto max-w-7xl px-4'>
      <div className='grid gap-x-8 gap-y-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1.1fr_1.2fr]'>
        <div>
          <Link
            href='/'
            className='inline-flex items-center gap-4'
          >
            {/* The logo keeps its own colours, so it sits on a limewash plate. */}
            <span className='inline-flex size-18 items-center justify-center bg-limewash p-1.5'>
              <Image
                src='/zeinmotiontm.webp'
                alt=''
                width={120}
                height={120}
                className='size-full object-contain'
              />
            </span>
            <span>
              <span className='block text-xl text-limewash lettering-display'>
                {env.brand}
              </span>
              <span className='mt-1 block text-xs text-on-poche lettering'>
                {env.brandLogotype}
              </span>
            </span>
          </Link>

          <p className='mt-6 max-w-sm text-[0.9375rem] leading-7 text-on-poche'>
            Premium massage at home in {CONTACT.city}. Home visits,
            personalized care and tailored treatments to relieve stiffness and
            stress, and to help prevent injuries and chronic pain.
          </p>

          <SocialMediaItems
            ground='poche'
            classList='mt-5 -ml-2.5'
          />
        </div>

        <nav aria-label='Footer'>
          <p className={headingClass}>Explore</p>
          <ul className='text-[0.9375rem]'>
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
          <p className={headingClass}>Treatments</p>
          <ul className='text-[0.9375rem]'>
            {FOOTER_TREATMENTS.map((treatment) => (
              <li key={treatment.title}>
                {treatment.external ? (
                  <a
                    href={treatment.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={linkClass}
                  >
                    {treatment.title}
                    <span className='sr-only'> (ask on WhatsApp)</span>
                  </a>
                ) : (
                  <Link
                    href={treatment.href}
                    className={linkClass}
                  >
                    {treatment.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={headingClass}>Reach Richard</p>
          <dl className='text-[0.9375rem] text-on-poche'>
            <div className='border-t border-on-poche/25 py-3'>
              <dt className='text-[0.6875rem] lettering'>WhatsApp and phone</dt>
              <dd className='mt-1'>
                <a
                  href={CONTACT.phoneHref}
                  className='inline-flex min-h-11 items-center text-lg text-limewash transition-colors stamp hover:text-sun'
                >
                  {CONTACT.phoneDisplay}
                </a>
              </dd>
            </div>
            <div className='border-t border-on-poche/25 py-3'>
              <dt className='text-[0.6875rem] lettering'>Email</dt>
              <dd className='mt-1'>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className='inline-flex min-h-11 items-center break-all text-limewash underline decoration-on-poche/50 transition-colors hover:decoration-sun'
                >
                  {CONTACT.email}
                </a>
              </dd>
            </div>
            <div className='border-t border-on-poche/25 py-3'>
              <dt className='text-[0.6875rem] lettering'>Where</dt>
              <dd className='mt-1 text-limewash'>
                {CONTACT.city}, UAE. Homes, hotels and residences in{' '}
                {SERVICE_AREAS.join(', ')} and across the emirate.
              </dd>
            </div>
            <div className='border-y border-on-poche/25 py-3'>
              <dt className='text-[0.6875rem] lettering'>When</dt>
              <dd className='mt-1 text-limewash'>{CONTACT.availability}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className='flex flex-col gap-2 border-t border-on-poche/25 py-6 text-sm text-on-poche md:flex-row md:items-center md:justify-between'>
        <p>
          &copy; {year} {env.brand}. All rights reserved.
        </p>
        <p>
          Created and developed by{' '}
          <a
            href='https://edier-hm.netlify.app/en/'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex min-h-6 items-center text-limewash underline decoration-on-poche/50 transition-colors hover:decoration-sun'
          >
            Edier Hernandez
          </a>
        </p>
      </div>
    </div>
  );
}
