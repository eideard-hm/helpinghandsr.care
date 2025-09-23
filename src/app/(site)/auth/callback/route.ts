import { NextResponse } from 'next/server';

import { supabaseServerClient } from '@/lib/supabase/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/admin';

  if (!code)
    return NextResponse.redirect(new URL('/login?error=NoCode', req.url));

  const supabase = await supabaseServerClient();
  // Exchange the code for a session and set cookies
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error)
    return NextResponse.redirect(new URL('/login?error=Auth', req.url));

  // Optional: sync/save the admin in Prisma on first login
//   await upsertAdminOnLogin();

  return NextResponse.redirect(new URL(next, req.url));
}
