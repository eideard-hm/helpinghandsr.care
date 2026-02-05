'use client';

import { useCallback, useEffect, useState } from 'react';

import { Header } from './header';
import { env } from '@/config/env';

type Props = {
  children: React.ReactNode;
};

export function AdminShell({ children }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const onHamburgerClick = useCallback(() => {
    setIsMenuOpen((v) => !v);
  }, []);

  useEffect(() => {
    const wrapper = document.getElementById('main-wrapper');
    if (!wrapper) return;

    wrapper.classList.toggle('menu-toggle', !isMenuOpen);
  }, [isMenuOpen]);

  return (
    <div
      id='main-wrapper'
      className='min-h-screen show'
    >
      <Header
        onHamburgerClick={onHamburgerClick}
        isMenuOpen={isMenuOpen}
      />

      <main className='content-body'>
        <div className='container-fluid'>{children}</div>
      </main>

      <div className='footer'>
        <div className='copyright'>
          <p className='mt-4 text-sm text-ink/90'>
            © {new Date().getFullYear()} {env.brand}. All rights reserved -
            Created and developed by{' '}
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
    </div>
  );
}
