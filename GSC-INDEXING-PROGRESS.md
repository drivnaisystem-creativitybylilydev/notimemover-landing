# GSC Manual Indexing Progress Tracker
**Last updated:** 2026-07-09
**Total location pages:** 64
**Method:** Google Search Console → URL Inspection → "Request Indexing" (daily quota ~10-12 requests, resets ~midnight)

---

## ✅ Already Submitted (28 pages, confirmed)

**From URL inspection history (date unknown, prior session):**
- movers-back-bay-ma
- movers-brighton-ma
- movers-charlestown-ma
- movers-dorchester-ma
- movers-south-end-ma
- movers-marlborough-ma

**Batch 2 (submitted earlier):**
- movers-roxbury-ma
- movers-mission-hill-ma
- movers-fenway-ma
- movers-jamaica-plain-ma
- movers-south-boston-ma
- movers-quincy-ma
- movers-medford-ma
- movers-malden-ma
- movers-everett-ma
- movers-newton-ma

**2026-07-07, before quota hit:**
- movers-allston-ma

**Batch A (2026-07-08):**
- movers-east-boston-ma
- movers-hyde-park-ma
- movers-roslindale-ma
- movers-west-roxbury-ma
- movers-beacon-hill-ma
- movers-north-end-ma
- movers-seaport-ma
- movers-chinatown-ma
- movers-downtown-boston-ma
- movers-mattapan-ma

**Batch B, partial (2026-07-09) — quota hit after 1:**
- movers-kenmore-square-ma

---

## ⏳ Remaining (36 pages) — Split Into Daily Batches

Quota resets roughly at midnight Pacific (Google's internal reset, not always aligned to local midnight — if a batch fails immediately in the morning, wait a few hours and retry). Submit ~10/day via GSC → URL Inspection → paste URL → Request Indexing.

### Batch B remainder — TO BE DONE (submit next, quota reset)
```
https://notimemover.com/movers-longwood-ma
https://notimemover.com/movers-boston-ma
https://notimemover.com/movers-cambridge-ma
https://notimemover.com/movers-somerville-ma
https://notimemover.com/movers-brookline-ma
https://notimemover.com/movers-revere-ma
https://notimemover.com/movers-chelsea-ma
https://notimemover.com/movers-waltham-ma
https://notimemover.com/movers-watertown-ma
```

### Batch C — Day 3
```
https://notimemover.com/movers-arlington-ma
https://notimemover.com/movers-belmont-ma
https://notimemover.com/movers-needham-ma
https://notimemover.com/movers-dedham-ma
https://notimemover.com/movers-braintree-ma
https://notimemover.com/movers-milton-ma
https://notimemover.com/movers-lynn-ma
https://notimemover.com/movers-winthrop-ma
https://notimemover.com/movers-woburn-ma
https://notimemover.com/movers-burlington-ma
```

### Batch D — Day 4
```
https://notimemover.com/movers-lexington-ma
https://notimemover.com/movers-framingham-ma
https://notimemover.com/movers-natick-ma
https://notimemover.com/movers-wellesley-ma
https://notimemover.com/movers-peabody-ma
https://notimemover.com/movers-salem-ma
https://notimemover.com/movers-beverly-ma
https://notimemover.com/movers-worcester-ma
https://notimemover.com/movers-lowell-ma
https://notimemover.com/movers-springfield-ma
```

### Batch E — Day 5 (final, only 7)
```
https://notimemover.com/movers-lawrence-ma
https://notimemover.com/movers-haverhill-ma
https://notimemover.com/movers-brockton-ma
https://notimemover.com/movers-new-bedford-ma
https://notimemover.com/movers-fall-river-ma
https://notimemover.com/movers-taunton-ma
https://notimemover.com/movers-plymouth-ma
```

---

## How to Resume Next Session

Just tell Claude: **"give me today's GSC batch"** — it'll read this file, hand you the next unsubmitted batch, and cross it off here once you confirm you've submitted it.

## Why No Automated Reminder

Checked: cloud routines (RemoteTrigger/`/schedule`) run in an isolated sandbox with no browser and can't touch your logged-in GSC session — indexing requests are tied to your Google account and must happen in your browser. The connected Gmail MCP tool also only supports `create_draft`, not sending, so an automated "reminder email" would sit unsent in Drafts and likely go unseen. Net: no reliable way to auto-ping you for this specific action. Best option is a manual phone/calendar alarm, with this file as the persistent source of truth for what's next.
