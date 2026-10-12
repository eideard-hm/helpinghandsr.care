/**
 * The hours a visitor can ask for. Each one sets where the sun stands in the
 * section drawing and how the WhatsApp message words the request.
 */
export const HOURS = [
  {
    id: 'morning',
    label: 'Morning',
    time: '09:00',
    phrase: 'in the morning, around 09:00',
    light: 'Morning sun',
  },
  {
    id: 'afternoon',
    label: 'Afternoon',
    time: '14:00',
    phrase: 'in the afternoon, around 14:00',
    light: 'High sun',
  },
  {
    id: 'evening',
    label: 'Evening',
    time: '18:30',
    phrase: 'in the evening, around 18:30',
    light: 'Evening sun',
  },
  {
    id: 'night',
    label: 'Night',
    time: '21:00',
    phrase: 'at night, around 21:00',
    light: 'After dark',
  },
] as const;

export type Hour = (typeof HOURS)[number];
export type HourId = Hour['id'];

// The low evening sun reaches all the way to the door, so the drawing opens on it.
export const DEFAULT_HOUR: HourId = 'evening';

export const getHour = (id: HourId): Hour =>
  HOURS.find((hour) => hour.id === id) ?? HOURS[2];
