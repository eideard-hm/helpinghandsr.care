# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People in Abu Dhabi deciding whether to let a massage therapist come to them. The owner confirmed four audiences on 2026-10-05, all of them wanted:

- Professionals with pain or stress: residents and expatriates with back or neck pain from work who want relief without leaving home.
- Athletes and active people: recovery, assisted stretching and injury prevention.
- Hotel guests and tourists who want a premium massage in their hotel.
- Wellness and aesthetics clients: lymphatic drainage, anti-cellulite and relaxation.

Their job on the site is to judge quickly whether this person is credible and safe to invite in, pick a treatment or ask for advice, and start a WhatsApp conversation.

Inferred, not confirmed: most arrive on a phone from the Instagram bio link, Google or a shared WhatsApp link.

## Product Purpose

Marketing site for ZeinMotion™, the home massage service created and delivered by Richard Mahecha in Abu Dhabi. Success is a WhatsApp booking conversation started with a pre-filled message. A secondary flow lets clients submit a testimonial, which is moderated before it appears.

## Positioning

Therapeutic massage from a credentialed Physical Therapy Technician who comes to you, not a spa visit. One person, Richard, with 20+ years of hands-on experience, attested by MOFA and KHDA, delivers every session and created the ZeinMotion Therapy method, which combines assessment, deep tissue, sports massage, assisted stretching, head and neck work and reflexology in one session.

## Operating Context

- Booking happens on WhatsApp (+971 54 374 0644). There is no online calendar or payment.
- Sessions take place at the client's home, hotel or residence; the therapist arrives equipped. There is no studio.
- Available 7 days a week, by appointment.
- Price depends on treatment, session length, location and add-ons, and is confirmed on WhatsApp. The pricing and service-areas sections exist in code but are deliberately hidden.
- Some treatments are hidden with `visible: false` in `src/data/services.ts` at the client's request.

## Capabilities and Constraints

- Next.js 15 App Router, Tailwind CSS 4, Framer Motion; deployed on Vercel from `main`.
- The site is in English.
- Testimonials come from the `reviews` table and only approved ones are shown.
- The hero video is client-supplied footage of real sessions (1280x720, with a beach overlay and a watermark baked in). The owner did not mark it as binding on 2026-10-05; an earlier change that dropped it on mobile was reverted.
- Structured data, `llms.txt`, the sitemap and the Playwright e2e suite must keep working through any redesign.

## Brand Commitments

Binding, confirmed by the owner on 2026-10-05:

- The lotus-and-hands logo, used as supplied.
- The current site colors: green `#2f7d6d` and indigo `#2c2d84`.

Also established:

- Name: ZeinMotion™, also written "ZeinMotion - Premium Massage At Home". Tagline: "Your Trusted Touch".
- The former name "Healing Hands R" must not appear anywhere.
- Voice follows the client's Instagram and Facebook bios: Home Visits, Customized Treatments, Relieve Chronic Pain, Prevent Injury, Reduce Stress, Self-Care & Wellness.
- Headlines and descriptions may be rewritten; the owner did not mark current copy as fixed.

## Evidence on Hand

- Photos in `public/services/`: `deep-tissue-massage-big.webp` shows Richard working; the rest read as stock.
- `public/Richard-Mahecha.webp`: an informal outdoor portrait of Richard.
- Hero video in `public/video/` (HLS): real session footage, usable after 10.75 s once the logo intro ends.
- Logo files `public/zeinmotiontm.webp` and `public/zeinmotiontm2.webp`, both with transparent backgrounds.
- Credentials stated in the About copy: MOFA and KHDA attestation, Newton Training Center diploma, certifications in Deep Tissue, Sports Massage, Reflexology, Cupping Therapy and Lymphatic Drainage.
- Social presence: Instagram @zeinmotionuae, Facebook ZeinMotion.

Absent, and not to be invented:

- Approved client testimonials. The single fallback testimonial ("Robert Chen") is unverified; the owner does not know whether it is real. Do not present it as verified or mark it up as a review.
- Prices, ratings, client counts, press and before/after results.

## Product Principles

1. Trust comes first. A stranger is coming into the client's home, so the person and his credentials lead.
2. One action: start a WhatsApp conversation.
3. Therapeutic, not spa. The work is skilled and clinical in substance, premium in manner.
4. Say only what is true. No invented proof, numbers or reviews.
5. The phone is the primary screen.

## Accessibility & Inclusion

WCAG 2.2 AA, which the e2e suite and axe checks already enforce. Honor reduced motion.
