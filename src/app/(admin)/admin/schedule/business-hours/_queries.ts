import 'server-only';

import { assertAdminBusiness } from '@/lib/auth/assert-admin';
import { prisma } from '@/lib/prisma';

export async function listBusinessHours() {
  const { businessId } = await assertAdminBusiness();

  const rows = await prisma.businessHour.findMany({
    where: { businessId },
    orderBy: [{ weekday: 'asc' }, { startMin: 'asc' }],
  });

  return rows;
}
