'use client';

import { useEffect, useState, useRef } from 'react'; // Añade useRef
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
  const [isMuted, setIsMuted] = useState(true); // Estado para controlar el mute
  const videoRefMobile = useRef<HTMLVideoElement>(null);
  const videoRefDesktop = useRef<HTMLVideoElement>(null);

  // Función para alternar el sonido
  const toggleSound = () => {
    setIsMuted(!isMuted);
  };

  // Efecto para aplicar el estado de mute a los videos
  useEffect(() => {
    if (videoRefMobile.current) {
      videoRefMobile.current.muted = isMuted;
    }
    if (videoRefDesktop.current) {
      videoRefDesktop.current.muted = isMuted;
    }
  }, [isMuted]);

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

      <button
        onClick={toggleSound}
        className='absolute z-30 bottom-4 right-4 md:bottom-8 md:right-8 bg-black/50 text-white p-2 rounded-full backdrop-blur-sm hover:bg-black/70 transition-all'
        aria-label={isMuted ? 'Activar sonido' : 'Desactivar sonido'}
      >
        {isMuted ? (
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2'
            />
          </svg>
        ) : (
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15.536 8.464a5 5 0 010 7.072M12 6a9 9 0 010 12m-4.5-9.5L12 3v18l-4.5-4.5H4a1 1 0 01-1-1v-7a1 1 0 011-1h3.5z'
            />
          </svg>
        )}
      </button>

      {!reduce ? (
        <>
          <video
            ref={videoRefMobile}
            className='absolute inset-0 h-full w-full scale-110 object-cover blur-md md:hidden'
            autoPlay
            muted={isMuted}
            loop
            playsInline
            preload='metadata'
            poster='/zeinmotiontm2.webp'
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
            ref={videoRefMobile}
            key='hero-video-mobile'
            className='absolute left-1/2 top-1/2 max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 object-contain md:hidden'
            autoPlay
            muted={isMuted}
            loop
            playsInline
            preload='metadata'
            poster='/zeinmotiontm2.webp'
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
          src='/zeinmotiontm.webp'
          alt='Massage brand video keyframe'
          className='absolute inset-0 h-full w-full object-cover object-[center_32%] md:hidden'
          decoding='async'
        />
      )}

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

        <div className='mt-2'>
          <WhatsAppButton classList='w-full' />
        </div>
      </div>

      {!reduce && (
        <>
          <video
            ref={videoRefDesktop}
            className='absolute inset-0 hidden h-full w-full scale-110 object-cover blur-md md:block'
            autoPlay
            muted={isMuted}
            loop
            playsInline
            preload='metadata'
            poster='/zeinmotiontm2.webp'
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
            ref={videoRefDesktop}
            key='hero-video-desktop'
            className='absolute left-1/2 top-1/2 hidden max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 object-contain md:block'
            autoPlay
            muted={isMuted}
            loop
            playsInline
            preload='metadata'
            poster='/zeinmotiontm2.webp'
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
          src='/zeinmotiontm2.webp'
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
