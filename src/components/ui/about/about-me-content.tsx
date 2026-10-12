'use client';

import { type KeyboardEvent, useId, useRef, useState } from 'react';

import { IconArrowUpRight, IconBrandInstagram } from '@tabler/icons-react';

import { Aperture } from '@/components/common/aperture';
import { LocalHlsVideo } from '@/components/common/LocalHlsVideo';
import { WhatsAppButton } from '@/components/common/whatsapp-btn';
import { env } from '@/config/env';
import { SOCIAL_LINKS, THERAPIST } from '@/data/site';
import { cn } from '@/lib/cn';

type AboutMeContentProps = {
  waLink: string;
};

const TABS = [
  { id: 'background', label: 'Professional Background' },
  { id: 'zeinmotion', label: `${env.brand} Method` },
  { id: 'benefits', label: 'Treatment Benefits' },
] as const;

type TabId = (typeof TABS)[number]['id'];

// Set like the title block of a drawing: who drew it, and on what authority.
const TITLE_BLOCK = [
  { label: 'Practitioner', value: THERAPIST.name },
  { label: 'Qualification', value: THERAPIST.role },
  { label: 'Attested by', value: 'MOFA and KHDA' },
  { label: 'Trained at', value: THERAPIST.credentials.trainedAt },
  { label: 'In practice', value: `${THERAPIST.yearsOfExperience}+ years` },
] as const;

const TREATMENT_BENEFITS = [
  {
    title: 'Pain relief and management',
    detail:
      'Targeted treatment for chronic pain, muscle tension and discomfort using evidence-based techniques.',
  },
  {
    title: 'Mobility and flexibility',
    detail:
      'Restoration of proper joint function and increased range of motion through specialized stretching.',
  },
  {
    title: 'Performance',
    detail:
      'Support for athletes and active individuals in recovery, injury prevention and physical performance.',
  },
  {
    title: 'Stress reduction',
    detail:
      'Downregulation of nervous system activity, promoting deep relaxation and mental clarity.',
  },
  {
    title: 'Injury prevention and recovery',
    detail:
      'Identification of musculoskeletal imbalances and support for rehabilitation protocols.',
  },
] as const;

