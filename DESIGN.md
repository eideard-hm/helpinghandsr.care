---
name: ZeinMotion
description: A daylight architectural section through an Abu Dhabi home; the visit is read by where the light falls and which hour is stamped.
colors:
  limewash: "#f2f3ef"
  plaster: "#e7e9e3"
  mortar: "#cdd0c9"
  shadow: "#e2e4f1"
  poche: "#2c2d84"
  poche-deep: "#1e1f63"
  ink: "#17183f"
  ink-soft: "#4a4c7c"
  on-poche: "#c5c7ea"
  sun: "#dcae3f"
  sun-deep: "#7d5f0e"
  life: "#2f7d6d"
  life-deep: "#245f53"
  life-tint: "#a7dec1"
  alert: "#a3261d"
typography:
  display:
    fontFamily: "Tomorrow, 'Arial Narrow', Arial, sans-serif"
    fontSize: "clamp(2rem, 7vw, 3.25rem)"
    fontWeight: 300
    lineHeight: 1.08
    letterSpacing: "0.06em"
  headline:
    fontFamily: "Tomorrow, 'Arial Narrow', Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 300
    lineHeight: 1.08
    letterSpacing: "0.06em"
  title:
    fontFamily: "Tomorrow, 'Arial Narrow', Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 300
    lineHeight: 1.08
    letterSpacing: "0.06em"
  lede:
    fontFamily: "Barlow, 'Segoe UI', Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: "2rem"
    letterSpacing: "normal"
  body:
    fontFamily: "Barlow, 'Segoe UI', Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: "1.75rem"
    letterSpacing: "normal"
  label:
    fontFamily: "Tomorrow, 'Arial Narrow', Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: "0.1em"
  label-small:
    fontFamily: "Tomorrow, 'Arial Narrow', Arial, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: "0.1em"
  stamp:
    fontFamily: "Tomorrow, 'Arial Narrow', Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.04em"
    fontVariation: "tabular-nums"
rounded:
  none: "0px"
spacing:
  gutter: "16px"
  row: "28px"
  column-gap: "40px"
  stack: "48px"
  section: "80px"
  section-lg: "112px"
components:
  button-whatsapp:
    backgroundColor: "{colors.life}"
    textColor: "#ffffff"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "48px"
  button-whatsapp-hover:
    backgroundColor: "{colors.life-deep}"
  button-whatsapp-light:
    backgroundColor: "{colors.life}"
    textColor: "#ffffff"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "48px"
  button-whatsapp-light-hover:
    backgroundColor: "{colors.life-deep}"
  button-whatsapp-large:
    backgroundColor: "{colors.life}"
    textColor: "#ffffff"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "56px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.poche}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "48px"
  button-outline-hover:
    backgroundColor: "{colors.poche}"
    textColor: "{colors.limewash}"
  button-outline-on-poche:
    backgroundColor: "transparent"
    textColor: "{colors.limewash}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "48px"
  button-outline-on-poche-hover:
    backgroundColor: "{colors.limewash}"
    textColor: "{colors.poche}"
  button-submit:
    backgroundColor: "{colors.poche}"
    textColor: "{colors.limewash}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "56px"
  button-submit-hover:
    backgroundColor: "{colors.poche-deep}"
  icon-button:
    backgroundColor: "transparent"
    textColor: "{colors.poche}"
    rounded: "{rounded.none}"
    size: "44px"
  icon-button-hover:
    backgroundColor: "{colors.poche}"
    textColor: "{colors.limewash}"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
    height: "44px"
  nav-link-active:
    textColor: "{colors.poche}"
  field:
    backgroundColor: "{colors.limewash}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px"
  field-focus:
    backgroundColor: "{colors.shadow}"
  sheet:
    backgroundColor: "{colors.limewash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "24px 20px"
  aperture:
    backgroundColor: "{colors.poche}"
    rounded: "{rounded.none}"
---

# Design System: ZeinMotion

## Overview

**Creative North Star: "La visita"**

The whole site is one architectural section cut through an Abu Dhabi home, drawn on limewash and read across a day. Walls, slabs and the ground the building stands on are indigo poché, the solid of everything the section cuts through; the sun is the logo's gold and is the only thing that moves. Richard stands at the open front door with the folded table, and a dashed outline by the window shows where it will go. Choosing an hour moves the sun through the rooms, restamps the time on the drawing and, only once the visitor has chosen, carries that hour into the WhatsApp message. The brief, not the brand book, sets the manner: skilled and clinical in substance, premium in manner, and the proof is the person and the home visit itself.

