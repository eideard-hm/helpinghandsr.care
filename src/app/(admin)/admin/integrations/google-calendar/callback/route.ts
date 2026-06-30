import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { prisma } from '@/lib/prisma';
import { env } from '@/config/env';
import { GoogleCalendarProvider } from '@/providers/google-calendar';

export async function GET(req: Request) {
  const url = new URL(req.url);

  try {
    const code = url.searchParams.get('code');
    const cookiesReq = await cookies();

    if (!code)
      return NextResponse.redirect(
        new URL('/admin/integrations?error=NO_CODE', url),
      );

    const stateFromGoogle = url.searchParams.get('state');
    const cookieState = cookiesReq.get('google_oauth_state')?.value;

    if (!stateFromGoogle || stateFromGoogle !== cookieState) {
      return NextResponse.redirect('/admin/integrations?error=INVALID_STATE');
    }

    const provider = new GoogleCalendarProvider();
    const tokens = await provider.exchangesCodeForTokens(code);

    if (!tokens.access_token || !tokens.expiry_date) {
      return NextResponse.redirect(
        new URL('/admin/integrations?error=NO_ACCESS_TOKEN', url),
      );
    }
    if (!tokens.refresh_token) {
      return NextResponse.redirect(
        new URL('/admin/integrations?error=NO_REFRESH_TOKEN', url),
      );
    }

    const businessId = env.bookingBusinessId;
    if (!businessId)
      return NextResponse.redirect(
        new URL('/admin/integrations?error=NO_BUSINESS', url),
      );

    const oauth = await prisma.googleOAuthAccount.upsert({
      where: {
        businessId_accountType_provider: {
          businessId,
          accountType: 'BUSINESS',
          provider: 'google',
        },
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

    const auth = provider.getOAuthClientForStoredTokens({
      accessToken: oauth.accessToken,
      refreshToken: oauth.refreshToken,
      expiryDate: oauth.expiryDate,
    });

    const calendars = await provider.listCalendars(auth);
    const primary = calendars.find((c: any) => c.primary) ?? calendars[0];

    if (!primary?.id) {
      return NextResponse.redirect(
        new URL('/admin/integrations?error=NO_CALENDARS_FOUND', url),
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

    return NextResponse.redirect(
      new URL('/admin/integrations?connected=1', url),
    );
  } catch (error) {
    console.error('Google Calendar callback error:', error);

    const message = error instanceof Error ? error.message : 'UNKNOWN_ERROR';

    if (message.includes('Calendar API has not been used')) {
      return NextResponse.redirect(
        new URL('/admin/integrations?error=GOOGLE_CALENDAR_API_DISABLED', url),
      );
    }

    return NextResponse.redirect(
      new URL('/admin/integrations?error=GOOGLE_CALLBACK_FAILED', url),
    );
  }
}
