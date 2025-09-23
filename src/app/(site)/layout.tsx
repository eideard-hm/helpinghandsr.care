import { Footer } from '@/components/common/footer';
import { Header } from '@/components/common/header';
import { SocialMediaSidebar } from '@/components/common/social-media-sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`bg-[var(--bg)] text-[var(--ink)] min-h-dvh grid grid-rows-[auto_1fr_auto]`}
    >
      <header className='sticky top-0 z-40 border-b bg-white/75 backdrop-blur supports-[backdrop-filter]:bg-white/60'>
        <Header />
      </header>

      <main>
        <SocialMediaSidebar />

        {children}
      </main>

      <footer className='bg-[color:var(--ink)] text-white py-12'>
        <Footer />
      </footer>
    </div>
  );
}
