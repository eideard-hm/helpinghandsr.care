import type { Metadata } from 'next';

import { Toaster } from 'react-hot-toast';

import { Footer } from '@/components/common/footer';
import { Header } from '@/components/common/header';
import { SocialMediaSidebar } from '@/components/common/social-media-sidebar';
import { fraunces, inter } from '@/fonts';
import mainMetadata from '@/metadata/main';

import './globals.css';

export const metadata: Metadata = mainMetadata;

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
        className={`${inter.variable} ${fraunces.variable} font-sans bg-[var(--bg)] text-[var(--ink)] min-h-dvh grid grid-rows-[auto_1fr_auto]`}
      >
        <header className='sticky top-0 z-40 border-b bg-white/75 backdrop-blur supports-[backdrop-filter]:bg-white/60'>
          <Header />
        </header>

        <main>
          <SocialMediaSidebar />

          <div>
            <Toaster />
          </div>

          {children}
        </main>

        <footer className='bg-[color:var(--ink)] text-white py-12'>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
