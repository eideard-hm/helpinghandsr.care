import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconMail,
} from '@tabler/icons-react';

import { env } from '@/config/env';
import { waLinkWithEnv } from '@/lib/whatsapp';

type SocialMediaItemsProps = {
  classList?: string;
};

export function SocialMediaItems({ classList }: SocialMediaItemsProps) {
     const waHref = waLinkWithEnv()

  return (
    <ul className={`${classList}`}>
      <li className='rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow hover:scale-100'>
        <a
          href={waHref}
          target='_blank'
          rel='noopener noreferrer'
          className='text-[var(--brand)] hover:text-green-500 transition'
          aria-label={`WhatsApp - ${env.whatsAppNumber}`}
        >
          <IconBrandWhatsapp
            size={24}
            className='inline-block'
          />
        </a>
      </li>

      <li className='rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow hover:scale-100'>
        <a
          href='mailto:services@healinghandsr.com'
          target='_blank'
          rel='noopener noreferrer'
          className='text-[#D44638] hover:text-red-500 transition duration-200'
          aria-label='Email - Healing Hands.R'
        >
          <IconMail
            size={24}
            className='inline-block'
          />
        </a>
      </li>
      
      <li className='rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow hover:scale-100'>
        <a
          href='https://www.facebook.com/HealingHands.R1'
          target='_blank'
          rel='noopener noreferrer'
          className='text-[#1877F2] hover:text-blue-700 transition duration-200'
          aria-label='Facebook - Healing Hands.R'
        >
          <IconBrandFacebook
            size={24}
            className='inline-block'
          />
        </a>
      </li>

      <li className='rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow hover:scale-100'>
        <a
          href='https://www.instagram.com/healinghands.r1'
          target='_blank'
          rel='noopener noreferrer'
          className='text-[#e1306c] hover:text-pink-500 transition'
          aria-label='Instagram - Healing Hands.R'
        >
          <IconBrandInstagram
            size={24}
            className='inline-block'
          />
        </a>
      </li>
    </ul>
  );
}
