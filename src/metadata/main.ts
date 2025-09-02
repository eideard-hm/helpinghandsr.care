import type { Metadata } from 'next';

export const mainMetadata: Metadata = {
  title: 'Helping Hands',
  description: 'A platform to connect those in need with helping hands.',
  keywords: ['help', 'support', 'community'],
  authors: [{ name: 'John Doe', url: 'https://johndoe.com' }],
  creator: 'John Doe',
  publisher: 'Helping Hands',
  openGraph: {
    title: 'Helping Hands',
    description: 'A platform to connect those in need with helping hands.',
    url: 'https://helpinghands.com',
    siteName: 'Helping Hands',
    images: [
      {
        url: 'https://helpinghands.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Helping Hands - A platform to connect those in need with helping hands.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Helping Hands',
    description: 'A platform to connect those in need with helping hands.',
    images: ['https://helpinghands.com/twitter-image.jpg'],
  },
};
