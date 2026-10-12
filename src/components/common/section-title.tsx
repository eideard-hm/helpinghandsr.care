import { cn } from '@/lib/cn';

type SheetHeadingProps = {
  children: React.ReactNode;
  /** One or two sentences under the heading. */
  lede?: React.ReactNode;
  id?: string;
  ground?: 'limewash' | 'poche';
  className?: string;
};

/** A section heading in drafted capitals, with an optional lede. */
export function SheetHeading({
  children,
  lede,
  id,
  ground = 'limewash',
  className,
}: SheetHeadingProps) {
  const onPoche = ground === 'poche';

  return (
    <div className={cn('max-w-3xl', className)}>
      <h2
        id={id}
        className={cn(
          'text-[clamp(2rem,7vw,3.25rem)] lettering-display',
          onPoche ? 'text-limewash' : 'text-poche'
        )}
      >
        {children}
      </h2>
      {lede && (
        <p
          className={cn(
            'mt-5 max-w-[62ch] text-lg leading-8',
            onPoche ? 'text-on-poche' : 'text-ink-soft'
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

type SectionTitleProps = {
  children: React.ReactNode;
  subTitle?: string;
  id?: string;
  className?: string;
};

/** Kept for the sections that are currently hidden; new work uses SheetHeading. */
export function SectionTitle({
  children,
  subTitle,
  id,
  className,
}: SectionTitleProps) {
  return (
    <SheetHeading
      id={id}
      lede={subTitle}
      className={cn('mb-10', className)}
    >
      {children}
    </SheetHeading>
  );
}
