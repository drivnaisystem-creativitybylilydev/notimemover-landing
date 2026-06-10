# NoTimeMover — Build Plan
**Agreed: June 8 2026 | Owner: Finn Schueler (Drivn.AI)**

---

## Tonight — Before proposal goes out

| # | Task | Status |
|---|---|---|
| 1 | Fix pricing slider — defaults (studio $600 / 2BR $800 / 3BR $1k) + max cap $3,000 | Done |
| 2 | Change "Licensed & Insured" → "Fully Insured" sitewide | Done |

---

## Phase 1 — Website, SEO & GBP (Days 1–8)

### Website redesign & content
- Full visual rebuild — Jermaine's job photos and video throughout, real crew shots, hero video from NJ job footage
- Rewrite all copy — clear service areas, how pricing works, trust signals
- Move date field added to booking flow
- Payment methods removed from copy (deferred until method is locked in)

### Website analytics
- GA4 install + conversion event on booking form completion
- Tracks form starts, step completions, submissions from day one

### SEO foundation
- JSON-LD structured data — LocalBusiness + MovingCompany schema on homepage
- FAQ schema on FAQ section
- Meta title + description on every page
- Heading hierarchy cleanup (H1→H3)
- Alt text on all images
- Sitemap updated to include all new pages
- 2–3 blog posts: "Moving in Boston: What to Expect", "How to Find an Affordable Mover in Boston", "Moving Checklist for Boston Apartments"

### 50+ programmatic neighbourhood pages
- Dynamic Next.js template generating 50+ Boston neighbourhood slugs from a data file
- "Movers in Allston", "Same-day movers Beacon Hill", "Cheap movers South Boston" etc.
- Each page: unique local copy, embedded quote form, JSON-LD, internal linking
- Sitemap updated to index all pages

### Google Business Profile
- Complete and fully optimise GBP listing
- Primary category: Moving Company. Service areas: all MA cities
- Business description, hours, phone, website URL
- Upload all of Jermaine's job photos (crew, truck, jobs in progress)
- Services list: local moving, out-of-state moves
- Q&A seed answers (top 5 questions)
- Review request template ready for Jermaine to send post-job
- Jermaine completes verification (identity steps on him)

### Trackable proof
- Google Search Console — impressions + clicks by page
- GBP Insights — views, direction requests, calls
- GA4 — form starts, step completions, submissions

---

## Phase 2 — Leak sealing & automation (Days 8–14)

| Task | Notes |
|---|---|
| Twilio SMS to Jermaine on every lead | Instant alert the second someone submits |
| Automated SMS to customer within 60s | "Hey [name], got your request — Jermaine will be in touch within the hour" |
| Honeypot + rate limiting on /api/lead | Spam protection |
| Status + lead_source columns in Google Sheet | Simple pipeline tracking |
| 24hr follow-up SMS if no response | Recovers ghosted leads automatically |
| Post-job review request SMS | Fires when job is marked complete — feeds GBP reviews |

---

## Phase 3 — Social presence (Concurrent with Phase 1–2)

| Task | Notes |
|---|---|
| Create NoTimeMover Facebook Business Page | Separate from personal account |
| Create Instagram account + first 3–5 posts | Use NJ job clips and photos Jermaine already has |
| Brand assets sent to Jermaine | Logo, colours for his own posting |

---

## Out of scope (Phase 2+, separate scope)
- Demand scraper / automated outbound
- Full CRM and admin dashboard
- Stripe deposit / booking calendar
- Meta and Google advertising (funded from organic revenue when ready)
- AI phone receptionist

---

## What Finn needs from Jermaine to start
| Item | Why |
|---|---|
| Google account access or add Finn as GBP manager | To complete GBP listing |
| Phone number leads should go to | For Twilio SMS alerts |
| Confirm hello@notimemover.com access | Customer confirmation emails send from here |
| All job photos and videos | Website hero, GBP photos, Instagram content |
| Service area confirmation | Which cities/regions to list on GBP and neighbourhood pages |
| Business hours | For GBP listing |
| Decision on Facebook: keep personal or switch to business page | Finn can create the business page |

---

## Equity terms (summary — full milestones in separate doc)
- 35% equity to Finn Schueler effective on agreement execution
- Path to 45% tied to milestones — to be defined and signed separately
- $49/month retainer continues independent of equity deal
- Ad spend: from organic job revenue, cost-sharing strategy TBD
