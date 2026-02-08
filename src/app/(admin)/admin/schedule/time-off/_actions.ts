'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { assertAdminBusiness } from '@/lib/auth/assert-admin';
import { createTimeOffSchema, deleteTimeOffSchema } from './_schemas';
import { businessDayToUtc } from '@/lib/time/tz';
import type { ActionResult } from '@/lib/actions/action-result';

export async function createTimeOffAction(
  formData: FormData,
): Promise<ActionResult> {
  const { businessId } = await assertAdminBusiness();

  const parsed = createTimeOffSchema.safeParse({
    date: formData.get('date'),
    staffId: formData.get('staffId'),
    allDay: formData.get('allDay') === 'on',
    startMin: formData.get('startMin'),
    endMin: formData.get('endMin'),
    reason: formData.get('reason'),
  });

  if (!parsed.success) {
    return {
      ok: false,
      errors: {
        fields: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      },
    };
  }

  const business = await prisma.business.findUnique({
    where: { id: businessId },
    select: { timezone: true },
  });

  if (!business) {
    return { ok: false, errors: { form: ['Business not found.'] } };
  }

  const dayUtc = businessDayToUtc(parsed.data.date, business.timezone);

  await prisma.timeOff.create({
    data: {
      businessId,
      staffId: parsed.data.staffId,
      date: dayUtc,
      startMin: parsed.data.allDay ? null : parsed.data.startMin!,
      endMin: parsed.data.allDay ? null : parsed.data.endMin!,
      reason: parsed.data.reason,
    },
  });

  revalidatePath('/admin/schedule/time-off');
  return { ok: true };
}

export async function deleteTimeOffAction(
  formData: FormData,
): Promise<ActionResult> {
  await assertAdminBusiness();

  const parsed = deleteTimeOffSchema.safeParse({ id: formData.get('id') });
  if (!parsed.success) {
    return {
      ok: false,
      errors: {
        fields: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      },
    };
  }

  await prisma.timeOff.delete({ where: { id: parsed.data.id } });
  revalidatePath('/admin/schedule/time-off');
  return { ok: true };
}
