'use client';

import { useState } from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { WhatsAppButton } from '@/components/common/whatsapp-btn';
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
          <div className='w-64 h-64 md:w-80 md:h-80 bg-teal-200 rounded-full overflow-hidden border-4 border-white shadow-xl'>
            <div className='w-full h-full bg-teal-300 flex items-center justify-center text-white text-4xl'>
              <Image
                src='/Richard-Mahecha.webp'
                alt='Richard Mahecha - Licensed Therapeutic Massage Specialist'
                width={320}
                height={320}
                className='object-cover w-full h-full'
              />
            </div>
          </div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className='absolute -top-4 -right-4 w-24 h-24 rounded-full border-4 border-teal-500 border-dashed opacity-50'
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className='absolute -bottom-2 -left-2 w-16 h-16 rounded-full bg-teal-100 opacity-70'
          />
        </div>
      </motion.div>

      <motion.div
        variants={fadeIn}
        className='lg:w-3/5'
      >
        <motion.h2
          variants={fadeIn}
          className='text-4xl md:text-5xl font-bold text-gray-800 mb-2'
        >
          Richard Mahecha
        </motion.h2>

        <motion.p
          variants={fadeIn}
          className='text-teal-600 font-medium mb-8 text-lg'
        >
          Licensed Therapeutic Massage Specialist | Abu Dhabi, UAE
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
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Professional Background
            </button>
            <button
              onClick={() => setActiveTab('methodology')}
              className={`px-4 py-2 font-medium transition-colors cursor-pointer ${
                activeTab === 'methodology'
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Treatment Methodology
            </button>
            <button
              onClick={() => setActiveTab('benefits')}
              className={`px-4 py-2 font-medium transition-colors cursor-pointer ${
                activeTab === 'benefits'
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Clinical Benefits
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
            <div className='space-y-4 text-gray-700'>
              <p>
                I am Richard Mahecha, a licensed therapeutic massage specialist
                based in Abu Dhabi, UAE, with a multidisciplinary approach to
                musculoskeletal therapy and pain management.
              </p>
              <p>
                My expertise in massage therapy is rooted in a family tradition
                of manual therapy, beginning with my grandfather who practiced
                therapeutic massage. This legacy inspired me to pursue advanced
                education in evidence-based massage techniques, myofascial
                release, and neuromuscular therapy to address chronic pain
                conditions, prevent sports injuries, and promote overall
                musculoskeletal health.
              </p>
            </div>
          )}

          {activeTab === 'methodology' && (
            <div className='space-y-4 text-gray-700'>
              <p>
                I employ a comprehensive biopsychosocial approach to treatment,
                integrating Western anatomical knowledge with Eastern energy
                principles for a holistic therapeutic experience.
              </p>
              <div className='bg-teal-50 border-l-4 border-teal-500 p-4 my-6 rounded-r'>
                <p className='text-teal-800 font-medium italic'>
                  "I will personalize the massage treatment to meet your
                  emotional and physical needs. As I understand the benefits of
                  massage therapies, it is my intention to help people take care
                  of their bodies and experience the benefits of massage in
                  their lives."
                </p>
              </div>
            </div>
          )}

          {activeTab === 'benefits' && (
            <ul className='space-y-3 text-gray-700'>
              <li className='flex items-start'>
                <span className='text-teal-500 mr-2 mt-1'>✓</span>
                <span>
                  <strong>Pain Modulation:</strong> Reduction of nociceptive
                  signaling and myofascial trigger points
                </span>
              </li>
              <li className='flex items-start'>
                <span className='text-teal-500 mr-2 mt-1'>✓</span>
                <span>
                  <strong>Enhanced Circulation:</strong> Improved vascular and
                  lymphatic flow for optimized recovery
                </span>
              </li>
              <li className='flex items-start'>
                <span className='text-teal-500 mr-2 mt-1'>✓</span>
                <span>
                  <strong>Stress Reduction:</strong> Downregulation of
                  sympathetic nervous system activity
                </span>
              </li>
              <li className='flex items-start'>
                <span className='text-teal-500 mr-2 mt-1'>✓</span>
                <span>
                  <strong>Increased Mobility:</strong> Restoration of proper
                  joint arthrokinematics and range of motion
                </span>
              </li>
              <li className='flex items-start'>
                <span className='text-teal-500 mr-2 mt-1'>✓</span>
                <span>
                  <strong>Injury Prevention:</strong> Identification and
                  treatment of musculoskeletal imbalances
                </span>
              </li>
            </ul>
          )}
        </motion.div>

        <motion.div
          variants={fadeIn}
          className='mt-8 flex flex-wrap gap-4'
        >
          <WhatsAppButton
            waLink={waLink}
            variant='primary'
            label='Schedule Consultation'
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
