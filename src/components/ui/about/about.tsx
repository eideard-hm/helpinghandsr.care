import { SectionTitle } from '@/components/common/section-title';
import { env } from '@/config/env';
import { AboutMeContent } from './about-me-content';

export function About() {
  const BOOKING_URL = `/booking/${encodeURIComponent(env.bookingBusinessId)}`;

  return (
    <section
      id='about'
      className='py-16 bg-bg container mx-auto px-4 max-w-7xl'
    >
      <SectionTitle subTitle='Get your massage at home!'>About Me</SectionTitle>

      <AboutMeContent bookingUrl={BOOKING_URL} />

      <div className='absolute right-0 bottom-0 w-64 h-64 bg-teal-200 rounded-full -z-10 opacity-20 blur-3xl'></div>
    </section>
  );
}
