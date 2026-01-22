import { SectionTitle } from '@/components/common/section-title';
import { waLinkWithEnv } from '@/lib/whatsapp';
import { AboutMeContent } from './about-me-content';

export function About() {
  return (
    <section
      id='about'
      className='py-16 bg-bg container mx-auto px-4 max-w-7xl'
    >
      <SectionTitle subTitle='Get your massage at home!'>About Me</SectionTitle>

      <AboutMeContent waLink={waLinkWithEnv()} />

      <div className='absolute right-0 bottom-0 w-64 h-64 bg-teal-200 rounded-full -z-10 opacity-20 blur-3xl'></div>
    </section>
  );
}
