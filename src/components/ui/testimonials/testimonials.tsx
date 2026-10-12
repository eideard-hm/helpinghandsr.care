import Link from 'next/link';

import { IconArrowRight, IconArrowUpRight } from '@tabler/icons-react';

import { getReviews } from '@/actions/reviews/review';
import { SOCIAL_LINKS } from '@/data/site';
import { DEFAULT_TESTIMONIALS } from '@/data/testimonials';
import type { Review } from '@/generated/prisma';
import { SheetHeading } from '../../common/section-title';
import { TestimonialsSlider } from './testimonial-slider';

const linkClass =
  'flex min-h-14 items-center justify-between gap-4 border-b border-mortar text-poche transition-colors hover:border-poche';

export async function Testimonials() {
  let reviews: Review[] = await getReviews();
  if (!reviews.length) {
    reviews = DEFAULT_TESTIMONIALS;
  }

  return (
    <section
      id='testimonials'
      aria-labelledby='testimonials-title'
      className='py-20 lg:py-28'
    >
      <div className='mx-auto grid max-w-7xl gap-x-10 gap-y-12 px-4 lg:grid-cols-12'>
        <SheetHeading
          id='testimonials-title'
          className='lg:col-span-12'
        >
          {reviews.length > 1 ? 'From clients' : 'From a client'}
        </SheetHeading>

        <TestimonialsSlider
          items={reviews}
          className='lg:col-span-7'
        />

        <aside
          aria-label='More from clients'
          className='lg:col-span-4 lg:col-start-9'
        >
          <p className='max-w-[40ch] text-[1.0625rem] leading-7 text-ink-soft'>
            Sessions, assisted stretching and client stories are posted on
            Instagram and Facebook.
          </p>

          <ul className='mt-5 border-t border-poche text-[1.0625rem] font-medium'>
            <li>
              <a
                href={SOCIAL_LINKS.instagram.href}
                target='_blank'
                rel='noopener noreferrer'
                className={linkClass}
              >
                Watch on Instagram
                <IconArrowUpRight
                  size={20}
                  stroke={1.5}
                  aria-hidden
                />
              </a>
            </li>
            <li>
              <a
                href={SOCIAL_LINKS.facebook.href}
                target='_blank'
                rel='noopener noreferrer'
                className={linkClass}
              >
                Follow on Facebook
                <IconArrowUpRight
                  size={20}
                  stroke={1.5}
                  aria-hidden
                />
              </a>
            </li>
            <li>
              <Link
                href='/testimonials'
                className={linkClass}
              >
                Write a review
                <IconArrowRight
                  size={20}
                  stroke={1.5}
                  aria-hidden
                />
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
