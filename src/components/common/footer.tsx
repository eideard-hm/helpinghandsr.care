import { env } from '@/config/env';
import { waLinkWithEnv } from '@/lib/whatsapp';
import { NavLinks } from '../ui/nav-links';
import { WhatsAppButton } from './whatsapp-btn';

export function Footer() {
  const year = new Date().getFullYear();
  const waHref = waLinkWithEnv();

  return (
    <div className='container mx-auto grid gap-8 md:grid-cols-3 px-4 max-w-7xl text-center md:text-left'>
      <div>
        <h3 className='text-xl font-bold'>{env.brand}</h3>
        <p className='mt-2 text-sm text-gray-300'>{env.brandLogotype}</p>
        <p className='mt-4 text-sm text-gray-400'>
          🏠 Home Visits | Personalized Care
        </p>
        <p className='mt-4 text-sm text-gray-400'>
          💪Helping you prevent injuries & chronic pain
        </p>
        <p className='mt-4 text-sm text-gray-400'>
          👐 Relieve stiffness & stress
        </p>
        <p className='mt-4 text-sm text-gray-400'>💆‍♂️Tailored Treatments.</p>
        <p className='mt-4 text-sm text-gray-400'>
          Stretching & Sports massage, Deep tissue massage, Cupping therapy,
          Reflexology therapy, Lymphatic drainage.
        </p>
      </div>

      <div>
        <h4 className='font-semibold mb-3'>Links</h4>
        <NavLinks />
      </div>

      <div>
        <h4 className='font-semibold mb-3'>Contact</h4>
        <WhatsAppButton waLink={waHref} />
        <p className='mt-4 text-sm text-gray-400'>
          © {year} {env.brand}. All rights reserved - Created and developed by{' '}
          <a
            href='https://edier-hm.netlify.app/en/'
            target='_blank'
            rel='noopener noreferrer'
            className='underline'
          >
            Edier Hernández
          </a>
        </p>
      </div>
    </div>
  );
}
