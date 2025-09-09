import type { Metadata } from 'next';

import { env } from '@/config/env';

const prodUrl = env.siteUrl;

export const mainMetadata: Metadata = {
  title: `${env.brand} | Massage Therapist`,
  description: 'Home massage therapy 🏠 | Personalized treatments to prevent injuries and chronic pain, relieve muscle stiffness, and improve your overall health and wellness.',
  keywords: ['help', 'support', 'community'],
  authors: [{ name: 'Edier Hernandez', url: 'https://edier-hm.netlify.app/' }],
  creator: 'Edier Hernandez',
  publisher: `${env.brand}`,
  openGraph: {
    title: `${env.brand} | Massage Therapist`,
    description: 'Home massage therapy 🏠 | Personalized treatments to prevent injuries and chronic pain, relieve muscle stiffness, and improve your overall health and wellness.',
    url: prodUrl,
    siteName: `${env.brand} | Massage Therapist`,
    images: [
      {
        url: `${prodUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${env.brand} - Home massage therapy 🏠 | Personalized treatments to prevent injuries and chronic pain, relieve muscle stiffness, and improve your overall health and wellness.`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${env.brand} | Massage Therapist`,
    description: 'Home massage therapy 🏠 | Personalized treatments to prevent injuries and chronic pain, relieve muscle stiffness, and improve your overall health and wellness.',
    images: [`${prodUrl}/og-image.png`],
  },
};
