'use client';

import { useState } from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';
import {
  IconArrowRight,
  IconCircleCheck,
  IconDiamond,
} from '@tabler/icons-react';

import { Button } from '@/components/common/button';
import { Dialog } from '@/components/common/dialog';
import { WhatsAppButton } from '@/components/common/whatsapp-btn';
import type { Services } from '@/data/services';
import { cn } from '@/lib/cn';
import { fadeInUp } from '@/lib/motion';
import { Benefits } from './benefits';
import { HowWeWork } from './how-we-work';

type ServicesCardProps = {
  services: Services;
  featured?: boolean;
};

function TechniqueChips({ techniques }: { techniques: string[] }) {
  return (
    <ul className='mt-3 flex flex-wrap gap-2'>
      {techniques.map((technique) => (
        <li
          key={technique}
          className='rounded-full bg-brand-2/30 px-3 py-1 text-sm font-medium text-brand-700'
        >
          {technique}
        </li>
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

  return (
    <>
      <motion.article
        variants={fadeInUp}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
        aria-labelledby={titleId}
        className={cn(
          'group relative overflow-hidden rounded-3xl bg-white ring-1 transition-shadow duration-300',
          featured
            ? 'shadow-xl ring-brand-2 shadow-brand/10 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]'
            : 'flex flex-col shadow-sm ring-gray-200/80 hover:shadow-xl hover:shadow-ink/10'
        )}
      >
        {featured && (
          <div
            className='absolute inset-x-0 top-0 z-10 h-1 bg-linear-to-r from-brand via-brand-2 to-accent'
            aria-hidden
          />
        )}

        <div
          className={cn(
            'relative aspect-[4/3] overflow-hidden bg-brand-2/30',
            featured && 'lg:aspect-auto lg:min-h-[30rem]'
          )}
        >
          <Image
            src={s.image}
            alt={`${s.title} session`}
            fill
            sizes={
              featured
                ? '(min-width: 1024px) 580px, 100vw'
                : '(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw'
            }
            className='object-cover transition-transform duration-700 ease-out group-hover:scale-105'
          />
          <div
            className='absolute inset-0 bg-linear-to-t from-ink/35 via-transparent to-transparent'
            aria-hidden
          />
          {featured && (
            <span className='absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold tracking-wide text-brand uppercase shadow-sm'>
              <IconDiamond
                size={14}
                aria-hidden
              />
              Signature treatment
            </span>
          )}
        </div>

        <div
          className={cn(
            'flex flex-1 flex-col p-6',
            featured && 'md:p-10 lg:justify-center'
          )}
        >
          <h3
            id={titleId}
            className={cn(
              'font-bold text-title-indigo',
              featured ? 'text-2xl md:text-3xl' : 'text-xl'
            )}
          >
            {s.title}
          </h3>

          <p
            className={cn(
              'mt-3 leading-relaxed text-gray-600',
              featured ? 'text-base md:text-lg' : 'line-clamp-3 text-[15px]'
            )}
          >
            {s.excerpt}
          </p>

          {featured && s.techniques?.length ? (
            <div className='mt-6'>
              <p className='text-xs font-semibold tracking-wider text-gray-500 uppercase'>
                Techniques combined in one session
              </p>
              <TechniqueChips techniques={s.techniques} />
            </div>
          ) : null}

          <ul
            className={cn('mt-6 grid gap-2.5', featured && 'sm:grid-cols-2')}
          >
            {(featured ? benefitTitles : benefitTitles.slice(0, 2)).map(
              (title) => (
                <li
                  key={title}
                  className='flex items-start gap-2 text-sm leading-6 text-ink/85'
                >
                  <IconCircleCheck
                    size={18}
                    className='mt-0.5 shrink-0 text-brand'
                    aria-hidden
                  />
                  {title}
                </li>
              )
            )}
          </ul>

          <div className='mt-auto grid gap-3 pt-7 sm:flex sm:flex-wrap'>
            <WhatsAppButton
              waLink={s.waLink}
              label={featured ? 'Book this treatment' : 'Book now'}
            />
            <Button
              variant='outline'
              onClick={() => setOpen(true)}
              aria-haspopup='dialog'
              className='rounded-xl font-semibold'
            >
              View details
              <IconArrowRight
                size={18}
                className='transition-transform duration-200 group-hover:translate-x-0.5'
                aria-hidden
              />
              <span className='sr-only'>about {s.title}</span>
            </Button>
          </div>
        </div>
      </motion.article>

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
              className='rounded-xl'
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
        <div className='space-y-6'>
          <div className='relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gray-100'>
            <Image
              src={s.bigImage}
              alt={`${s.title} treatment`}
              fill
              sizes='(min-width: 672px) 630px, 100vw'
              className='object-cover'
            />
          </div>

          <p className='leading-relaxed text-gray-700'>{s.excerpt}</p>

          {s.techniques?.length ? (
            <div>
              <h3 className='text-lg font-bold text-title-indigo'>
                Techniques combined
              </h3>
              <TechniqueChips techniques={s.techniques} />
            </div>
          ) : null}

          <Benefits
            benefits={s.benefits}
            isMain={s.isMain}
          />

          <HowWeWork details={s.details} />
        </div>
      </Dialog>
    </>
  );
}
