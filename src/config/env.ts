export const env = {
  whatsAppNumber: process.env.NEXT_PUBLIC_WHATSAPP || '',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || '',
  waMessage: process.env.NEXT_PUBLIC_WA_MESSAGE || '',
  brand: process.env.NEXT_PUBLIC_BRAND || '',
  brandLogotype: process.env.NEXT_PUBLIC_BRAND_LOGOTYPE || '',
  waMessageTemplate: process.env.NEXT_PUBLIC_WA_MESSAGE_TEMPLATE || '',

  susap: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  },

  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
} as const;
