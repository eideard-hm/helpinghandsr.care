import type { Metadata } from 'next';

import { Toaster } from 'react-hot-toast';

import { fraunces, inter } from '@/fonts';
import mainMetadata from '@/metadata/main';

import './globals.css';
import { HeaderTitleProvider } from './providers/header-title.provider';

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
        className={`${inter.variable} ${fraunces.variable} font-sans`}
        data-scope='admin'
        data-theme-version='light'
        data-layout='vertical'
        data-nav-headerbg='color_1'
        data-headerbg='color_1'
        data-sidebar-style='full'
        data-sibebarbg='color_1'
        data-sidebar-position='fixed'
        data-header-position='fixed'
        data-container='wide'
        data-primary='color_1'
      >
        <HeaderTitleProvider>
          {children}
          <div>
            <Toaster />
          </div>
        </HeaderTitleProvider>
      </body>
    </html>
  );
}
