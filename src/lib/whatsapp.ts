import { env } from '@/config/env';

/**
 * Generates a WhatsApp link with a pre-filled message.
 * @param phone The phone number to send the message to.
 * @param text The message text to pre-fill.
 * @returns The generated WhatsApp link.
 */
export const waLink = (phone: string, text: string) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;


export const waLinkWithEnv = () =>
  waLink(env.whatsAppNumber, env.waMessage);