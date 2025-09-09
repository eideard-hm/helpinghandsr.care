import type { Review } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';
import { catchError } from '@/lib/promise';

export const getReviews = async (): Promise<Review[]> => {
  const query = prisma.review.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
  });
  const [reviews, error] = await catchError<Review[]>(query);

  if (error) return [] as Review[];

  return (reviews || []) as Review[];
};
