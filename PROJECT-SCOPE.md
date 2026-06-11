# NoTimeMover — Project Scope & Build Tracker

**Business:** Moving marketplace (Uber-style, customer sets price). Jermaine Williams, Boston MA.
**Stack:** Next.js 14, Tailwind, Framer Motion, TypeScript, Vercel
**Equity deal in negotiation:** Finn at 35% → 45% tied to milestones (see BUSINESS context below)

---

## What's Already Built

- [x] Dark hero — blur-reveal animations, magnetic CTA, cycling bullet points, ambient orbs
- [x] 5-step booking modal — addresses (autocomplete), home size, budget slider, 3 price tiers, contact form
- [x] Lead capture → Google Sheets + Resend admin + customer email confirmation
- [x] Service areas section — animated MA map background + Massachusetts marquee
- [x] FAQ accordion + expandable how-it-works journey map
- [x] 5 city SEO pages (Boston, Cambridge, Lowell, Springfield, Worcester)
- [x] Out-of-state lead handling
- [x] Sitemap, robots.ts, OG image
- [x] NoTimeStorage ↔ NoTimeMover switcher in hero nav
- [x] Privacy policy + Terms pages
- [x] Distance API route (stubbed at 25mi — Phase 2)
- [x] **Blog system** — 9 MDX posts live at `/blog` + `content/blog/`. remark-gfm for tables, inline JSX bar charts, all internal links real
- [x] **`/blog` index page** — editorial full-width layout, auto-rotating featured post (3.6s), numbered tabular post list, progress bar, pause-on-hover
- [x] **BlogMagazineSection on homepage** — 4-post magazine (1 featured + 2 interactive stack + 1 gradient tease → /blog)
- [x] **Favicon** — NoTimeMover logo PNG (white NoTime / amber Mover on black), served from `app/icon.png`

---

## Build Backlog — Ordered by Priority

### Priority 1 — Lead Operations (nothing works without this)
- [ ] **SMS to Jermaine on new lead** — Twilio or Resend SMS, fires on every `/api/lead` POST. ~2 hours.
- [ ] **Automated SMS to customer** within 60 seconds of form submit. ~2 hours.
- [ ] **24hr follow-up SMS** if customer hasn't replied. Needs a scheduler (cron or Vercel cron job). ~half day.
- [ ] **Custom CRM** — built from scratch, no GHL. Lead table with status (new / contacted / quoted / booked / completed). Supabase or MongoDB. ~1-2 days.
- [ ] **Admin dashboard for Jermaine** — view pipeline, update job status, mark revenue. Auth-gated. ~1 day on top of CRM.

### Priority 2 — SEO (only 5 pages exist, need 50+)
- [ ] **Programmatic neighborhood pages** — dynamic Next.js template for 50+ Boston neighborhood slugs. "Movers in Allston", "Same-day movers Beacon Hill", "Cheap movers South Boston" etc. Each with unique copy, schema, internal linking. ~1 day.
- [ ] **JSON-LD schema on homepage** — `LocalBusiness` + `MovingCompany` structured data. ~1 hour.
- [ ] **FAQ schema** on the FAQ section. ~30 mins.
- [ ] **Review schema** once reviews exist.

### Priority 3 — Booking Flow Gaps
- [ ] **Move date field** — not currently captured. Jermaine needs it to schedule without a callback. Add to Step 1 or Step 5 of booking modal. ~1 hour.
- [ ] **Real distance (Phase 2 geocoder)** — Google Distance Matrix API. Replace the 25mi stub. See `PHASE-2-GEOCODER.md`. ~half day + Google Cloud billing setup.
- [ ] **Honeypot + rate limiting** on `/api/lead` — no spam protection exists. ~1 hour.
- [ ] **Availability calendar** — Jermaine sets open slots, customer books directly. ~1 day.

### Priority 4 — Demand Generation (the moat)
- [ ] **Demand scraper** — monitors Facebook Groups, Craigslist, Reddit (Boston) for "need a mover" posts. Scores by urgency. Fires outreach within minutes. Pipes into CRM. ~2 days. Nobody at the small operator level does this at speed.
- [ ] **GA4 events + UTM conventions** — funnel tracking (modal open, step completions, submit). Written UTM playbook for all traffic sources. ~half day.

### Priority 5 — Post-Job Automation
- [ ] **Review request SMS** — fires automatically after job is marked complete in admin dashboard. Direct Google review link. ~1 hour once CRM exists.
- [ ] **Post-job email** to customer with receipt summary. ~1 hour once CRM exists.

### Priority 6 — Trust & Social Proof
- [ ] **Testimonial section** — placeholder structure ready for first reviews. Even 1-2 real testimonials from Jermaine's network helps.
- [ ] **Photos section** — truck, crew, Boston moves. Currently zero visual proof. Hurts Meta later.
- [ ] **"How pricing works" transparency copy** — brief plain-language explanation of tiers to reduce post-booking conflict.

---

## Equity Deal Context

Jermaine offered 40-45% → countered at 25% with vague "rehash after 90 days."
Finn's position: **35% now, written path to 45%** tied to:
1. First 10 consistent jobs
2. First delegated mover
3. First $3k month

Milestones must be in writing. No vague 90-day revisit clauses.
Ad spend comes out of Finn's pocket until revenue is consistent — must be tracked and reimbursed.
All current builds (NoTimeStorage $800 setup, NoTimeMover landing) were undercharged — this context matters in negotiation.

---

## Current Financials
- NoTimeStorage: $90/mo retainer (active)
- NoTimeMover: $79/mo retainer (active) — separate from equity deal
- Equity deal would be additive, not replacing retainer

---

## Key Files
- `PROJECT-BRIEF.md` — original Phase 1 scope
- `BUSINESS-AUDIT-NOTIMEMOVER.md` — full gap analysis from May 2026
- `PHASE-2-GEOCODER.md` — real distance API plan
- `UPSSELLS-AND-RETAINER.md` — upsell pricing and retainer framing
- `CALL-GROWTH-PARTNER-CHEATSHEET.md` — negotiation cheat sheet
- `client-scope/PROPOSAL-NOTIMEMOVER-WEBSITE-GBP.md` — $1,850 website + GBP proposal
