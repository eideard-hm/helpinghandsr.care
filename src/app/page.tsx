import { About } from '@/components/ui/about/about';
import { Hero } from '@/components/ui/hero';
import { HowItWorks } from '@/components/ui/how-it-works/how-it-works';
import { Services } from '@/components/ui/services/services';
import { Testimonials } from '@/components/ui/testimonials/testimonials';
import { TrustBar } from '@/components/ui/trust-bar';

export default function Home() {
  return (
    <>
      <Hero />

      <TrustBar />

      <Services />

      <HowItWorks />

      <Testimonials />

      <About />
    </>
  );
}
