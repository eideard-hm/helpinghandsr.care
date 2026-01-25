import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { env } from '@/config/env';

const { url: supabaseUrl, publishableKey: supabaseAnonKey } = env.susap;

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        // 1) Mutar request cookies (doc oficial)
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );

        // 2) Re-crear response usando el MISMO request (doc oficial)
        supabaseResponse = NextResponse.next({ request });

        // 3) Setear cookies en la response
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  // IMPORTANTE: en doc recomiendan getClaims() para evitar logout aleatorio
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  const { pathname } = request.nextUrl;

  // Helper: redirect SIN perder cookies
  const redirectWithCookies = (
    toPath: string,
    params?: Record<string, string>,
  ) => {
    const url = request.nextUrl.clone();
    url.pathname = toPath;
    if (params)
      Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

    const redirectRes = NextResponse.redirect(url);

    // Copiar cookies de supabaseResponse al redirectRes
    supabaseResponse.cookies.getAll().forEach((c) => {
      redirectRes.cookies.set(c.name, c.value, c);
    });

    return redirectRes;
  };

  // Tu lógica
  if (pathname.startsWith('/auth') && user) {
    return redirectWithCookies('/admin');
  }

  if (pathname.startsWith('/admin') && !user) {
    return redirectWithCookies('/auth/login', { error: 'NO_SESSION' });
  }

  return supabaseResponse;
}