The density is that of a drawing sheet: wide margins, one-pixel rules, hairline leaders and ticks, lettering in tracked inclined capitals, long measures of reading text, and nothing framed in a card. Sections alternate limewash, a pale indigo shadow tint, and full indigo poché; photographs are set as apertures cut into the indigo and rest in shadow until the light reaches them. Controls are sharp rectangles with no radius anywhere.

Confirmed refusals: no photo-hero wellness template, no rows of benefit cards, no eyebrows or kickers above headings, no rounded corners, no prices, ratings or counts, no decorative motion beyond the light.

**Key Characteristics:**
- Limewash ground with indigo poché for walls, slabs, the ground and the footer.
- Gold reserved for light (the beam, the sun, the lamp) and the active mark.
- Green reserved for the action and living things.
- Inclined drafted capitals (Tomorrow italic) over plain reading text (Barlow).
- One-pixel rules, leaders and dimension ticks instead of boxes and shadows.
- Photographs as apertures that come into colour mid-viewport.
- Only light moves, with one sweep on arrival.

## Colors

A drawing palette: one warm-grey ground, one indigo for everything solid, one gold for light, one green for life, used as roles rather than as a gradient of tints.

### Primary
- **Indigo Poché** (`poche`): the binding brand indigo. Every cut wall and slab in the section drawing, the About and Closing grounds, section headings, outline keylines, the focus ring on limewash, the sticky header's rule once scrolled, the thick top rule of dialogs and the form sheet, and the 8-10px reveals around apertures.
- **Deep Poché** (`poche-deep`): the footer ground, the night sky, the hover of indigo-filled controls, and the video well. Never a text colour.
- **Ink** (`ink`): reading text and all lettering drawn onto the section (stamps, leaders, dimension lines, annotations), so it reads on plaster and inside the beam.
- **Ink Soft** (`ink-soft`): secondary reading text, ledes, inactive nav links, availability notes, placeholders.
- **On Poché** (`on-poche`): the reading text, labels and rules on indigo grounds; 25% and 40% for rules.

### Secondary
- **Logo Gold / Sun** (`sun`): the sun disc, the beam gradient (70% to 34% opacity), the night-time windows and lamp cone, and every active mark: the 12px hour marker, the 14px arrival tick on the timeline, the 3px active nav underline, the 3px selected tab rule, the 4px sunlit sill under a lit aperture, the selected rating stars, text selection, and the focus ring on indigo grounds. Also the hover decoration of links on indigo.
- **Sun Deep** (`sun-deep`): declared for gold-on-limewash text; not yet used on the shipped surfaces.

### Tertiary
- **Life Green** (`life`): the binding brand green. The WhatsApp action on every ground, the third line of the H1 ("in Abu Dhabi"), the logotype line, the balcony plant in the drawing, the caret, and the underline tint of inline WhatsApp links.
- **Life Deep** (`life-deep`): green hover, the inline "Ask Richard on WhatsApp" link, the success heading of the testimonial form.
- **Life Tint** (`life-tint`): declared as the pale green for a secondary filled button; not used on the shipped surfaces.

### Neutral
- **Limewash** (`limewash`): the page ground, the header, the dialog sheet, text on indigo grounds, the plate the logo sits on in the footer, and the hover fill of outline controls on indigo.
- **Plaster** (`plaster`): the inside face of the visitor's room in the drawings.
- **Mortar** (`mortar`): the default border colour. One-pixel rules between list rows, the header rule at rest, dialog header and footer rules, the unselected rating star.
- **Shadow Tint** (`shadow`): a pale indigo wash for withdrawn regions: the How-it-works and FAQ section grounds, the focused field, and the ghost hover.
- **Alert** (`alert`): form error text, the error field rule, the 2px top rule above a server error. Nothing else.
- **White** (`#ffffff`): the text on green WhatsApp actions and the form sheet ground on `/testimonials`. The only places pure white appears.

