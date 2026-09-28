'use server';

import type { Review } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';
import { catchError } from '@/lib/promise';
import { ReviewSchema } from '@/schema/review';
import type { ReviewResponse } from '@/types/review/review';

// Hidden form field: people never see it, spam bots fill it in.
const HONEYPOT_FIELD = 'website';

export const getReviews = async (): Promise<Review[]> => {
  const query = prisma.review.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      status: 'APPROVED',
    },
    take: 10,
  });
  const [reviews, error] = await catchError<Review[]>(query);

  if (error) return [] as Review[];

  return (reviews || []) as Review[];
};

export const createReview = async (
  _prev: ReviewResponse,
  formData: FormData
): Promise<ReviewResponse> => {
  if (formData.get(HONEYPOT_FIELD)) return { ok: true, review: null };

  const rating = formData.get('rating');

  const parsedData = ReviewSchema.safeParse({
    name: formData.get('name'),
    content: formData.get('content'),
    rating: typeof rating === 'string' ? Number(rating) : rating,
  });

  if (!parsedData.success) {
    const [firstError] = parsedData.error.issues;

    return {
      ok: false,
      error: firstError?.message ?? 'Please check the testimonial form.',
    };
  }

  const query = prisma.review.create({
    data: parsedData.data,
  });

  const [review, error] = await catchError<Review>(query);
  // The error is logged by catchError; never expose database details to visitors.
  if (error) {
    return {
      ok: false,
      error:
        'We could not save your testimonial right now. Please try again in a few minutes.',
    };
  }

  return { ok: true, review };
};
