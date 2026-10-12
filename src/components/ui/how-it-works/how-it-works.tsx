import { waLinkWithEnv } from '@/lib/whatsapp';
import { SectionTitle } from '../../common/section-title';
import { Steps } from './steps';

export function HowItWorks() {
  const waHref = waLinkWithEnv();

  return (
    <section
      id='how-it-works'
      aria-labelledby='how-it-works-title'
      className='bg-bg py-16 md:py-24'
    >
      <div className='container mx-auto max-w-7xl px-4'>
        <SectionTitle
          id='how-it-works-title'
          eyebrow='How it works'
          subTitle='A seamless booking experience designed for your convenience and peace of mind.'
        >
          Simple Booking Process
        </SectionTitle>

        <Steps waLink={waHref} />
      </div>
    </section>
  );
}