### Named Rules
**The Gold Is Light Rule.** Gold appears only where light falls or where the visitor's choice is marked. It never fills a button, never colours a heading, and never decorates.

**The Green Is The Action Rule.** Green is the WhatsApp action and living things. One green action per composition on each ground; on indigo it keeps the same green and gains a limewash keyline (`1px solid rgba(242,243,239,0.8)`) rather than changing colour.

**The Poché Rule.** Indigo is the solid the section cuts through. It is a ground (About, Closing, footer), a cut (reveals, thick top rules), or a line (keylines, headings), never a tint. The one tint, `shadow`, marks withdrawn regions and is never a text colour.

## Typography

**Display Font:** Tomorrow, italic only, weights 300/400/500 (with 'Arial Narrow', Arial, sans-serif)
**Body Font:** Barlow, weights 400/500/600 (with 'Segoe UI', Arial, sans-serif)
**Label/Mono Font:** Tomorrow italic with tabular figures, for time stamps and counters

**Character:** Drafted lettering on a drawing sheet. Every heading, label, control and stamp is set in inclined tracked capitals, light at display size; reading text is upright, plain and generous in measure. The pairing reads as a title block beside a plan.

### Hierarchy
- **Display** (300, `clamp(2rem, 7vw, 3.25rem)`, 1.08, 0.06em, uppercase): section headings (`SheetHeading`). The H1 runs `clamp(2rem, 10vw, 3.25rem)` on phones and `clamp(2.6rem, 3.9vw, 3.5rem)` from 64rem, in three stacked lines with the third in green; the Closing heading runs to `clamp(2rem, 8vw, 3.75rem)` and the About name to `clamp(2.25rem, 9vw, 4.25rem)`. Indigo on limewash, limewash on indigo.
- **Headline** (300, 1.5rem, 1.08, 0.06em, uppercase): list-row titles (promises, timeline steps, treatment rows), dialog titles (1.5-1.75rem), the featured treatment (`clamp(1.75rem, 5.5vw, 2.5rem)`), the session-footage title (1.875rem).
- **Title** (300, 1.25rem, 1.08, 0.06em, uppercase): sub-headings inside dialogs and sheets ("What is included", "How we work").
- **Lede** (400, 1.125rem, 2rem): the sentence under a section heading, the hero promise on desktop, dialog excerpts; 52-62ch.
- **Body** (400, 1.0625rem, 1.75rem): reading text everywhere; 52-68ch. Footer and dialog detail lists drop to 0.9375rem. Testimonial quotes rise to 1.25-1.375rem on a 2.25-2.5rem line.
- **Label** (500, 0.75rem, 0.1em, uppercase, italic): nav links, buttons, field labels, tab labels, technique lists, the footer's column headings, the testimonial author. Buttons step 0.75 / 0.8125 / 0.875rem with their size.
- **Label small** (500, 0.6875rem, 0.1em, uppercase, italic): hour names on the axis, title-block and footer definition terms, the mobile credential line.
- **Stamp** (300-400, tabular figures, 0.04em, italic): hour times on the control (1.25-1.5rem, 300 at rest, 400 when chosen), the arrival time on the timeline (1.5rem), the phone number, dates, counters and slide positions (0.875rem). In the SVG, stamps are 34-42 drawing units at weight 300.

### Named Rules
**The Lettering Rule.** Anything that names, labels or commands is set in Tomorrow italic capitals; anything that explains is set in Barlow. There is no third voice and no upright heading.

**The No Kicker Rule.** A section heading is a heading and a lede, nothing above it. Context comes from the drawing, the rule and the ground, not from an eyebrow.

**The Stamp Rule.** Figures that are times, dates, counts or phone numbers are stamps: tabular, italic, light. They are never set in Barlow.

## Layout

One container of 80rem (`max-w-7xl`) with a 16px gutter (`px-4`), on a twelve-column grid from 64rem with a 40px column gap (`gap-10`). Headings and reading text take five columns; the drawing, lists, timelines and tabs take seven (About gives the portrait and title block four and the text eight; FAQ is four and eight; Testimonials is seven and four with a gap column). Below 64rem everything stacks in a single column with a 48px gap (`gap-12`) between the heading block and the list.

