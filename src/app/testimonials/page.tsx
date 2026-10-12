import type { Metadata } from 'next';

import Link from 'next/link';

import { IconArrowLeft, IconCircleCheck } from '@tabler/icons-react';

import AddReviewForm from '@/components/ui/testimonials/add-review-form';
import { env } from '@/config/env';
import { FormLayout } from '@/layout/form-layout';

export const metadata: Metadata = {
  title: 'Write a testimonial',
  description: `Share your experience with ${env.brandSEO} therapeutic home massage in Abu Dhabi.`,
  alternates: {
    canonical: '/testimonials',
  },
};

const REVIEW_NOTES = [
  'Testimonials are reviewed before appearing on the website.',
  'Please avoid sharing private medical or contact information.',
  'Your feedback helps clients book with more confidence.',
] as const;

export default function TestimonialsPage() {
  return (
    <section className='bg-bg px-4 py-10 md:py-16'>
      <div className='container mx-auto max-w-6xl'>
        <Link
          href='/#testimonials'
          className='mb-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-700'
        >
          <IconArrowLeft
            size={18}
            aria-hidden
          />
          Back to testimonials
        </Link>

        <div className='grid gap-10 lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-start'>
          <div className='max-w-2xl'>
            <p className='mb-3 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-brand-700 uppercase'>
              <span
                className='h-px w-8 bg-accent'
                aria-hidden
              />
              Client testimonials
            </p>
            <h1 className='text-4xl leading-tight font-extrabold text-pretty text-title-indigo sm:text-5xl'>
              Share your massage experience
            </h1>
            <p className='mt-4 max-w-xl text-base leading-7 text-gray-700 sm:text-lg'>
              A short testimonial helps new clients understand what to expect
              from a home massage session with {env.brandSEO}.
            </p>

            <ul className='mt-8 grid gap-3'>
              {REVIEW_NOTES.map((note) => (
                <li
                  key={note}
                  className='flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200/70'
                >
                  <IconCircleCheck
                    size={20}
                    className='mt-0.5 shrink-0 text-brand'
                    aria-hidden
                  />
                  <p className='text-sm leading-6 text-gray-700'>{note}</p>
                </li>
              ))}
            </ul>
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
