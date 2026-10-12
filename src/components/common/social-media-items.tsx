import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconMail,
} from '@tabler/icons-react';

import { env } from '@/config/env';
import { CONTACT, SOCIAL_LINKS } from '@/data/site';
import { cn } from '@/lib/cn';
import { waLinkWithEnv } from '@/lib/whatsapp';

type SocialMediaItemsProps = {
  classList?: string;
  /** `floating`: white round buttons with brand-colored icons. `dark`: for dark backgrounds. `light`: bordered, for light backgrounds. */
  variant?: 'floating' | 'dark' | 'light';
  includeContact?: boolean;
};

const VARIANT_CLASSES = {
  floating:
    'bg-white shadow-lg ring-1 ring-black/5 hover:-translate-y-0.5 hover:shadow-xl',
  dark: 'bg-white/10 text-white ring-1 ring-white/15 hover:bg-white hover:text-ink',
  light:
    'bg-white text-ink ring-1 ring-gray-200 hover:-translate-y-0.5 hover:ring-brand/40 hover:text-brand',
} as const;

export function SocialMediaItems({
  classList,
  variant = 'floating',
  includeContact = true,
}: SocialMediaItemsProps) {
  const items = [
    ...(includeContact
      ? [
          {
            href: waLinkWithEnv(),
            label: `WhatsApp ${CONTACT.phoneDisplay}`,
            icon: IconBrandWhatsapp,
            color: 'text-[#128C7E]',
          },
          {
            href: `mailto:${CONTACT.email}`,
            label: `Email ${CONTACT.email}`,
            icon: IconMail,
            color: 'text-[#D44638]',
          },
        ]
      : []),
    {
      href: SOCIAL_LINKS.instagram.href,
      label: `${env.brandSEO} on Instagram (${SOCIAL_LINKS.instagram.handle})`,
      icon: IconBrandInstagram,
      color: 'text-[#E1306C]',
    },
    {
      href: SOCIAL_LINKS.facebook.href,
      label: `${env.brandSEO} on Facebook`,
      icon: IconBrandFacebook,
      color: 'text-[#1877F2]',
    },
  ];

  return (
    <ul className={cn('flex gap-2', classList)}>
      {items.map(({ href, label, icon: Icon, color }) => (
        <li key={href}>
          <a
            href={href}
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel='noopener noreferrer'
            aria-label={label}
            title={label}
            className={cn(
              'inline-flex size-11 items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
              VARIANT_CLASSES[variant],
              variant === 'floating' && color
            )}
          >
            <Icon
              size={22}
              aria-hidden
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
