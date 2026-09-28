'use client';

import { useActionState, useEffect, useRef, useState, useTransition } from 'react';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  IconBrandInstagram,
  IconCircleCheck,
  IconStarFilled,
} from '@tabler/icons-react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import { createReview } from '@/actions/reviews/review';
import { SOCIAL_LINKS } from '@/data/site';
import { cn } from '@/lib/cn';
import { type ReviewFormInput, ReviewSchema } from '@/schema/review';

const MAX_CONTENT_LENGTH = 1000;
const RATINGS = [1, 2, 3, 4, 5] as const;
const RATING_LABELS: Record<number, string> = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very good',
  5: 'Excellent',
};

const fieldClass = (hasError: boolean) =>
  cn(
    'block w-full rounded-xl border bg-gray-50 p-3 text-gray-900 transition-colors placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:outline-none',
    hasError
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
      : 'border-gray-300 focus:border-brand focus:ring-brand/20'
  );

export default function AddReviewForm() {
  const [isPending, startTransition] = useTransition();
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const [state, formAction] = useActionState(createReview, {
    ok: false,
    error: null,
    review: null,
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ReviewFormInput>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: { name: '', content: '', rating: 5 },
    mode: 'onBlur',
  });

  const contentLength = watch('content')?.length ?? 0;

  const onSubmit: SubmitHandler<ReviewFormInput> = (data: ReviewFormInput) => {
    const fd = new FormData();
    fd.append('name', data.name);
    fd.append('content', data.content);
    fd.append('rating', String(data.rating));
    fd.append('website', honeypotRef.current?.value ?? '');

    startTransition(() => formAction(fd));
  };

  useEffect(() => {
    if (state?.ok) {
      reset();
    }
  }, [state, reset]);

  if (state?.ok) {
    return (
      <div
        role='status'
        className='py-4 text-center'
      >
        <span className='mx-auto inline-flex size-14 items-center justify-center rounded-full bg-brand-2/40 text-brand'>
          <IconCircleCheck
            size={30}
            aria-hidden
          />
        </span>
        <h3 className='mt-4 text-xl font-bold'>
          Thank you for your testimonial!
        </h3>
        <p className='mt-2 text-sm leading-6 text-gray-600'>
          It was submitted for review and will appear on the website once
          approved.
        </p>
        <div className='mt-6 grid gap-3'>
          <Link
            href='/'
            className='inline-flex min-h-11 items-center justify-center rounded-xl bg-brand px-4 font-semibold text-white transition-colors hover:bg-brand-700'
          >
            Back to home
          </Link>
          <a
            href={SOCIAL_LINKS.instagram.href}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 font-semibold text-ink transition-colors hover:border-brand hover:text-brand'
          >
            <IconBrandInstagram
              size={20}
              aria-hidden
            />
            Follow on Instagram
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className='relative w-full space-y-5'
    >
      <div>
        <label
          htmlFor='name'
          className='mb-2 block text-sm font-medium text-gray-900'
        >
          Name
        </label>
        <input
          id='name'
          type='text'
          autoComplete='name'
          placeholder='e.g., Sarah M.'
          {...register('name')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'err-name' : undefined}
          className={fieldClass(!!errors.name)}
        />
        {errors.name && (
          <p
            id='err-name'
            role='alert'
            className='mt-1 text-sm text-red-600'
          >
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor='review'
          className='mb-2 block text-sm font-medium text-gray-900'
        >
          Testimonial
        </label>
        <textarea
          id='review'
          rows={5}
          maxLength={MAX_CONTENT_LENGTH}
          placeholder='Share what changed after your session...'
          {...register('content')}
          aria-invalid={!!errors.content}
          aria-describedby={
            errors.content ? 'err-content review-count' : 'review-count'
          }
          className={fieldClass(!!errors.content)}
        />
        <div className='mt-1 flex items-start justify-between gap-3'>
          {errors.content ? (
            <p
              id='err-content'
              role='alert'
              className='text-sm text-red-600'
            >
              {errors.content.message}
            </p>
          ) : (
            <span />
          )}
          <p
            id='review-count'
            className='shrink-0 text-xs text-gray-500'
          >
            {contentLength}/{MAX_CONTENT_LENGTH}
          </p>
        </div>
      </div>

      <fieldset>
        <legend className='mb-2 block text-sm font-medium text-gray-900'>
          Rating
        </legend>
        <Controller
          name='rating'
          control={control}
          render={({ field }) => {
            const current = hoverRating ?? field.value ?? 5;

            return (
              <div className='flex items-center gap-3'>
                <div
                  className='flex'
                  onMouseLeave={() => setHoverRating(null)}
                >
                  {RATINGS.map((value) => (
                    <label
                      key={value}
                      className='cursor-pointer p-0.5'
                      onMouseEnter={() => setHoverRating(value)}
                    >
                      <input
                        type='radio'
                        name={field.name}
                        value={value}
                        checked={field.value === value}
                        onChange={() => field.onChange(value)}
                        onBlur={field.onBlur}
                        className='peer sr-only'
                      />
                      <IconStarFilled
                        size={32}
                        className={cn(
                          'rounded-md transition-transform duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-brand hover:scale-110',
                          value <= current ? 'text-accent' : 'text-gray-300'
                        )}
                        aria-hidden
                      />
                      <span className='sr-only'>
                        {value} {value === 1 ? 'star' : 'stars'} -{' '}
                        {RATING_LABELS[value]}
                      </span>
                    </label>
                  ))}
                </div>
                <span
                  className='text-sm font-medium text-gray-700'
                  aria-hidden
                >
                  {RATING_LABELS[current]}
                </span>
              </div>
            );
          }}
        />
        {errors.rating && (
          <p
            role='alert'
            className='mt-1 text-sm text-red-600'
          >
            {errors.rating.message}
          </p>
        )}
      </fieldset>

      {/* Honeypot: hidden from people and assistive technology. */}
      <div
        className='absolute -left-[9999px] h-px w-px overflow-hidden'
        aria-hidden
      >
        <label htmlFor='website'>Website</label>
        <input
          ref={honeypotRef}
          id='website'
          type='text'
          tabIndex={-1}
          autoComplete='off'
        />
      </div>

      {state?.error && (
        <p
          role='alert'
          className='rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700'
        >
          {state.error}
        </p>
      )}

      <button
        type='submit'
        disabled={isSubmitting || isPending}
        className='w-full cursor-pointer rounded-xl bg-brand px-4 py-3 text-center font-semibold text-white transition hover:bg-brand-700 focus:ring-4 focus:ring-brand/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70'
      >
        {isSubmitting || isPending ? 'Sending...' : 'Submit testimonial'}
      </button>
    </form>
  );
}
