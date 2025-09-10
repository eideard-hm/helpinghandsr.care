import AddReviewForm from '@/components/ui/testimonials/add-review-form';
import { env } from '@/config/env';
import { FormLayout } from '@/layout/form-layout';

export default function TestimonialsPage() {
  return (
    <section className='py-20 bg-gray-50 container mx-auto px-4  max-w-7xl mb-20'>
      <FormLayout
        formTitle='Write a testimonial'
        brand={env.brand}
      >
        <AddReviewForm />
      </FormLayout>
    </section>
  );
}
