import { SectionTitle } from '@/components/common/section-title';
import { waLinkWithEnv } from '@/lib/whatsapp';
import { AboutMeContent } from './about-me-content';

export function About() {
  return (
    <section
      id='about'
      aria-labelledby='about-title'
      className='relative isolate overflow-clip bg-white py-16 md:py-24'
    >
      <div className='container mx-auto max-w-7xl px-4'>
        <SectionTitle
          id='about-title'
          eyebrow='Meet your therapist'
          subTitle='Premium massage at home, delivered personally by the creator of the method.'
        >
          About Me
        </SectionTitle>

        <AboutMeContent waLink={waLinkWithEnv()} />
      </div>

      <div
        className='absolute right-0 bottom-0 -z-10 h-64 w-64 rounded-full bg-teal-200 opacity-20 blur-3xl'
        aria-hidden
      />
    </section>
  );
}
