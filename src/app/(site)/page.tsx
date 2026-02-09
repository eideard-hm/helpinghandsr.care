import { About } from '@/components/ui/about/about';
import { Hero } from '@/components/ui/hero';
import { HowItWorks } from '@/components/ui/how-it-works/how-it-works';
import { Services } from '@/components/ui/services/services';
import { Testimonials } from '@/components/ui/testimonials/testimonials';
import { env } from '@/config/env';

export default function Home() {
  const BOOKING_URL = `/booking/${encodeURIComponent(env.bookingBusinessId)}`;

  return (
    <>
      <Hero BOOKING_URL={BOOKING_URL} />

      <Services />

      <HowItWorks />

      <Testimonials />

      <About />
    </>
  );
}
