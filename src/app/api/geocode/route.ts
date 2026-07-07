import { NextResponse } from 'next/server';

import { z } from 'zod';

const querySchema = z.object({
  q: z.string().min(3).max(200),
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const parsed = querySchema.safeParse({ q: url.searchParams.get('q') });

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const q = parsed.data.q;

  // Basic, low-volume geocode (Nominatim). Avoid autocomplete and excessive usage.
  const endpoint = new URL('https://nominatim.openstreetmap.org/search');
  endpoint.searchParams.set('q', q);
  endpoint.searchParams.set('format', 'json');
  endpoint.searchParams.set('addressdetails', '1');
  endpoint.searchParams.set('limit', '5');

  const res = await fetch(endpoint.toString(), {
    headers: {
      // Set a descriptive UA in prod; some runtimes block custom UA. This is still better than nothing.
      Accept: 'application/json',
      'User-Agent': 'booking-app/1.0 (contact: support@example.com)',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    return NextResponse.json(
      { ok: false, error: 'Geocoding failed.' },
      { status: 502 },
    );
  }

  const json = (await res.json()) as Array<any>;

  const results = json.map((r) => ({
    displayName: r.display_name as string,
    lat: Number(r.lat),
    lng: Number(r.lon),
    placeId: String(r.place_id),
  }));

  return NextResponse.json({ ok: true, results });
}
