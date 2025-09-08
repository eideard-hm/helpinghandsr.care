import { SocialMediaItems } from './social-media-items';

export  function SocialMediaSidebar() {
   return (
     <aside className='fixed top-[55%] right-2 md:right-6 -translate-y-1/2 z-50'>
       <SocialMediaItems classList='flex flex-col gap-2' />
     </aside>
   );
}
