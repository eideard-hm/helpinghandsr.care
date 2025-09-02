import { Fraunces, Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  variable: '--font-fraunces',
});

export { inter, fraunces };
