'use server';

import type { Review } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';
import { catchError } from '@/lib/promise';
import { ReviewSchema } from '@/schema/review';
import type { ReviewResponse } from '@/types/review/review';

export const getReviews = async (): Promise<Review[]> => {
  const query = prisma.review.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      status: 'APPROVED'
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
  const parsedData = ReviewSchema.safeParse({
    name: formData.get('name'),
    content: formData.get('content'),
    rating: formData.get('rating'),
  });

  if (!parsedData.success) {
    return {
      ok: false,
      error: parsedData.error.message,
    };
  }

  const query = prisma.review.create({
    data: parsedData.data,
  });

  const [review, error] = await catchError<Review>(query);
  if (error) return { ok: false, error: error.message };

  return { ok: true, review };
};
