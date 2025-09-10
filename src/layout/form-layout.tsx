'use client';

export function FormLayout({
  children,
  formTitle,
  brand,
}: {
  children: React.ReactNode;
  formTitle?: string;
  brand: string;
}) {
  return (
    <section className='flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0'>
      <div className='flex items-center mb-3 text-2xl font-semibold text-gray-900'>
        <img
          width={96}
          height={96}
          className='size-24 mr-2 aspect-square object-contain'
          src='/healinghandsr.webp'
          alt={`Logo of ${brand} | Message Therapist`}
        />
        {brand}
      </div>

      <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
          {formTitle && (
            <h1 className='!text-xl font-bold leading-tight tracking-tight text-gray-900 !md:text-2xl'>
              {formTitle}
            </h1>
          )}

          {children}
        </div>
      </div>
    </section>
  );
}
