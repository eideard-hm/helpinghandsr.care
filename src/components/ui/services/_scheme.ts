import z from 'zod';

export const BenefitsSchema = z.array(
  z.object({
    title: z.string(),
    details: z.array(z.string()),
  }),
);

export const DetailsSchema = z.array(z.string());

export const DBServiceSchema = z.object({
  id: z.string(),
  name: z.string(),
  active: z.boolean(),
  isMain: z.boolean().optional().default(false),
  visible: z.boolean().optional().default(true),

  image: z.string().nullable().optional(),
  bigImage: z.string().nullable().optional(),
  excerpt: z.string().nullable().optional(),
  waLink: z.string().nullable().optional(),

  benefits: z.unknown().nullable().optional(),
  details: z.unknown().nullable().optional(),

  businessId: z.string(),
});
