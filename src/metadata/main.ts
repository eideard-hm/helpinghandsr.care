import type { Metadata } from 'next';

import { env } from '@/config/env';
import { FAQ_ITEMS } from '@/data/faq';
import {
  CONTACT,
  SERVICE_AREA_GEO,
  SERVICE_AREAS,
  SIGNATURE_TECHNIQUES,
  SITE_UPDATED_AT,
  SOCIAL_LINKS,
  THERAPIST,
} from '@/data/site';
import { waLinkWithEnv } from '@/lib/whatsapp';

export const siteUrl = env.siteUrl || 'https://zeinmotion.vercel.app';

const prodUrl = new URL(siteUrl);
const BUSINESS_EMAIL = CONTACT.email;
const BUSINESS_PHONE_SCHEMA = CONTACT.phoneSchema;
const FACEBOOK_URL = SOCIAL_LINKS.facebook.href;
const INSTAGRAM_URL = SOCIAL_LINKS.instagram.href;
const OG_IMAGE = `${prodUrl}og-zeinmotion.jpg`;
// Google asks for 16:9, 4:3 and 1:1 images for local business results.
const SCHEMA_IMAGES = [
  OG_IMAGE,
  `${prodUrl}og-zeinmotion-4x3.jpg`,
  `${prodUrl}og-zeinmotion-1x1.jpg`,
];

const ID = {
  business: `${prodUrl}#business`,
  therapist: `${prodUrl}#richard-mahecha`,
  website: `${prodUrl}#website`,
  webpage: `${prodUrl}#webpage`,
  service: `${prodUrl}#home-massage`,
  faq: `${prodUrl}#faq`,
};

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

const SEO_TITLE = `Home Massage Abu Dhabi | ${env.brandSEO} Premium Massage at Home`;
const SEO_DESCRIPTION = `Premium home massage in Abu Dhabi. ${env.brandSEO} brings therapeutic sessions to your home or hotel for chronic pain, injuries and stress. Book on WhatsApp.`;
const SOCIAL_TITLE = `${env.brandSEO} - Premium Massage at Home in Abu Dhabi`;
const SOCIAL_DESCRIPTION = `Therapeutic home massage in Abu Dhabi by ${THERAPIST.name}, ${THERAPIST.yearsOfExperience}+ years of experience: sports, deep tissue, stretching, reflexology and cupping. Book on WhatsApp.`;

const generateKeywords = () => {
  const serviceKeywords = CORE_SERVICES.flatMap((service) => [
    `${service} Abu Dhabi`,
    `${service} at home`,
  ]);

  return [
    'home massage Abu Dhabi',
    'massage at home Abu Dhabi',
    'mobile massage therapist Abu Dhabi',
    'massage therapist Abu Dhabi home visits',
    'premium massage at home Abu Dhabi',
    'hotel massage Abu Dhabi',
    'pain relief massage Abu Dhabi',
    'sports recovery massage Abu Dhabi',
    'WhatsApp massage booking Abu Dhabi',
    ...serviceKeywords,
    ...SERVICE_AREAS.map((area) => `home massage ${area}`),
  ];
};

