# NoTimeMover — Immediate SEO/AEO/GEO Action Checklist
**Priority:** This week (July 8-12, 2026)  
**Effort:** ~2 hours total  
**Impact:** Unlocks GSC indexing + local signal foundation

---

## CRITICAL FIXES (Blocking Rankings)

### ✅ 1. Add Visible NAP to Footer
**Status:** DONE (just committed)  
**What it does:** Makes Name, Address, Phone visible to Google crawlers (required for local ranking)

- [x] Added structured NAP section to Footer.tsx
- [ ] Deploy to Vercel (next commit)
- [ ] Verify on live site: footer shows "NoTimeMover", "Greater Boston, MA", phone/email

**Verification:** Visit notimemover.com, scroll to footer → should see NAP clearly.

---

### ⚠️ 2. Fix www→apex Redirect (307 → 308)
**Status:** NEEDS DOING  
**What it does:** Tells Google "permanently redirect www to apex" (improves authority consolidation)

**Action (Jermaine or Finn):**
1. Log into Vercel dashboard → https://vercel.com/dashboard
2. Select "notimemover" project
3. Go to Settings → Domains
4. Click on domain (notimemover.com)
5. Find redirect settings → change from 307 (Temporary) to 308 (Permanent)
6. Save

**Verification Command:**
```bash
curl -I https://www.notimemover.com 2>&1 | grep -i "location\|http"
# Should show: HTTP/1.1 308 Permanent Redirect
```

**Why it matters:** 307 is temporary, loses authority; 308 is permanent, consolidates link equity.

**Timing:** 2 minutes, one-time fix. Do this week.

---

## GSC INDEXING (This Week, Then Weekly)

### 3. Request Indexing Batch 2
**Status:** READY TO SUBMIT  
**What it does:** Tells Google to crawl & index 10 location pages immediately (vs waiting 30+ days for auto-crawl)

**Action:**
1. Log into Google Search Console: https://search.google.com/search-console/
2. Select notimemover.com property
3. Click "Request Indexing" button (top left)
4. Paste each URL individually:
   ```
   https://notimemover.com/movers-roxbury-ma
   https://notimemover.com/movers-mission-hill-ma
   https://notimemover.com/movers-fenway-ma
   https://notimemover.com/movers-jamaica-plain-ma
   https://notimemover.com/movers-south-boston-ma
   https://notimemover.com/movers-quincy-ma
   https://notimemover.com/movers-medford-ma
   https://notimemover.com/movers-malden-ma
   https://notimemover.com/movers-everett-ma
   https://notimemover.com/movers-newton-ma
   ```
5. Track in spreadsheet:
   - URL | Submission Date | Indexing Date (check GSC Coverage tab daily)

**Expected outcome:** 2-7 days per URL → pages appear in GSC Coverage as "Indexed" → start showing impressions in GSC Performance tab

**Timing:** Do this TODAY (or first thing next session). Can batch submit all 10 in ~5 minutes.

---

## REVIEW GENERATION (Ongoing, Start This Week)

### 4. Create Post-Job Review Email Template
**Status:** TEMPLATE READY  
**What it does:** Systematizes review generation to maintain 2-3 new reviews/week (prevents 18-day ranking cliff)

**Email Template (send to Jermaine):**

```
Subject: Post-Job Review Template (Copy & Customize)

Hi [Customer Name],

Thanks for trusting us with your move. We'd love to hear how it went.

Leave us a Google review:
https://g.page/r/CdncHLvRFKEXEBM/review

It takes 2 minutes and helps other Boston movers find us.

—Jermaine & the NoTimeMover crew
```

**Action:**
1. Save template somewhere accessible (Notion, Google Drive, Notes app)
2. After each move, send within 24 hours
3. Customize first line: "Thanks for trusting us with your move from [Allston to Quincy]"
4. Target: 2-3 reviews/week minimum (prevents ranking cliff every 18 days)

**Timing:** Send this week. Jermaine implements after each job (ongoing).

---

## CITATION CLAIMS (This Week, Then Ongoing)

### 5. Claim Yelp Business Page
**Status:** Ready to claim  
**What it does:** Establishes presence on Yelp (visible on 68% of local searches alongside GBP)

