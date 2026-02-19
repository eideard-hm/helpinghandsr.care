import { NextResponse } from 'next/server';

import { GoogleCalendarProvider } from '@/providers/google-calendar';

export async function GET() {
  const provider = new GoogleCalendarProvider();
  const url = provider.getGoogleAuthUrl();
  return NextResponse.redirect(url);
}
