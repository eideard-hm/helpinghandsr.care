import Link from 'next/link';

import { getReviews } from '@/actions/reviews/review';
import { DEFAULT_TESTIMONIALS } from '@/data/testimonials';
import { IconCirclePlus } from '@tabler/icons-react';
import { SectionTitle } from '../../common/section-title';
import { TestimonialsSlider } from './testimonial-slider';

export async function Testimonials() {
  let reviews = await getReviews();
  if (!reviews.length) {
    reviews = DEFAULT_TESTIMONIALS;
  }

  return (
    <section
      id='testimonials'
      className='py-16 bg-[color:var(--brand-2)]/20'
    >
      <div className='container mx-auto px-4 max-w-7xl'>
        <header className='flex items-center justify-between'>
          <SectionTitle>Testimonials</SectionTitle>

          <Link
            href='/testimonials'
            className='border border-accent text-accent hover:bg-teal-50 px-6 py-3 rounded-lg font-medium transition-colors'
          >
            <IconCirclePlus
              size={16}
              className='inline-block mr-1'
            />
            Write a Review
          </Link>
        </header>

        <TestimonialsSlider items={reviews} />
      </div>
    </section>
  );
}
