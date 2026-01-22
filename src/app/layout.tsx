import type { Metadata } from 'next';

import { Toaster } from 'react-hot-toast';

import { fraunces, inter } from '@/fonts';
import mainMetadata from '@/metadata/main';

import './style.css';

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

      <body className={`${inter.variable} ${fraunces.variable} font-sans`}>
        {children}

        <div>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
