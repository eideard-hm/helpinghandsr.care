export type UiService = {
  id: string;
  title: string;
  isMain: boolean;
  image: string;
  bigImage: string;
  excerpt: string;
  waLink: string;
  benefits: { title: string; details: string[] }[];
  details: string[];
  active: boolean;
  businessId: string;
};
