import { SocialMediaItems } from './social-media-items';

export function SocialMediaSidebar() {
  return (
    <aside
      aria-label='Contact and social media'
      className='fixed top-1/2 right-5 z-30 hidden -translate-y-1/2 lg:block'
    >
      <SocialMediaItems classList='flex-col gap-3' />
    </aside>
  );
}
