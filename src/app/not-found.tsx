import type { Metadata } from 'next';

import Image from 'next/image';
import Link from 'next/link';

import { IconArrowLeft } from '@tabler/icons-react';

import { WhatsAppButton } from '@/components/common/whatsapp-btn';
import { env } from '@/config/env';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className='flex min-h-[70dvh] items-center bg-bg px-4 py-16'>
      <div className='mx-auto max-w-xl text-center'>
        <Image
          src='/zeinmotiontm2.webp'
          alt={`${env.brandSEO} logo`}
          width={120}
          height={120}
          className='mx-auto size-28 object-contain'
        />
        <p className='mt-6 text-sm font-semibold tracking-[0.2em] text-brand uppercase'>
          Error 404
        </p>
        <h1 className='mt-3 text-4xl font-extrabold text-balance md:text-5xl'>
          This page took a different path
        </h1>
        <p className='mt-4 text-lg leading-8 text-gray-600'>
          The page you are looking for does not exist or was moved. Let us
          guide you back to relief.
        </p>
        <div className='mt-8 flex flex-col justify-center gap-3 sm:flex-row'>
          <Link
            href='/'
            className='inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-brand bg-white px-5 font-semibold text-brand transition-colors hover:bg-brand hover:text-white'
          >
            <IconArrowLeft
              size={18}
              aria-hidden
            />
            Back to home
          </Link>
          <WhatsAppButton label='Book on WhatsApp' />
        </div>
      </div>
    </section>
  );
}