**Action:**
1. Go to yelp.com
2. Search "NoTimeMover Boston"
3. Find the unclaimed business page
4. Click "Claim this business" (or "Claim your business")
5. Verify email
6. Complete profile:
   - Add description (copy from GBP or homepage)
   - Upload photos (truck, crew)
   - Add services: Local moving, long-distance moving, packing
   - Add hours: Mon-Sun, 00:00-23:59 (or actual hours)
   - Link website: notimemover.com

**Timing:** 10 minutes. Do this week.

**Expected outcome:** Yelp page live within 48 hours → appears in local search results + Yelp category pages

---

## OPTIONAL (High Value, Can Wait Until Week 2)

### 6. Claim Apple Business Connect
**Status:** Optional but recommended  
**Why:** Usage doubled to 27%, powers Siri recommendations, Apple Maps integration

**Action:**
1. Go to business.apple.com
2. Search for NoTimeMover
3. Claim or add business
4. Add description, hours, phone

---

### 7. Claim Bing Places
**Status:** Optional but recommended  
**Why:** Powers ChatGPT, Copilot, Alexa recommendations (critical for AI visibility)

**Action:**
1. Go to bingplaces.com
2. Add or claim NoTimeMover
3. Complete profile with NAP + service area

---

## TRACKING SPREADSHEET (Create This Week)

| URL | Submitted | Indexed (GSC) | First Impression | Rank (Query) | Notes |
|-----|-----------|---------------|------------------|-------------|-------|
| /movers-roxbury-ma | 2026-07-08 | TBD | TBD | TBD | Batch 2 |
| /movers-mission-hill-ma | 2026-07-08 | TBD | TBD | TBD | Batch 2 |
| ... | ... | ... | ... | ... | ... |

**Check weekly in GSC:**
- Coverage tab: is URL indexed? (shows Indexed, Discovered - not indexed, Excluded, etc.)
- Performance tab: any impressions? (after indexing, should see "movers in [city]" query impressions within 7 days)

---

## WEEKLY RECURRING TASKS (Starting Week 2)

Once PHASE 1 is complete, add to recurring:

**Every Monday:**
- [ ] Check GSC Coverage: confirm 64 location pages indexed
- [ ] Check GBP Insights: profile views, direction requests, review count
- [ ] Check for new reviews (reply within 48h if any)
- [ ] Monitor organic search traffic via GA4

**Every Friday:**
- [ ] Request indexing for next 10 URLs (batch 3) if batch 2 is indexed
- [ ] Check local pack rankings for 5 primary keywords

**Monthly:**
- [ ] Submit GBP post (moving tips, seasonal advice, community tie-in)
- [ ] Check citation presence (Yelp, BBB, Apple, Bing)
- [ ] Review and respond to all reviews from past month

---

## SUCCESS INDICATORS (What to Look For)

### Week 1-2 (Foundation)
- [ ] www redirect changed to 308 in Vercel
- [ ] GSC batch 2 submitted (10 URLs)
- [ ] Yelp page claimed and live
- [ ] NAP visible in footer on live site
- [ ] Review template ready

### Week 2-3 (Indexing Begins)
- [ ] First pages from batch 2 showing as "Indexed" in GSC Coverage
- [ ] First impressions appearing in GSC Performance tab for "movers in [city]" queries
- [ ] At least 1 new review received

### Week 4 (Signals Growing)
- [ ] All 10 batch 2 URLs indexed
- [ ] 2-3 new reviews total
- [ ] GBP profile views increasing (visible in GBP Insights)

---

## NEXT PHASE (Start Week 3-4 After Foundation Complete)

Once Phase 1 is solid, begin Phase 2 (GBP optimization, NAP consistency, more citations). See full plan: `SEO-AEO-GEO-OPTIMIZATION-PLAN.md`

---

## Questions?

- Full strategy: `SEO-AEO-GEO-OPTIMIZATION-PLAN.md`
- Memory notes: [[seo_aeo_geo_phase1_launch]]
- Proven sources: Whitespark 2026, Sterling Sky, Seer Interactive, BrightLocal 2026

**Next check-in:** July 15 (after batch 2 is submitted + Vercel fix done).

