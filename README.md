# ZeinMotion™ - Premium Massage at Home in Abu Dhabi

Marketing site for ZeinMotion™, the home massage service created by Richard Mahecha in Abu Dhabi. Visitors book through WhatsApp, and clients can leave testimonials that are moderated before they appear on the site.

- Website: https://zeinmotion.vercel.app
- Instagram: https://www.instagram.com/zeinmotionuae/
- Facebook: https://web.facebook.com/ZeinMotion/

## Stack

Next.js 15 (App Router, Turbopack), React 19, Tailwind CSS 4, Framer Motion, Prisma with PostgreSQL (Supabase), and Playwright for end-to-end tests.

## Getting started

```bash
pnpm install
pnpm dev
```

The site runs at http://localhost:3000. `pnpm dev` and `pnpm build` run `prisma generate` first.

## Environment variables

| Variable                          | Purpose                                                                  |
| --------------------------------- | ------------------------------------------------------------------------ |
| `NEXT_PUBLIC_WHATSAPP`            | WhatsApp number in international format, digits only                    |
| `NEXT_PUBLIC_WA_MESSAGE`          | Default pre-filled WhatsApp message                                      |
| `NEXT_PUBLIC_WA_MESSAGE_TEMPLATE` | Message for a specific treatment; `{SERVICE}` is replaced with its name  |
| `NEXT_PUBLIC_BRAND`               | Brand name as displayed, e.g. `ZeinMotion™`                              |
| `NEXT_PUBLIC_BRAND_SEO`           | Plain brand name used in titles and structured data                      |
| `NEXT_PUBLIC_BRAND_LOGOTYPE`      | Tagline, e.g. `Your Trusted Touch`                                       |
| `NEXT_PUBLIC_SITE_URL`            | Canonical URL for metadata, the sitemap and Open Graph images            |
| `DATABASE_URL` / `DIRECT_URL`     | PostgreSQL connection strings (pooled, and direct for migrations)        |

## Scripts

| Command         | What it does                                                   |
| --------------- | -------------------------------------------------------------- |
| `pnpm dev`      | Development server                                             |
| `pnpm build`    | Production build                                               |
| `pnpm start`    | Serve the production build                                     |
| `pnpm lint`     | ESLint                                                         |
| `pnpm test:e2e` | Playwright end-to-end suite on desktop and mobile viewports    |

### End-to-end tests

Install the browser once with `pnpm exec playwright install chromium`. The suite reuses a server already running on port 3000, or starts `pnpm dev` (the production build in CI). Set `E2E_BASE_URL` to test a deployed site instead.

The tests block Server Actions, so running them never writes testimonials to the database.

## Editing content

- Treatments: `src/data/services.ts`. `visible` controls which ones are shown and `isMain` marks the signature treatment, which gets the featured card.
- Contact details, social links and therapist details: `src/data/site.ts`
- Navigation: `src/data/navigation.ts`
- FAQ: `src/data/faq.ts`, which also feeds the FAQ structured data. Keep each answer self-contained so search engines and AI assistants can quote it.
- `SITE_UPDATED_AT` in `src/data/site.ts`: bump it whenever content changes. It feeds the sitemap, the structured data and the freshness signal; also update the date in `public/llms.txt`.
- `public/llms.txt`: plain-text summary of the business for AI assistants (ChatGPT, Claude, Perplexity). Keep it in sync with the site copy.
- Testimonials live in the `reviews` table and only `APPROVED` ones are shown. The home page revalidates every hour, so newly approved testimonials appear without a redeploy.
