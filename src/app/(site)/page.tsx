import { About } from '@/components/ui/about/about';
import { Hero } from '@/components/ui/hero';
import { HowItWorks } from '@/components/ui/how-it-works/how-it-works';
import { Services } from '@/components/ui/services/services';
import { Testimonials } from '@/components/ui/testimonials/testimonials';

export default function Home() {
  return (
    <>
      <Hero />

      <Services />

      <HowItWorks />

      <Testimonials />

      <About />
    </>
  );
}
