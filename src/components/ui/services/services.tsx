import { SectionTitle } from '../../common/section-title';
import { ServicesCard } from './services-card';

export function Services() {
  return (
    <section
      id='services'
      className='py-20 bg-gray-50 container mx-auto px-4  max-w-7xl'
    >
      <SectionTitle>Our Services</SectionTitle>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        <ServicesCard title='Service 1'>
          Description of service 1.
        </ServicesCard>

        <ServicesCard title='Service 2'>
          Description of service 2.
        </ServicesCard>

        <ServicesCard title='Service 3'>
          Description of service 3.
        </ServicesCard>
      </div>
    </section>
  );
}
