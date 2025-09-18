import type { Metadata } from 'next';

import { env } from '@/config/env';

const prodUrl = new URL(env.siteUrl);

export const mainMetadata: Metadata = {
  metadataBase: prodUrl,
  title: {
    default: `${env.brand} | ${env.brandLogotype}`,
    template: `%s | ${env.brand}`,
  },
  description: 'Home massage therapy in Abu Dhabi, United Arab Emirates | Personalized treatments to prevent injuries and chronic pain, relieve muscle stiffness, and improve your overall health and wellness.',
  keywords: ['home massage', 'personalized care', 'cupping therapy', 'lymphatic drainage', 'reflexology', 'massage Abu Dhabi, United Arab Emirates', 'sports massage', 'deep tissue massage', 'stretching', 'wellness', 'pain relief', 'muscle relaxation'],
  authors: [{ name: 'Edier Hernandez', url: 'https://edier-hm.netlify.app/' }],
  creator: 'Edier Hernandez',
  publisher: `${env.brand}`,
  openGraph: {
    type: 'website',
    title: `${env.brand} | ${env.brandLogotype}`,
    description: 'Home massage therapy 🏠 | Personalized treatments to prevent injuries and chronic pain, relieve muscle stiffness, and improve your overall health and wellness.',
    url: prodUrl,
    siteName: `${env.brand} | ${env.brandLogotype}`,
    images: [
      {
        url: `${prodUrl}og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${env.brand} - Home massage therapy 🏠 | Personalized treatments to prevent injuries and chronic pain, relieve muscle stiffness, and improve your overall health and wellness.`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${env.brand} | ${env.brandLogotype}`,
    description: 'Home massage therapy 🏠 | Personalized treatments to prevent injuries and chronic pain, relieve muscle stiffness, and improve your overall health and wellness.',
    images: [`${prodUrl}og-image.jpg`],
  },
  alternates: { canonical: prodUrl },
};
