import { randomUUID } from 'node:crypto';

import { NextResponse } from 'next/server';

import { GoogleCalendarProvider } from '@/providers/google-calendar';

export async function GET() {
  const provider = new GoogleCalendarProvider();

  const state = randomUUID();

  const url = provider.getGoogleAuthUrl(state);

  const response = NextResponse.redirect(url);

  response.cookies.set('google_oauth_state', state, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  });

  return response;
}
