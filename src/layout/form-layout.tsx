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
    <section className='border-t-8 border-poche bg-white px-5 py-7 shadow-[0_24px_60px_-28px_rgba(23,24,63,0.45)] sm:px-8 sm:py-9'>
      {formTitle && (
        <h2 className='text-[1.75rem] text-poche lettering-display'>
          {formTitle}
        </h2>
      )}
      <p className='mt-2 text-sm text-ink-soft'>
        {brand}
        {logotype ? `. ${logotype}.` : null}
      </p>

      <div className='mt-7'>{children}</div>
    </section>
  );
}
