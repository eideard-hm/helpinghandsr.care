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
          className='aspect-square size-16 shrink-0 object-contain sm:size-18'
          src='/zeinmotiontm2.webp'
          alt={`Logo of ${brand} | Massage Therapist`}
        />

        <div>
          <p className='text-sm font-semibold tracking-wide text-brand-700 uppercase'>
            {brand}
          </p>
          <p className='text-sm text-gray-500'>{logotype}</p>
        </div>
      </div>

      <div className='w-full rounded-3xl bg-white shadow-xl ring-1 shadow-ink/5 ring-gray-200/70'>
        <div className='space-y-5 p-6 sm:p-8'>
          {formTitle && (
            <h2 className='text-2xl leading-tight font-bold text-title-indigo'>
              {formTitle}
            </h2>
          )}

          {children}
        </div>
      </div>
    </section>
  );
}
