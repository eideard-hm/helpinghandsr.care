import type { Metadata } from 'next';

import { Toaster } from 'react-hot-toast';

import { fraunces, inter } from '@/fonts';
import { mainMetadata } from '@/metadata/main';

import './style.css'

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

        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon_16x16.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon_32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='48x48'
          href='/favicon_48x48.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='64x64'
          href='/favicon_64x64.png'
        />
      </head>

      <body className={`${inter.variable} ${fraunces.variable} font-sans`}>
        {children}

        <div>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