The hero is the one composition that breaks the container: the section drawing sits in the right seven columns, runs from the header rule down to the ground line and bleeds off the right edge (`--bleed: max(1rem, calc((100vw - 80rem) / 2 + 1rem))`, `preserveAspectRatio: xMaxYMax slice`). On phones the drawing is cropped to the living room (`view='room'`), runs edge to edge, and is placed before the promise paragraph so the hour control and the WhatsApp action remain in the first screen.

Vertical rhythm: sections are 80px tall at the edges (`py-20`) and 112px from 64rem (`py-28`); the testimonial page is 40/64px. Lists are ruled rows: a 1px indigo rule on top, 1px mortar rules between rows, 28px of row padding (`py-7`), with two-column rows (`minmax(0,15rem) 1fr`, `7.5rem 1fr`, `13rem 1fr`) aligned on the baseline. Timelines hang from a 1px indigo axis on the left with 32-40px of inset. Ledes sit 20-24px under a heading; actions sit 28-32px under their content; buttons wrap in a 12px-gap row from 40rem.

Grounds alternate down the page: limewash (hero, benefits, treatments, testimonials), shadow tint (how it works, FAQ), indigo (About, Closing), deep indigo (footer). The header is sticky at 72px (88px from 64rem) on limewash; its bottom rule turns from mortar to indigo after 8px of scroll. Anchor scrolling clears it with `scroll-padding-top: 5.5rem` (6.5rem from 64rem). A fixed WhatsApp action appears across the bottom of phone screens once the hero's action has scrolled past 90% of the viewport and withdraws while the Closing section is in view; the footer carries 96px of bottom padding so it is never covered.

Breakpoints in use: 40rem (`sm`, two-column rows and inline button rows), 48rem (`md`, footer bottom row), 64rem (`lg`, the twelve-column grid, desktop nav, the full drawing).

## Elevation & Depth

Flat, drawn on one sheet. Depth is conveyed by the section itself: indigo poché is solid and nearest, plaster and limewash are the rooms beyond the cut, the shadow tint is a region withdrawn from the light, and the beam is the only thing laid over the drawing. Hierarchy on the page comes from rules, reveals and ground changes, never from cards or ambient shadows. Apertures sit in thick indigo reveals (10px around the featured treatment, 8px around treatment rows); the dialog and the form sheet carry an 8px indigo top rule like a sheet's border.

### Shadow Vocabulary
- **Floating sheet** (`box-shadow: 0 24px 60px -20px rgba(23,24,63,0.55)`): the dialog panel, which is the only element lifted off the page.
- **Form sheet** (`box-shadow: 0 24px 60px -28px rgba(23,24,63,0.45)`): the white testimonial form on `/testimonials`.
- **Fixed action** (`box-shadow: 0 14px 30px -12px rgba(23,24,63,0.6)`): the mobile WhatsApp action while it floats over the page.
- **Scrim** (`rgba(23,24,63,0.6)` behind dialogs, `0.5` behind the mobile menu): ink at partial opacity, never black.

### Named Rules
**The One Sheet Rule.** Nothing on the page casts a shadow. Only things that leave the sheet (dialog, floating action, form sheet) may, and their shadow is ink-tinted, long and soft, never a hard offset.

**The Light Moves Rule.** Motion belongs to light: the beam and sun settle to the chosen hour in 1.2s, the beam sweeps once on arrival in 1.6s, the gold marker rides the axis in 0.5s, apertures come into colour in 1s, the nav underline grows in 0.5s, all on `cubic-bezier(0.16, 1, 0.3, 1)`. Interface state (hover colour 200ms, accordion 300ms, dialog 350ms in / 200ms out, mobile menu 250ms, tab and slide fades 350-400ms) changes quietly and nothing else travels. `prefers-reduced-motion` collapses every animation to 0.01ms and the drawing transitions to zero.

## Shapes

Every corner is square: no element on the shipped surfaces carries a radius (`rounded: 0`). Controls are sharp rectangles 44, 48 or 56px tall; icon controls are 44px squares; marks are squares (12px hour marker, 14px arrival tick). Lines are 1px rules in mortar, indigo, or on-poché at 25-40%, thickening to 2px for a field's rule, 3px for an active underline or tab, 4px for a sunlit sill, and 8-10px for reveals and top rules. Outline controls carry a 1px keyline in the ground's ink; on indigo the green action carries a 1px limewash keyline at 80%.

