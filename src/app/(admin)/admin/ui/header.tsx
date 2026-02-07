import Link from 'next/link';

import { env } from '@/config/env';
import { Head } from './head';
import { DezNav } from './dez-nav';

export function Header({
  onHamburgerClick,
  isMenuOpen,
}: {
  onHamburgerClick: () => void;
  isMenuOpen: boolean;
}) {
  return (
    <>
      <div className='nav-header'>
        <Link
          href='/'
          className='size-full flex justify-center items-center'
        >
          <img
            src='/zeinmotiontm2.webp'
            alt={`${env.brandSEO} Logo`}
            className='w-24 aspect-square object-contain'
          />
        </Link>

        <div className='nav-control'>
          {/* Cambia a button para accesibilidad */}
          <button
            type='button'
            className={`hamburger ${isMenuOpen ? 'is-active' : ''}`}
            onClick={onHamburgerClick}
            aria-label='Toggle navigation'
            aria-expanded={isMenuOpen}
          >
            <span className='line' />
            <span className='line' />
            <span className='line' />
          </button>
        </div>
      </div>

      <Head />

      <DezNav />
    </>
  );
}
