type NavProps = {
  classList?: string;
};

export function NavLinks({ classList }: NavProps) {
  return (
    <ul className={`space-y-2 text-sm ${classList}`}>
      <li>
        <a
          href='#services'
          className='hover:text-[color:var(--brand-2)]'
        >
          Services
        </a>
      </li>
      <li>
        <a
          href='#how-it-works'
          className='hover:text-[color:var(--brand-2)]'
        >
          How it works
        </a>
      </li>
      <li>
        <a
          href='#benefits'
          className='hover:text-[color:var(--brand-2)]'
        >
          Benefits
        </a>
      </li>
      <li>
        <a
          href='#testimonials'
          className='hover:text-[color:var(--brand-2)]'
        >
          Testimonials
        </a>
      </li>
    </ul>
  );
}
