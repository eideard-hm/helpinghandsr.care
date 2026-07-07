'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { assertAdminBusiness } from '@/lib/auth/assert-admin';
import { upsertBusinessHourSchema, deleteBusinessHourSchema } from './_schemas';

function overlaps(
  a: { startMin: number; endMin: number },
  b: { startMin: number; endMin: number },
) {
  return a.startMin < b.endMin && b.startMin < a.endMin;
}

export async function upsertBusinessHourAction(formData: FormData) {
  const { businessId } = await assertAdminBusiness();

  const parsed = upsertBusinessHourSchema.safeParse({
    id: String(formData.get('id') ?? '').trim() || undefined,
    weekday: formData.get('weekday'),
    startMin: formData.get('startMin'),
    endMin: formData.get('endMin'),
    isClosed: formData.get('isClosed') === 'on',
  });

  if (!parsed.success) {
    return { ok: false as const, errors: parsed.error.flatten().fieldErrors };
  }

  const { id, weekday, startMin, endMin, isClosed } = parsed.data;

  // Si está cerrado, normalmente no deberías tener start/end. Aquí lo dejamos permitido,
  // pero si lo quieres más estricto, lo forzamos a 0/0.
  if (!isClosed) {
    // Validar no solapamiento contra otras franjas del mismo día
    const existing = await prisma.businessHour.findMany({
      where: {
        businessId,
        weekday,
        ...(id ? { NOT: { id } } : {}),
        isClosed: false,
      },
      select: { id: true, startMin: true, endMin: true },
      orderBy: { startMin: 'asc' },
    });

    const candidate = { startMin, endMin };

    const hit = existing.find((r) => overlaps(candidate, r));
    if (hit) {
      return {
        ok: false as const,
        errors: {
          _form: ['Esta franja se cruza con otra del mismo día. Ajusta horas.'],
        },
      };
    }
  }

  // Upsert
  if (id) {
    await prisma.businessHour.update({
      where: { id },
      data: { businessId, weekday, startMin, endMin, isClosed },
    });
  } else {
    await prisma.businessHour.create({
      data: { businessId, weekday, startMin, endMin, isClosed },
    });
  }

  revalidatePath('/admin/schedule/business-hours');
  return { ok: true as const };
}

export async function deleteBusinessHourAction(formData: FormData) {
  await assertAdminBusiness();

  const parsed = deleteBusinessHourSchema.safeParse({ id: formData.get('id') });
  if (!parsed.success) {
    return { ok: false as const, errors: parsed.error.flatten().fieldErrors };
  }

  await prisma.businessHour.delete({ where: { id: parsed.data.id } });

  revalidatePath('/admin/schedule/business-hours');
  return { ok: true as const };
}
