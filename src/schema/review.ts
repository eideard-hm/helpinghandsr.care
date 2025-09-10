import z from 'zod';

export const ReviewSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(100, 'Name must be at most 100 characters long'),
  content: z
    .string()
    .min(10, 'Content must be at least 10 characters long')
    .max(1000, 'Content must be at most 1000 characters long'),
  rating: z
    .number()
    .int('Rating must be an integer')
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5')
    .default(5),
});

export type ReviewInput = z.infer<typeof ReviewSchema>;

export type ReviewFormInput = z.input<typeof ReviewSchema>;