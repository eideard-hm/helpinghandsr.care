import type { Metadata } from 'next';

import Link from 'next/link';

import { IconArrowLeft } from '@tabler/icons-react';

import AddReviewForm from '@/components/ui/testimonials/add-review-form';
import { env } from '@/config/env';
import { FormLayout } from '@/layout/form-layout';

export const metadata: Metadata = {
  title: 'Write a testimonial',
  description: `Share your experience with ${env.brandSEO} therapeutic home massage in Abu Dhabi.`,
  alternates: {
    canonical: '/testimonials',
  },
  // A form page: linked from the site, kept out of search results.
  robots: { index: false, follow: true },
};

const REVIEW_NOTES = [
  'Testimonials are reviewed before appearing on the website.',
  'Please avoid sharing private medical or contact information.',
  'Your feedback helps clients book with more confidence.',
] as const;

export default function TestimonialsPage() {
  return (
    <section className='py-10 lg:py-16'>
      <div className='mx-auto max-w-7xl px-4'>
        <Link
          href='/#testimonials'
          className='inline-flex min-h-11 items-center gap-3 text-xs font-medium text-poche lettering hover:underline'
        >
          <IconArrowLeft
            size={17}
            stroke={1.5}
            aria-hidden
          />
          Back to testimonials
        </Link>

        <div className='mt-8 grid gap-x-10 gap-y-12 lg:grid-cols-12'>
          <div className='lg:col-span-6'>
            <h1 className='text-[clamp(2.25rem,9vw,4rem)] text-poche lettering-display'>
              Share your massage experience
            </h1>
            <p className='mt-6 max-w-[52ch] text-lg leading-8 text-ink'>
              A short testimonial helps new clients understand what to expect
              from a home massage session with {env.brandSEO}.
            </p>

            <ul className='mt-10 max-w-[34rem] border-t border-poche'>
              {REVIEW_NOTES.map((note) => (
                <li
                  key={note}
                  className='border-b border-mortar py-4 text-[1.0625rem] leading-7 text-ink-soft'
                >
                  {note}
                </li>
              ))}
            </ul>
          </div>

          <div className='lg:col-span-5 lg:col-start-8'>
            <FormLayout
              formTitle='Write a testimonial'
              brand={env.brand}
              logotype={env.brandLogotype}
            >
              <AddReviewForm />
            </FormLayout>
          </div>
        </div>
      </div>
    </section>
  );
}
