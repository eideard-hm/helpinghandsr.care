import { Barlow, Tomorrow } from 'next/font/google';

// Reading text.
const text = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-text-face',
});

// Drafted lettering for headings, labels and time stamps; always set inclined.
const lettering = Tomorrow({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['italic'],
  display: 'swap',
  variable: '--font-lettering-face',
});

export { lettering, text };
