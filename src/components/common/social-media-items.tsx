import { IconBrandFacebook, IconBrandInstagram } from '@tabler/icons-react';

import { env } from '@/config/env';
import { SOCIAL_LINKS } from '@/data/site';
import { cn } from '@/lib/cn';

type SocialMediaItemsProps = {
  classList?: string;
  /** The ground the links sit on. */
  ground?: 'limewash' | 'poche';
};

const ITEMS = [
  {
    href: SOCIAL_LINKS.instagram.href,
    label: `${env.brandSEO} on Instagram (${SOCIAL_LINKS.instagram.handle})`,
    icon: IconBrandInstagram,
  },
  {
    href: SOCIAL_LINKS.facebook.href,
    label: `${env.brandSEO} on Facebook`,
    icon: IconBrandFacebook,
  },
];

export function SocialMediaItems({
  classList,
  ground = 'limewash',
}: SocialMediaItemsProps) {
  return (
    <ul className={cn('flex gap-1', classList)}>
      {ITEMS.map(({ href, label, icon: Icon }) => (
        <li key={href}>
          <a
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={label}
            title={label}
            className={cn(
              'inline-flex size-11 items-center justify-center transition-colors duration-200',
              ground === 'poche'
                ? 'text-on-poche hover:bg-limewash hover:text-poche'
                : 'text-ink-soft hover:bg-poche hover:text-limewash'
            )}
          >
            <Icon
              size={22}
              stroke={1.5}
              aria-hidden
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
