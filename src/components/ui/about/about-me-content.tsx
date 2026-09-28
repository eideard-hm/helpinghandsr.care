'use client';

import { type KeyboardEvent, useId, useRef, useState } from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';
import {
  IconAward,
  IconBrandInstagram,
  IconCertificate,
  IconCheck,
  IconSchool,
} from '@tabler/icons-react';

import { WhatsAppButton } from '@/components/common/whatsapp-btn';
import { env } from '@/config/env';
import { SOCIAL_LINKS, THERAPIST } from '@/data/site';
import { cn } from '@/lib/cn';
import { fadeIn, staggerChildren } from '@/lib/motion';

type AboutMeContentProps = {
  waLink: string;
};

const TABS = [
  { id: 'background', label: 'Professional Background' },
  { id: 'zeinmotion', label: `${env.brand} Method` },
  { id: 'benefits', label: 'Treatment Benefits' },
] as const;

type TabId = (typeof TABS)[number]['id'];

const CREDENTIALS = [
  { icon: IconAward, label: '20+ years of experience' },
  { icon: IconCertificate, label: 'Attested by MOFA & KHDA' },
  { icon: IconSchool, label: 'Newton Training Center, Abu Dhabi' },
] as const;

const TREATMENT_BENEFITS = [
  {
    title: 'Pain Relief & Management:',
    detail:
      'Targeted treatment for chronic pain, muscle tension, and discomfort using evidence-based techniques',
  },
  {
    title: 'Enhanced Mobility & Flexibility:',
    detail:
      'Restoration of proper joint function and increased range of motion through specialized stretching',
  },
  {
    title: 'Performance Optimization:',
    detail:
      'Support for athletes and active individuals in recovery, injury prevention, and physical performance',
  },
  {
    title: 'Stress Reduction & Relaxation:',
    detail:
      'Downregulation of nervous system activity promoting deep relaxation and mental clarity',
  },
  {
    title: 'Injury Prevention & Recovery:',
    detail:
      'Identification of musculoskeletal imbalances and support for rehabilitation protocols',
  },
] as const;

