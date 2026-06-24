'use client';

import { type CSSProperties, useEffect, useState } from 'react';

import Image from 'next/image';

import { motion, useReducedMotion } from 'framer-motion';
import { IconVolume, IconVolumeOff } from '@tabler/icons-react';

import { env } from '@/config/env';
import { fadeInUp } from '@/lib/motion';
import { LocalHlsVideo } from '../common/LocalHlsVideo';
import { WhatsAppButton } from '../common/whatsapp-btn';

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
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => setIsMuted((m) => !m);

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
    '--hero-header-offset': `${headerPx ?? headerRemFallback * 16}px`,
  } as CSSProperties;

  const m3u8 = '/video/hero.m3u8';
  const poster = '/zeinmotiontm2.webp';

  return (
    <section
      className='relative overflow-hidden bg-[color:var(--bg)] md:min-h-[calc(82dvh-var(--hero-header-offset))]'
      style={sectionStyle}
      aria-label={`${env.brandSEO} - Therapeutic Home Massage in Abu Dhabi`}
    >
      <button
        onClick={toggleSound}
        className='absolute right-4 top-4 z-30 inline-flex size-11 items-center justify-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white md:bottom-8 md:right-8 md:top-auto'
        aria-label={isMuted ? 'Turn on sound' : 'Turn off sound'}
        aria-pressed={!isMuted}
        type='button'
      >
        {isMuted ? (
          <IconVolumeOff
            size={24}
            aria-hidden
          />
        ) : (
          <IconVolume
            size={24}
            aria-hidden
          />
        )}
      </button>

      {!reduce ? (
        <>
          <LocalHlsVideo
            src={m3u8}
            poster={poster}
            muted={isMuted}
            className='absolute inset-0 hidden h-full w-full scale-110 object-cover blur-md md:block'
            ariaHidden
          />
        </>
      ) : (
        <Image
          src='/zeinmotiontm.webp'
          alt='Massage brand video keyframe'
          fill
          sizes='100vw'
          className='absolute inset-0 hidden h-full w-full object-cover object-[center_32%] md:block'
        />
      )}

      {!reduce && (
        <>
          <motion.div
            key='hero-video-desktop'
            className='absolute -right-[2vw] top-1/2 z-[2] hidden h-full w-[56vw] -translate-y-1/2 items-center justify-center opacity-85 md:flex'
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <LocalHlsVideo
              src={m3u8}
              poster={poster}
              muted={isMuted}
              className='max-h-[78%] max-w-full object-contain'
              ariaLabel='Hero desktop foreground video'
            />
          </motion.div>
        </>
      )}

      {reduce && (
        <motion.img
          key='hero-image-desktop'
          src='/zeinmotiontm2.webp'
          alt='Hero Image showing a person receiving a massage'
          className='absolute -right-[2vw] top-1/2 z-[2] hidden max-h-[78%] w-[56vw] -translate-y-1/2 object-contain opacity-85 md:block'
          initial={{ scale: 1.04, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.85 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      <div className='absolute inset-0 z-[3] hidden bg-gradient-to-r from-[color:var(--bg)] via-[color:var(--bg)]/90 to-transparent md:block' />

      <div className='relative z-10 container mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 items-start gap-5 pb-12 pt-7 md:min-h-[calc(82dvh-7rem)] md:grid-cols-[minmax(0,34rem)_1fr] md:items-center md:gap-0 md:pb-0 md:pt-0'>
          <motion.div
            variants={fadeInUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.6 }}
          >
            <div className='p-0'>
              <div className='max-w-lg pr-14 md:pr-6'>
                <p className='mb-3 text-sm font-semibold uppercase tracking-wide text-[color:var(--brand)]'>
                  {env.brand}
                </p>
                <h1 className='text-pretty text-3xl font-extrabold leading-tight drop-shadow-sm text-title-indigo sm:text-4xl lg:text-5xl'>
                  Therapeutic Home Massage in Abu Dhabi
                </h1>
                <motion.p
                  className='mt-3 max-w-md text-base leading-7 text-ink sm:mt-4 sm:text-lg'
                  variants={fadeInUp}
                  transition={{ delay: 0.05 }}
                >
                  20+ years of clinical experience in pain management and
                  mobility enhancement. Personalized sessions delivered to your
                  home.
                </motion.p>
                <div className='mt-5 hidden md:block'>
                  <WhatsAppButton label='Book via WhatsApp' />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            key='hero-media-mobile'
            className='relative mx-auto flex aspect-[16/10] w-full max-w-xs justify-center overflow-hidden rounded-2xl bg-white/50 shadow-sm sm:max-w-sm md:hidden'
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            {!reduce ? (
              <LocalHlsVideo
                src={m3u8}
                poster={poster}
                muted={isMuted}
                className='h-full w-full object-contain'
                ariaLabel='Hero mobile foreground video'
              />
            ) : (
              <Image
                src='/zeinmotiontm2.webp'
                alt='Hero Image showing a person receiving a massage'
                fill
                sizes='(max-width: 767px) 100vw, 0vw'
                className='object-contain'
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
