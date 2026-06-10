# NoTimeMover — Strategy Notes
**Running knowledge base. Updated as decisions are made.**

---

## Lead generation — channel strategy

### Website (inbound)
The website's job in outbound conversations is NOT lead capture — it's a trust closer. When Jermaine DMs a stranger, they Google "NoTimeMover Boston" before replying. A professional site + GBP with reviews removes the doubt. The booking form is for people who find the site organically (Google search, GBP click, referral link).

### Outbound channels — agreed approach

| Channel | Approach | Automation level | Risk |
|---|---|---|---|
| Reddit (r/boston, r/BostonHousing) | Monitor via Reddit API, auto-reply to relevant posts | Fully automated | Very low |
| Craigslist | Monitor RSS feed via Make.com, auto-reply via email relay | Fully automated | Zero |
| Instagram | ManyChat automated DM sequence (official Meta API) | Fully automated | Zero (official API) |
| Facebook Groups | Scraper alerts Jermaine, he sends pre-written message manually | Semi-automated | Zero (human sends) |
| SMS (Craigslist numbers) | Twilio auto-text when phone number visible in post | Fully automated | Low |

**Facebook DM automation is high ban risk — keep it manual with pre-written messages. ManyChat on Instagram is the safe automated alternative.**

### Outbound message templates

**Facebook DM (stranger posted needing a mover):**
> Hey [name], saw your post — we move people around Boston all the time, got availability this week. We work around your budget so there's no surprise bill at the end. Just need to know your pickup, dropoff, and roughly how much stuff. What are you working with?

**Reddit reply:**
> Hey, we're a local Boston moving crew, fully insured. We work around your budget — you tell us what you've got and we'll tell you exactly what that covers (hours, movers, truck). No hidden fees. DM me your details if you want a quick quote.

**Craigslist email reply:**
> Hey, saw your post. We're a local insured moving crew based in Boston. We do flexible pricing — you set the budget, we tell you exactly what that gets you. No surprises. What's the move?

**Key principle in all messages:** Lead with local + insured + flexible. Explain the model in one sentence before they can think it's weird. Immediately ask for move details to push the conversation forward.

---

## Quoting tool — internal calculator for Jermaine

**Problem:** Jermaine currently opens the full booking flow on the website mid-conversation to calculate a quote. Slow and clunky on mobile.

**Solution:** Build a standalone `/calc` page — just three inputs (apartment size, pickup address, dropoff address) and instant price output. No booking flow, no customer-facing steps. Jermaine bookmarks it on his phone home screen.

**Also:** Add a Quote Calculator tab to the Glide CRM app so it's all in one place.

**Accuracy dependency:** The `/calc` page needs the Google Places + Routes API upgrade to be accurate. Current OSRM setup falls back to a 25-mile stub when it fails — fine for the booking form, not acceptable for Jermaine quoting a live customer. Google Routes API gives exact driving distance every time. This is already in Phase 1 scope (PHASE-2-GEOCODER.md has the full implementation plan).

---

## CRM — Glide on Google Sheets

**Decision:** Use Glide (no-code) on top of the existing Google Sheet instead of building a custom Next.js admin dashboard.

**Why:** Takes hours not days. Jermaine gets a proper mobile app at a URL — no app store download. Free plan covers current needs ($25/month if he needs more later).

**Jermaine's view in Glide:**
- Lead list with status, name, pickup, dropoff, move date, budget
- Tap a lead → full detail view
- Three buttons: Call Customer, Send Quote, Mark Complete
- Mark Complete → triggers Make.com → fires review request SMS automatically

**Quote Calculator tab:** Enter size + distance → get yourPrice and premium instantly.

---

## B2B leasing agent outreach (high-leverage, Phase 2)

Boston rental market runs on student leases flipping September 1. Property managers and leasing agents in Allston, Brighton, South Boston handle dozens of tenant move-outs per month.

**Plan:** Cold email sequence to 100 Boston leasing agents via Resend. Offer $10 referral per booked job or a tenant discount. One property manager = potentially 5 jobs/month on repeat.

**Build:** Make.com scrapes or manually compile leasing agent contacts → Resend sequence → track replies in Google Sheet.

---

## pSEO — duplicate content warning

50+ neighbourhood pages must have genuinely unique content per page — not just the neighbourhood name swapped out. Google will sandbox identical pages.

**Each page needs:**
- Unique H1 and H2s referencing the specific neighbourhood
- Local context (landmarks, common move types for that area — e.g. student move-outs in Allston, brownstone moves in Beacon Hill)
- Unique intro paragraph
- Consistent embedded quote form and JSON-LD

The data file driving the page generation must include a content variation field per neighbourhood, not just the slug.

---

## Pricing model — framing fix

The "you set the price" framing was killing deals. People thought it was a scam.

**Better framing (hero section):**
> "Boston's Only Name-Your-Price Movers. Tell us your budget — we'll tell you exactly how many hours, movers, and truck space that covers. No hidden fees. No surprise bills."

This explains the model before skepticism forms.

---

## Website role — clarified

- **Outbound conversations:** Website = credibility check when people Google the name. Not a funnel.
- **Inbound (GBP, Google search, referrals):** Website = full conversion tool, booking form captures leads.
- **Mid-conversation quoting:** Use /calc page, not the booking flow.
