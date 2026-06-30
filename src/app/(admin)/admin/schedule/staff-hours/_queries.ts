import 'server-only';

import { prisma } from '@/lib/prisma';
import { assertAdminBusiness } from '@/lib/auth/assert-admin';

export async function listStaffOptions() {
  const { businessId } = await assertAdminBusiness();

  return prisma.staff.findMany({
    where: { businessId, isActive: true },
    orderBy: { name: 'asc' },
    select: { id: true, name: true, email: true },
  });
}

export async function listStaffHours() {
  const { businessId } = await assertAdminBusiness();

  return prisma.staffHour.findMany({
    where: { staff: { businessId } },
    orderBy: [{ staffId: 'asc' }, { weekday: 'asc' }, { startMin: 'asc' }],
    select: {
      id: true,
      staffId: true,
      weekday: true,
      startMin: true,
      endMin: true,
      isClosed: true,
    },
  });
}
