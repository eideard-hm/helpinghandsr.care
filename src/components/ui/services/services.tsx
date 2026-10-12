import { SERVICES } from '@/data/services';
import { cn } from '@/lib/cn';
import { waLinkWithEnv } from '@/lib/whatsapp';
import { SectionTitle } from '../../common/section-title';
import { ServicesCard } from './services-card';

export function Services() {
  const visibleServices = SERVICES.filter((service) => service.visible);
  const featured = visibleServices.filter((service) => service.isMain);
  const others = visibleServices.filter((service) => !service.isMain);

  return (
    <section
      id='services'
      aria-labelledby='services-title'
      className='bg-bg py-16 md:py-24'
    >
      <div className='container mx-auto max-w-7xl px-4'>
        <SectionTitle
          id='services-title'
          eyebrow='Treatments'
          subTitle='Home massage services in Abu Dhabi tailored to your pain relief, mobility and recovery needs.'
        >
          Our Services
        </SectionTitle>

        <div className='space-y-8'>
          {featured.map((service) => (
            <ServicesCard
              key={service.id}
              services={service}
              featured
            />
          ))}

          {others.length > 0 && (
            <div
              className={cn(
                'grid gap-8 sm:grid-cols-2',
                others.length >= 3 && 'lg:grid-cols-3'
              )}
            >
              {others.map((service) => (
                <ServicesCard
                  key={service.id}
                  services={service}
                />
              ))}
            </div>
          )}
        </div>

        <p className='mt-12 text-center text-base text-gray-600'>
          Not sure which treatment fits you?{' '}
          <a
            href={waLinkWithEnv()}
            target='_blank'
            rel='noopener noreferrer'
            className='font-semibold text-brand underline decoration-brand/30 underline-offset-4 transition-colors hover:decoration-brand'
          >
            Ask on WhatsApp
          </a>{' '}
          for a personalized recommendation.
        </p>
      </div>
    </section>
  );
}