The drawing's own language carries into the page: dashed strokes (`8 6`) mark what is not yet built (the table's outline), hairlines with a dot are leaders, short diagonal ticks terminate dimension lines, a zigzag is a drafted break line where a detail stops, and the arrival tick on the timeline is a square of light on the axis. Icons are Tabler line icons at a 1.5 stroke, 17-22px; the plus rotates 45 degrees to become the close of an accordion. Links underline with a 1px rule offset 0.22em; the underline, not the text, changes colour on hover.

## Components

Rectangular, drawn, quiet. Nothing is filled unless it is the action or the poché; everything else is a line.

### Buttons
- **Shape:** sharp rectangle (0px), lettering label (Tomorrow italic caps, 0.1em), icon and text on a 12px gap, 44/48/56px tall at 16/20/24px horizontal padding; icon 17/19/21px.
- **WhatsApp action (`button-whatsapp`):** green ground, white text, WhatsApp icon left and an arrow right; the arrow moves 4px on hover. Hover deepens to `life-deep`. Sizes: small in the header, medium in cards, large in the hero, Closing, mobile menu and the fixed mobile bar. The href appends the chosen hour only after the visitor has chosen one.
- **On the indigo ground (`button-whatsapp-light`):** the same green with a 1px limewash keyline at 80% opacity; nothing else changes.
- **Outline (`button-outline`):** 1px indigo keyline, indigo text, fills indigo with limewash text on hover. The secondary action beside any WhatsApp action ("See treatments", "View details", "Close", "Back to home"). On indigo the keyline and text are on-poché/limewash and the hover fills limewash with indigo text.
- **Submit (`button-submit`):** indigo ground, limewash text, deepens on hover; full width, 56px; used only for the testimonial form. Disabled and loading drop to 50% opacity with a spinner.
- **Focus:** 2px indigo outline offset 3px on limewash; the outline turns gold inside `[data-ground='poche']`.

### Icon controls
- 44px squares with a 1px indigo keyline and indigo icon (menu toggle, dialog close, slider previous/next/pause); hover fills indigo with a limewash icon. Social links are the same square without a keyline, ink-soft on limewash and on-poché on indigo, filling with the opposite ground on hover.

### Hour control (signature)
- A time axis: a 1px indigo rule at 50% across four equal columns, each with a 10px tick at its left, the hour name as a small label and the time as a stamp (light at rest, regular when chosen). The chosen hour carries a 12px gold square riding the axis (`layoutId`, 0.5s settle). Chosen text is indigo, the rest ink-soft, turning indigo on hover. On indigo the rule and ticks are on-poché at 60% and text is limewash/on-poché. Keyboard focus draws the ground's ring around the whole label. The legend is a Barlow sentence (16px, 500).

### Section drawing (signature)
- An SVG section in drawing units (143 ≈ 1m): indigo poché for cut walls and slabs, plaster for the visitor's room, pale plaster for other rooms, line furniture in 1.5-unit indigo strokes with limewash fills, Richard and the resident as scale figures, the table's place in dashed stroke. The sun (r=20, gold) and the beam (gold gradient from the lintel) move to the chosen hour; the sky tints with the hour (morning cool, afternoon limewash, evening warm, night deep indigo), and at night the beam fades while the lamp and neighbouring windows light in gold. Stamps, leaders and dimension lines are lettered in ink at weight 300-500. Three crops: `full` (hero, from 64rem), `room` (phones, Closing), `door` (How it works, with a drafted break line). The arrival sweep (`sun-arrive`, 1.6s, scaleX from 0.35 at the lintel) runs once.

### Apertures (signature)
- A photograph as an opening cut in the wall: indigo ground, cover-fit image, greyscale under a 50% indigo multiply at rest; when the opening reaches the middle band of the viewport (22% inset) the multiply lifts, colour returns and a 4px gold sill grows from the left along the bottom edge, all in 1s on `ease-settle`. Set in an 8-10px indigo reveal on limewash; on indigo grounds and inside dialogs the ground is the reveal.

### Lists and timelines
- Ruled rows, no cards: a 1px indigo rule on top, 1px mortar rules between, 28px rows, heading in drafted caps left and body text right (`minmax(0,15rem) 1fr`). The timeline hangs from a 1px indigo axis with 20px ticks per step, the arrival step carrying the gold square and the chosen time as a stamp. Definition lists (title block, contact) use small labels left and limewash/ink values right on on-poché rules.

