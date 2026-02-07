import 'server-only';

import { fromZonedTime } from 'date-fns-tz';

export function businessDayToUtc(dateISO: string, businessTz: string) {
  const localDateTime = `${dateISO}T00:00:00`;
  return fromZonedTime(localDateTime, businessTz);
}
