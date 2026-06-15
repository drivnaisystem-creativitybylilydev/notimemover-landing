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
- [x] **65+ programmatic city/neighborhood pages** — generated from `lib/locations.ts`, incl. 23 inner-Boston neighborhoods + 6 out-of-state route pages
- [x] **GA4** — installed in `app/layout.tsx`, tracks page views, form_start, booking_step, quote_submitted
- [x] **Move date field** — captured in BookingFlow, written to Google Sheet column U
- [x] **JSON-LD schema** — MovingCompany in `app/layout.tsx`, FAQPage on homepage FAQ

---

## Build Backlog — Ordered by Priority
*(Reprioritized June 12 2026: demand scraper pulled forward to Priority 1. Jermaine is full-time and responds to leads immediately, so speed-to-lead SMS is deferred until lead volume actually outpaces him. The bottleneck is demand, not response time.)*

### Priority 1 — Demand Scraper (the moat — CURRENT FOCUS)
Built June 12 2026 at `scraper/`. **Live status + next actions: `scraper/README.md`.** Architecture + anti-ban rules: `STRATEGY-NOTES.md` → "Demand scraper" section.
- [x] **Core pipeline** — ingest → keyword/urgency scoring → dedupe → CSV log → alert with ready-to-paste reply template
- [x] **Reddit adapter** — live via RSS (the .json API is blocked; RSS + browser UA works)
- [x] **Facebook Groups adapter** — built on Apify `facebook-groups-scraper`, 9 Boston housing groups seeded. ⏳ Blocked until Apify free credit resets **June 13 EOD UTC**, then starts on its own. Read-only; humans send all outreach.
- [x] **Scheduling** — launchd every 30 min while Mac is awake (`com.notimemover.demand-monitor`)
- [ ] **Telegram alerts** — code ready; needs Finn to create bot via BotFather (steps in `scraper/alerts.py`). Email alerts active until then.
- [ ] **Jermaine's group links** — replace/extend the seeded groups in `scraper/config.json` when he sends them
- [ ] **Always-on hosting** — launchd only runs while laptop is awake; move to GitHub Actions cron or small VPS once proven
- ~~Craigslist~~ — skipped (no RSS, hard blocking, saturated per Jermaine)

### Priority 2 — Lead Operations (build soon, not urgent at current volume)
- [ ] **SMS to Jermaine on new lead** — Twilio or Resend SMS, fires on every `/api/lead` POST. ~2 hours. *Deferred: he responds immediately today; becomes critical once scraper + GBP raise volume.*
- [ ] **Automated SMS to customer** within 60 seconds of form submit. ~2 hours.
- [ ] **24hr follow-up SMS** if customer hasn't replied. Needs a scheduler (cron or Vercel cron job). ~half day.
- [ ] **Glide CRM on Google Sheet** (decision in STRATEGY-NOTES — replaces custom-build plan). Lead status pipeline + quote calculator tab. ~hours.
- [ ] **/calc quoting page** — 3 inputs, instant price, for Jermaine quoting mid-conversation. ~half day.

### Priority 3 — Booking Flow Gaps
- [x] **Slider minimum question — RESOLVED June 12** (iMessage): Jermaine says the base values ($300/$500/$915) are NOT floors, just where the slider auto-sets. Keep the slider open from $200; he handles low offers on the call. No code change.
- [ ] **Honeypot + rate limiting** on `/api/lead` — no spam protection exists. ~1 hour.
- [ ] **Availability calendar** — Jermaine sets open slots, customer books directly. ~1 day.

### Priority 4 — SEO Remainder
- [ ] **Review schema** once reviews exist.
- [ ] **UTM conventions** — written UTM playbook for all traffic sources. ~2 hours.

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
