import { env } from '@/config/env';
import { THERAPIST } from '@/data/site';
import { SheetHeading } from '../common/section-title';

// The four promises from the client's Instagram and Facebook bios.
const PROMISES = [
  {
    title: 'Relieve chronic pain',
    detail:
      'Therapeutic techniques for chronic pain, tight muscles, stiffness and limited mobility.',
  },
  {
    title: 'Prevent injury',
    detail:
      'Care for active bodies, posture strain and recovery, before small issues become recurring pain.',
  },
  {
    title: 'Reduce stress',
    detail:
      'Release the tension that builds up from work, training and daily routines, and leave feeling lighter.',
  },
  {
    title: 'Self-care at home',
    detail:
      'No commute. Every session comes to your home, hotel or residence in Abu Dhabi, tailored to you.',
  },
] as const;

export function SessionExperience() {
  return (
    <section
      id='benefits'
      aria-labelledby='benefits-title'
      className='py-20 lg:py-28'
    >
      <div className='mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-12 lg:gap-10'>
        <div className='lg:col-span-5'>
          <SheetHeading id='benefits-title'>What a visit is for</SheetHeading>

          <p className='mt-6 max-w-[58ch] text-lg leading-8 text-ink'>
            {env.brand} is a premium home massage service in Abu Dhabi created
            by {THERAPIST.name}, a {THERAPIST.role} with{' '}
            {THERAPIST.yearsOfExperience}+ years of experience. It is
            therapeutic massage from a mobile massage therapist, brought to
            your door &mdash; not a generic spa
            visit &mdash; shaped around your body and goals.
          </p>

          <p className='mt-8 text-sm font-medium text-life-deep lettering'>
            {env.brandLogotype}
          </p>
        </div>

        <ul className='border-t border-poche lg:col-span-7'>
          {PROMISES.map(({ title, detail }) => (
            <li
              key={title}
              className='grid gap-x-8 gap-y-2 border-b border-mortar py-7 sm:grid-cols-[minmax(0,15rem)_1fr] sm:items-baseline'
            >
              <h3 className='text-2xl text-poche lettering-display'>{title}</h3>
              <p className='max-w-[52ch] text-[1.0625rem] leading-7 text-ink-soft'>
                {detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
