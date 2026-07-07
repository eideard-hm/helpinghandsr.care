'use server';

import { prisma } from '@/lib/prisma';
import { BenefitsSchema, DBServiceSchema, DetailsSchema } from './_scheme';
import type { UiService } from './_types';

export async function getActiveServices(
  businessId: string,
): Promise<UiService[]> {
  const rows = await prisma.service.findMany({
    where: { businessId, active: true },
    orderBy: [{ isMain: 'desc' }, { createdAt: 'asc' }],
    select: {
      id: true,
      name: true,
      active: true,
      isMain: true,
      image: true,
      bigImage: true,
      excerpt: true,
      waLink: true,
      benefits: true,
      details: true,
      businessId: true,
    },
  });

  return rows.map((row) => {
    const parsed = DBServiceSchema.parse(row);

    const benefits = BenefitsSchema.safeParse(parsed.benefits ?? []);
    const details = DetailsSchema.safeParse(parsed.details ?? []);

    return {
      id: parsed.id,
      title: parsed.name,
      isMain: parsed.isMain ?? false,
      active: parsed.active ?? true,

      image: parsed.image ?? '/services/default.webp',
      bigImage: parsed.bigImage ?? parsed.image ?? '/services/default-big.webp',
      excerpt: parsed.excerpt ?? '',
      waLink: parsed.waLink ?? '',

      benefits: benefits.success ? benefits.data : [],
      details: details.success ? details.data : [],

      businessId: parsed.businessId,
    };
  });
}
