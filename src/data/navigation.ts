export const NAV_ITEMS = [
  { id: 'how-it-works', label: 'The visit' },
  { id: 'services', label: 'Treatments' },
  { id: 'about', label: 'Richard' },
  { id: 'testimonials', label: 'Clients' },
  { id: 'faq', label: 'Questions' },
] as const;

export const NAV_SECTION_IDS = NAV_ITEMS.map((item) => item.id);
