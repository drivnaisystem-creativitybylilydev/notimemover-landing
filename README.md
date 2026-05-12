# NoTimeMover Landing Page

Mobile-first, iPhone-priority landing page for **NoTimeMover** — a moving marketplace where the customer sets their own price and gets matched with a mover.

This is Phase 1, a demand-test MVP. No payment processor. Backend bookings handled separately by the client.

## What it does

1. Single dark hero: `Move Anywhere / You Set The Price` with animated stick figures
2. `Get a Quote` CTA opens a fullscreen 5-step booking flow:
   1. Pickup + dropoff (autocomplete)
   2. Home size — Studio/1BR · 2BR · 3BR (hidden base/equipment pricing)
   3. Budget slider with size-based default
   4. 3-tier pricing — Your Price · Premium (recommended) · Save (labor only)
   5. Contact info — name, email, phone
3. Submit posts the lead to a stub endpoint and shows a confirmation screen.

## Pricing logic (hidden from user)

```
gas = miles × $2.50           (miles stubbed at 25 until Distance Matrix API wired)
tiers = {
  studio  : { base: 300, equipment: 40, defaultBudget: 400 }
  twoBed  : { base: 500, equipment: 60, defaultBudget: 600 }
  threeBed: { base: 915, equipment: 85, defaultBudget: 900 }
}

yourPrice = budget + equipment + gas
premium   = base   + equipment + gas
save      = round(base × 0.85)   // labor only — no equipment, no gas
```

## Tech stack

- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion (animations, stick figures, modal transitions)
- TypeScript
- Deploy: Vercel

## Design direction

- All black `#000` background, dark coffee brown surfaces (`#2A1405`, `#4b2e1e`), white text
- Uber / Muvr.io minimalism — no marketing-page bloat
- iPhone-first; designed at 375px and scaled up
- Generous tap targets, big sticky CTAs

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Companion: NoTimeStorage popup

The sibling site `notimestoragewebsite` shows a popup on load: *"Looking for storage or moving?"*. Storage stays on that site; Moving redirects to this one. The popup component is delivered as a standalone snippet — see `components/StorageMovingModal.tsx`.

## Roadmap

- Google Distance Matrix API for real mileage (Phase 2)
- Automated emails post-submission (Phase 2 — client to confirm)
- Mover-side dashboard + matching (Phase 3+)
- Payment processor (later)
