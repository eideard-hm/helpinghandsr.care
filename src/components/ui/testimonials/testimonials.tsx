import Link from 'next/link';

import { getReviews } from '@/actions/reviews/review';
import { env } from '@/config/env';
import { IconCirclePlus } from '@tabler/icons-react';
import { SectionTitle } from '../../common/section-title';
import { TestimonialsSlider } from './testimonial-slider';

export async function Testimonials() {
  let reviews = await getReviews();
  if (!reviews.length) {
    reviews = [
      {
        id: '1',
        name: 'Robert Chen',
        content: `As a software developer with chronic thoracic stiffness, I engaged ${env.brand} for a targeted deep tissue treatment. The therapist conducted a thorough postural assessment and precisely addressed my hypertonic trapezius and rhomboid muscles. The treatment effectively broke down adhesions, significantly improving my range of motion and reducing referred pain. The home visit service was highly efficient and professional. An essential maintenance service for anyone in a sedentary profession.`,
        rating: 5,
        status: 'approved',
        createdAt: new Date('2025-01-22'),
      },
    ];
  }

  return (
    <section
      id='testimonials'
      className='py-20 bg-gray-50 container mx-auto px-4  max-w-7xl mb-20'
    >
      <header className='flex items-center justify-between'>
        <SectionTitle>Testimonials</SectionTitle>

        <Link
          href='/testimonials'
          className='text-sm font-medium text-blue-500 hover:underline cursor-pointer'
        >
          <IconCirclePlus
            size={16}
            className='inline-block mr-1'
          />
          Write a Review
        </Link>
      </header>

      <TestimonialsSlider items={reviews} />
    </section>
  );
}
