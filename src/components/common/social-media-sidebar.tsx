import { SocialMediaItems } from './social-media-items';

export function SocialMediaSidebar() {
  return (
    <aside className='fixed top-[55%] right-6 z-50 hidden -translate-y-1/2 md:block'>
      <SocialMediaItems classList='flex flex-col gap-2' />
    </aside>
  );
}
