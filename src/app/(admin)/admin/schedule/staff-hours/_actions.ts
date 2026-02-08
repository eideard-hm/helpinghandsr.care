'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { assertAdminBusiness } from '@/lib/auth/assert-admin';
import { upsertStaffHourSchema, deleteStaffHourSchema } from './_schemas';
import type { ActionResult } from '@/lib/actions/action-result';

function overlaps(
  a: { startMin: number; endMin: number },
  b: { startMin: number; endMin: number },
) {
  return a.startMin < b.endMin && b.startMin < a.endMin;
}

export async function upsertStaffHourAction(
  formData: FormData,
): Promise<ActionResult> {
  const { businessId } = await assertAdminBusiness();

  const parsed = upsertStaffHourSchema.safeParse({
    id: String(formData.get('id') ?? '').trim() || undefined,
    staffId: String(formData.get('staffId') ?? '').trim(),
    weekday: formData.get('weekday'),
    startMin: formData.get('startMin'),
    endMin: formData.get('endMin'),
    isClosed: formData.get('isClosed') === 'on',
  });

  if (!parsed.success) {
    return {
      ok: false,
      errors: {
        fields: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      },
    };
  }

  const { id, staffId, weekday, startMin, endMin, isClosed } = parsed.data;

  // Safety: ensure staff belongs to this business
  const staff = await prisma.staff.findFirst({
    where: { id: staffId, businessId },
    select: { id: true },
  });
  if (!staff)
    return { ok: false, errors: { form: ['Staff not found or not allowed.'] } };

  if (!isClosed) {
    const existing = await prisma.staffHour.findMany({
      where: {
        staffId,
        weekday,
        isClosed: false,
        ...(id ? { NOT: { id } } : {}),
      },
      select: { id: true, startMin: true, endMin: true },
      orderBy: { startMin: 'asc' },
    });

    const candidate = { startMin, endMin };
    const hit = existing.find((r) => overlaps(candidate, r));
    if (hit) {
      return {
        ok: false,
        errors: {
          form: ['This time range overlaps another range for the same day.'],
        },
      };
    }
  }

  if (id) {
    await prisma.staffHour.update({
      where: { id },
      data: { staffId, weekday, startMin, endMin, isClosed },
    });
  } else {
    await prisma.staffHour.create({
      data: { staffId, weekday, startMin, endMin, isClosed },
    });
  }

  revalidatePath('/admin/schedule/staff-hours');
  return { ok: true };
}

export async function deleteStaffHourAction(
  formData: FormData,
): Promise<ActionResult> {
  await assertAdminBusiness();

  const parsed = deleteStaffHourSchema.safeParse({ id: formData.get('id') });
  if (!parsed.success) {
    return {
      ok: false,
      errors: {
        fields: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      },
    };
  }

  await prisma.staffHour.delete({ where: { id: parsed.data.id } });
  revalidatePath('/admin/schedule/staff-hours');
  return { ok: true };
}
