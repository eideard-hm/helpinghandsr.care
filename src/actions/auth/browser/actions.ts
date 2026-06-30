import { catchError } from '@/lib/promise';
import { supabaseBrowserClient } from '@/lib/supabase/client';

export const signOutBrowser = async (): Promise<void> => {
  const client = supabaseBrowserClient();
  const [, err] = await catchError(client.auth.signOut());
  if (err) {
    console.error('Error signing out:', err);
  }
};
