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

---

## Demand scraper — architecture & anti-ban rules (CURRENT FOCUS, decided June 12 2026)

**Why this is Priority 1 now:** Jermaine is full-time and responds to leads immediately, so speed-to-lead SMS is not the bottleneck — demand is. The FB groups he's in show ~300 moving/apartment posts per day (his number, June 8 call). He can't manually scan them all; the scraper turns that firehose into a ranked, deduped alert stream with a ready-to-send message.

### Architecture (source-agnostic core, pluggable adapters)

```
[adapters]            [core pipeline]                    [output]
facebook.py  ─┐
reddit.py    ─┼──► normalize ► keyword/urgency score ► dedupe ► alert (email/SMS)
(future)     ─┘        │                                  │        + CSV log
                  shared Post model                seen-posts store
```

- **Scoring tiers:** HIGH = "need a mover today/this week/asap/tomorrow", date within 7 days. MEDIUM = "moving soon", "mover recommendations", September 1 mentions. LOW = generic moving talk.
- **Each alert contains:** post link, age, score, group/subreddit, and the matching pre-written reply template (above) ready to paste.
- **Dedupe:** post URL hash stored locally — never alert twice.
- **Cadence:** cron every 30–60 min during moving season. Speed matters: first responder usually wins the job.

### Source priority

1. **Facebook Groups (flagship)** — where the demand actually is. Read-only monitoring of *public* groups via Firecrawl or an Apify actor.
2. **Reddit (add-on)** — free JSON API, r/boston, r/bostonhousing, r/CambridgeMA, r/somerville. Low volume, high intent, zero risk, ~1 hour to build.
3. **Craigslist — skipped.** RSS removed years ago, aggressive anti-scraping, and Jermaine confirms it's saturated/passive.

### Anti-ban rules (non-negotiable)

The entire design rests on one separation: **machines read public pages; humans send messages.**

1. **The scraper never logs in and never touches Jermaine's account.** Monitoring runs through third-party infrastructure (Firecrawl/Apify — their IPs, their browsers) against publicly visible group pages only. Facebook can't ban an account that was never involved.
2. **Outreach is always human-sent** from Jermaine's real, aged personal account, on his phone, manually. That is normal user behavior and is what already works for him.
3. **Manual ≠ unlimited.** Even hand-sent DMs get flagged if they look like spam: cap ~10–15 cold DMs/day, personalize the first line every time (never paste the identical template verbatim), prefer commenting on the post over cold-DMing when the group allows it, and don't put links in the first message (people don't click them anyway — Jermaine's own observation).
4. **Private groups stay manual.** Most Boston housing groups are private; scraping them requires a logged-in session, which is exactly the bannable path. For those: Jermaine does a 2×-daily scan with the reply templates ready. Do NOT "solve" this with a logged-in bot on his account.
5. **No burner-account automation.** A throwaway account + proxy scraping private groups is technically possible and stays off Jermaine's assets, but it violates FB ToS, burns money on residential proxies, and the accounts die constantly. Not worth it at this stage — revisit only if public sources prove insufficient.

### Reality check from Jermaine (iMessage, June 12 2026)

His 7 groups are **housing/sublet groups** — people looking for or renting out
apartments, i.e. future movers, not "need a mover today" posts. Two key data
points from him:

1. **Cold-DMing housing-group posters got him zero responses.** He stopped.
   → In these groups, prefer **commenting on the post** over DM, and treat
   group posts as MEDIUM at best (our scoring already does).
2. **"I do majority of my messaging through Marketplace"** — Facebook
   Marketplace is his proven channel (the NJ job came from there).
   → **Next adapter to build: Facebook Marketplace monitoring** (Apify has
   marketplace scraper actors). Higher priority than squeezing more out of
   housing groups.

Also from that exchange: Jermaine will add Finn as a **manager on the FB
business page** directly (needs Finn's FB account name — better than sharing
the login), and he's writing up his ideas on the financial model / margins
once movers are delegated ($100/move take with 2 movers).

### What this replaces / defers

- **Speed-to-lead SMS** (Twilio alerts) — still planned, build when scraper + GBP raise volume past what Jermaine can track manually.
- The Make.com/RSS Craigslist idea from the earlier channel table above is dead (no RSS).

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
