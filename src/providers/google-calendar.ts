import { google } from 'googleapis';

import { env } from '@/config/env';

export class GoogleCalendarProvider {
  getOAuthClientForStoredTokens(tokens: {
    accessToken?: string;
    refreshToken?: string;
    expiryDate?: Date;
  }) {
    const client = this.createOAuthClient();

    client.setCredentials({
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      expiry_date: tokens?.expiryDate?.getTime(),
    });
    return client;
  }

  async listCalendars(auth: InstanceType<typeof google.auth.OAuth2>) {
    const calendar = google.calendar({ version: 'v3', auth });
    const res = await calendar.calendarList.list();
    return res.data.items ?? [];
  }

  getGoogleAuthUrl(state: string) {
    const client = this.createOAuthClient();

    return client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: ['https://www.googleapis.com/auth/calendar'],
      include_granted_scopes: true,
      state,
    });
  }

  async exchangesCodeForTokens(code: string) {
    try {
      const client = this.createOAuthClient();
      const { tokens } = await client.getToken(code);
      return tokens;
    } catch (error) {
      console.error('Error exchanging code for tokens:', error);
      throw new Error('Failed to exchange code for tokens');
    }
  }

  async createCalendarEvent(params: {
    auth: any;
    calendarId: string;
    event: {
      summary: string;
      description?: string;
      location?: string;
      start: { dateTime: string; timeZone: string };
      end: { dateTime: string; timeZone: string };
      attendees?: { email: string }[];
    };
  }) {
    try {
      const calendar = google.calendar({ version: 'v3', auth: params.auth });
      const res = await calendar.events.insert({
        calendarId: params.calendarId,
        requestBody: params.event,
      });
      return res.data;
    } catch (error) {
      console.error('Error creating calendar event:', error);
      throw new Error('Failed to create calendar event');
    }
  }

  async checkAvailability(params: {
    accessToken?: string;
    refreshToken?: string;
    expiryDate?: Date;
    calendarId: string;
    startTime: Date;
    endTime: Date;
  }) {
    const auth = this.getOAuthClientForStoredTokens({
      accessToken: params.accessToken,
      refreshToken: params.refreshToken,
      expiryDate: params.expiryDate,
    });

    const calendar = google.calendar({ version: 'v3', auth });

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: params.startTime.toISOString(),
        timeMax: params.endTime.toISOString(),
        timeZone: 'UTC',
        items: [{ id: params.calendarId }],
      },
    });

    return response.data.calendars?.[params.calendarId]?.busy ?? [];
  }

  private createOAuthClient() {
    return new google.auth.OAuth2(
      env.googleClientId,
      env.googleClientSecret,
      env.googleRedirectUri,
    );
  }
}
