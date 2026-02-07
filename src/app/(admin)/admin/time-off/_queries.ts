import 'server-only';

import { prisma } from '@/lib/prisma';
import { assertAdminBusiness } from '@/lib/auth/assert-admin';

export async function listTimeOff() {
  const { businessId } = await assertAdminBusiness();

  return prisma.timeOff.findMany({
    where: { businessId },
    orderBy: [{ date: 'asc' }, { startMin: 'asc' }],
    include: { staff: { select: { id: true, name: true } } },
  });
}

export async function listStaffOptions() {
  const { businessId } = await assertAdminBusiness();

  return prisma.staff.findMany({
    where: { businessId, isActive: true },
    orderBy: { name: 'asc' },
    select: { id: true, name: true },
  });
}
