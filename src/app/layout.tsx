import type { Metadata } from 'next';

import { Toaster } from 'react-hot-toast';

import { Footer } from '@/components/common/footer';
import { Header } from '@/components/common/header';
import { SocialMediaSidebar } from '@/components/common/social-media-sidebar';
import { fraunces, inter } from '@/fonts';
import mainMetadata from '@/metadata/main';

import './globals.css';

export const metadata: Metadata = mainMetadata;

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#2F7D6D',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      data-scroll-behavior='smooth'
    >
      <head>
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin=''
        />
      </head>

      <body
        className={`${inter.variable} ${fraunces.variable} font-sans bg-bg text-ink min-h-dvh grid grid-rows-[auto_1fr_auto]`}
      >
        <header className='sticky top-0 z-40 bg-brand backdrop-blur'>
          <Header />
        </header>

        <main className='overflow-hidden relative'>
          <SocialMediaSidebar />

          <div>
            <Toaster />
          </div>

          {children}
        </main>

        <footer className='bg-brand-2 text-ink py-12 shadow-inner'>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
