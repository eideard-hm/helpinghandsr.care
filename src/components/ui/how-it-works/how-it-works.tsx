
import { waLinkWithEnv } from '@/lib/whatsapp';
import { SectionTitle } from '../../common/section-title';
import { Steps } from './steps';

export function HowItWorks() {
  const waHref = waLinkWithEnv();

  return (
    <section
      id='how-it-works'
      className='py-16 bg-gray-50 shadow'
    >
      <div className='container mx-auto px-4 max-w-7xl'>
        <SectionTitle subTitle='Experience our seamless booking system designed for your convenience and peace of mind'>
          Simple Booking Process
        </SectionTitle>

        <Steps waLink={waHref} />
      </div>
    </section>
  );
}
