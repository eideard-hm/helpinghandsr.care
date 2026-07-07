import { z } from 'zod';

export const upsertStaffHourSchema = z
  .object({
    id: z.string().optional(),
    staffId: z.string().min(1),
    weekday: z.coerce.number().int().min(0).max(6),
    startMin: z.coerce.number().int().min(0).max(1440),
    endMin: z.coerce.number().int().min(0).max(1440),
    isClosed: z.coerce.boolean().optional().default(false),
  })
  .refine((v) => v.isClosed || v.endMin > v.startMin, {
    message: 'End time must be greater than start time.',
    path: ['endMin'],
  });

export const deleteStaffHourSchema = z.object({
  id: z.string().min(1),
});