export const mainMetadata: Metadata = {
  metadataBase: prodUrl,
  title: {
    default: SEO_TITLE,
    template: `%s | ${env.brandSEO} Abu Dhabi`,
  },
  description: SEO_DESCRIPTION,
  applicationName: env.brandSEO,

  keywords: generateKeywords(),

  authors: [{ name: env.brandSEO, url: siteUrl }],
  creator: 'Edier Hernandez',
  publisher: env.brandSEO,

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
    siteName: env.brandSEO,
    title: SOCIAL_TITLE,
    description: SOCIAL_DESCRIPTION,
    url: prodUrl,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${env.brandSEO} - Premium massage at home in Abu Dhabi`,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: SOCIAL_TITLE,
    description: SOCIAL_DESCRIPTION,
    images: [OG_IMAGE],
  },

  alternates: {
    canonical: prodUrl,
  },

  category: 'Health & Wellness',
  classification: 'Home Massage Therapy',

  other: {
    'geo.region': 'AE-AZ',
    'geo.placename': CONTACT.city,
    'geo.position': `${SERVICE_AREA_GEO.latitude};${SERVICE_AREA_GEO.longitude}`,
    ICBM: `${SERVICE_AREA_GEO.latitude}, ${SERVICE_AREA_GEO.longitude}`,
  },

  icons: {
    icon: [
      { url: '/favicon_16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon_32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon_48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon_64x64.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon_32x32.png'],
  },
};

export const businessSchema = {
  '@type': 'HealthAndBeautyBusiness',
  '@id': ID.business,
  name: env.brandSEO,
  alternateName: [env.brand, `${env.brandSEO} - Premium Massage At Home`],
  slogan: env.brandLogotype,
  description: `${env.brandSEO} is a premium home massage service in Abu Dhabi. ${THERAPIST.name}, a ${THERAPIST.role} with ${THERAPIST.yearsOfExperience}+ years of experience, visits homes, hotels and residences to relieve chronic pain, prevent injuries and reduce stress with customized treatments.`,
  url: prodUrl.toString(),
  image: SCHEMA_IMAGES,
  logo: `${prodUrl}icon-512.png`,
  telephone: BUSINESS_PHONE_SCHEMA,
  email: BUSINESS_EMAIL,
  priceRange: '$$',
  currenciesAccepted: 'AED',
  address: {
    '@type': 'PostalAddress',
    addressLocality: CONTACT.city,
    addressRegion: 'Abu Dhabi',
    addressCountry: 'AE',
  },
  areaServed: [
    {
      '@type': 'City',
      name: CONTACT.city,
      sameAs: 'https://en.wikipedia.org/wiki/Abu_Dhabi',
    },
    {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: SERVICE_AREA_GEO.latitude,
        longitude: SERVICE_AREA_GEO.longitude,
      },
      geoRadius: SERVICE_AREA_GEO.radiusMeters,
    },
    ...SERVICE_AREAS.map((area) => ({ '@type': 'Place', name: area })),
  ],
  knowsAbout: [...CORE_SERVICES, ...SIGNATURE_TECHNIQUES],
  sameAs: [INSTAGRAM_URL, FACEBOOK_URL],
  founder: { '@id': ID.therapist },
  employee: { '@id': ID.therapist },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: BUSINESS_PHONE_SCHEMA,
    email: BUSINESS_EMAIL,
    contactType: 'reservations',
    areaServed: 'AE',
    availableLanguage: ['en'],
  },
  potentialAction: {
    '@type': 'ReserveAction',
    name: 'Book a home massage on WhatsApp',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: waLinkWithEnv(),
      actionPlatform: [
        'https://schema.org/DesktopWebPlatform',
        'https://schema.org/MobileWebPlatform',
      ],
    },
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Home massage services in Abu Dhabi',
    itemListElement: CORE_SERVICES.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service,
        serviceType: 'Home massage therapy',
        areaServed: { '@type': 'City', name: CONTACT.city },
        provider: { '@id': ID.business },
      },
    })),
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '09:00',
      closes: '22:00',
    },
  ],
};

export const therapistSchema = {
  '@type': 'Person',
  '@id': ID.therapist,
  name: THERAPIST.name,
  jobTitle: THERAPIST.role,
  description: `${THERAPIST.role} and creator of the ${env.brandSEO} massage method, with ${THERAPIST.yearsOfExperience}+ years of experience in therapeutic, sports and deep tissue massage in Abu Dhabi.`,
  image: `${prodUrl}${THERAPIST.image.slice(1)}`,
  url: `${prodUrl}#about`,
  worksFor: { '@id': ID.business },
  knowsAbout: [...THERAPIST.credentials.certifiedIn, 'Assisted Stretching'],
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    name: THERAPIST.role,
    credentialCategory: 'diploma',
    educationalLevel: THERAPIST.credentials.trainedAt,
    recognizedBy: THERAPIST.credentials.attestedBy.map((name) => ({
      '@type': 'Organization',
      name,
    })),
  },
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: THERAPIST.credentials.trainedAt,
  },
  sameAs: [INSTAGRAM_URL],
};

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': ID.website,
  name: env.brandSEO,
  url: prodUrl.toString(),
  inLanguage: 'en',
  publisher: { '@id': ID.business },
};

export const webPageSchema = {
  '@type': 'WebPage',
  '@id': ID.webpage,
  url: prodUrl.toString(),
  name: SEO_TITLE,
  description: SEO_DESCRIPTION,
  inLanguage: 'en',
  isPartOf: { '@id': ID.website },
  about: { '@id': ID.business },
  mainEntity: { '@id': ID.business },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: OG_IMAGE,
    width: 1200,
    height: 630,
  },
  dateModified: SITE_UPDATED_AT,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '#benefits-title', '#faq-title'],
  },
};

export const homeMassageServiceSchema = {
  '@type': 'Service',
  '@id': ID.service,
  name: 'Home massage in Abu Dhabi',
  description:
    'Therapeutic massage delivered to homes, hotels and residences across Abu Dhabi, tailored to chronic pain, injury prevention, sports recovery and stress relief.',
  serviceType: 'Home massage therapy',
  provider: { '@id': ID.business },
  areaServed: { '@type': 'City', name: CONTACT.city },
  audience: {
    '@type': 'PeopleAudience',
    audienceType:
      'Athletes, active professionals, office workers and anyone with chronic pain, stiffness or stress',
  },
};

export const faqSchema = {
  '@type': 'FAQPage',
  '@id': ID.faq,
  isPartOf: { '@id': ID.webpage },
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default mainMetadata;
