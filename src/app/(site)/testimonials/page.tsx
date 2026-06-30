import type { Metadata } from 'next';

import AddReviewForm from '@/components/ui/testimonials/add-review-form';
import { env } from '@/config/env';
import { FormLayout } from '@/layout/form-layout';

export const metadata: Metadata = {
  title: `Write a testimonial | ${env.brandSEO}`,
  description:
    'Share your experience with ZeinMotion therapeutic home massage in Abu Dhabi.',
};

const REVIEW_NOTES = [
  'Testimonials are reviewed before appearing on the website.',
  'Please avoid sharing private medical or contact information.',
  'Your feedback helps clients book with more confidence.',
] as const;

export default function TestimonialsPage() {
  return (
    <section className='bg-bg px-4 py-10 pb-28 md:py-16 md:pb-16'>
      <div className='container mx-auto max-w-6xl'>
        <div className='grid gap-8 lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-start'>
          <div className='max-w-2xl'>
            <p className='mb-3 text-sm font-semibold uppercase tracking-wide text-[color:var(--brand)]'>
              Client testimonials
            </p>
            <h1 className='text-pretty text-4xl font-extrabold leading-tight text-title-indigo sm:text-5xl'>
              Share your massage experience
            </h1>
            <p className='mt-4 max-w-xl text-base leading-7 text-gray-700 sm:text-lg'>
              A short testimonial helps new clients understand what to expect
              from a home massage session with {env.brandSEO}.
            </p>

            <div className='mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1'>
              {REVIEW_NOTES.map((note) => (
                <article
                  key={note}
                  className='rounded-lg border border-gray-100 bg-white p-4 shadow-sm'
                >
                  <p className='text-sm leading-6 text-gray-700'>{note}</p>
                </article>
              ))}
            </div>
          </div>

          <FormLayout
            formTitle='Write a testimonial'
            brand={env.brand}
            logotype={env.brandLogotype}
          >
            <AddReviewForm />
          </FormLayout>
        </div>
      </div>
    </section>
  );
}
