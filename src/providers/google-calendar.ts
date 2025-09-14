import { google } from 'googleapis';

import { env } from '@/config/env';

export class GoogleCalendarProvider {
  private readonly oauth2Client;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      env.googleClientId,
      env.googleClientSecret,
      env.googleRedirectUri
    );
  }

  getGoogleAuthUrl() {
    const authUrl = this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/calendar'],
      prompt: 'consent',
    });
    return authUrl;
  }

  getGoogleAuthClient(accessToken: string) {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });
    return auth;
  }

  async exchangesCodeForTokens(code: string) {
    try {
      const { tokens } = await this.oauth2Client.getToken(code);
      return tokens;
    } catch (error) {
      console.error('Error exchanging code for tokens:', error);
      throw new Error('Failed to exchange code for tokens');
    }
  }

  async createCalendarEvent(
    accessToken: string,
    event: {
      summary: string;
      description: string;
      start: { dateTime: string; timeZone?: string };
      end: { dateTime: string; timeZone?: string };
      attendees?: { email: string }[];
    }
  ) {
    const auth = this.getGoogleAuthClient(accessToken);
    const calendar = google.calendar({ version: 'v3', auth });
    try {
      const response = await calendar.events.insert({
        calendarId: 'primary',
        requestBody: event,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating calendar event:', error);
      throw new Error('Failed to create calendar event');
    }
  }

  async checkAvailability(accessToken: string, startTime: Date, endTime: Date) {
    const auth = this.getGoogleAuthClient(accessToken);
    const calendar = google.calendar({ version: 'v3', auth });
    try {
      const response = await calendar.freebusy.query({
        requestBody: {
          timeMin: startTime.toISOString(),
          timeMax: endTime.toISOString(),
          timeZone: 'UTC',
          items: [{ id: 'primary' }],
        },
      });
      return response.data.calendars?.primary?.busy || [];
    } catch (error) {
      console.error('Error checking availability:', error);
      throw new Error('Failed to check availability');
    }
  }
}
