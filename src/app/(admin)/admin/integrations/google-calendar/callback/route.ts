import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { env } from '@/config/env';
import { GoogleCalendarProvider } from '@/providers/google-calendar';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  if (!code) return NextResponse.redirect('/admin/integrations?error=NO_CODE');

  const provider = new GoogleCalendarProvider();
  const tokens = await provider.exchangesCodeForTokens(code);

  if (!tokens.access_token || !tokens.expiry_date) {
    return NextResponse.redirect('/admin/integrations?error=NO_ACCESS_TOKEN');
  }
  if (!tokens.refresh_token) {
    // Common when user already granted consent earlier without forced consent.
    return NextResponse.redirect('/admin/integrations?error=NO_REFRESH_TOKEN');
  }

  const businessId = env.bookingBusinessId;
  if (!businessId)
    return NextResponse.redirect('/admin/integrations?error=NO_BUSINESS');

  const oauth = await prisma.googleOAuthAccount.upsert({
    where: {
      businessId_staffId: { businessId, staffId: '' },
    },
    create: {
      businessId,
      accountType: 'BUSINESS',
      staffId: '',
      provider: 'google',
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      scope: tokens.scope ?? '',
      tokenType: tokens.token_type ?? '',
      expiryDate: new Date(tokens.expiry_date),
    },
    update: {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      scope: tokens.scope ?? '',
      tokenType: tokens.token_type ?? '',
      expiryDate: new Date(tokens.expiry_date),
    },
    select: {
      id: true,
      accessToken: true,
      refreshToken: true,
      expiryDate: true,
    },
  });

  // Pick a calendar (pilot: primary if exists)
  const auth = provider.getOAuthClientForStoredTokens({
    accessToken: oauth.accessToken,
    refreshToken: oauth.refreshToken,
    expiryDate: oauth.expiryDate,
  });

  const calendars = await provider.listCalendars(auth);
  const primary = calendars.find((c: any) => c.primary) ?? calendars[0];

  if (!primary?.id) {
    return NextResponse.redirect(
      '/admin/integrations?error=NO_CALENDARS_FOUND',
    );
  }

  const gc = await prisma.googleCalendar.upsert({
    where: { businessId_calendarId: { businessId, calendarId: primary.id } },
    create: {
      businessId,
      googleOAuthAccountId: oauth.id,
      calendarId: primary.id,
      name: primary.summary ?? null,
      isPrimary: Boolean(primary.primary),
    },
    update: {
      googleOAuthAccountId: oauth.id,
      name: primary.summary ?? null,
      isPrimary: Boolean(primary.primary),
    },
    select: { id: true },
  });

  await prisma.business.update({
    where: { id: businessId },
    data: { primaryCalendarId: gc.id },
  });

  return NextResponse.redirect('/admin/integrations?connected=1');
}
