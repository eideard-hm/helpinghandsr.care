import { createBrowserClient } from '@supabase/ssr';

import { env } from '@/config/env';

const supabaseUrl = env.supabase.url;
const supabaseKey = env.supabase.publishableKey;

export function supabaseBrowserClient() {
  return createBrowserClient(supabaseUrl, supabaseKey);
}
