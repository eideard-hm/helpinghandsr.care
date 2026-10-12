import { env } from '@/config/env';
import type { Hour } from '@/data/visit';

/**
 * Generates a WhatsApp link with a pre-filled message.
 * @param phone The phone number to send the message to.
 * @param text The message text to pre-fill.
 * @returns The generated WhatsApp link.
 */
export const waLink = (phone: string, text: string) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

export const waLinkWithEnv = () => waLink(env.whatsAppNumber, env.waMessage);

/** Adds the hour the visitor picked to a booking message. */
export const withPreferredHour = (message: string, hour?: Hour) =>
  hour ? `${message} I would prefer a visit ${hour.phrase}.` : message;

/**
 * Rebuilds a wa.me link with the visitor's preferred hour appended to its message.
 * Links that are not wa.me booking links are returned untouched.
 */
export const waLinkAtHour = (href: string, hour?: Hour) => {
  if (!hour) return href;

  const [base, query] = href.split('?text=');
  if (query === undefined) return href;

  return `${base}?text=${encodeURIComponent(
    withPreferredHour(decodeURIComponent(query), hour)
  )}`;
};
