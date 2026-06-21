'use client';

import Image from 'next/image';

export function FormLayout({
  children,
  formTitle,
  brand,
  logotype,
}: {
  children: React.ReactNode;
  formTitle?: string;
  brand: string;
  logotype?: string;
}) {
  return (
    <section className='mx-auto flex w-full flex-col'>
      <div className='mb-4 flex items-center gap-3 text-gray-900'>
        <Image
          width={72}
          height={72}
          className='size-16 shrink-0 aspect-square object-contain sm:size-[4.5rem]'
          src='/zeinmotiontm2.webp'
          alt={`Logo of ${brand} | Massage Therapist`}
        />

        <div>
          <p className='text-sm font-semibold uppercase tracking-wide text-[color:var(--brand)]'>
            {brand}
          </p>
          <p className='text-sm text-gray-500'>{logotype}</p>
        </div>
      </div>

      <div className='w-full rounded-lg border border-gray-100 bg-white shadow-sm'>
        <div className='space-y-4 p-5 sm:p-6 md:space-y-6'>
          {formTitle && (
            <h2 className='!text-xl font-bold leading-tight tracking-tight text-gray-900'>
              {formTitle}
            </h2>
          )}

          {children}
        </div>
      </div>
    </section>
  );
}
