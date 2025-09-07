import { IconBrandWhatsapp } from '@tabler/icons-react';

import { env } from '@/config/env';
import { waLink } from '@/lib/whatsapp';

export function WhatsAppButton() {
  const waHref = waLink(env.whatsAppNumber, env.waMessage);

  return (
    <a
      href={waHref}
      target='_blank'
      rel='noopener noreferrer'
      className='inline-flex items-center rounded-xl px-4 py-2 font-semibold text-white shadow
                 transition will-change-transform
                 hover:scale-[1.02] active:scale-[0.98]'
      style={{ backgroundColor: 'var(--brand)' }}
    >
      <IconBrandWhatsapp
        size={24}
        className='mr-2'
      />
      Schedule via WhatsApp
    </a>
  );
}
