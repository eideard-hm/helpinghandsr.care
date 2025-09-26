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
        className='absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent'
        variants={fadeIn}
        initial='hidden'
        animate='visible'
      />
      <div className='pointer-events-none absolute inset-y-0 left-0 w-1/3 backdrop-blur-[2px]' />

      <motion.div
        className='relative z-10 container mx-auto max-w-7xl px-4 my-4 text-white'
        variants={fadeInUp}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.6 }}
      >
        <h1 className='max-w-lg text-pretty text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-sm'>
          Therapeutic Home Massage in Abu Dhabi - 
          <span className='text-[var(--brand)]'>{env.brand}</span>
        </h1>

        <motion.p
          className='mt-4 max-w-md text-base md:text-lg text-white/90'
          variants={fadeInUp}
          transition={{ delay: 0.05 }}
        >
          Premium in-home massage in Abu Dhabi. Relieve pain, improve mobility,
          and enhance performance with personalized sessions based on 20 years
          of experience.
        </motion.p>

        <WhatsAppButton
          waLink={waLink}
          classList='mt-4'
        />
      </motion.div>
    </section>
  );
}
