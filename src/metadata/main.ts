import type { Metadata } from 'next';

import { env } from '@/config/env';

const prodUrl = new URL(env.siteUrl);

const CORE_SERVICES = [
  'ZeinMotion Therapy',
  'Sports Massage',
  'Deep Tissue Massage',
  'Cupping Therapy',
  'Reflexology Therapy',
  'Lymphatic Drainage Massage',
  'Anti-Cellulite Massage',
  'Anti-Stress & Face Massage',
];

const generateKeywords = () => {
  const serviceKeywords = CORE_SERVICES.flatMap((service) => [
    `${service} Abu Dhabi`,
    `${service} at home`,
    `home ${service.toLowerCase()}`,
    `mobile ${service.toLowerCase()} Abu Dhabi`,
  ]);

  const locationKeywords = [
    'Abu Dhabi',
    'UAE',
    'United Arab Emirates',
    'Al Reem Island',
    'Yas Island',
    'Khalifa City',
    'Al Raha',
    'Saadiyat Island',
  ];

  const painReliefKeywords = [
    'chronic pain relief',
    'muscle stiffness',
    'injury prevention',
    'stress relief',
    'sports recovery',
    'post-surgery massage',
    'office workers massage',
    'athlete massage therapy',
  ];

  return [
    ...serviceKeywords,

    'home massage Abu Dhabi',
    'mobile massage therapist',
    'massage at home service',
    'wellness therapy Abu Dhabi',
    'professional massage therapist',

    ...painReliefKeywords.flatMap((keyword) => [
      `${keyword} Abu Dhabi`,
      `${keyword} at home`,
    ]),

    'تدليك منزلي أبوظبي',
    'مساج في البيت أبوظبي',
    'علاج طبيعي منزلي',

    ...locationKeywords.flatMap((location) => [
      `massage at home ${location}`,
      `mobile massage ${location}`,
      `massage therapist ${location}`,
    ]),
  ];
};

export const mainMetadata: Metadata = {
  metadataBase: prodUrl,
  title: {
    default: `Home Massage Therapy Abu Dhabi | ${env.brand} - ZeinMotion, Sports & Deep Tissue Massage`,
    template: `%s | ${env.brand} - Professional Home Massage Abu Dhabi`,
  },
  description: `Professional home massage therapy in Abu Dhabi. Specialized in ${CORE_SERVICES.slice(
    0,
    4
  ).join(
    ', '
  )} and more. Relief chronic pain, reduce stress, improve mobility. Book your home visit today! +971 54 374 0644`,

  keywords: generateKeywords(),

  authors: [
    {
      name: 'Edier Hernandez',
      url: 'https://edier-hm.netlify.app/',
    },
  ],

  creator: 'Edier Hernandez',
  publisher: `${env.brand}`,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_AE',
    siteName: `${env.brand} | Professional Home Massage Abu Dhabi`,
    title: `Home Massage Therapy Abu Dhabi | ${env.brand} - ZeinMotion & Sports Massage`,
    description: `🏠 Professional home massage therapy in Abu Dhabi. ${CORE_SERVICES.slice(
      0,
      3
    ).join(', ')} and more. Book your home visit! +971 54 374 0644`,
    url: prodUrl,
    images: [
      {
        url: `${prodUrl}og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${env.brand} - Professional Home Massage Therapy in Abu Dhabi - ZeinMotion, Sports Massage & Pain Relief Services`,
      },
      {
        url: `${prodUrl}og-image-2.jpg`,
        width: 800,
        height: 600,
        alt: `Mobile Massage Therapist providing ${CORE_SERVICES[0]} in Abu Dhabi home`,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: `Home Massage Abu Dhabi | ${env.brand} - Mobile Therapy Services`,
    description: `Professional home massage in Abu Dhabi: ${CORE_SERVICES.slice(
      0,
      3
    ).join(', ')}. Book your home visit! +971 54 374 0644`,
    images: [`${prodUrl}og-image.jpg`],
    creator: '@healinghandsr',
    site: '@healinghandsr',
  },

  alternates: {
    canonical: prodUrl,
  },

  category: 'Health & Wellness',
  classification: 'Professional Massage Therapy Services',

  other: {
    'contact:phone': '+971543740644',
    'contact:email': 'services@healinghandsr.com',
    'business:service': CORE_SERVICES.join(', '),
    'location:city': 'Abu Dhabi',
    'location:country': 'United Arab Emirates',
    'service:area': 'Abu Dhabi and surrounding areas',
    'service:type': 'Home Visit Massage Therapy',
  },

  icons: {
    icon: [
      { url: '/favicon_16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon_32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon_48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon_64x64.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: [{ url: '/favicon_64x64.png', sizes: '64x64', type: 'image/png' }],
    shortcut: ['/favicon_32x32.png'],
  },
};

export const sectionMetadata = {
  services: {
    title: `Our Massage Services in Abu Dhabi | ${env.brand} - Professional Treatments`,
    description: `Explore our professional massage services in Abu Dhabi: ${CORE_SERVICES.join(
      ', '
    )}. Personalized treatments for pain relief and wellness.`,
    keywords: CORE_SERVICES.map(
      (service) =>
        `${service} Abu Dhabi, home ${service}, mobile ${service} service`
    ).flat(),
  },

  booking: {
    title: `Book Home Massage in Abu Dhabi | ${env.brand} - Schedule Your Visit`,
    description:
      'Book your professional home massage therapy in Abu Dhabi. Easy scheduling, flexible appointments, professional service. Contact us now!',
    keywords: [
      'book massage Abu Dhabi',
      'schedule home massage',
      'massage appointment',
      'wellness booking Abu Dhabi',
      'mobile massage schedule',
    ],
  },

  contact: {
    title: `Contact Professional Massage Therapist | ${env.brand} - Abu Dhabi`,
    description:
      'Contact our professional massage therapist in Abu Dhabi for home visits. Call +971 54 374 0644 or email services@healinghandsr.com',
    keywords: [
      'contact massage therapist Abu Dhabi',
      'massage service contact',
      'wellness therapist phone',
      'home massage inquiry',
    ],
  },
};

export const getSectionMetadata = (
  section: keyof typeof sectionMetadata
): Metadata => ({
  title: sectionMetadata[section].title,
  description: sectionMetadata[section].description,
  keywords: sectionMetadata[section].keywords,
  openGraph: {
    ...mainMetadata.openGraph,
    title: sectionMetadata[section].title,
    description: sectionMetadata[section].description,
    url: `${prodUrl}/${section}`,
  },
  twitter: {
    ...mainMetadata.twitter,
    title: sectionMetadata[section].title,
    description: sectionMetadata[section].description,
  },
});

export const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: env.brand,
  description: mainMetadata.description,
  telephone: '+971543740644',
  email: 'services@healinghandsr.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Abu Dhabi',
    addressRegion: 'UAE',
    addressCountry: 'AE',
  },
  areaServed: 'Abu Dhabi and surrounding areas',
  serviceType: CORE_SERVICES,
  offers: {
    '@type': 'Offer',
    description: 'Professional home massage therapy services',
  },
  openingHours: 'Mo-Su 09:00-22:00',
  url: prodUrl.toString(),
};

export default mainMetadata;
