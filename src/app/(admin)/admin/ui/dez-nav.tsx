'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { menuItems } from '../schedule/business-hours/_data';

export function DezNav() {
  const pathname = usePathname();

  return (
    <div className='deznav'>
      <div className='deznav-scroll'>
        <ul
          className='metismenu'
          id='menu'
        >
          {menuItems.map((item) => (
            <li
              key={item.href}
              className={item.match(pathname) ? 'mm-active' : ''}
            >
              <Link href={item.href}>
                <i>
                  <item.icon
                    size={18}
                    stroke={1.5}
                  />
                </i>
                <span className='nav-text'>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
