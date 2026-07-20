import { About } from '@/components/ui/about/about';
import { Faq } from '@/components/ui/faq';
import { Hero } from '@/components/ui/hero';
import { HowItWorks } from '@/components/ui/how-it-works/how-it-works';
import { SessionExperience } from '@/components/ui/session-experience';
import { Services } from '@/components/ui/services/services';
import { Testimonials } from '@/components/ui/testimonials/testimonials';

export default function Home() {
  return (
    <>
      <Hero />

      <SessionExperience />

      <Services />

      <HowItWorks />

      <Faq />

      <Testimonials />

      <About />
    </>
  );
}
