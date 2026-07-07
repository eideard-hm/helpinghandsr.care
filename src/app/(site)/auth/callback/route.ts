import { NextResponse, type NextRequest } from 'next/server';

import { supabaseServerClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get('code');
  const nextParam = searchParams.get('next') ?? '/admin';
  const next = nextParam.startsWith('/') ? nextParam : '/admin';

  if (!code)
    return NextResponse.redirect(new URL('/auth/login?error=NoCode', origin));

  const response = NextResponse.redirect(new URL(next, origin));

  const supabase = await supabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      new URL(`/auth/login?error=${encodeURIComponent(error.message)}`, origin),
    );
  }

  return response;
}
