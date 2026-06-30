import { Footer } from '@/components/common/footer';
import { Header } from '@/components/common/header';
import { MobileWhatsAppCta } from '@/components/common/mobile-whatsapp-cta';
import { SocialMediaSidebar } from '@/components/common/social-media-sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`bg-bg text-(--ink) min-h-dvh grid grid-rows-[auto_1fr_auto]`}
    >
      <header className='sticky top-0 z-40 bg-brand backdrop-blur'>
        <Header />
      </header>

      <main className='overflow-hidden relative'>
        <SocialMediaSidebar />

        {children}

        <MobileWhatsAppCta />
      </main>

      <footer className='bg-brand-2 text-ink py-12 shadow-inner'>
        <Footer />
      </footer>
    </div>
  );
}
