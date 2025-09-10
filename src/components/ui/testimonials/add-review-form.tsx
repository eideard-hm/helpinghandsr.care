'use client';

import { useActionState, useEffect, useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { createReview } from '@/actions/reviews/review';
import { type ReviewFormInput, type ReviewInput, ReviewSchema } from '@/schema/review';

export default function AddReviewForm() {
  const [isPending, startTransition] = useTransition();

  const [state, formAction] = useActionState(createReview, {
    ok: false,
    error: null,
    review: null,
  });

  const router = useRouter();

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
      router.push('/');
    }
  }, [state, reset, router]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4 md:space-y-6 w-full'
    >
      <div>
        <label
          htmlFor='name'
          className='block mb-2 text-sm font-medium text-gray-900'
        >
          Name
        </label>
        <input
          id='name'
          type='text'
          placeholder='Eg. John Doe'
          {...register('name')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'err-name' : undefined}
          className={`bg-gray-50 border ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
        />
        {errors.name && (
          <p
            id='err-name'
            className='mt-1 text-sm text-red-600'
          >
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor='review'
          className='block mb-2 text-sm font-medium text-gray-900'
        >
          Review
        </label>
        <textarea
          required
          id='review'
          placeholder='Write your review here...'
          {...register('content')}
          aria-invalid={!!errors.content}
          aria-describedby={errors.content ? 'err-content' : undefined}
          className={`bg-gray-50 border ${
            errors.content ? 'border-red-500' : 'border-gray-300'
          } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
        />
        {errors.content && (
          <p
            id='err-content'
            className='mt-1 text-sm text-red-600'
          >
            {errors.content.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor='rating'
          className='block mb-2 text-sm font-medium text-gray-900'
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
          } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
          defaultValue={5}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option
              key={n}
              value={n}
            >
              {n}
            </option>
          ))}
        </select>
        {errors.rating && (
          <p
            id='err-rating'
            className='mt-1 text-sm text-red-600'
          >
            {errors.rating.message}
          </p>
        )}
      </div>

      {state?.error && <p className='text-red-600 mt-2'>{state.error}</p>}

      <button
        type='submit'
        disabled={isSubmitting || isPending}
        className='w-full px-4 py-2 text-sm font-medium text-center text-white bg-brand-2 rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 cursor-pointer'
      >
        {isSubmitting || isPending ? 'Sending…' : 'Submit Review'}
      </button>
    </form>
  );
}
