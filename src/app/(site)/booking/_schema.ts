import { z } from 'zod';

export const createBookingHoldSchema = z.object({
  businessId: z.string().min(1),
  serviceId: z.string().min(1),
  staffId: z.string().optional(),

  startAtISO: z.string().datetime(), // UTC ISO
  // You can omit endAtISO and compute from service duration (recommended)

  customerName: z.string().min(2).max(120),
  phone: z.string().min(6).max(30),
  email: z.string().email().optional(),
  addressText: z.string().max(300).optional(),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
  placeId: z.string().max(200).optional(),
  notes: z.string().max(500).optional(),
});

export const confirmBookingSchema = z.object({
  bookingId: z.string().min(1),
});

export const cancelBookingSchema = z.object({
  bookingId: z.string().min(1),
  reason: z.string().max(200).optional(),
});
