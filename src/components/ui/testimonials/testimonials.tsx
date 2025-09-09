import { getReviews } from '@/actions/reviews/review';
import { SectionTitle } from '../../common/section-title';
import { TestimonialsSlider } from './testimonial-slider';

export async function Testimonials() {
  const reviews = await getReviews();

  return (
    <section
      id='testimonials'
      className='py-20 bg-gray-50 container mx-auto px-4  max-w-7xl mb-20'
    >
      <SectionTitle>Testimonials</SectionTitle>

      <TestimonialsSlider items={reviews} />
    </section>
  );
}
