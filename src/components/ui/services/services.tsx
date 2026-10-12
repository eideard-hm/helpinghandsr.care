import { SERVICES } from '@/data/services';
import { SheetHeading } from '../../common/section-title';
import { WhatsAppLink } from '../../common/whatsapp-link';
import { ServicesCard } from './services-card';

export function Services() {
  const visibleServices = SERVICES.filter((service) => service.visible);
  const featured = visibleServices.filter((service) => service.isMain);
  const others = visibleServices.filter((service) => !service.isMain);

  return (
    <section
      id='services'
      aria-labelledby='services-title'
      className='py-20 lg:py-28'
    >
      <div className='mx-auto max-w-7xl px-4'>
        <SheetHeading
          id='services-title'
          lede='Home massage in Abu Dhabi, tailored to your pain relief, mobility and recovery needs. Not sure which one fits? Start with the signature treatment.'
        >
          Home massage treatments in Abu Dhabi
        </SheetHeading>

        <div className='mt-14'>
          {featured.map((service) => (
            <ServicesCard
              key={service.id}
              services={service}
              featured
            />
          ))}

          {others.length > 0 && (
            <div className='mt-16 border-b border-mortar'>
              {others.map((service) => (
                <ServicesCard
                  key={service.id}
                  services={service}
                />
              ))}
            </div>
          )}
        </div>

        <p className='mt-10 max-w-[62ch] text-[1.0625rem] leading-7 text-ink-soft'>
          Looking for sports massage at home, deep tissue, cupping or
          reflexology on their own in Abu Dhabi?{' '}
          <WhatsAppLink>Ask Richard on WhatsApp</WhatsAppLink>{' '}
          and he will recommend the session for you.
        </p>
      </div>
    </section>
  );
}
