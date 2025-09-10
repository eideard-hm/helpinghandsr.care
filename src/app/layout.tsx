import type { Metadata } from 'next';

import { Toaster } from 'react-hot-toast';

import { Footer } from '@/components/common/footer';
import { Header } from '@/components/common/header';
import { SocialMediaSidebar } from '@/components/common/social-media-sidebar';
import { fraunces, inter } from '@/fonts';
import { mainMetadata } from '@/metadata/main';

import './globals.css';

export const metadata: Metadata = mainMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin=''
        />

        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='48x48'
          href='/favicon-48x48.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='64x64'
          href='/favicon-64x64.png'
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
