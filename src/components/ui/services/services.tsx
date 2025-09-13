import { SERVICES } from '@/data/services';
import { SectionTitle } from '../../common/section-title';
import { ServicesCard } from './services-card';

export function Services() {
  return (
    <section
      id='services'
      className='py-16 bg-bg container mx-auto px-4  max-w-7xl'
    >
      <SectionTitle>Our Services</SectionTitle>

      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {SERVICES.map((s) => (
          <ServicesCard
            key={s.id}
            services={s}
          />
        ))}
      </div>
    </section>
  );
}
