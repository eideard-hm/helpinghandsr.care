'use client';

import { useEffect, useState } from 'react';

import { motion, useReducedMotion } from 'framer-motion';

import { fadeIn, fadeInUp } from '@/lib/motion';
import { WhatsAppButton } from '../common/whatsapp-btn';
import { env } from '@/config/env';

type HeroProps = {
  waLink: string;
  /** selector del header a medir (por defecto 'header') */
  headerSelector?: string;
  /** fallback si no encuentra header (en rem). h-28 = 7rem */
  headerRemFallback?: number;
};

export function Hero({
  waLink,
  headerSelector = 'header',
  headerRemFallback = 7,
}: HeroProps) {
  const reduce = useReducedMotion();
  const [headerPx, setHeaderPx] = useState<number | null>(null);

  // Medir automáticamente el alto del header
  useEffect(() => {
    const el = document.querySelector(headerSelector) as HTMLElement | null;
    if (!el) {
      setHeaderPx(headerRemFallback * 16);
      return;
    }
    const set = () => setHeaderPx(el.getBoundingClientRect().height);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, [headerSelector, headerRemFallback]);

  const sectionStyle = {
    height: `calc(100dvh - ${headerPx ?? headerRemFallback * 16}px)`,
  };

  return (
    <section
      className='relative flex items-center overflow-hidden bg-[color:var(--bg)]'
      style={sectionStyle}
    >
      {!reduce && (
        <video
          className='absolute inset-0 h-full w-full object-cover blur-md scale-110'
          autoPlay
          muted
          loop
          playsInline
          preload='metadata'
          poster='/hero.webp'
          aria-hidden
        >
          <source
            src='/hero.webm'
            type='video/webm'
          />
          <source
            src='/hero.mp4'
            type='video/mp4'
          />
        </video>
      )}

      {!reduce ? (
        <motion.video
          key='hero-video'
          className='absolute left-1/2 top-1/2 max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 object-contain'
          autoPlay
          muted
          loop
          playsInline
          preload='metadata'
          poster='/hero.webp'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <source
            src='/hero.webm'
            type='video/webm'
          />
          <source
            src='/hero.mp4'
            type='video/mp4'
          />
        </motion.video>
      ) : (
        <motion.img
          key='hero-image'
          src='/hero.webp'
          alt='Hero Image showing a person receiving a massage'
          className='absolute left-1/2 top-1/2 max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 object-contain'
          initial={{ scale: 1.04, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      <motion.div
        className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent'
        variants={fadeIn}
        initial='hidden'
        animate='visible'
      />

      <div className='relative z-10 container mx-auto max-w-7xl px-4 h-full'>
        <div className='grid h-full grid-cols-1 md:grid-cols-[minmax(0,40%)_1fr] items-start md:items-center'>
          <motion.div
            className='text-white'
            variants={fadeInUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.6 }}
          >
            <div className='p-4 md:p-0 max-w-xl'>
              <div className='pr-6'>
                <h1 className='max-w-md text-pretty text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-sm text-brand-2'>
                  <span className='block'>{env.brand}</span>
                  <span className='block'>Therapeutic Home Massage</span>
                  <span className='block'>in Abu Dhabi</span>
                </h1>

                <motion.p
                  className='mt-4 max-w-xl text-base md:text-lg text-white/90'
                  variants={fadeInUp}
                  transition={{ delay: 0.05 }}
                >
                  20+ years of clinical experience in pain management and
                  mobility enhancement. Personalized sessions delivered to your
                  home.
                </motion.p>

                <WhatsAppButton
                  waLink={waLink}
                  classList='mt-5'
                />
              </div>
            </div>
          </motion.div>

          <div className='hidden md:block' />
        </div>
      </div>
    </section>
  );
}
