'use client';

import { IconBrandWhatsapp } from '@tabler/icons-react';

interface WhatsAppButtonProps {
  waLink: string;
  classList?: string;
}

export function WhatsAppButton({ waLink, classList }: WhatsAppButtonProps) {
  return (
    <a
      href={waLink}
      target='_blank'
      rel='noopener noreferrer'
      className={`inline-flex items-center rounded-xl px-4 py-2 font-semibold text-white shadow transition will-change-transform hover:scale-[1.02] active:scale-[0.98] ${classList}`}
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
