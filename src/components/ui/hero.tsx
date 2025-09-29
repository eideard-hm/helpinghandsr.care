'use client';

import { useEffect, useState } from 'react';

import { motion, useReducedMotion } from 'framer-motion';

import { fadeIn, fadeInUp } from '@/lib/motion';
import { WhatsAppButton } from '../common/whatsapp-btn';
import { env } from '@/config/env';

type HeroProps = {
  headerSelector?: string;
  headerRemFallback?: number;
};

export function Hero({
  headerSelector = 'header',
  headerRemFallback = 7,
}: HeroProps) {
  const reduce = useReducedMotion();
  const [headerPx, setHeaderPx] = useState<number | null>(null);

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
  } as const;

  return (
    <section
      className='relative flex items-center overflow-hidden bg-[color:var(--bg)]'
      style={sectionStyle}
      aria-label={`${env.brand} — Therapeutic Home Massage in Abu Dhabi`}
    >
      <h1 className='sr-only'>
        {env.brand} — Therapeutic Home Massage in Abu Dhabi.
      </h1>

      {!reduce ? (
        <>
          <video
            className='absolute inset-0 h-full w-full scale-110 object-cover blur-md md:hidden'
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

          <motion.video
            key='hero-video-mobile'
            className='absolute left-1/2 top-1/2 max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 object-contain md:hidden'
            autoPlay
            muted
            loop
            playsInline
            preload='metadata'
            poster='/hero.webp'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
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
        </>
      ) : (
        <img
          src='/hero.webp'
          alt='Massage brand video keyframe'
          className='absolute inset-0 h-full w-full object-cover object-[center_32%] md:hidden'
          decoding='async'
        />
      )}

      <div className='absolute inset-x-0 top-0 md:hidden pointer-events-none'>
        <div className='h-24 bg-gradient-to-b from-black/60 to-transparent' />
      </div>
      <div className='absolute inset-x-0 bottom-0 md:hidden pointer-events-none'>
        <div className='h-40 bg-gradient-to-t from-black/60 to-transparent' />
      </div>

      <div className='absolute z-10 md:hidden left-4 top-[max(1rem,calc(env(safe-area-inset-top,0)+1rem))]'>
        <h2 className='text-pretty text-3xl font-extrabold leading-tight text-title-indigo drop-shadow-sm'>
          {env.brand}
          <span className='block'>Premium Home Massage in Abu Dhabi</span>
        </h2>
      </div>

      <div className='absolute z-10 md:hidden inset-x-0 bottom-[max(1rem,calc(env(safe-area-inset-bottom,0)+1rem))] px-4'>
        <motion.p
          className='mt-4 max-w-xl text-lg text-ink'
          variants={fadeInUp}
          transition={{ delay: 0.05 }}
        >
          Pain relief and mobility at home. 20+ years of clinical experience.
        </motion.p>

        <div className='mt-5'>
          <WhatsAppButton classList='w-full' />
        </div>
      </div>

      {!reduce && (
        <>
          <video
            className='absolute inset-0 hidden h-full w-full scale-110 object-cover blur-md md:block'
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

          <motion.video
            key='hero-video-desktop'
            className='absolute left-1/2 top-1/2 hidden max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 object-contain md:block'
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
        </>
      )}

      {reduce && (
        <motion.img
          key='hero-image-desktop'
          src='/hero.webp'
          alt='Hero Image showing a person receiving a massage'
          className='absolute left-1/2 top-1/2 hidden max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 object-contain md:block'
          initial={{ scale: 1.04, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      <div className='relative z-10 container mx-auto hidden h-full max-w-7xl px-4 md:block'>
        <div className='grid h-full grid-cols-1 items-center md:grid-cols-[minmax(0,40%)_1fr]'>
          <motion.div
            variants={fadeInUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.6 }}
          >
            <div className='p-0'>
              <div className='pr-6'>
                <h2 className='max-w-md text-pretty text-5xl font-extrabold leading-tight drop-shadow-sm text-title-indigo'>
                  <span className='block'>{env.brand}</span>
                  <span className='block'>Therapeutic Home Massage</span>
                  <span className='block'>in Abu Dhabi</span>
                </h2>

                <motion.p
                  className='mt-4 max-w-xl text-lg text-ink'
                  variants={fadeInUp}
                  transition={{ delay: 0.05 }}
                >
                  20+ years of clinical experience in pain management and
                  mobility enhancement. Personalized sessions delivered to your
                  home.
                </motion.p>

                <div className='mt-5'>
                  <WhatsAppButton />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
