'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { fadeIn, fadeInUp } from '@/lib/motion';
import { WhatsAppButton } from './whatsapp-btn';
import { waLink } from '../../lib/whatsapp';
import { env } from '@/config/env';

type HeroProps = { waLink: string };

export function Hero({ waLink }: HeroProps) {
  const reduce = useReducedMotion();

  return (
    <section className='relative h-[52dvh] md:h-[64dvh] flex items-center overflow-hidden bg-[color:var(--bg)]'>
      <motion.img
        src='/hero1.png'
        alt='Hero Image showing a person receiving a massage'
        className='absolute inset-0 h-full w-full object-cover'
        initial={reduce ? undefined : { scale: 1.04, opacity: 0 }}
        animate={reduce ? undefined : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className='absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent'
        variants={fadeIn}
        initial='hidden'
        animate='visible'
      />

      <motion.div
        className='relative mx-auto px-4 text-white container my-4 overflow-hidden max-w-7xl'
        variants={fadeInUp}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.6 }}
      >
        <h1 className='text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-sm max-w-xl text-pretty'>
          Welcome to Healing Hands.R
        </h1>

        <motion.p
          className='mt-4 max-w-xl text-base md:text-lg text-white/90'
          variants={fadeInUp}
          transition={{ delay: 0.05 }}
        >
          Schedule an appointment in minutes and receive professional care
          without leaving home.
        </motion.p>

        <WhatsAppButton
          waLink={waLink}
          classList='mt-4'
        />
      </motion.div>
    </section>
  );
}
