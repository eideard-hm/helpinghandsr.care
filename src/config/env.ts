export const env = {
  whatsAppNumber: process.env.NEXT_PUBLIC_WHATSAPP || '',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || '',
  waMessage: process.env.NEXT_PUBLIC_WA_MESSAGE || '',
  brand: process.env.NEXT_PUBLIC_BRAND || '',
  brandSEO: process.env.NEXT_PUBLIC_BRAND_SEO || '',
  brandLogotype: process.env.NEXT_PUBLIC_BRAND_LOGOTYPE || '',
  waMessageTemplate: process.env.NEXT_PUBLIC_WA_MESSAGE_TEMPLATE || '',

  susap: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    publishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '',
  },

  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  googleRedirectUri: process.env.GOOGLE_REDIRECT_URI || '',
} as const;
