import { SheetHeading } from '../../common/section-title';
import { VisitDrawing } from '../visit/visit-drawing';
import { Steps } from './steps';

export function HowItWorks() {
  return (
    <section
      id='how-it-works'
      aria-labelledby='how-it-works-title'
      className='bg-shadow py-20 lg:py-28'
    >
      <div className='mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-12 lg:gap-10'>
        <div className='lg:col-span-5'>
          <SheetHeading
            id='how-it-works-title'
            lede='Booking is one conversation. The rest happens where you already are.'
          >
            The day of your visit
          </SheetHeading>

          {/* Detail of the arrival, at the hour chosen above. */}
          <VisitDrawing
            view='door'
            className='mt-10 max-w-[18rem] lg:mt-14 lg:max-w-md'
          />
        </div>

        <Steps />
      </div>
    </section>
  );
}
