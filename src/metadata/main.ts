import type { Metadata } from 'next';

import { env } from '@/config/env';

export const siteUrl = env.siteUrl || 'https://zeinmotion.vercel.app';

const prodUrl = new URL(siteUrl);
const BUSINESS_EMAIL = 'zeinmotionspa@gmail.com';
const BUSINESS_PHONE_DISPLAY = '+971 54 374 0644';
const BUSINESS_PHONE_SCHEMA = '+971543740644';
const FACEBOOK_URL = 'https://web.facebook.com/ZeinMotion/';
const INSTAGRAM_URL = 'https://www.instagram.com/zeinmotionuae/';

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
    'Al Maryah Island',
    'Corniche',
    'Mohammed Bin Zayed City',
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
    'home massages in Abu Dhabi',
    'home massage in Abu Dhabi',
    'massage home service Abu Dhabi',
    'mobile massage therapist',
    'massage at home service',
    'wellness therapy Abu Dhabi',
    'professional massage therapist',
    'home massage prices Abu Dhabi',
    'WhatsApp massage booking Abu Dhabi',
    'premium massage at home Abu Dhabi',
    'customized home massage Abu Dhabi',
    'tailored massage treatments Abu Dhabi',
    'personalized home massage Abu Dhabi',
    'massage therapist Abu Dhabi home visits',

    ...painReliefKeywords.flatMap((keyword) => [
      `${keyword} Abu Dhabi`,
      `${keyword} at home`,
    ]),
    'تدليك منزلي أبوظبي',
    'مساج في البيت أبوظبي',
    'علاج طبيعي منزلي',
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
    default: `Home Massage in Abu Dhabi | Mobile Massage Therapist | ${env.brandSEO}`,
    template: `%s | ${env.brandSEO} - Professional Home Massage Abu Dhabi`,
  },
  description: `${env.brandSEO} provides home massages in Abu Dhabi with premium in-home massage therapy. Specialized in ${CORE_SERVICES.slice(
    0,
    4
  ).join(
    ', '
  )} and more. Home visits, customized treatments, chronic pain relief, injury prevention, stress reduction, and self-care wellness. Book by WhatsApp: ${BUSINESS_PHONE_DISPLAY}`,

  keywords: generateKeywords(),

  authors: [
    {
      name: 'Edier Hernandez',
      url: 'https://edier-hm.netlify.app/',
    },
  ],

  creator: 'Edier Hernandez',
  publisher: `${env.brandSEO}`,

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
    siteName: `${env.brandSEO} | Professional Home Massage Abu Dhabi`,
    title: `Home Massage in Abu Dhabi | ${env.brandSEO} - Mobile Massage Therapist`,
    description: `Professional home massages in Abu Dhabi with WhatsApp booking. ${CORE_SERVICES.slice(
      0,
      3
    ).join(', ')} and customized treatments for chronic pain, injury prevention, stiffness, and stress relief. Book your home visit: ${BUSINESS_PHONE_DISPLAY}`,
    url: prodUrl,
    images: [
      {
        url: `${prodUrl}og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${env.brandSEO} - Professional Home Massage Therapy in Abu Dhabi - ZeinMotion, Sports Massage & Pain Relief Services`,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: `Home Massage Abu Dhabi | ${env.brandSEO} - Mobile Therapy Services`,
    description: `Professional home massage in Abu Dhabi: ${CORE_SERVICES.slice(
      0,
      3
    ).join(', ')}. Home visits, tailored treatments, pain relief, and wellness care. Book your home visit: ${BUSINESS_PHONE_DISPLAY}`,
    images: [`${prodUrl}og-image.jpg`],
  },

  alternates: {
    canonical: prodUrl,
  },

  category: 'Health & Wellness',
  classification: 'Professional Massage Therapy Services',

  other: {
    'contact:phone': BUSINESS_PHONE_SCHEMA,
    'contact:email': BUSINESS_EMAIL,
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
    title: `Our Massage Services in Abu Dhabi | ${env.brandSEO} - Professional Treatments`,
    description: `Explore our professional massage services in Abu Dhabi: ${CORE_SERVICES.join(
      ', '
    )}. Personalized treatments for pain relief and wellness.`,
    keywords: CORE_SERVICES.map(
      (service) =>
        `${service} Abu Dhabi, home ${service}, mobile ${service} service`
    ).flat(),
  },

  booking: {
    title: `Book Home Massage in Abu Dhabi | ${env.brandSEO} - Schedule Your Visit`,
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
    title: `Contact Professional Massage Therapist | ${env.brandSEO} - Abu Dhabi`,
    description: `Contact our professional massage therapist in Abu Dhabi for premium home visits, customized treatments, chronic pain relief, and wellness care. Call ${BUSINESS_PHONE_DISPLAY} or email ${BUSINESS_EMAIL}`,
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
  name: env.brandSEO,
  description: mainMetadata.description,
  image: `${prodUrl}og-image.jpg`,
  logo: `${prodUrl}favicon_64x64.png`,
  telephone: BUSINESS_PHONE_SCHEMA,
  email: BUSINESS_EMAIL,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Abu Dhabi',
    addressRegion: 'UAE',
    addressCountry: 'AE',
  },
  areaServed: 'Abu Dhabi and surrounding areas',
  serviceType: CORE_SERVICES,
  sameAs: [FACEBOOK_URL, INSTAGRAM_URL],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Home massage services in Abu Dhabi',
    itemListElement: CORE_SERVICES.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service,
        areaServed: 'Abu Dhabi',
        serviceType: 'Home massage therapy',
      },
    })),
  },
  openingHours: 'Mo-Su 09:00-22:00',
  url: prodUrl.toString(),
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: env.brandSEO,
  url: prodUrl.toString(),
  description: mainMetadata.description,
  inLanguage: 'en-AE',
};

export const homeMassageServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Home massage in Abu Dhabi',
  description:
    'Professional home massage therapy delivered to homes, hotels, and residences across Abu Dhabi.',
  provider: {
    '@type': 'LocalBusiness',
    name: env.brandSEO,
    telephone: BUSINESS_PHONE_SCHEMA,
  },
  areaServed: {
    '@type': 'City',
    name: 'Abu Dhabi',
  },
  serviceType: 'Home massage therapy',
};

export default mainMetadata;
