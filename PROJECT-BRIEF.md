# NoTimeMover — Project Brief

## Client
**NoTimeStorage** — existing client; **$90/mo retainer** for [notimestorage.co](https://notimestorage.co/). **NoTimeMover** is a separate fixed-scope build (see quote below).

## Scope (Phase 1)
Mobile-first landing page + 5-step booking flow. Demand-test MVP.
- $300–$350 fixed quote
- Dark Uber/Muvr-style aesthetic
- No payment processor

## Product
Moving marketplace. Customer sets their own price; backend matches them with a mover.

## User flow
1. Land on `/` → dark hero: `Move Anywhere / You Set The Price` + animated hero illustration (moving route / truck scene)
2. Tap `Get a Quote` → fullscreen 5-step booking modal:
   - Pickup + Dropoff
   - Home size (Studio/1BR · 2BR · 3BR)
   - Budget slider
   - 3-tier price selection (Your / Premium / Save)
   - Contact info (name, email, phone)
3. Submit → confirmation screen; **Phase 1 does not persist leads** (stub / console — real inbox or database is Phase 2).

## Design
- Page background `#050505` (ink), coffee browns `#2A1405` / `#4b2e1e` / `#6B3A1F` / `#8B5230`, white text
- Geist Sans (UI), Geist Mono (mono), Instrument Serif (accent headline line)
- iPhone-first (375px primary)
- No marketing-page sections (no Stats, Services, HowItWorks, FAQ, Testimonials)

## Hidden pricing
- Tiers: Studio `$300 base + $40 eq`, 2BR `$500 + $60`, 3BR `$915 + $85`
- Gas: miles × $2.50 (miles stubbed at 25 mi)
- `Your Price` = budget + equipment + gas
- `Premium` = base + equipment + gas
- `Save` = round(base × 0.85)  — labor only

## Tech
- Next.js 14 · Tailwind · Framer Motion · TypeScript · Vercel

## Sibling project

**NoTimeStorage** ([notimestorage.co](https://notimestorage.co/)) gets a `StorageMovingModal` paste-in snippet (see `client-scope/storage-modal-snippet/`) that routes “Moving” visitors to the deployed NoTimeMover URL.

## Phase 2 (not in current quote)
- Google Distance Matrix API for real mileage
- Automated email drip post-submission
- Mover-side dashboard + matching logic
