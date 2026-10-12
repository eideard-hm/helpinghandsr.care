import Link from 'next/link';

import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconPencil,
} from '@tabler/icons-react';

import { getReviews } from '@/actions/reviews/review';
import { DEFAULT_TESTIMONIALS } from '@/data/testimonials';
import { SOCIAL_LINKS } from '@/data/site';
import type { Review } from '@/generated/prisma';
import { SectionTitle } from '../../common/section-title';
import { TestimonialsSlider } from './testimonial-slider';

export async function Testimonials() {
  let reviews: Review[] = await getReviews();
  if (!reviews.length) {
    reviews = DEFAULT_TESTIMONIALS;
  }

  return (
    <section
      id='testimonials'
      aria-labelledby='testimonials-title'
      className='bg-brand-2/15 py-16 md:py-24'
    >
      <div className='container mx-auto max-w-7xl px-4'>
        <div className='flex flex-wrap items-end justify-between gap-6'>
          <SectionTitle
            id='testimonials-title'
            eyebrow='Client stories'
            subTitle='What clients say after their home sessions.'
            className='mb-0 md:mb-0'
          >
            Testimonials
          </SectionTitle>

          <Link
            href='/testimonials'
            className='inline-flex min-h-11 items-center gap-2 rounded-xl border border-brand bg-white px-5 font-semibold text-brand shadow-sm transition-colors hover:bg-brand hover:text-white'
          >
            <IconPencil
              size={18}
              aria-hidden
            />
            Write a review
          </Link>
        </div>

        <div className='mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-8'>
          <TestimonialsSlider items={reviews} />

          <aside
            aria-labelledby='social-stories-title'
            className='relative isolate flex flex-col justify-between overflow-hidden rounded-3xl bg-ink p-8 text-white md:p-10'
          >
            <div
              className='absolute -top-24 -right-24 -z-10 size-72 rounded-full bg-linear-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] opacity-35 blur-3xl'
              aria-hidden
            />

            <div>
              <span className='inline-flex size-12 items-center justify-center rounded-2xl bg-linear-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white shadow-lg'>
                <IconBrandInstagram
                  size={26}
                  aria-hidden
                />
              </span>
              <h3
                id='social-stories-title'
                className='mt-5 text-2xl font-bold !text-white'
              >
                See the results in motion
              </h3>
              <p className='mt-3 leading-7 text-white/80'>
                Watch real sessions, sports massage, assisted stretching and
                client testimonials on{' '}
                <span className='font-semibold text-white'>
                  {SOCIAL_LINKS.instagram.handle}
                </span>
                .
              </p>
            </div>

            <div className='mt-8 grid gap-3'>
              <a
                href={SOCIAL_LINKS.instagram.href}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 font-semibold text-ink transition-colors hover:bg-brand-2'
              >
                <IconBrandInstagram
                  size={20}
                  aria-hidden
                />
                Watch on Instagram
              </a>
              <a
                href={SOCIAL_LINKS.facebook.href}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 px-5 font-semibold text-white transition-colors hover:bg-white/10'
              >
                <IconBrandFacebook
                  size={20}
                  aria-hidden
                />
                Follow on Facebook
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
