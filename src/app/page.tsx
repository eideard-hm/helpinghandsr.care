import { Hero } from '@/components/ui/hero';
import { HowItWorks } from '@/components/ui/how-it-works';
import { Services } from '@/components/ui/services/services';
import { Testimonials } from '@/components/ui/testimonials/testimonials';
import { waLinkWithEnv } from '@/lib/whatsapp';

export default function Home() {
  const waHref = waLinkWithEnv();

  return (
    <>
      <Hero waLink={waHref} />

      <Services />

      <HowItWorks />

      <Testimonials />
    </>
  );
}
