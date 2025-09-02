import type { Metadata } from 'next';

import { mainMetadata } from '@/metadata/main';

import './globals.css';
import { fraunces, inter } from '@/fonts';

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
      </head>

      <body
        className={`${inter.variable} ${fraunces.variable} font-sans min-h-dvh grid grid-rows-[auto_1fr_auto] bg-slate-50 text-slate-900`}
      >
        <header className='sticky top-0 z-40 bg-white/80 backdrop-blur border-b'>
          <div className='container mx-auto py-4'>
            <h1 className='text-xl font-bold'>Helping Hands Sr Care</h1>
          </div>
        </header>

        <main
          id='contenido'
          className='container mx-auto grid grid-cols-12 gap-6 px-4 py-8'
        >
          <aside
            className='col-span-3 xl:col-span-2 hidden md:block'
            aria-label='Redes sociales'
          ></aside>

          <section className='col-span-12 md:col-span-9 xl:col-span-10'>
            {children}
          </section>
        </main>

        <footer className='border-t bg-white'>
          <div className='container mx-auto px-4'></div>
        </footer>
      </body>
    </html>
  );
}
