import z from 'zod';

const EnvSchema = z.object({
  NEXT_PUBLIC_WHATSAPP: z.string().min(10).max(15),
  NEXT_PUBLIC_SITE_URL: z.url(),
  NEXT_PUBLIC_WA_MESSAGE: z.string(),
  NEXT_PUBLIC_BRAND: z.string(),
  DATABASE_URL: z.url(),
  DIRECT_URL: z.url(),
  NEXT_PUBLIC_BRAND_LOGOTYPE: z.string(),
  NEXT_PUBLIC_WA_MESSAGE_TEMPLATE: z.string(),  
});

const parsedEnv = EnvSchema.safeParse(process.env);
if (!parsedEnv.success) {
  console.error(
    'Invalid environment variables:',
    z.treeifyError(parsedEnv.error)
  );
  process.exit(1);
}

const {
  NEXT_PUBLIC_WHATSAPP,
  NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_WA_MESSAGE,
  NEXT_PUBLIC_BRAND,
  NEXT_PUBLIC_BRAND_LOGOTYPE,
  NEXT_PUBLIC_WA_MESSAGE_TEMPLATE,
} = parsedEnv.data;
export const env = {
  whatsAppNumber: NEXT_PUBLIC_WHATSAPP,
  siteUrl: NEXT_PUBLIC_SITE_URL,
  waMessage: NEXT_PUBLIC_WA_MESSAGE,
  brand: NEXT_PUBLIC_BRAND,
  brandLogotype: NEXT_PUBLIC_BRAND_LOGOTYPE,
  waMessageTemplate: NEXT_PUBLIC_WA_MESSAGE_TEMPLATE,
} as const;
