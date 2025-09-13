import Link from 'next/link';

type NavProps = {
  classList?: string;
};

export function NavLinks({ classList }: NavProps) {
  return (
    <ul className={`space-y-2 text-sm ${classList}`}>
      <li>
        <Link
          href='/#services'
          className='hover:text-[color:var(--brand-2)]'
        >
          Services
        </Link>
      </li>

      <li>
        <Link
          href='/#how-it-works'
          className='hover:text-[color:var(--brand-2)]'
        >
          How it works
        </Link>
      </li>

      <li>
        <Link
          href='/#benefits'
          className='hover:text-[color:var(--brand-2)]'
        >
          Benefits
        </Link>
      </li>

      <li>
        <Link
          href='/#testimonials'
          className='hover:text-[color:var(--brand-2)]'
        >
          Testimonials
        </Link>
      </li>

      <li>
        <Link
          href='/#about'
          className='hover:text-[color:var(--brand-2)]'
        >
          About
        </Link>
      </li>
    </ul>
  );
}
