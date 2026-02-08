import { z } from 'zod';

export const createTimeOffSchema = z
  .object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    staffId: z
      .string()
      .optional()
      .transform((v) => (v?.trim() ? v : undefined)),
    allDay: z.coerce.boolean().optional().default(false),
    startMin: z.coerce.number().int().min(0).max(1440).optional(),
    endMin: z.coerce.number().int().min(0).max(1440).optional(),
    reason: z
      .string()
      .max(200)
      .optional()
      .transform((v) => (v?.trim() ? v : undefined)),
  })
  .superRefine((v, ctx) => {
    if (v.allDay) return;
    if (v.startMin == null || v.endMin == null) {
      ctx.addIssue({
        code: 'custom',
        message: 'startMin y endMin are required if not allDay',
      });
      return;
    }
    if (v.endMin <= v.startMin) {
      ctx.addIssue({
        code: 'custom',
        message: 'endMin must be greater than startMin',
      });
    }
  });

export const deleteTimeOffSchema = z.object({
  id: z.string().min(1),
});
