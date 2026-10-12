'use client';

import { type CSSProperties, useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  IconArrowDown,
  IconClockHour4,
  IconHomeHeart,
  IconMapPin,
  IconMassage,
  IconShieldCheck,
} from '@tabler/icons-react';

import { env } from '@/config/env';
import { CONTACT } from '@/data/site';
import { cn } from '@/lib/cn';
import { LocalHlsVideo } from '../common/LocalHlsVideo';
import { WhatsAppButton } from '../common/whatsapp-btn';

type HeroProps = {
  headerSelector?: string;
  headerRemFallback?: number;
};

const HERO_VIDEO = '/video/hero.m3u8';
// Inside the second HLS segment (starts at 10.42 s), past hls.js' 0.25 s lookup
// tolerance: skips the logo intro and never downloads the 5.5 MB first segment.
const HERO_VIDEO_START = 10.75;
// A frame at that point, larger than the 1280x720 video so it stays the largest paint.
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

// Mirrors the client's Instagram bio.
const RELIEF_TAGS = [
  'Relieve chronic pain',
  'Prevent injury',
  'Reduce stress',
  'Self-care & wellness',
];
const HEADLINE_LINES = ['Therapeutic Home Massage', 'in Abu Dhabi'];
const SESSION_STEPS = [
  'Message us on WhatsApp',
  'Share your pain points and location',
  'Receive tailored care at home',
];

/** Staggers the CSS entrance animation of hero elements. */
const enterAt = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

