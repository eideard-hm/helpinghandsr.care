import type { Metadata } from 'next';

import Link from 'next/link';

import { IconArrowLeft } from '@tabler/icons-react';

import { WhatsAppButton } from '@/components/common/whatsapp-btn';
import { EmptyRoom } from '@/components/ui/visit/empty-room';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className='flex min-h-[70dvh] items-center py-16'>
      <div className='mx-auto grid w-full max-w-7xl items-center gap-x-10 gap-y-12 px-4 lg:grid-cols-12'>
        <div className='lg:col-span-6'>
          <h1 className='max-w-3xl text-[clamp(2rem,8vw,3.5rem)] text-poche lettering-display'>
            This room is not on the drawing
          </h1>
          <p className='mt-6 max-w-[52ch] text-lg leading-8 text-ink'>
            The page you are looking for does not exist or was moved. The front
            door is this way.
          </p>
          <div className='mt-9 flex flex-col gap-3 sm:flex-row'>
            <Link
              href='/'
              className='inline-flex min-h-12 items-center justify-center gap-3 border border-poche px-5 text-[0.8125rem] font-medium text-poche transition-colors lettering hover:bg-poche hover:text-limewash'
            >
              <IconArrowLeft
                size={17}
                stroke={1.5}
                aria-hidden
              />
              Back to home
            </Link>
            <WhatsAppButton label='Book on WhatsApp' />
          </div>
        </div>

        <EmptyRoom className='block h-auto w-full lg:col-span-6' />
      </div>
    </section>
  );
}
