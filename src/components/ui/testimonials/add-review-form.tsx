'use client';

import { useActionState, useEffect, useRef, useState, useTransition } from 'react';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { IconArrowUpRight, IconStarFilled } from '@tabler/icons-react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import { createReview } from '@/actions/reviews/review';
import { Button } from '@/components/common/button';
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

const labelClass = 'mb-2 block text-xs font-medium text-poche lettering';

// Ruled fields, like the entries of a drawing's title block.
const fieldClass = (hasError: boolean) =>
  cn(
    'block w-full border-0 border-b-2 bg-limewash px-3 py-3 text-[1.0625rem] text-ink transition-colors placeholder:text-ink-soft/70 focus:bg-shadow focus:outline-none',
    hasError
      ? 'border-alert focus:border-alert'
      : 'border-poche/50 focus:border-poche'
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
      <div role='status'>
        <h3 className='text-2xl text-life-deep lettering-display'>
          Thank you for your testimonial
        </h3>
        <p className='mt-3 text-[1.0625rem] leading-7 text-ink-soft'>
          It was submitted for review and will appear on the website once
          approved.
        </p>
        <div className='mt-7 flex flex-col gap-3'>
          <Link
            href='/'
            className='inline-flex min-h-12 items-center justify-center bg-poche px-5 text-[0.8125rem] font-medium text-limewash transition-colors lettering hover:bg-poche-deep'
          >
            Back to home
          </Link>
          <a
            href={SOCIAL_LINKS.instagram.href}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex min-h-12 items-center justify-center gap-3 border border-poche px-5 text-[0.8125rem] font-medium text-poche transition-colors lettering hover:bg-poche hover:text-limewash'
          >
            Follow on Instagram
            <IconArrowUpRight
              size={18}
              stroke={1.5}
              aria-hidden
            />
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className='relative w-full space-y-6'
    >
      <div>
        <label
          htmlFor='name'
          className={labelClass}
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
            className='mt-2 text-sm text-alert'
          >
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor='review'
          className={labelClass}
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
        <div className='mt-2 flex items-start justify-between gap-3'>
          {errors.content ? (
            <p
              id='err-content'
              role='alert'
              className='text-sm text-alert'
            >
              {errors.content.message}
            </p>
          ) : (
            <span />
          )}
          <p
            id='review-count'
            className='shrink-0 text-sm text-ink-soft stamp'
          >
            {contentLength}/{MAX_CONTENT_LENGTH}
          </p>
        </div>
      </div>

      <fieldset>
        <legend className={labelClass}>Rating</legend>
        <Controller
          name='rating'
          control={control}
          render={({ field }) => {
            const current = hoverRating ?? field.value ?? 5;

            return (
              <div className='flex items-center gap-4'>
                <div
                  className='flex'
                  onMouseLeave={() => setHoverRating(null)}
                >
                  {RATINGS.map((value) => (
                    <label
                      key={value}
                      className='cursor-pointer p-1 has-focus-visible:outline-2 has-focus-visible:outline-poche'
                      onMouseEnter={() => setHoverRating(value)}
                    >
                      <input
                        type='radio'
                        name={field.name}
                        value={value}
                        checked={field.value === value}
                        onChange={() => field.onChange(value)}
                        onBlur={field.onBlur}
                        className='sr-only'
                      />
                      <IconStarFilled
                        size={30}
                        className={cn(
                          'transition-colors duration-150',
                          value <= current ? 'text-sun' : 'text-mortar'
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
                  className='text-sm text-ink-soft'
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
            className='mt-2 text-sm text-alert'
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
          className='border-t-2 border-alert pt-3 text-sm text-alert'
        >
          {state.error}
        </p>
      )}

      <Button
        type='submit'
        size='large'
        fullWidth
        disabled={isSubmitting || isPending}
      >
        {isSubmitting || isPending ? 'Sending...' : 'Submit testimonial'}
      </Button>
    </form>
  );
}
