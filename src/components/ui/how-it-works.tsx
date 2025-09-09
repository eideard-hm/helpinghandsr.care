import { IconSquareRoundedCheck } from '@tabler/icons-react';

import { waLinkWithEnv } from '@/lib/whatsapp';
import { SectionTitle } from '../common/section-title';
import { StepDot } from '../common/step-dot';
import { WhatsAppButton } from '../common/whatsapp-btn';

export function HowItWorks() {
  const waHref = waLinkWithEnv();

  return (
    <section
      id='how-it-works'
      className='py-20 bg-gray-50 shadow'
    >
      <div className='container mx-auto px-4 max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div>
          <SectionTitle>
            How It Works
          </SectionTitle>

          <ol className='flex flex-col gap-4 mb-8'>
            <li className='flex items-center gap-3'>
              <StepDot value={1} />
              <div>
                <span className='font-semibold text-lg'>
                  Texting us on WhatsApp
                </span>
                <p className='text-sm font-light'>
                  Send us{' '}
                  <a
                    className='text-blue-500 hover:underline'
                    target='_blank'
                    rel='noopener noreferrer'
                    href={waHref}
                  >
                    this message
                  </a>{' '}
                  to get started
                </p>
              </div>
            </li>
            <li className='flex items-center gap-3'>
              <StepDot value={2} />
              <div>
                <span className='font-semibold text-lg'>
                  Booking an appointment
                </span>
                <p className='text-sm font-light'>
                  Choose a date and time that works for you
                </p>
              </div>
            </li>
            <li className='flex items-center gap-3'>
              <StepDot value={3} />
              <div>
                <span className='font-semibold text-lg'>
                  Receiving confirmation
                </span>
                <p className='text-sm font-light'>
                  You will receive a confirmation message with the details
                </p>
              </div>
            </li>
            <li className='flex items-center gap-3'>
              <StepDot value={4} />
              <div>
                <span className='font-semibold text-lg'>Get the service</span>
                <p className='text-sm font-light'>
                  Our therapist will arrive at your location
                </p>
              </div>
            </li>
          </ol>
        </div>

        <div>
          <SectionTitle>Benefits</SectionTitle>

          <ul className='flex flex-col gap-4'>
            <li>
              <IconSquareRoundedCheck
                size={24}
                className='inline-block text-green-500'
              />{' '}
              Professional certification
            </li>

            <li>
              <IconSquareRoundedCheck
                size={24}
                className='inline-block text-green-500'
              />{' '}
              Custom attention
            </li>

            <li>
              <IconSquareRoundedCheck
                size={24}
                className='inline-block text-green-500'
              />{' '}
              Premium materials
            </li>

            <li>
              <IconSquareRoundedCheck
                size={24}
                className='inline-block text-green-500'
              />{' '}
              Timely delivery
            </li>

            <li>
              <WhatsAppButton
                waLink={waHref}
                label='Booking now'
              />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
