import Link from 'next/link';

type NavProps = {
  classList?: string;
};

export function NavLinks({ classList }: NavProps) {
  return (
    <ul className={`space-y-2 text-sm ${classList} text-ink`}>
      <li>
        <Link
          href='/#services'
          className='hover:text-[color:var(--accent)]'
        >
          Services
        </Link>
      </li>

      <li>
        <Link
          href='/#how-it-works'
          className='hover:text-[color:var(--accent)]'
        >
          How it works
        </Link>
      </li>

      <li>
        <Link
          href='/#benefits'
          className='hover:text-[color:var(--accent)]'
        >
          Benefits
        </Link>
      </li>

      <li>
        <Link
          href='/#testimonials'
          className='hover:text-[color:var(--accent)]'
        >
          Testimonials
        </Link>
      </li>

      <li>
        <Link
          href='/#about'
          className='hover:text-[color:var(--accent)]'
        >
          About
        </Link>
      </li>
    </ul>
  );
}
