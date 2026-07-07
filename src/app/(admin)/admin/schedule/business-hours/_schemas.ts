import { z } from 'zod';

export const upsertBusinessHourSchema = z
  .object({
    id: z.string().optional(),
    weekday: z.coerce.number().int().min(0).max(6),
    startMin: z.coerce
      .number()
      .int()
      .min(0)
      .max(24 * 60),
    endMin: z.coerce
      .number()
      .int()
      .min(0)
      .max(24 * 60),
    isClosed: z.coerce.boolean().optional().default(false),
  })
  .refine((v) => v.isClosed || v.endMin > v.startMin, {
    message:
      'The end time must be greater than the start time unless the day is marked as closed.',
    path: ['endMin'],
  });

export const deleteBusinessHourSchema = z.object({
  id: z.string().min(1),
});
