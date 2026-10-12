'use client';

import { useState } from 'react';

import { IconArrowRight } from '@tabler/icons-react';

import { Aperture } from '@/components/common/aperture';
import { Button } from '@/components/common/button';
import { Dialog } from '@/components/common/dialog';
import { WhatsAppButton } from '@/components/common/whatsapp-btn';
import type { Services } from '@/data/services';
import { cn } from '@/lib/cn';
import { Benefits } from './benefits';
import { HowWeWork } from './how-we-work';

type ServicesCardProps = {
  services: Services;
  featured?: boolean;
};

function Techniques({ techniques }: { techniques: string[] }) {
  return (
    <ul className='mt-2 flex flex-wrap gap-x-6 gap-y-1.5 text-xs font-medium text-poche lettering'>
      {techniques.map((technique) => (
        <li key={technique}>{technique}</li>
      ))}
    </ul>
  );
}

export function ServicesCard({
  services: s,
  featured = false,
}: ServicesCardProps) {
  const [open, setOpen] = useState(false);
  const titleId = `${s.id}-title`;
  const benefitTitles = s.benefits.map((benefit) => benefit.title);

  const actions = (
    <div className='flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
      <WhatsAppButton
        waLink={s.waLink}
        label='Book this treatment'
      />
      <Button
        variant='outline'
        onClick={() => setOpen(true)}
        aria-haspopup='dialog'
      >
        View details
        <span className='sr-only'> about {s.title}</span>
        <IconArrowRight
          size={17}
          aria-hidden
        />
      </Button>
    </div>
  );

  return (
    <>
      {featured ? (
        <article
          aria-labelledby={titleId}
          className='grid gap-8 lg:grid-cols-12 lg:gap-10'
        >
          {/* The opening sits in a thick reveal, like a window in a cut wall. */}
          <div className='border-10 border-poche lg:col-span-5'>
            <Aperture
              src={s.image}
              alt={`${s.title} session`}
              sizes='(min-width: 1024px) 500px, 100vw'
              className='aspect-4/5'
            />
          </div>

          <div className='lg:col-span-7 lg:pt-1'>
            <h3
              id={titleId}
              className='text-[clamp(1.75rem,5.5vw,2.5rem)] text-poche lettering-display'
            >
              {s.title}
            </h3>

            <p className='mt-4 max-w-[62ch] text-lg leading-8 text-ink'>
              {s.excerpt}
            </p>

            {s.techniques?.length ? (
              <div className='mt-7'>
                <p className='text-sm text-ink-soft'>
                  Combined in one session
                </p>
                <Techniques techniques={s.techniques} />
              </div>
            ) : null}

            <ul className='mt-7 grid border-t border-mortar sm:grid-cols-2 sm:gap-x-8'>
              {benefitTitles.map((title) => (
                <li
                  key={title}
                  className='border-b border-mortar py-3 text-[1.0625rem] text-ink'
                >
                  {title}
                </li>
              ))}
            </ul>

            <div className='mt-8'>{actions}</div>
          </div>
        </article>
      ) : (
        <article
          aria-labelledby={titleId}
          className='grid gap-x-10 gap-y-6 border-t border-mortar py-9 sm:grid-cols-[12rem_1fr] lg:grid-cols-[15rem_minmax(0,1fr)_minmax(0,19rem)]'
        >
          <div className='self-start border-8 border-poche'>
            <Aperture
              src={s.image}
              alt={`${s.title} session`}
              sizes='(min-width: 640px) 240px, 100vw'
              className='aspect-4/3'
            />
          </div>

          <div>
            <h3
              id={titleId}
              className='text-2xl text-poche lettering-display'
            >
              {s.title}
            </h3>
            <p className='mt-3 max-w-[58ch] text-[1.0625rem] leading-7 text-ink-soft'>
              {s.excerpt}
            </p>
          </div>

          <div
            className={cn(
              'sm:col-start-2 lg:col-start-3',
              'flex flex-col justify-between gap-6'
            )}
          >
            <ul className='border-t border-mortar'>
              {benefitTitles.slice(0, 2).map((title) => (
                <li
                  key={title}
                  className='border-b border-mortar py-2.5 text-ink'
                >
                  {title}
                </li>
              ))}
            </ul>
            {actions}
          </div>
        </article>
      )}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title={s.title}
        size='lg'
        footer={
          <div className='flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
            <Button
              variant='outline'
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
            <WhatsAppButton
              waLink={s.waLink}
              label='Book on WhatsApp'
            />
          </div>
        }
      >
        <div className='space-y-8'>
          <Aperture
            src={s.bigImage}
            alt={`${s.title} treatment`}
            sizes='(min-width: 672px) 620px, 100vw'
            className='aspect-16/10'
          />

          <HowWeWork details={s.details} />

          <Benefits
            benefits={s.benefits}
            isMain={s.isMain}
          />
        </div>
      </Dialog>
    </>
  );
}
