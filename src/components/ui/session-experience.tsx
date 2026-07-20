'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  IconActivityHeartbeat,
  IconHomeHeart,
  IconMassage,
  IconShieldCheck,
} from '@tabler/icons-react';

import { childFade, listStagger } from '@/lib/motion';
import { WhatsAppButton } from '../common/whatsapp-btn';

const OUTCOMES = [
  {
    icon: IconActivityHeartbeat,
    title: 'Relieve pain and stiffness',
    detail:
      'Therapeutic techniques focused on chronic pain, tight muscles, and limited mobility.',
  },
  {
    icon: IconShieldCheck,
    title: 'Prevent injury',
    detail:
      'Personalized care for active bodies, posture strain, recovery, and movement quality.',
  },
  {
    icon: IconHomeHeart,
    title: 'Recover at home',
    detail:
      'No commute. The session is brought to your home, hotel, or residence in Abu Dhabi.',
  },
] as const;

const SESSION_FLOW = [
  'Share your pain points on WhatsApp',
  'Get a customized treatment plan',
  'Relax and recover at your location',
] as const;

export function SessionExperience() {
  const reduce = useReducedMotion();

  return (
    <section
      className='bg-white py-16 md:py-20'
      aria-labelledby='session-experience-title'
    >
      <div className='container mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center'>
        <motion.div
          variants={reduce ? undefined : listStagger}
          initial={reduce ? false : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.p
            className='mb-3 text-sm font-semibold uppercase tracking-wide text-[color:var(--brand)]'
            variants={reduce ? undefined : childFade}
          >
            Designed around your recovery
          </motion.p>
          <motion.h2
            id='session-experience-title'
            className='max-w-xl text-pretty text-3xl font-extrabold leading-tight text-title-indigo md:text-4xl'
            variants={reduce ? undefined : childFade}
          >
            A premium massage visit that starts with what your body needs.
          </motion.h2>
          <motion.p
            className='mt-4 max-w-xl text-base leading-7 text-ink md:text-lg'
            variants={reduce ? undefined : childFade}
          >
            ZeinMotion is positioned as therapeutic home massage, not a generic
            spa visit. The service is built for personalized care, chronic pain
            relief, injury prevention, stress reduction, and self-care.
          </motion.p>

          <motion.div
            className='mt-8'
            variants={reduce ? undefined : childFade}
          >
            <WhatsAppButton label='Ask for availability' />
          </motion.div>
        </motion.div>

        <motion.div
          className='grid gap-4'
          initial={reduce ? false : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.25 }}
          variants={
            reduce
              ? undefined
              : {
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08 } },
                }
          }
        >
          {OUTCOMES.map(({ icon: Icon, title, detail }) => (
            <motion.article
              key={title}
              className='group rounded-lg border border-[color:var(--brand-2)]/55 bg-[color:var(--bg)] p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[color:var(--brand)]/50 hover:bg-white hover:shadow-md'
              variants={
                reduce
                  ? undefined
                  : {
                      hidden: { opacity: 0, y: 18 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.35, ease: 'easeOut' },
                      },
                    }
              }
            >
              <div className='flex gap-4'>
                <span className='inline-flex size-12 shrink-0 items-center justify-center rounded-lg bg-[color:var(--brand)] text-white transition-transform duration-200 group-hover:scale-105'>
                  <Icon
                    size={24}
                    aria-hidden
                  />
                </span>
                <div>
                  <h3 className='text-lg font-bold text-title-indigo'>
                    {title}
                  </h3>
                  <p className='mt-2 text-sm leading-6 text-gray-600'>
                    {detail}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}

          <motion.div
            className='rounded-lg bg-[color:var(--ink)] p-5 text-white shadow-sm'
            variants={
              reduce
                ? undefined
                : {
                    hidden: { opacity: 0, y: 18 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.35, ease: 'easeOut' },
                    },
                  }
            }
          >
            <div className='flex items-center gap-3'>
              <span className='inline-flex size-12 shrink-0 items-center justify-center rounded-lg bg-white/12 text-[color:var(--brand-2)]'>
                <IconMassage
                  size={25}
                  aria-hidden
                />
              </span>
              <div>
                <h3 className='text-lg font-bold !text-white'>
                  Simple booking flow
                </h3>
                <ol className='mt-3 grid gap-2 text-sm leading-6 text-white/80 sm:grid-cols-3'>
                  {SESSION_FLOW.map((step, index) => (
                    <li
                      key={step}
                      className='flex gap-2'
                    >
                      <span className='font-bold text-[color:var(--brand-2)]'>
                        {index + 1}.
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
