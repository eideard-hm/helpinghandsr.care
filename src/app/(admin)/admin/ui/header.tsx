import Link from 'next/link';

import { IconCalendarEvent, IconClock } from '@tabler/icons-react';

import { env } from '@/config/env';
import { Head } from './head';

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

      <div className='deznav'>
        <div className='deznav-scroll'>
          <ul
            className='metismenu'
            id='menu'
          >
            <li>
              <Link
                href='/bookings'
                aria-expanded='false'
              >
                <i>
                  <IconCalendarEvent
                    size={18}
                    stroke={1.5}
                  />
                </i>
                <span className='nav-text'>Bookings</span>
              </Link>
            </li>

            <li className='mm-active'>
              <Link
                href='/schedule'
                aria-expanded='false'
              >
                <i>
                  <IconClock
                    size={18}
                    stroke={1.5}
                  />
                </i>
                <span className='nav-text'>Schedule</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
