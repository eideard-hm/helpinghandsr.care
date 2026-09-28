// Fallbacks so WhatsApp never opens an empty chat when a deployment lacks these variables.
const DEFAULT_WA_MESSAGE =
  'Hello, I’m interested in booking a session with *ZeinMotion™*. Could you please share availability and pricing details?';
const DEFAULT_WA_MESSAGE_TEMPLATE =
  'Hello *ZeinMotion™*, I would like to book a {SERVICE} session. Could you please share availability?';

export const env = {
  whatsAppNumber: process.env.NEXT_PUBLIC_WHATSAPP || '',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || '',
  waMessage: process.env.NEXT_PUBLIC_WA_MESSAGE || DEFAULT_WA_MESSAGE,
  brand: process.env.NEXT_PUBLIC_BRAND || '',
  brandSEO: process.env.NEXT_PUBLIC_BRAND_SEO || '',
  brandLogotype: process.env.NEXT_PUBLIC_BRAND_LOGOTYPE || '',
  waMessageTemplate:
    process.env.NEXT_PUBLIC_WA_MESSAGE_TEMPLATE || DEFAULT_WA_MESSAGE_TEMPLATE,

  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  },

  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  googleRedirectUri: process.env.GOOGLE_REDIRECT_URI || '',
} as const;
