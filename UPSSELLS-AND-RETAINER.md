# Upsells & ongoing retainer — NoTimeMover

Reference for scope beyond the demand-test landing + realistic ongoing pricing.

## Client-facing scope & upsell recap (paste)

**Commercial terms captured in-thread:** `$350` build (paid + signed agreement before next work begins), **`$49`/mo retainer after a 30‑day free trial**. Use the block below in DMs when drawing the line between what’s included vs add-ons.

---

We can switch the button to something faster like **Book your move.**

**Addresses:** Right now it’s **manual on purpose** so the demo stays accurate. Next step is Google-style autocomplete **+** real drive miles — that’s a **separate small project** with its own setup **+** API cost.

**Leads:** For day one I’d do **instant email to you** **+** a **Google Sheet or Airtable** as the log. A CRM can wait until you know your follow-up rhythm unless you already want pipeline features.

Re: **“what could make it better”** — lots on the table: real lead capture **+** anti-spam, tracking, maps/miles, branded follow-up emails, automations, then much bigger stuff like matching. **All of that is extra scope** beyond the **`$350` build.**

I only start the next work after **`$350` is paid + agreement signed**, plus a **monthly retainer of `$49`**. The retainer kicks in **after a 30‑day free trial**. The **`$350`** is for **final edits**, **taking the site live**, **connecting everything so you get notified about bookings**, and the **Google Sheets integration**.

**Anything more** will be an extensive build and **a bigger investment.**

We could sit down sometime **this week** and talk through your vision for the **initial phase** of NoTimeMover and **what makes sense to build now** — I wouldn’t want to charge you to build something **you don’t need yet**; that just doesn’t make sense. I can also share a **list of what I see as valuable in the startup phase**, including **how that would affect pricing**.

---

**Mapping client lines → add-ons:** “Maps/miles” → item 2 + `PHASE-2-GEOCODER.md`. “Lead capture + anti-spam” / Sheet vs Airtable → item 1. Branded customer email / drip → item 4. Tracking → item 5. Matching / dashboard → item 8. SMS → item 7.

_Internal note:_ the **`~$99/mo`** framing below is a common market anchor for landing upkeep; **`$49` + trial** is a deliberate client-facing package — tighten written limits (time bank / # of tweaks) before it creates scope creep.

## Natural upsells (ordered roughly by client value)

1. **Lead capture backend** — POST quotes to Airtable, Google Sheet, Supabase, or email-to-you via Resend/SendGrid. Includes spam protection (honeypot, Turnstile).
2. **Google Places Autocomplete + Distance Matrix** — Real miles for gas pricing; documented in `PHASE-2-GEOCODER.md`. Improves trust vs. stub distance.
3. **NoTimeStorage bridge** — Live site: [notimestorage.co](https://notimestorage.co/). Ship `client-scope/storage-modal-snippet/` into that repo; set `moverUrl` to the deployed NoTimeMover URL when ready.
4. **Branded email** — Customer confirmation + internal lead notification; optional drip (“We received your quote…”).
5. **Analytics & conversion** — Vercel Analytics, Meta Pixel, or Plausible; event tracking on CTA open, step completion, submit.
6. **A/B or copy tweaks** — Headline tests, MA-specific trust copy, seasonal promos without full redesign.
7. **SMS notifications** — Twilio alert to owner on new lead (optional second phase).
8. **Mover dashboard / matching** — Outside pure “landing” scope; product build (larger estimate).

## Monthly retainer — aligned with a typical small-site model

This landing is a **single page + modal flow** — less ongoing surface area than a full marketing site with CMS, blog, or many templates. A **~$99/month** “keep it healthy” retainer (matching a common rate for simple static/landing sites) is reasonable if you scope it tightly.

**What ~$99/mo can honestly include:**

- **Peace of mind** — they know who to email when something looks wrong after a browser or Next.js update.
- **Occasional micro-edits** — copy or tier text tweaks, **within a small monthly time budget** (e.g. 30–45 minutes banked, or “one small request” per month — define this in writing).
- **Deploy awareness** — you’re available to re-run a deploy or fix a broken env var if Vercel/GitHub hiccups (not full incident response 24/7).

**What it usually does *not* include** (bill separately or bump the tier):

- Wiring **lead delivery** (Airtable, CRM, email API), **geocoding** (Phase 2), **analytics** events, or **SMS** — those are project add-ons, not “hosting.”
- **Large redesigns**, new steps in the booking flow, or building **mover matching** — scope as fixed projects.

**Optional higher tier** (e.g. **$149–$199/mo**) if the client wants **two properties** (storage + mover), **priority turnaround** (e.g. 48h), or a **clear hour bank** (e.g. 1.5 hrs/mo rolled 1 month).

**Agency-style $750+ retainers** apply when you’re selling **ongoing product work**, SLAs, and substantial included hours — overkill for this MVP unless the scope explicitly grows.

## How to explain ~$99/mo to the client (one line)

“It covers keeping the live site on the rails, dependency drift in check, and a small slice of time for tweaks — bigger features like lead routing or maps are quoted separately.”
