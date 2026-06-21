import { WhatsAppButton } from './whatsapp-btn';

export function MobileWhatsAppCta() {
  return (
    <div className='fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 md:hidden'>
      <WhatsAppButton
        label='Book via WhatsApp'
        classList='w-full shadow-xl'
        size='large'
      />
    </div>
  );
}
