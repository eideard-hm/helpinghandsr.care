import type { Metadata, Viewport } from 'next';

import { Toaster } from 'react-hot-toast';

import { Footer } from '@/components/common/footer';
import { Header } from '@/components/common/header';
import { MobileWhatsAppCta } from '@/components/common/mobile-whatsapp-cta';
import { MotionProvider } from '@/components/common/motion-provider';
import { VisitProvider } from '@/components/common/visit-provider';
import { lettering, text } from '@/fonts';
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
  themeColor: '#f2f3ef',
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
      className={`${text.variable} ${lettering.variable}`}
    >
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body className='grid min-h-dvh grid-rows-[auto_1fr_auto] antialiased'>
        <a
          href='#main-content'
          className='fixed top-3 left-3 z-50 -translate-y-24 bg-poche px-4 py-3 text-xs font-medium text-limewash transition-transform lettering focus:translate-y-0'
        >
          Skip to content
        </a>

        <MotionProvider>
          <VisitProvider>
            <Header />

            <main
              id='main-content'
              tabIndex={-1}
              className='relative min-w-0 overflow-x-clip outline-none'
            >
              <div>
                <Toaster />
              </div>

              {children}

              <MobileWhatsAppCta />
            </main>

            <footer
              data-ground='poche'
              className='bg-poche-deep pb-24 lg:pb-0'
            >
              <Footer />
            </footer>
          </VisitProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
