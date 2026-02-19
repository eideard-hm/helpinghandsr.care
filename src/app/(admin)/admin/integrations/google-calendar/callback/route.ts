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

  // tokens may contain refresh_token only the first time.
  if (!tokens.access_token || !tokens.expiry_date) {
    return NextResponse.redirect('/admin/integrations?error=NO_ACCESS_TOKEN');
  }
  if (!tokens.refresh_token) {
    // This is common if consent was already granted without prompt=consent.
    return NextResponse.redirect('/admin/integrations?error=NO_REFRESH_TOKEN');
  }

  // Pilot: single business
  const businessId = env.bookingBusinessId;

  // Store tokens
  const oauth = await prisma.googleOAuthAccount.upsert({
    where: {
      // your schema: @@unique([businessId, staffId])
      // use staffId=null for business-level account
      businessId_staffId: { businessId, staffId: null },
    },
    create: {
      businessId,
      accountType: 'BUSINESS',
      staffId: null,
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

  // List calendars and pick a default (primary)
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