export function AboutMeContent({ waLink }: AboutMeContentProps) {
  const [activeTab, setActiveTab] = useState<TabId>('background');
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const moves: Record<string, number> = {
      ArrowRight: 1,
      ArrowLeft: -1,
      Home: -index,
      End: TABS.length - 1 - index,
    };
    if (!(e.key in moves)) return;

    e.preventDefault();
    const next = (index + moves[e.key] + TABS.length) % TABS.length;
    setActiveTab(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <motion.div
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-100px' }}
      variants={staggerChildren}
      className='flex flex-col items-center gap-12 lg:flex-row lg:items-start'
    >
      <motion.div
        variants={fadeIn}
        className='flex justify-center lg:sticky lg:top-32 lg:w-2/5'
      >
        <div className='relative'>
          <div className='h-64 w-64 overflow-hidden rounded-full border-4 border-white bg-brand shadow-xl md:h-80 md:w-80'>
            <Image
              src={THERAPIST.image}
              alt={`${THERAPIST.name} - ${THERAPIST.role} and ${env.brand} creator`}
              width={320}
              height={320}
              sizes='(min-width: 768px) 320px, 256px'
              className='h-full w-full object-cover'
            />
          </div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className='absolute -top-4 -right-4 h-24 w-24 rounded-full border-4 border-dashed border-brand opacity-50'
            aria-hidden
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className='absolute -bottom-2 -left-2 h-16 w-16 rounded-full bg-brand-2 opacity-70'
            aria-hidden
          />

          <div className='absolute -right-2 bottom-6 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-black/5 md:-right-8'>
            <p className='font-display text-2xl leading-none font-bold text-title-indigo'>
              20+
            </p>
            <p className='mt-1 text-xs font-medium text-gray-600'>
              years of practice
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={fadeIn}
        className='w-full min-w-0 lg:w-3/5'
      >
        <h3 className='text-4xl font-bold md:text-5xl'>{THERAPIST.name}</h3>

        <p className='mt-2 text-lg font-medium text-brand'>
          {THERAPIST.role} | {env.brand} Creator
        </p>

        <ul className='mt-5 flex flex-wrap gap-2'>
          {CREDENTIALS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className='inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-ink shadow-sm ring-1 ring-gray-200'
            >
              <Icon
                size={16}
                className='text-accent-700'
                aria-hidden
              />
              {label}
            </li>
          ))}
        </ul>

        <div
          role='tablist'
          aria-label={`About ${THERAPIST.name}`}
          className='mt-8 flex gap-1 overflow-x-auto border-b border-gray-200'
        >
          {TABS.map((tab, index) => {
            const selected = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                id={`${baseId}-tab-${tab.id}`}
                type='button'
                role='tab'
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => onTabKeyDown(e, index)}
                className={cn(
                  '-mb-px min-h-12 shrink-0 cursor-pointer border-b-2 px-4 py-2 font-medium whitespace-nowrap transition-colors',
                  selected
                    ? 'border-brand text-brand'
                    : 'border-transparent text-gray-600 hover:text-ink'
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <motion.div
          key={activeTab}
          id={`${baseId}-panel-${activeTab}`}
          role='tabpanel'
          aria-labelledby={`${baseId}-tab-${activeTab}`}
          tabIndex={0}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className='mt-6 rounded-lg'
        >
          {activeTab === 'background' && (
            <div className='space-y-4 leading-7 text-ink'>
              <p>
                <strong>Physical Therapy Technician</strong> attested by MOFA
                and KHDA, with 20+ years of specialized experience in advanced
                massage and physical therapy techniques. My expertise focuses on
                enhancing mobility, preventing musculoskeletal injuries, and
                delivering premium therapeutic results through personalized
                care.
              </p>

              <div className='my-4 rounded-r-xl border-l-4 border-brand bg-brand-2/30 p-4'>
                <p className='font-medium text-brand-700'>
                  My practice integrates ancestral knowledge passed down from my
                  grandfather, a respected massage therapist, with modern
                  evidence-based techniques from my diploma at Newton Training
                  Center in Abu Dhabi.
                </p>
              </div>

              <p>
                Specializing in therapeutic interventions for athletes, active
                individuals, and professionals seeking targeted recovery and
                sustainable physical well-being. Certified in Deep Tissue,
                Sports Massage, Reflexology, Cupping Therapy, and Lymphatic
                Drainage.
              </p>
            </div>
          )}

          {activeTab === 'zeinmotion' && (
            <div className='space-y-4 leading-7 text-ink'>
              <p>
                <strong>{env.brand}</strong> is my premium signature massage
                method, developed from nearly 20 years of hands-on experience.
                This integrated approach combines time-tested techniques with a
                thoughtful, human-centered methodology.
              </p>

              <div className='my-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='rounded-xl border border-brand-2 bg-white p-4'>
                  <h4 className='mb-2 font-sans font-semibold text-brand'>
                    Techniques Integrated
                  </h4>
                  <ul className='list-inside list-disc space-y-1 text-sm'>
                    <li>Head &amp; Neck Massage</li>
                    <li>Deep Tissue &amp; Sports Massage</li>
                    <li>Assisted Stretching</li>
                    <li>Reflexology Therapy</li>
                    <li>Cupping (when appropriate)</li>
                  </ul>
                </div>

                <div className='rounded-xl border border-brand-2 bg-white p-4'>
                  <h4 className='mb-2 font-sans font-semibold text-brand'>
                    Session Approach
                  </h4>
                  <ul className='list-inside list-disc space-y-1 text-sm'>
                    <li>Fully personalized assessments</li>
                    <li>Real-time pressure adjustment</li>
                    <li>Focus on specific areas of need</li>
                    <li>Continuous feedback integration</li>
                  </ul>
                </div>
              </div>

              <p className='text-gray-600 italic'>
                Each session begins with attentive listening to your needs,
                followed by carefully adjusted techniques that evolve throughout
                our time together to ensure optimal therapeutic outcomes.
              </p>
            </div>
          )}

          {activeTab === 'benefits' && (
            <div className='space-y-4 leading-7 text-ink'>
              <p>
                My therapeutic approach delivers comprehensive benefits designed
                for lasting physical improvement and enhanced quality of life.
              </p>

              <ul className='space-y-3'>
                {TREATMENT_BENEFITS.map(({ title, detail }) => (
                  <li
                    key={title}
                    className='flex items-start'
                  >
                    <IconCheck
                      size={18}
                      className='mt-1 mr-2 shrink-0 text-brand'
                      aria-hidden
                    />
                    <span>
                      <strong>{title}</strong> {detail}
                    </span>
                  </li>
                ))}
              </ul>

              <div className='mt-4 rounded-r-xl border-l-4 border-info bg-info/10 p-4'>
                <p className='text-sm text-ink'>
                  <strong>Ideal for:</strong> Athletes, active professionals,
                  office workers, post-surgery recovery, and anyone committed to
                  maintaining optimal physical well-being through proactive
                  care.
                </p>
              </div>
            </div>
          )}
        </motion.div>

        <div className='mt-8 flex flex-wrap gap-3'>
          <WhatsAppButton
            waLink={waLink}
            label='Book with Richard'
          />
          <a
            href={SOCIAL_LINKS.instagram.href}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex min-h-11 items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 font-semibold text-ink transition-colors hover:border-brand hover:text-brand'
          >
            <IconBrandInstagram
              size={20}
              aria-hidden
            />
            See his work on Instagram
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
