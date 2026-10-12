'use client';

import { cn } from '@/lib/cn';
import { waLinkAtHour, waLinkWithEnv } from '@/lib/whatsapp';
import { useOptionalVisit } from './visit-provider';

type WhatsAppLinkProps = {
  children: React.ReactNode;
  waLink?: string;
  className?: string;
};

/** An inline WhatsApp link that, like the buttons, carries the hour once the visitor has chosen one. */
export function WhatsAppLink({
  children,
  waLink = waLinkWithEnv(),
  className,
}: WhatsAppLinkProps) {
  const visit = useOptionalVisit();
  const href = waLinkAtHour(waLink, visit?.chosen ? visit.hour : undefined);

  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className={cn(
        'inline-flex min-h-6 items-center font-medium text-life-deep underline decoration-life/40 transition-colors hover:decoration-life',
        className
      )}
    >
      {children}
      <span className='sr-only'> (opens WhatsApp)</span>
    </a>
  );
}
