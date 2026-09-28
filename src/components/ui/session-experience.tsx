'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  IconActivityHeartbeat,
  IconHomeHeart,
  IconLeaf,
  IconShieldCheck,
} from '@tabler/icons-react';

import { env } from '@/config/env';
import { THERAPIST } from '@/data/site';
import { childFade, listStagger } from '@/lib/motion';
import { WhatsAppButton } from '../common/whatsapp-btn';

// The four promises from the client's Instagram and Facebook bios.
const OUTCOMES = [
  {
    icon: IconActivityHeartbeat,
    title: 'Relieve chronic pain',
    detail:
      'Therapeutic techniques for chronic pain, tight muscles, stiffness and limited mobility.',
  },
  {
    icon: IconShieldCheck,
    title: 'Prevent injury',
    detail:
      'Care for active bodies, posture strain and recovery, before small issues become recurring pain.',
  },
  {
    icon: IconLeaf,
    title: 'Reduce stress',
    detail:
      'Release the tension that builds up from work, training and daily routines, and leave feeling lighter.',
  },
  {
    icon: IconHomeHeart,
    title: 'Self-care at home',
    detail:
      'No commute. Every session comes to your home, hotel or residence in Abu Dhabi, tailored to you.',
  },
] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

export function SessionExperience() {
  const reduce = useReducedMotion();

  return (
    <section
      id='benefits'
      className='bg-white py-16 md:py-24'
      aria-labelledby='benefits-title'
    >
      <div className='container mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center'>
        <motion.div
          variants={reduce ? undefined : listStagger}
          initial={reduce ? false : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.p
            className='mb-3 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-brand-700 uppercase'
            variants={reduce ? undefined : childFade}
          >
            <span
              className='h-px w-8 bg-accent'
              aria-hidden
            />
            Designed around your recovery
          </motion.p>
          <motion.h2
            id='benefits-title'
            className='max-w-xl text-3xl leading-tight font-extrabold text-balance text-title-indigo md:text-4xl'
            variants={reduce ? undefined : childFade}
          >
            A premium massage visit that starts with what your body needs.
          </motion.h2>
          <motion.p
            className='mt-5 max-w-xl text-base leading-7 text-gray-700 md:text-lg md:leading-8'
            variants={reduce ? undefined : childFade}
          >
            {env.brand} is a premium home massage service in Abu Dhabi created
            by {THERAPIST.name}, a {THERAPIST.role} with{' '}
            {THERAPIST.yearsOfExperience}+ years of experience. It is
            therapeutic massage brought to your door &mdash; not a generic spa
            visit &mdash; shaped around your body and goals, from chronic pain
            relief and injury prevention to stress reduction and self-care.
          </motion.p>

          <motion.blockquote
            className='mt-6 max-w-xl border-l-2 border-accent pl-4 font-display text-lg text-title-indigo italic'
            variants={reduce ? undefined : childFade}
          >
            &ldquo;{env.brandLogotype}.&rdquo;
          </motion.blockquote>

          <motion.div
            className='mt-8'
            variants={reduce ? undefined : childFade}
          >
            <WhatsAppButton label='Ask for availability' />
          </motion.div>
        </motion.div>

        <motion.ul
          className='grid gap-4 sm:grid-cols-2'
          initial={reduce ? false : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.25 }}
          variants={
            reduce
              ? undefined
              : { visible: { transition: { staggerChildren: 0.08 } } }
          }
        >
          {OUTCOMES.map(({ icon: Icon, title, detail }) => (
            <motion.li
              key={title}
              className='group rounded-2xl border border-brand-2/60 bg-bg p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-white hover:shadow-xl hover:shadow-brand/10'
              variants={reduce ? undefined : cardVariants}
            >
              <span className='inline-flex size-12 items-center justify-center rounded-xl bg-brand text-white shadow-md shadow-brand/25 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3'>
                <Icon
                  size={24}
                  aria-hidden
                />
              </span>
              <h3 className='mt-5 text-lg font-bold text-title-indigo'>
                {title}
              </h3>
              <p className='mt-2 text-sm leading-6 text-gray-600'>{detail}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
