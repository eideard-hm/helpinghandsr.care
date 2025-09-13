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
        className='group bg-white rounded-xl shadow hover:shadow-lg overflow-hidden'
      >
        <div className='relative bg-gradient-to-b from-[color:var(--brand-2)] to-[color:var(--bg)] flex justify-center items-center h-48'>
          <Image
            width={150}
            height={150}
            src={s.image}
            alt={s.title}
            className='size-[150px] aspect-square rounded-full object-cover ring-4 ring-white shadow-lg'
          />
        </div>

        <div className='p-6 text-center'>
          <h3 className='text-xl font-semibold mb-2'>{s.title}</h3>
          <p className='text-gray-600 line-clamp-3 mb-4'>{s.excerpt}</p>
          <section className='flex justify-center gap-4 mt-5 flex-wrap'>
            <Button
              variant='outline'
              size='small'
              onClick={() => setOpen(true)}
            >
              Show More
            </Button>

            <WhatsAppButton
              waLink={s.waLink}
              label='Book Now'
            />
          </section>
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
              label='Book Now'
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

          <Benefits benefits={[...s.benefits]} />

          <HowWeWork details={[...s.details]} />
        </div>
      </Dialog>
    </>
  );
}
