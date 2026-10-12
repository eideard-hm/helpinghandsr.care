export const NAV_ITEMS = [
  { id: 'benefits', label: 'Benefits' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'how-it-works', label: 'How it works' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'faq', label: 'FAQ' },
] as const;

export const NAV_SECTION_IDS = NAV_ITEMS.map((item) => item.id);