### Accordions
- FAQ as native `details` on indigo rules at 25%, 64px summaries in Barlow 600 at 1.125rem, a plus icon rotating to a cross; the first item opens by default. Benefit accordions inside dialogs follow the same pattern at 52px.

### Tabs
- Lettering labels on a 1px on-poché rule, 48px tall, 32px apart; the selected tab carries a 3px gold rule and limewash text, the rest on-poché. Panels fade in over 0.4s. Arrow keys, Home and End move between tabs.

### Dialog
- A limewash sheet with an 8px indigo top rule, a 1px mortar rule under the title row and above the footer, 20-28px padding, the floating-sheet shadow, over an ink scrim at 60%. Rises 32px over 0.35s; on phones it docks to the bottom edge and respects the safe-area inset.

### Inputs / Fields
- **Style:** ruled entries, like the lines of a title block: no side borders, a 2px indigo rule at 50% underneath, limewash ground, 12px padding, body text, ink-soft placeholder at 70%; labels are lettering above (`label`, indigo).
- **Focus:** the ground turns to the shadow tint and the rule to full indigo; no outline.
- **Error:** the rule and message turn alert red; a counter stamp sits right of the textarea. Rating stars are 30px filled icons, gold when selected and mortar when not, with a wordmark of the rating beside them.

### Navigation
- Desktop: lettering links 32px apart, ink-soft at rest, indigo on hover and when active; the active room is marked by a 3px gold underline growing from the left over 0.5s. The logo is 56px (72px from 64rem) at the left, social squares and the WhatsApp action at the right.
- Mobile: a 44px keylined menu square opens a limewash panel under the header (fades and drops 8px in 0.25s) over an ink scrim; links are 56px rows on mortar rules in lettering with an arrow at the right, a full-width large WhatsApp action and the social links beneath.
- Footer: deep indigo ground, the logo on a limewash plate, the name in display lettering, four columns of on-poché links turning limewash on hover, and a contact title block whose phone number is a stamp turning gold on hover.

## Do's and Don'ts

### Do:
- **Do** set every heading, label, control and stamp in Tomorrow italic capitals and every explanation in Barlow; keep ledes at 52-62ch and body at 52-68ch.
- **Do** use gold only for light and the active mark: the beam, the sun, the hour marker, the arrival tick, the active underline, the selected tab, the sunlit sill, the chosen stars, selection and the focus ring on indigo.
- **Do** use green for the WhatsApp action and living things, and on indigo grounds keep the same green with a 1px limewash keyline.
- **Do** build lists as ruled rows (1px indigo on top, 1px mortar between, 28px rows) and hang sequences from a 1px axis with ticks.
- **Do** set photographs as apertures: indigo ground, greyscale under an indigo multiply, colour and a 4px gold sill when they reach the middle of the viewport, in an 8-10px indigo reveal on limewash.
- **Do** keep controls as sharp rectangles 44px or taller, and keep the hour out of the WhatsApp message until the visitor has chosen one.
- **Do** mark a section's ground with `data-ground='poche'` when it is indigo, so focus rings turn gold.
- **Do** alternate grounds down the page (limewash, shadow tint, indigo) and let the drawing, not a card, carry the composition.

### Don't:
- **Don't** add an eyebrow, kicker or small-caps line above a heading.
- **Don't** round a corner, anywhere; the drawing's own `rx` values are furniture, not interface.
- **Don't** fill a button with gold or indigo-tint, or use gold as a text colour on limewash (the sun fails contrast on the ground; `sun-deep` exists for that case).
- **Don't** put a shadow under anything that stays on the sheet; only the dialog, the form sheet and the fixed mobile action leave it, and never with a hard offset.
- **Don't** animate anything but light and quiet state changes; nothing slides, scales or parallaxes on scroll.
- **Don't** show prices, ratings, client counts or verified marks; the testimonial carries a name and a date only.
- **Don't** frame content in cards or boxes; use rules, reveals and ground changes.
- **Don't** use pure black or pure grey; scrims and shadows are ink at partial opacity, rules are mortar or on-poché.
