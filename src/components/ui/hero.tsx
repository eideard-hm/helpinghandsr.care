'use client';

import type { CSSProperties } from 'react';

import { IconArrowDown } from '@tabler/icons-react';

import { env } from '@/config/env';
import { CONTACT, THERAPIST } from '@/data/site';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useVisit } from '../common/visit-provider';
import { WhatsAppButton } from '../common/whatsapp-btn';
import { HourControl } from './visit/hour-control';
import { SectionDrawing } from './visit/section-drawing';

// Distance from the content column to the viewport edge, so the drawing can run off the page.
const sectionStyle = {
  '--bleed': 'max(1rem, calc((100vw - 80rem) / 2 + 1rem))',
} as CSSProperties;

export function Hero() {
  const { hour, chosen } = useVisit();
  // Both crops are server-rendered; after hydration only the one in use stays mounted.
  const wide = useMediaQuery('(min-width: 64rem)');

  return (
    <section
      className='border-b border-poche'
      style={sectionStyle}
      aria-label={`${env.brandSEO} - therapeutic home massage in Abu Dhabi`}
    >
      {/* On phones the drawing and the booking controls come before the paragraph, so the action stays in the first screen. */}
      <div className='mx-auto grid max-w-7xl px-4 pt-8 lg:grid-cols-12 lg:gap-x-10 lg:pt-14'>
        <h1 className='order-1 text-[clamp(2rem,10vw,3.25rem)] text-poche lettering-display lg:order-0 lg:col-span-5 lg:row-start-1 lg:pt-4 lg:text-[clamp(2.6rem,3.9vw,3.5rem)]'>
          <span className='block'>Therapeutic</span>{' '}
          <span className='block whitespace-nowrap'>Home Massage</span>{' '}
          <span className='block text-life'>in Abu Dhabi</span>
        </h1>

        <p className='order-4 mt-8 max-w-136 border-t border-mortar pt-6 pb-10 text-[1.0625rem] leading-7 text-ink lg:order-0 lg:col-span-5 lg:row-start-2 lg:mt-5 lg:border-0 lg:pt-0 lg:pb-0 lg:text-lg lg:leading-8'>
          {THERAPIST.name} brings the table to your home, hotel or residence:
          personalized sessions for chronic pain, injury prevention and stress,
          backed by {THERAPIST.yearsOfExperience}+ years of{' '}
          <span className='whitespace-nowrap'>hands-on</span> practice.
        </p>

        {/* The building runs from the header to the ground line and off the right edge of the page. */}
        <div className='relative order-2 -mx-4 mt-6 lg:order-0 lg:col-span-7 lg:col-start-6 lg:row-span-3 lg:row-start-1 lg:mx-0 lg:-mt-14 lg:mr-[calc(var(--bleed)*-1)] lg:overflow-hidden'>
          {wide !== false && (
            <SectionDrawing
              hour={hour}
              chosen={chosen}
              className='absolute inset-y-0 left-0 hidden max-w-275 lg:block'
            />
          )}
          {wide !== true && (
            <SectionDrawing
              hour={hour}
              chosen={chosen}
              view='room'
              className='lg:hidden'
            />
          )}
          {/* On wide screens the same credentials are lettered beside Richard in the drawing. */}
          <p className='border-b border-mortar px-4 py-3 text-[0.8125rem] leading-5 font-medium text-ink lg:hidden'>
            {THERAPIST.name} · {THERAPIST.role} · MOFA and KHDA attested ·{' '}
            {THERAPIST.yearsOfExperience}+ years
          </p>
        </div>

        <div className='order-3 pt-7 lg:order-0 lg:col-span-5 lg:row-start-3 lg:pt-8 lg:pb-16'>
          <HourControl className='max-w-[30rem]' />

          <div className='mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
            <WhatsAppButton
              label='Book this visit'
              size='large'
            />
            <a
              href='#services'
              className='inline-flex min-h-14 items-center justify-center gap-3 border border-poche px-6 text-sm font-medium text-poche transition-colors duration-200 lettering hover:bg-poche hover:text-limewash'
            >
              See treatments
              <IconArrowDown
                size={18}
                aria-hidden
              />
            </a>
          </div>

          <p className='mt-5 max-w-[46ch] text-sm leading-6 text-ink-soft'>
            Available {CONTACT.availability}. You get a recommendation and
            pricing on WhatsApp before anything is confirmed.
          </p>
        </div>
      </div>
    </section>
  );
}
