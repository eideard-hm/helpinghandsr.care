/**
 * Date of the last content update (ISO). Feeds the sitemap, the structured
 * data and llms.txt, so bump it whenever copy, services or FAQs change.
 */
export const SITE_UPDATED_AT = '2026-09-28';

export const CONTACT = {
  phoneDisplay: '+971 54 374 0644',
  phoneSchema: '+971543740644',
  phoneHref: 'tel:+971543740644',
  email: 'zeinmotionspa@gmail.com',
  city: 'Abu Dhabi',
  country: 'United Arab Emirates',
  availability: '7 days a week, by appointment',
} as const;

export const SOCIAL_LINKS = {
  instagram: {
    label: 'Instagram',
    handle: '@zeinmotionuae',
    href: 'https://www.instagram.com/zeinmotionuae/',
  },
  facebook: {
    label: 'Facebook',
    handle: 'ZeinMotion - Premium Massage At Home',
    href: 'https://web.facebook.com/ZeinMotion/',
  },
} as const;

export const THERAPIST = {
  name: 'Richard Mahecha',
  role: 'Physical Therapy Technician',
  image: '/Richard-Mahecha.webp',
  yearsOfExperience: 20,
  /** Attestations and training named on the About section. */
  credentials: {
    attestedBy: [
      'Ministry of Foreign Affairs of the UAE (MOFA)',
      'Knowledge and Human Development Authority (KHDA)',
    ],
    trainedAt: 'Newton Training Center, Abu Dhabi',
    certifiedIn: [
      'Deep Tissue Massage',
      'Sports Massage',
      'Reflexology',
      'Cupping Therapy',
      'Lymphatic Drainage',
    ],
  },
} as const;

// Techniques the client lists on Instagram and Facebook.
export const SIGNATURE_TECHNIQUES = [
  'Sports Massage',
  'Deep Tissue',
  'Assisted Stretching',
  'Reflexology',
  'Cupping',
  'Lymphatic Drainage',
] as const;

/** Neighbourhoods commonly visited; the whole emirate is covered on request. */
export const SERVICE_AREAS = [
  'Al Reem Island',
  'Yas Island',
  'Saadiyat Island',
  'Khalifa City',
  'Al Raha',
  'Al Maryah Island',
  'Corniche',
  'Mohammed Bin Zayed City',
] as const;

/** Centre of the service area (Abu Dhabi city) and its radius in metres. */
export const SERVICE_AREA_GEO = {
  latitude: 24.4539,
  longitude: 54.3773,
  radiusMeters: 45000,
} as const;
