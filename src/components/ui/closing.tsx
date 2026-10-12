import { SERVICE_AREAS } from '@/data/site';
import { WhatsAppButton } from '../common/whatsapp-btn';
import { HourControl } from './visit/hour-control';
import { VisitDrawing } from './visit/visit-drawing';

/** The ground the building stands on: the room once more, one last place to pick an hour and book. */
export function Closing() {
  return (
    <section
      id='closing'
      aria-labelledby='closing-title'
      data-ground='poche'
      className='bg-poche py-20 lg:py-28'
    >
      <div className='mx-auto grid max-w-7xl gap-x-10 gap-y-10 px-4 lg:grid-cols-12'>
        <div className='lg:col-span-5 lg:row-start-1'>
          <h2
            id='closing-title'
            className='text-[clamp(2rem,8vw,3.75rem)] text-limewash lettering-display'
          >
            Pick an hour.{' '}
            <span className='block text-on-poche'>He brings the table.</span>
          </h2>
          <p className='mt-6 max-w-[52ch] text-lg leading-8 text-on-poche'>
            Tell Richard where it hurts, where you are and when suits you. You
            get a tailored recommendation and a confirmed time on WhatsApp.
          </p>
          <p className='mt-4 max-w-[52ch] text-[0.9375rem] leading-7 text-on-poche/80'>
            {SERVICE_AREAS.slice(0, -1).join(', ')} and {SERVICE_AREAS.at(-1)},
            with the rest of the emirate on request.
          </p>
        </div>

        {/* The room reads as an opening cut into the ground: its walls and slabs are the indigo around it. */}
        <VisitDrawing
          view='room'
          className='lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:self-end'
        />

        <div className='lg:col-span-5 lg:row-start-2'>
          <HourControl
            ground='poche'
            legend='Your preferred hour'
            className='max-w-120'
          />
          <WhatsAppButton
            label='Book this visit'
            size='large'
            variant='light'
            classList='mt-8 w-full sm:w-auto'
          />
        </div>
      </div>
    </section>
  );
}
