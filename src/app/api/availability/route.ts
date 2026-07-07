import { NextResponse } from 'next/server';

import { z } from 'zod';

import { getAvailability } from '@/lib/availability/engine';

const querySchema = z.object({
  businessId: z.string().min(1),
  serviceId: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  staffId: z.string().optional(),
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const parsed = querySchema.safeParse({
    businessId: url.searchParams.get('businessId'),
    serviceId: url.searchParams.get('serviceId'),
    date: url.searchParams.get('date'),
    staffId: url.searchParams.get('staffId') ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: z.treeifyError(parsed.error) },
      { status: 400 },
    );
  }

  try {
    const result = await getAvailability(parsed.data);
    return NextResponse.json({ ok: true, ...result });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? 'Internal error' },
      { status: 500 },
    );
  }
}
