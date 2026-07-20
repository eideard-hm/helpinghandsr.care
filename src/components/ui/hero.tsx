'use client';

import { type CSSProperties, useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion';
import {
  IconArrowDown,
  IconArrowRight,
  IconCalendarCheck,
  IconClockHour4,
  IconHomeHeart,
  IconMassage,
  IconMapPin,
  IconShieldCheck,
} from '@tabler/icons-react';

import { env } from '@/config/env';
import { childFade, listStagger } from '@/lib/motion';
import { LocalHlsVideo } from '../common/LocalHlsVideo';
import { WhatsAppButton } from '../common/whatsapp-btn';

type HeroProps = {
  headerSelector?: string;
  headerRemFallback?: number;
};

const HERO_VIDEO = '/video/hero.m3u8';
const HERO_POSTER = '/hero-poster.webp';

const HERO_PROOF = [
  {
    icon: IconShieldCheck,
    title: '20+ years',
    detail: 'Clinical massage experience',
  },
  {
    icon: IconHomeHeart,
    title: 'Home visits',
    detail: 'Homes, hotels, residences',
  },
  {
    icon: IconMassage,
    title: 'Custom care',
    detail: 'Pain, stiffness, recovery',
  },
] as const;

const RELIEF_TAGS = ['Chronic pain relief', 'Injury prevention', 'Stress recovery'];
const HEADLINE_LINES = ['Therapeutic Home Massage', 'in Abu Dhabi'];
const SESSION_STEPS = ['Message on WhatsApp', 'Share your pain points', 'Receive care at home'];

const headlineLine: Variants = {
  hidden: { opacity: 0, y: '100%' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero({
  headerSelector = 'header',
  headerRemFallback = 7,
}: HeroProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const [headerPx, setHeaderPx] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);

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

  return (
    <section
      ref={heroRef}
      className='relative isolate overflow-hidden bg-[color:var(--ink)] text-white md:min-h-[calc(80dvh-var(--hero-header-offset))]'
      style={sectionStyle}
      aria-label={`${env.brandSEO} - therapeutic home massage in Abu Dhabi`}
    >
      <motion.div
        className='absolute inset-0 -z-20'
        style={reduce ? undefined : { y: mediaY, scale: mediaScale }}
      >
        {reduce ? (
          <Image
            src={HERO_POSTER}
            alt=''
            fill
            priority
            sizes='100vw'
            className='object-cover object-center'
          />
        ) : (
          <LocalHlsVideo
            src={HERO_VIDEO}
            poster={HERO_POSTER}
            muted
            preload='metadata'
            className='h-full w-full object-cover object-center'
            ariaHidden
          />
        )}
      </motion.div>

      <div className='absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,23,42,0.90)_0%,rgba(15,23,42,0.72)_42%,rgba(15,23,42,0.34)_72%,rgba(15,23,42,0.60)_100%)]' />
      <div className='absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[color:var(--ink)]/80 to-transparent' />

      <div className='container mx-auto grid max-w-7xl gap-8 px-4 py-10 md:min-h-[calc(80dvh-7rem)] md:py-14 lg:grid-cols-[minmax(0,1fr)_23rem] lg:items-center'>
        <motion.div
          className='max-w-3xl pr-8 md:pr-0'
          variants={reduce ? undefined : listStagger}
          initial={reduce ? false : 'hidden'}
          animate={reduce ? undefined : 'visible'}
        >
          <motion.div
            className='mb-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 bg-white/12 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur-md'
            variants={reduce ? undefined : childFade}
          >
            <IconMapPin
              size={18}
              aria-hidden
            />
            Home massage visits across Abu Dhabi
          </motion.div>

          <motion.h1
            className='max-w-3xl text-pretty text-4xl font-extrabold leading-[1.05] !text-white sm:text-5xl lg:text-6xl xl:text-7xl'
            aria-label='Therapeutic Home Massage in Abu Dhabi'
          >
            {HEADLINE_LINES.map((line) => (
              <span
                key={line}
                className='block overflow-hidden pb-1'
              >
                <motion.span
                  className='block'
                  variants={reduce ? undefined : headlineLine}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            className='mt-4 max-w-2xl text-lg leading-8 text-white/90 sm:text-xl'
            variants={reduce ? undefined : childFade}
          >
            Personalized home visits for chronic pain, stiffness, mobility,
            injury prevention, stress relief, and wellness recovery.
          </motion.p>

          <motion.ul
            className='mt-5 flex max-w-2xl flex-wrap gap-2'
            variants={reduce ? undefined : childFade}
            aria-label='Therapeutic massage benefits'
          >
            {RELIEF_TAGS.map((tag) => (
              <motion.li
                key={tag}
                className='rounded-full border border-white/20 bg-white/12 px-4 py-2 text-sm font-medium text-white/95 backdrop-blur-md'
                whileHover={reduce ? undefined : { y: -2, scale: 1.02 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                {tag}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className='mt-7 flex flex-col gap-3 sm:flex-row sm:items-center'
            variants={reduce ? undefined : childFade}
          >
            <motion.div
              whileHover={reduce ? undefined : { y: -2, scale: 1.02 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
            >
              <WhatsAppButton
                label='Book a home visit'
                size='large'
                classList='min-h-12 rounded-lg px-6 shadow-xl shadow-black/20'
              />
            </motion.div>
            <motion.a
              href='#services'
              className='inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 text-base font-semibold text-white backdrop-blur-md transition-all duration-200 hover:bg-white/18 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[color:var(--ink)]'
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
            >
              View treatments
              <IconArrowDown size={19} aria-hidden />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className='grid gap-3 sm:grid-cols-3 lg:hidden'
          initial={reduce ? false : 'hidden'}
          animate={reduce ? undefined : 'visible'}
          variants={
            reduce
              ? undefined
              : {
                  hidden: {},
                  visible: {
                    transition: { delayChildren: 0.35, staggerChildren: 0.08 },
                  },
                }
          }
          aria-label='Reasons to choose ZeinMotion'
        >
          {HERO_PROOF.map(({ icon: Icon, title, detail }) => (
            <motion.article
              key={title}
              className='flex min-h-24 items-center gap-3 rounded-lg border border-white/18 bg-white/12 p-4 text-white shadow-sm backdrop-blur-md'
              variants={
                reduce
                  ? undefined
                  : {
                      hidden: { opacity: 0, y: 16 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.35, ease: 'easeOut' },
                      },
                    }
              }
            >
              <span className='inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-[color:var(--brand-2)]/20 text-[color:var(--brand-2)]'>
                <Icon
                  size={23}
                  aria-hidden
                />
              </span>
              <span>
                <span className='block text-sm font-bold !text-white'>
                  {title}
                </span>
                <span className='mt-1 block text-sm leading-5 text-white/78'>
                  {detail}
                </span>
              </span>
            </motion.article>
          ))}
        </motion.div>

        <motion.aside
          className='hidden lg:block'
          initial={reduce ? false : { opacity: 0, x: 28, scale: 0.98 }}
          animate={reduce ? undefined : { opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-label='Booking and service highlights'
        >
          <div className='rounded-xl border border-white/20 bg-white/14 p-5 text-white shadow-2xl shadow-black/20 backdrop-blur-lg'>
            <div className='flex items-center justify-between gap-4'>
              <div>
                <p className='text-sm font-semibold uppercase tracking-wide text-white/70'>
                  Home visit flow
                </p>
                <h2 className='mt-1 text-2xl font-extrabold !text-white'>
                  Relief starts before you travel anywhere.
                </h2>
              </div>
              <span className='inline-flex size-12 shrink-0 items-center justify-center rounded-lg bg-[color:var(--brand-2)]/20 text-[color:var(--brand-2)]'>
                <IconClockHour4 size={25} aria-hidden />
              </span>
            </div>

            <ol className='mt-6 divide-y divide-white/12 border-y border-white/12'>
              {SESSION_STEPS.map((step, index) => (
                <motion.li
                  key={step}
                  className='flex items-center gap-3 py-3'
                  initial={reduce ? false : { opacity: 0, x: 14 }}
                  animate={reduce ? undefined : { opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.52 + index * 0.08,
                    duration: 0.28,
                    ease: 'easeOut',
                  }}
                >
                  <span className='inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-[color:var(--brand)]'>
                    {index + 1}
                  </span>
                  <span className='text-sm font-semibold text-white/90'>
                    {step}
                  </span>
                </motion.li>
              ))}
            </ol>

            <div className='mt-5 divide-y divide-white/12 border-y border-white/12'>
              {HERO_PROOF.map(({ icon: Icon, title, detail }) => (
                <motion.div
                  key={title}
                  className='flex items-center gap-3 py-3'
                  whileHover={reduce ? undefined : { x: 4 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <Icon
                    size={21}
                    className='text-[color:var(--brand-2)]'
                    aria-hidden
                  />
                  <span>
                    <span className='block text-sm font-bold text-white'>
                      {title}
                    </span>
                    <span className='text-xs leading-5 text-white/68'>
                      {detail}
                    </span>
                  </span>
                </motion.div>
              ))}
            </div>

            <a
              href='#services'
              className='mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-white text-sm font-bold text-[color:var(--ink)] transition-all duration-200 hover:bg-[color:var(--brand-2)] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[color:var(--ink)]'
            >
              Explore treatment options
              <IconArrowRight size={18} aria-hidden />
            </a>
          </div>
        </motion.aside>

        <motion.div
          className='hidden items-center gap-2 text-sm font-medium text-white/72 lg:col-span-2 lg:flex'
          initial={reduce ? false : { opacity: 0, y: -6 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.3, ease: 'easeOut' }}
          aria-hidden
        >
          <IconCalendarCheck size={17} />
          Direct WhatsApp scheduling with personalized treatment guidance
        </motion.div>
      </div>
    </section>
  );
}
