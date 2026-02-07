import type { ComponentType } from 'react';

import { IconCalendarEvent, IconClock } from '@tabler/icons-react';

export const menuItems: MenuItem[] = [
  {
    label: 'Bookings',
    href: '/admin/bookings',
    icon: IconCalendarEvent,
    match: (path: string) => path === '/admin/bookings',
  },
  {
    label: 'Business Hours',
    href: '/admin/schedule/business-hours',
    icon: IconClock,
    match: (path: string) => path.startsWith('/admin/schedule'),
  },
  {
    label: 'Time Off',
    href: '/admin/schedule/time-off',
    icon: IconClock,
    match: (path: string) => path.startsWith('/admin/schedule/time-off'),
  },
] as const;

type MenuItem = {
  label: string;
  href: string;
  icon: ComponentType<{ size?: number; stroke?: number }>;
  match: (path: string) => boolean;
};
