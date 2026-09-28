import { About } from '@/components/ui/about/about';
import { Faq } from '@/components/ui/faq';
import { Hero } from '@/components/ui/hero';
import { HowItWorks } from '@/components/ui/how-it-works/how-it-works';
import { SessionExperience } from '@/components/ui/session-experience';
import { Services } from '@/components/ui/services/services';
import { Testimonials } from '@/components/ui/testimonials/testimonials';
import {
  faqSchema,
  homeMassageServiceSchema,
  webPageSchema,
} from '@/metadata/main';

// Refresh hourly so newly approved testimonials appear without a redeploy.
export const revalidate = 3600;

// FAQ markup must only appear where the questions are visible, i.e. here.
const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [webPageSchema, homeMassageServiceSchema, faqSchema],
};

export default function Home() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      <Hero />

      <SessionExperience />

      <Services />

      <About />

      <HowItWorks />

      <Testimonials />

      <Faq />
    </>
  );
}
