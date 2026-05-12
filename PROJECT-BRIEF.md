# NoTimeMover — Project Brief

## Client
NoTimeStorage (existing client, $165/mo retainer)

## Scope (Phase 1)
Mobile-first landing page + 5-step booking flow. Demand-test MVP.
- $300–$350 fixed quote
- Dark Uber/Muvr-style aesthetic
- No payment processor

## Product
Moving marketplace. Customer sets their own price; backend matches them with a mover.

## User flow
1. Land on `/` → dark hero: `Move Anywhere / You Set The Price` + animated stick figures
2. Tap `Get a Quote` → fullscreen 5-step booking modal:
   - Pickup + Dropoff
   - Home size (Studio/1BR · 2BR · 3BR)
   - Budget slider
   - 3-tier price selection (Your / Premium / Save)
   - Contact info (name, email, phone)
3. Submit → confirmation screen, lead persisted to backend

## Design
- Black `#000` background, dark coffee brown `#2A1405`/`#4b2e1e` accents, white text
- Montserrat sans-serif throughout
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
`notimestoragewebsite/` gets a `StorageMovingModal` popup that routes "Moving" users to this site. Delivered as a paste-in snippet.

## Phase 2 (not in current quote)
- Google Distance Matrix API for real mileage
- Automated email drip post-submission
- Mover-side dashboard + matching logic
