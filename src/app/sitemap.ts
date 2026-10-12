import type { MetadataRoute } from 'next';

import { SITE_UPDATED_AT } from '@/data/site';
import { siteUrl } from '@/metadata/main';

export default function sitemap(): MetadataRoute.Sitemap {
  // A real content date: a build timestamp changes on every deploy and teaches
  // crawlers to ignore lastmod.
  const lastModified = new Date(SITE_UPDATED_AT);

  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
