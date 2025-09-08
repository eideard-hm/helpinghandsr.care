type StepDotProps = {
  value: number | string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'peach' | 'brand';
  className?: string;
};

const sizeMap = {
  sm: 'h-7 w-7 text-sm',
  md: 'h-9 w-9 text-base',
  lg: 'h-12 w-12 text-lg',
};

const colorMap = {
  peach:
    'bg-[rgba(249,115,22,0.12)] text-[color:var(--ink)]/80 ring-[rgba(249,115,22,0.20)]', // usa --accent
  brand:
    'bg-[color:var(--brand)]/10 text-[color:var(--brand)] ring-[color:var(--brand)]/20',
};

export function StepDot({
  value,
  size = 'md',
  color = 'peach',
  className = '',
}: StepDotProps) {
  return (
    <span
      aria-label={`Step ${value}`}
      className={[
        'inline-flex items-center justify-center rounded-full ring-1',
        sizeMap[size],
        colorMap[color],
        'font-semibold select-none',
        className,
      ].join(' ')}
    >
      {value}
    </span>
  );
}
