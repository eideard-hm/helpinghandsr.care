'use client';

import { useState } from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { WhatsAppButton } from '@/components/common/whatsapp-btn';
import { env } from '@/config/env';
import { fadeIn, staggerChildren } from '@/lib/motion';

type AboutMeContentProps = {
  waLink: string;
};

export function AboutMeContent({ waLink }: AboutMeContentProps) {
  const [activeTab, setActiveTab] = useState('background');

  return (
    <motion.div
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-100px' }}
      variants={staggerChildren}
      className='flex flex-col lg:flex-row gap-10 items-center'
    >
      <motion.div
        variants={fadeIn}
        className='lg:w-2/5 flex justify-center'
      >
        <div className='relative'>
          <div className='w-64 h-64 md:w-80 md:h-80 bg-[var(--brand-2)] rounded-full overflow-hidden border-4 border-white shadow-xl'>
            <div className='w-full h-full bg-[var(--brand)] flex items-center justify-center text-white text-4xl'>
              <Image
                src='/Richard-Mahecha.webp'
                alt='Richard Mahecha - Physical Therapy Technician & ZeinMotion™ Creator'
                width={320}
                height={320}
                className='object-cover w-full h-full'
              />
            </div>
          </div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className='absolute -top-4 -right-4 w-24 h-24 rounded-full border-4 border-[var(--brand)] border-dashed opacity-50'
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className='absolute -bottom-2 -left-2 w-16 h-16 rounded-full bg-[var(--brand-2)] opacity-70'
          />
        </div>
      </motion.div>

      <motion.div
        variants={fadeIn}
        className='lg:w-3/5'
      >
        <motion.h2
          variants={fadeIn}
          className='text-4xl md:text-5xl font-bold text-[var(--ink)] mb-2'
        >
          Richard Mahecha
        </motion.h2>

        <motion.p
          variants={fadeIn}
          className='text-[var(--brand)] font-medium mb-8 text-lg'
        >
          Physical Therapy Technician | {env.brand} Creator | 20+ Years
          Experience
        </motion.p>

        <motion.div
          variants={fadeIn}
          className='mb-6'
        >
          <div className='flex space-x-2 border-b border-gray-200'>
            <button
              onClick={() => setActiveTab('background')}
              className={`px-4 py-2 font-medium transition-colors cursor-pointer ${
                activeTab === 'background'
                  ? 'text-[var(--brand)] border-b-2 border-[var(--brand)]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Professional Background
            </button>
            <button
              onClick={() => setActiveTab('zeinmotion')}
              className={`px-4 py-2 font-medium transition-colors cursor-pointer ${
                activeTab === 'zeinmotion'
                  ? 'text-[var(--brand)] border-b-2 border-[var(--brand)]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {env.brand} Method
            </button>
            <button
              onClick={() => setActiveTab('benefits')}
              className={`px-4 py-2 font-medium transition-colors cursor-pointer ${
                activeTab === 'benefits'
                  ? 'text-[var(--brand)] border-b-2 border-[var(--brand)]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Treatment Benefits
            </button>
          </div>
        </motion.div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className='prose max-w-none'
        >
          {activeTab === 'background' && (
            <div className='space-y-4 text-[var(--ink)]'>
              <p>
                <strong>Physical Therapy Technician</strong> attested by MOFA
                and KHDA, with 20+ years of specialized experience in advanced
                massage and physical therapy techniques. My expertise focuses on
                enhancing mobility, preventing musculoskeletal injuries, and
                delivering premium therapeutic results through personalized
                care.
              </p>

              <div className='bg-[var(--brand-2)] border-l-4 border-[var(--brand)] p-4 my-4 rounded-r'>
                <p className='text-[var(--brand-700)] font-medium'>
                  "My practice integrates ancestral knowledge passed down from
                  my grandfather, a respected massage therapist, with modern
                  evidence-based techniques from my diploma at Newton Training
                  Center in Abu Dhabi."
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
            <div className='space-y-4 text-[var(--ink)]'>
              <p>
                <strong>ZeinMotion™</strong> is my premium signature massage
                method, developed from nearly 20 years of hands-on experience.
                This integrated approach combines time-tested techniques with a
                thoughtful, human-centered methodology.
              </p>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-4'>
                <div className='bg-white p-4 rounded-lg border border-[var(--brand-2)]'>
                  <h4 className='font-semibold text-[var(--brand)] mb-2'>
                    Techniques Integrated
                  </h4>
                  <ul className='space-y-1 text-sm'>
                    <li>• Head & Neck Massage</li>
                    <li>• Deep Tissue & Sports Massage</li>
                    <li>• Assisted Stretching</li>
                    <li>• Reflexology Therapy</li>
                    <li>• Cupping (when appropriate)</li>
                  </ul>
                </div>

                <div className='bg-white p-4 rounded-lg border border-[var(--brand-2)]'>
                  <h4 className='font-semibold text-[var(--brand)] mb-2'>
                    Session Approach
                  </h4>
                  <ul className='space-y-1 text-sm'>
                    <li>• Fully personalized assessments</li>
                    <li>• Real-time pressure adjustment</li>
                    <li>• Focus on specific need areas</li>
                    <li>• Continuous feedback integration</li>
                  </ul>
                </div>
              </div>

              <p className='italic text-gray-600'>
                Each session begins with attentive listening to your needs,
                followed by carefully adjusted techniques that evolve throughout
                our time together to ensure optimal therapeutic outcomes.
              </p>
            </div>
          )}

          {activeTab === 'benefits' && (
            <div className='space-y-4 text-[var(--ink)]'>
              <p>
                My therapeutic approach delivers comprehensive benefits designed
                for lasting physical improvement and enhanced quality of life.
              </p>

              <ul className='space-y-3'>
                <li className='flex items-start'>
                  <span className='text-[var(--brand)] mr-2 mt-1'>✓</span>
                  <span>
                    <strong>Pain Relief & Management:</strong> Targeted
                    treatment for chronic pain, muscle tension, and discomfort
                    using evidence-based techniques
                  </span>
                </li>
                <li className='flex items-start'>
                  <span className='text-[var(--brand)] mr-2 mt-1'>✓</span>
                  <span>
                    <strong>Enhanced Mobility & Flexibility:</strong>{' '}
                    Restoration of proper joint function and increased range of
                    motion through specialized stretching
                  </span>
                </li>
                <li className='flex items-start'>
                  <span className='text-[var(--brand)] mr-2 mt-1'>✓</span>
                  <span>
                    <strong>Performance Optimization:</strong> Support for
                    athletes and active individuals in recovery, injury
                    prevention, and physical performance
                  </span>
                </li>
                <li className='flex items-start'>
                  <span className='text-[var(--brand)] mr-2 mt-1'>✓</span>
                  <span>
                    <strong>Stress Reduction & Relaxation:</strong>{' '}
                    Downregulation of nervous system activity promoting deep
                    relaxation and mental clarity
                  </span>
                </li>
                <li className='flex items-start'>
                  <span className='text-[var(--brand)] mr-2 mt-1'>✓</span>
                  <span>
                    <strong>Injury Prevention & Recovery:</strong>{' '}
                    Identification of musculoskeletal imbalances and support for
                    rehabilitation protocols
                  </span>
                </li>
              </ul>

              <div className='bg-[var(--info)] bg-opacity-10 border-l-4 border-[var(--info)] p-4 mt-4 rounded-r'>
                <p className='text-[var(--ink)] text-sm'>
                  <strong>Ideal for:</strong> Athletes, active professionals,
                  office workers, post-surgery recovery, and anyone committed to
                  maintaining optimal physical well-being through proactive
                  care.
                </p>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          variants={fadeIn}
          className='mt-8 flex flex-wrap gap-4'
        >
          <WhatsAppButton
            waLink={waLink}
            variant='primary'
            label={`Schedule Your ${env.brand} Session`}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
