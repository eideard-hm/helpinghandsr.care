import { waLinkWithEnv } from '@/lib/whatsapp';
import { AboutMeContent } from './about-me-content';

export function About() {
  return (
    <section
      id='about'
      aria-labelledby='about-title'
      data-ground='poche'
      className='bg-poche py-20 text-limewash lg:py-28'
    >
      <div className='mx-auto max-w-7xl px-4'>
        <AboutMeContent waLink={waLinkWithEnv()} />
      </div>
    </section>
  );
}
