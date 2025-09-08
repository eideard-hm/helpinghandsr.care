import { Hero } from '@/components/ui/hero';
import { HowItWorks } from '@/components/ui/how-it-works';
import { Services } from '@/components/ui/services';
import { env } from '@/config/env';
import { waLink } from '@/lib/whatsapp';

export default function Home() {
  const waHref = waLink(env.whatsAppNumber, env.waMessage);

  return (
    <>
      <Hero waLink={waHref} />

      <Services />

      <HowItWorks />
    </>
  );
}
