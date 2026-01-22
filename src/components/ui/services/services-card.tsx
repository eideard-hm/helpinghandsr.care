'use client';

import { useRef, useState } from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { Button } from '@/components/common/button';
import { Dialog } from '@/components/common/dialog';
import { WhatsAppButton } from '@/components/common/whatsapp-btn';
import type { Services } from '@/data/services';
import { fadeInUp } from '@/lib/motion';
import { Benefits } from './benefits';
import { HowWeWork } from './how-we-work';
import { cn } from '@/lib/cn';

type ServicesCardProps = {
  services: Services;
};

export function ServicesCard({ services: s }: ServicesCardProps) {
  const [open, setOpen] = useState(false);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  return (
    <>
      <motion.div
        key={s.id}
        variants={fadeInUp}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        className={cn(
          'group rounded-xl overflow-hidden relative border-2 transition-all duration-300 hover:-translate-y-1',
          s.isMain
            ? 'bg-white border-[color:var(--brand-2)] shadow-xl'
            : 'bg-white border-gray-100 shadow hover:shadow-lg'
        )}
        style={{ display: s.visible ? 'block' : 'none' }}
      >
        {/* Elemento decorativo para servicio principal */}
        {s.isMain && (
          <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[color:var(--brand)] to-[color:var(--accent)]'></div>
        )}

        <div className='relative'>
          {/* Header con overlay para servicio principal */}
          <div
            className={cn(
              'relative flex justify-center items-center h-48 overflow-hidden',
              s.isMain
                ? 'bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--brand-2)]'
                : 'bg-gradient-to-b from-[color:var(--brand-2)] to-[color:var(--bg)]'
            )}
          >
            {s.isMain && (
              <>
                <div className='absolute inset-0 bg-black/10'></div>
                <div className='absolute top-4 left-4'>
                  <span className='bg-white/90 text-[color:var(--brand)] px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm'>
                    💎 Premium
                  </span>
                </div>
              </>
            )}

            <Image
              width={s.isMain ? 165 : 150}
              height={s.isMain ? 165 : 150}
              src={s.image}
              alt={s.title}
              className={cn(
                'aspect-square rounded-full object-cover border-4 z-10 shadow-xl',
                s.isMain
                  ? 'size-[165px] border-white/90'
                  : 'size-[150px] border-white'
              )}
            />
          </div>

          <div className='p-6 text-center'>
            <h3
              className={cn(
                'font-bold mb-3',
                s.isMain
                  ? 'text-2xl text-[color:var(--brand)]'
                  : 'text-xl text-[color:var(--ink)]'
              )}
            >
              {s.title}
            </h3>

            <p
              className={cn(
                'line-clamp-3 mb-5 leading-relaxed',
                s.isMain
                  ? 'text-[color:var(--ink)] font-medium'
                  : 'text-gray-600'
              )}
            >
              {s.excerpt}
            </p>

            <section className='flex justify-center gap-3 mt-6 flex-wrap'>
              <Button
                variant={s.isMain ? 'primary' : 'outline'}
                size='small'
                onClick={() => setOpen(true)}
                className={cn(
                  s.isMain &&
                    'bg-gradient-to-r from-[color:var(--brand)] to-[color:var(--brand-2)] hover:from-[color:var(--brand)]/90 hover:to-[color:var(--brand-2)]/90'
                )}
              >
                {s.isMain ? '✨ Learn More' : 'Show More'}
              </Button>

              <WhatsAppButton
                waLink={s.waLink}
              />
            </section>
          </div>
        </div>
      </motion.div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title={s.title}
        initialFocusRef={ctaRef}
        className='overflow-y-auto'
        size='lg'
        footer={
          <div className='flex gap-3 justify-end'>
            <WhatsAppButton
              ref={ctaRef}
              waLink={s.waLink}
            />
            <Button
              variant='outline'
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </div>
        }
      >
        <div className='relative w-full max-w-[800px] mx-auto space-y-6'>
          <div className='relative w-full max-h-[55vh] overflow-hidden rounded-xl bg-gray-100'>
            <Image
              src={s.bigImage}
              alt={s.title}
              width={800}
              height={0}
              sizes='(max-width: 800px) 100vw, 800px'
              className='w-full h-auto object-contain'
              priority={false}
            />
          </div>

          <p className='text-gray-700 leading-relaxed'>{s.excerpt}</p>

          <Benefits
            benefits={[...s.benefits]}
            isMain={s.isMain}
          />

          <HowWeWork details={[...s.details]} />
        </div>
      </Dialog>
    </>
  );
}
