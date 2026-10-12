import type { Metadata, Viewport } from 'next';

import { Toaster } from 'react-hot-toast';

import { Footer } from '@/components/common/footer';
import { Header } from '@/components/common/header';
import { MobileWhatsAppCta } from '@/components/common/mobile-whatsapp-cta';
import { MotionProvider } from '@/components/common/motion-provider';
import { SocialMediaSidebar } from '@/components/common/social-media-sidebar';
import { fraunces, inter } from '@/fonts';
import mainMetadata, {
  businessSchema,
  therapistSchema,
  websiteSchema,
} from '@/metadata/main';

import './globals.css';

export const metadata: Metadata = mainMetadata;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Site-wide entities; page-specific ones (FAQ, service) live on their page.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [businessSchema, therapistSchema, websiteSchema],
  };

  return (
    <html
      lang='en'
      data-scroll-behavior='smooth'
      className={`${inter.variable} ${fraunces.variable}`}
    >
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body className='grid min-h-dvh grid-rows-[auto_1fr_auto] bg-bg font-sans text-ink antialiased'>
        <a
          href='#main-content'
          className='fixed top-3 left-3 z-50 -translate-y-24 rounded-lg bg-ink px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform focus:translate-y-0'
        >
          Skip to content
        </a>

        <MotionProvider>
          <Header />

          <main
            id='main-content'
            tabIndex={-1}
            className='relative min-w-0 overflow-x-clip outline-none'
          >
            <SocialMediaSidebar />

            <div>
              <Toaster />
            </div>

            {children}

            <MobileWhatsAppCta />
          </main>

          <footer className='bg-ink pb-24 text-white/75 lg:pb-0'>
            <Footer />
          </footer>
        </MotionProvider>
      </body>
    </html>
  );
}
