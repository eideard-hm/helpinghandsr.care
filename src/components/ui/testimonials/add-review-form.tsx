'use client';

import { useActionState, useEffect, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { createReview } from '@/actions/reviews/review';
import { type ReviewFormInput, ReviewSchema } from '@/schema/review';

export default function AddReviewForm() {
  const [isPending, startTransition] = useTransition();

  const [state, formAction] = useActionState(createReview, {
    ok: false,
    error: null,
    review: null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ReviewFormInput>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: { name: '', content: '', rating: 5 },
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<ReviewFormInput> = (data: ReviewFormInput) => {
    const fd = new FormData();
    fd.append('name', data.name);
    fd.append('content', data.content);
    fd.append('rating', String(data.rating));

    startTransition(() => formAction(fd));
  };

  useEffect(() => {
    if (state?.ok) {
      reset();
    }
  }, [state, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full space-y-4 md:space-y-5'
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
          className={`bg-gray-50 border ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } block w-full rounded-lg p-3 text-gray-900 focus:border-[color:var(--brand)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]/20`}
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
          required
          id='review'
          rows={5}
          placeholder='Share what changed after your session...'
          {...register('content')}
          aria-invalid={!!errors.content}
          aria-describedby={errors.content ? 'err-content' : undefined}
          className={`bg-gray-50 border ${
            errors.content ? 'border-red-500' : 'border-gray-300'
          } block w-full rounded-lg p-3 text-gray-900 focus:border-[color:var(--brand)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]/20`}
        />
        {errors.content && (
          <p
            id='err-content'
            role='alert'
            className='mt-1 text-sm text-red-600'
          >
            {errors.content.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor='rating'
          className='mb-2 block text-sm font-medium text-gray-900'
        >
          Rating
        </label>
        <select
          id='rating'
          {...register('rating', { valueAsNumber: true })}
          aria-invalid={!!errors.rating}
          aria-describedby={errors.rating ? 'err-rating' : undefined}
          className={`bg-gray-50 border ${
            errors.rating ? 'border-red-500' : 'border-gray-300'
          } block w-full rounded-lg p-3 text-gray-900 focus:border-[color:var(--brand)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]/20`}
          defaultValue={5}
        >
          <option value={5}>5 - Excellent</option>
          <option value={4}>4 - Very good</option>
          <option value={3}>3 - Good</option>
          <option value={2}>2 - Fair</option>
          <option value={1}>1 - Poor</option>
        </select>
        {errors.rating && (
          <p
            id='err-rating'
            role='alert'
            className='mt-1 text-sm text-red-600'
          >
            {errors.rating.message}
          </p>
        )}
      </div>

      {state?.ok && (
        <p
          role='status'
          className='rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700'
        >
          Thank you. Your testimonial was submitted for review.
        </p>
      )}

      {state?.error && (
        <p
          role='alert'
          className='mt-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700'
        >
          {state.error}
        </p>
      )}

      <button
        type='submit'
        disabled={isSubmitting || isPending}
        className='w-full cursor-pointer rounded-lg bg-[color:var(--brand)] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[color:var(--brand-600)] focus:outline-none focus:ring-4 focus:ring-[color:var(--brand)]/20 disabled:cursor-not-allowed disabled:opacity-70'
      >
        {isSubmitting || isPending ? 'Sending...' : 'Submit testimonial'}
      </button>
    </form>
  );
}