export function Hero({
  headerSelector = 'header',
  headerRemFallback = 6,
}: HeroProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const [videoPlaying, setVideoPlaying] = useState(false);
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
      className='relative isolate overflow-hidden bg-ink text-white lg:min-h-[calc(88dvh-var(--hero-header-offset))]'
      style={sectionStyle}
      aria-label={`${env.brandSEO} - therapeutic home massage in Abu Dhabi`}
    >
      <motion.div
        className='absolute inset-0 -z-20'
        style={reduce ? undefined : { y: mediaY, scale: mediaScale }}
      >
        {/* The poster is the largest paint; the video fades in over it once it plays. */}
        <Image
          src={HERO_POSTER}
          alt=''
          fill
          priority
          sizes='1440px'
          className='object-cover object-center'
        />
        {!reduce && (
          <LocalHlsVideo
            src={HERO_VIDEO}
            startAt={HERO_VIDEO_START}
            muted
            preload='none'
            deferUntil='interaction'
            onPlaying={() => setVideoPlaying(true)}
            className={cn(
              'absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000',
              videoPlaying ? 'opacity-100' : 'opacity-0'
            )}
            ariaHidden
          />
        )}
      </motion.div>

      {/* The footage is bright; keep copy legible on every frame. */}
      <div className='absolute inset-0 -z-10 bg-ink/70 md:bg-[linear-gradient(90deg,rgba(15,23,42,0.92)_0%,rgba(15,23,42,0.78)_42%,rgba(15,23,42,0.42)_72%,rgba(15,23,42,0.6)_100%)]' />
      <div className='absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-t from-ink/80 to-transparent' />

      <div className='container mx-auto grid max-w-7xl gap-10 px-4 pt-10 pb-12 md:pt-14 md:pb-16 lg:min-h-[calc(88dvh-var(--hero-header-offset))] lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center lg:gap-12'>
        <div className='max-w-3xl'>
          <p
            className='mb-5 inline-flex animate-rise items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur-md'
            style={enterAt(0)}
          >
            <IconMapPin
              size={18}
              className='shrink-0 text-brand-2'
              aria-hidden
            />
            Premium massage at home &middot; Abu Dhabi
          </p>

          <h1 className='max-w-3xl text-4xl leading-[1.08] font-extrabold text-balance !text-white sm:text-5xl lg:text-6xl'>
            {HEADLINE_LINES.map((line, index) => (
              <span
                key={line}
                className='block overflow-hidden pb-1'
              >
                <span
                  className={cn(
                    'block animate-line-up',
                    index === 1 && 'text-brand-2'
                  )}
                  style={enterAt(80 + index * 90)}
                >
                  {line}
                </span>{' '}
              </span>
            ))}
          </h1>

          <p
            className='mt-5 max-w-2xl animate-rise text-lg leading-8 text-white/90 sm:text-xl'
            style={enterAt(260)}
          >
            Personalized home visits for chronic pain, stiffness, mobility,
            injury prevention, stress relief and wellness recovery &mdash;
            with over 20 years of hands-on experience.
          </p>

          <ul
            className='mt-6 flex max-w-2xl animate-rise flex-wrap gap-2'
            style={enterAt(340)}
            aria-label='What ZeinMotion helps with'
          >
            {RELIEF_TAGS.map((tag) => (
              <li
                key={tag}
                className='rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white/95 backdrop-blur-md'
              >
                {tag}
              </li>
            ))}
          </ul>

          <div
            className='mt-8 flex animate-rise flex-col gap-3 sm:flex-row sm:items-center'
            style={enterAt(420)}
          >
            <WhatsAppButton
              label='Book a home visit'
              size='large'
              classList='rounded-xl px-7 shadow-xl shadow-black/25 hover:-translate-y-0.5'
            />
            <a
              href='#services'
              className='inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 text-base font-semibold text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink'
            >
              View treatments
              <IconArrowDown
                size={19}
                aria-hidden
              />
            </a>
          </div>

          <ul
            className='mt-10 grid animate-rise grid-cols-3 gap-2 sm:gap-3 lg:flex lg:gap-0 lg:divide-x lg:divide-white/15'
            style={enterAt(500)}
            aria-label={`Reasons to choose ${env.brandSEO}`}
          >
            {HERO_PROOF.map(({ icon: Icon, title, detail }) => (
              <li
                key={title}
                className='flex flex-col items-start gap-2 rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur-md sm:flex-row sm:items-center sm:gap-3 sm:p-4 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-6 lg:py-0 lg:backdrop-blur-none lg:first:pl-0'
              >
                <span className='inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-2/20 text-brand-2 sm:size-11'>
                  <Icon
                    size={22}
                    aria-hidden
                  />
                </span>
                <span>
                  <span className='block text-sm font-bold text-white'>
                    {title}
                  </span>
                  <span className='mt-0.5 block text-xs leading-5 text-white/75 sm:text-sm'>
                    {detail}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <aside
          className='hidden animate-slide-in lg:block'
          style={enterAt(350)}
          aria-labelledby='hero-booking-title'
        >
          <div className='rounded-2xl border border-white/15 bg-ink/60 p-6 text-white shadow-2xl shadow-black/30 backdrop-blur-md'>
            <p className='text-xs font-semibold tracking-[0.18em] text-brand-2 uppercase'>
              How booking works
            </p>
            <h2
              id='hero-booking-title'
              className='mt-2 text-2xl leading-tight font-bold !text-white'
            >
              Relief starts at your door.
            </h2>

            <ol className='mt-5 space-y-4'>
              {SESSION_STEPS.map((step, index) => (
                <li
                  key={step}
                  className='flex animate-rise items-center gap-3'
                  style={enterAt(550 + index * 100)}
                >
                  <span className='inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-brand'>
                    {index + 1}
                  </span>
                  <span className='text-[15px] leading-6 font-medium text-white'>
                    {step}
                  </span>
                </li>
              ))}
            </ol>

            <p className='mt-6 flex items-center gap-2 border-t border-white/15 pt-5 text-sm text-white/80'>
              <IconClockHour4
                size={18}
                className='shrink-0 text-brand-2'
                aria-hidden
              />
              Available {CONTACT.availability}
            </p>
          </div>
        </aside>
      </div>

      <motion.a
        href='#benefits'
        className='absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold tracking-[0.2em] text-white/70 uppercase transition-colors hover:text-white lg:inline-flex'
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1, y: [0, 6, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 0.4 },
          y: { delay: 1.2, duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        Discover
        <IconArrowDown
          size={16}
          aria-hidden
        />
      </motion.a>
    </section>
  );
}