// Skips the logo intro of the footage and its heavy first segment.
const SESSION_VIDEO_START = 10.75;

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
    <>
      <div className='grid gap-12 lg:grid-cols-12 lg:gap-10'>
        <div className='lg:col-span-4'>
          <Aperture
            src={THERAPIST.image}
            alt={`${THERAPIST.name}, ${THERAPIST.role} and creator of ${env.brand}`}
            sizes='(min-width: 1024px) 400px, 100vw'
            className='aspect-4/5 max-w-md'
            imageClassName='object-[50%_30%]'
          />

          <dl className='mt-8 max-w-md border-t border-on-poche/40'>
            {TITLE_BLOCK.map(({ label, value }) => (
              <div
                key={label}
                className='grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-b border-on-poche/40 py-3'
              >
                <dt className='text-[0.6875rem] font-medium text-on-poche lettering'>
                  {label}
                </dt>
                <dd className='text-limewash'>{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className='min-w-0 lg:col-span-8 lg:pl-6'>
          <h2
            id='about-title'
            className='text-[clamp(2.25rem,9vw,4.25rem)] text-limewash lettering-display'
          >
            {THERAPIST.name}
          </h2>

          <p className='mt-4 max-w-[52ch] text-xl leading-8 text-on-poche'>
            {THERAPIST.role} and creator of {env.brand}. He delivers every
            session himself, in your home, hotel or residence.
          </p>

          <div
            role='tablist'
            aria-label={`About ${THERAPIST.name}`}
            className='mt-10 flex flex-wrap gap-x-8 border-b border-on-poche/40'
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
                    '-mb-px min-h-12 shrink-0 cursor-pointer border-b-3 text-xs font-medium whitespace-nowrap transition-colors duration-200 lettering',
                    selected
                      ? 'border-sun text-limewash'
                      : 'border-transparent text-on-poche hover:text-limewash'
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* All three panels are rendered so the copy is readable by crawlers; only one is shown. */}
          <div className='mt-8 max-w-[68ch] text-[1.0625rem] leading-8 text-limewash'>
            <div
              id={`${baseId}-panel-background`}
              role='tabpanel'
              aria-labelledby={`${baseId}-tab-background`}
              tabIndex={0}
              hidden={activeTab !== 'background'}
            >
              <div className='space-y-5'>
                <p>
                  <strong className='font-semibold'>
                    Physical Therapy Technician
                  </strong>{' '}
                  attested by MOFA and KHDA, with 20+ years of specialized
                  experience in advanced massage and physical therapy
                  techniques. My expertise focuses on enhancing mobility,
                  preventing musculoskeletal injuries, and delivering premium
                  therapeutic results through personalized care.
                </p>

                <p className='border-y border-on-poche/40 py-5 text-xl leading-8 text-limewash'>
                  My practice integrates ancestral knowledge passed down from
                  my grandfather, a respected massage therapist, with modern
                  evidence-based techniques from my diploma at Newton Training
                  Center in Abu Dhabi.
                </p>

                <p>
                  Specializing in therapeutic interventions for athletes,
                  active individuals, and professionals seeking targeted
                  recovery and sustainable physical well-being. Certified in
                  Deep Tissue, Sports Massage, Reflexology, Cupping Therapy,
                  and Lymphatic Drainage.
                </p>
              </div>
            </div>

            <div
              id={`${baseId}-panel-zeinmotion`}
              role='tabpanel'
              aria-labelledby={`${baseId}-tab-zeinmotion`}
              tabIndex={0}
              hidden={activeTab !== 'zeinmotion'}
            >
              <div className='space-y-6'>
                <p>
                  <strong className='font-semibold'>{env.brand}</strong> is my
                  premium signature massage method, developed from 20+
                  years of hands-on experience. This integrated approach
                  combines time-tested techniques with a thoughtful,
                  human-centered methodology.
                </p>

                <div className='grid gap-8 sm:grid-cols-2'>
                  <div>
                    <h3 className='border-b border-on-poche/40 pb-2 text-xs font-medium text-on-poche lettering'>
                      Techniques Integrated
                    </h3>
                    <ul className='text-base'>
                      {[
                        'Head & Neck Massage',
                        'Deep Tissue & Sports Massage',
                        'Assisted Stretching',
                        'Reflexology Therapy',
                        'Cupping (when appropriate)',
                      ].map((item) => (
                        <li
                          key={item}
                          className='border-b border-on-poche/25 py-2'
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className='border-b border-on-poche/40 pb-2 text-xs font-medium text-on-poche lettering'>
                      Session Approach
                    </h3>
                    <ul className='text-base'>
                      {[
                        'Fully personalized assessments',
                        'Real-time pressure adjustment',
                        'Focus on specific areas of need',
                        'Continuous feedback integration',
                      ].map((item) => (
                        <li
                          key={item}
                          className='border-b border-on-poche/25 py-2'
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className='text-on-poche'>
                  Each session begins with attentive listening to your needs,
                  followed by carefully adjusted techniques that evolve
                  throughout our time together to ensure optimal therapeutic
                  outcomes.
                </p>
              </div>
            </div>

            <div
              id={`${baseId}-panel-benefits`}
              role='tabpanel'
              aria-labelledby={`${baseId}-tab-benefits`}
              tabIndex={0}
              hidden={activeTab !== 'benefits'}
            >
              <div className='space-y-6'>
                <p>
                  My therapeutic approach delivers comprehensive benefits
                  designed for lasting physical improvement and enhanced
                  quality of life.
                </p>

                <dl className='border-t border-on-poche/40'>
                  {TREATMENT_BENEFITS.map(({ title, detail }) => (
                    <div
                      key={title}
                      className='grid gap-x-8 gap-y-1 border-b border-on-poche/25 py-3 sm:grid-cols-[13rem_1fr]'
                    >
                      <dt className='font-semibold'>{title}</dt>
                      <dd className='text-base leading-7 text-on-poche'>
                        {detail}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className='text-on-poche'>
                  <strong className='font-semibold text-limewash'>
                    Ideal for:
                  </strong>{' '}
                  athletes, active professionals, office workers, post-surgery
                  recovery, and anyone committed to maintaining optimal
                  physical well-being through proactive care.
                </p>
              </div>
            </div>
          </div>

          <div className='mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
            <WhatsAppButton
              waLink={waLink}
              label='Book on WhatsApp'
              variant='light'
            />
            <a
              href={SOCIAL_LINKS.instagram.href}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex min-h-12 items-center justify-center gap-3 border border-on-poche px-5 text-[0.8125rem] font-medium text-limewash transition-colors duration-200 lettering hover:bg-limewash hover:text-poche'
            >
              <IconBrandInstagram
                size={19}
                stroke={1.5}
                aria-hidden
              />
              See his work on Instagram
            </a>
          </div>
        </div>
      </div>

      <div className='mt-20 grid gap-8 border-t border-on-poche/40 pt-12 lg:grid-cols-12 lg:gap-10'>
        <div className='lg:col-span-4'>
          <h3 className='text-3xl text-limewash lettering-display'>
            A session, as it happens
          </h3>
          <p className='mt-4 max-w-[40ch] text-[1.0625rem] leading-7 text-on-poche'>
            Footage from real {env.brand} sessions: back and neck work, face
            massage and reflexology.
          </p>
          <a
            href={SOCIAL_LINKS.instagram.href}
            target='_blank'
            rel='noopener noreferrer'
            className='mt-5 inline-flex min-h-11 items-center gap-2 text-limewash underline decoration-on-poche/60 transition-colors hover:decoration-sun'
          >
            More on {SOCIAL_LINKS.instagram.handle}
            <IconArrowUpRight
              size={18}
              stroke={1.5}
              aria-hidden
            />
          </a>
        </div>

        <div className='border border-on-poche/40 lg:col-span-8'>
          <LocalHlsVideo
            src='/video/hero.m3u8'
            poster='/hero-poster.webp'
            startAt={SESSION_VIDEO_START}
            muted
            preload='none'
            loadOnVisible
            deferUntil='idle'
            className='block aspect-video w-full bg-poche-deep object-cover'
            ariaLabel={`Muted footage of ${THERAPIST.name} working during home massage sessions`}
          >
            <track
              kind='captions'
              src='/video/session.en.vtt'
              srcLang='en'
              label='English'
              default
            />
          </LocalHlsVideo>
        </div>
      </div>
    </>
  );
}
