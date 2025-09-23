import { createBrowserClient } from '@supabase/ssr';

import { env } from '@/config/env';

const supabaseUrl = env.susap.url;
const supabaseKey = env.susap.anonKey;

export function supabaseBrowserClient() {
  return createBrowserClient(supabaseUrl, supabaseKey);
}
