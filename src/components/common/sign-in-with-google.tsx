'use client';

import { IconBrandGoogle } from '@tabler/icons-react';

import { Button } from './button';
import { supabaseBrowserClient } from '@/lib/supabase/client';

export default function SignInWithGoogle() {
  const supabase = supabaseBrowserClient();

  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
        scopes: 'https://www.googleapis.com/auth/calendar',
        queryParams: { access_type: 'offline', prompt: 'consent' },
      },
    });
  };

  return (
    <Button
      variant='outline'
      fullWidth
      type='button'
      onClick={signInWithGoogle}
    >
      <IconBrandGoogle className='mr-2' />
      Continue with Google
    </Button>
  );
}
