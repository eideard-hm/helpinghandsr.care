export function minToHHMM(min: number) {
  const h = String(Math.floor(min / 60)).padStart(2, '0');
  const m = String(min % 60).padStart(2, '0');
  return `${h}:${m}`;
}

export function hhmmToMin(v: string) {
  const [h, m] = v.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}
