import type { Metadata } from 'next';

import { Header } from '@/components/common/header';
import { fraunces, inter } from '@/fonts';
import { mainMetadata } from '@/metadata/main';
import { BodyContainerLayout } from '@/layout/body-container';

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
        className={`${inter.variable} ${fraunces.variable} font-sans bg-[var(--bg)] text-slate-900 min-h-dvh grid grid-rows-[auto_1fr_auto]`}
      >
        <header className='sticky top-0 z-40 border-b bg-white/75 backdrop-blur supports-[backdrop-filter]:bg-white/60'>
          <Header />
        </header>

        <BodyContainerLayout>
          <section className='col-span-12 md:col-span-9 xl:col-span-10'>
            {children}
          </section>
        </BodyContainerLayout>

        <footer className='border-t bg-white my-4'>
          <div className='container mx-auto px-4 max-w-7xl'>Footer</div>
        </footer>
      </body>
    </html>
  );
}
