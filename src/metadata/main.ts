import type { Metadata } from 'next';

export const mainMetadata: Metadata = {
  title: 'Healing Hands.R | Massage Therapist',
  description: 'Home massage therapy 🏠 | Personalized treatments to prevent injuries and chronic pain, relieve muscle stiffness, and improve your overall health and wellness.',
  keywords: ['help', 'support', 'community'],
  authors: [{ name: 'Edier Hernandez', url: 'https://edier-hm.netlify.app/' }],
  creator: 'Edier Hernandez',
  publisher: 'Healing Hands.R',
  openGraph: {
    title: 'Healing Hands.R | Massage Therapist',
    description: 'Home massage therapy 🏠 | Personalized treatments to prevent injuries and chronic pain, relieve muscle stiffness, and improve your overall health and wellness.',
    url: 'http://healinghandsr.vercel.app',
    siteName: 'Healing Hands.R | Massage Therapist',
    images: [
      {
        url: 'http://healinghandsr.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Healing Hands.R - Home massage therapy 🏠 | Personalized treatments to prevent injuries and chronic pain, relieve muscle stiffness, and improve your overall health and wellness.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Healing Hands.R | Massage Therapist',
    description: 'Home massage therapy 🏠 | Personalized treatments to prevent injuries and chronic pain, relieve muscle stiffness, and improve your overall health and wellness.',
    images: ['http://healinghandsr.vercel.app/twitter-image.jpg'],
  },
};
