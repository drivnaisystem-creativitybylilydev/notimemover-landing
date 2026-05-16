# NoTimeMover — business audit (internal)

**Sources:** `PROJECT-BRIEF.md`, `lib/pricing.ts`, `lib/distance.ts`, `components/BookingFlow.tsx`, `client-scope/storage-modal-snippet/`, call notes with Jermaine (May 2026), and open threads (packing, marketplace vision, pre-revenue).

This is a **gap list for you and the client** — not legal or tax advice. Flag anything regulatory to a **Massachusetts–qualified** attorney or compliance contact.

---

## 1) Strategy & roadmap

| Gap | Why it matters |
|-----|----------------|
| **Product brief vs operating reality** | Brief describes a **marketplace + matching**; current execution is **solo operator + demand test**. Roadmap docs should spell **phase gates** (e.g. move #10 → outsourced capacity → matcher v0) so scope and spend don’t jump to “platform” prematurely. |
| **Two-brand traffic** | NoTimeStorage → NoTimeMover handoff (`StorageMovingModal`) is clear technically; **messaging** can still confuse “storage company also moves.” Needs **consistent legal name / DBA / which URL is authoritative** on GBP and outbound links. |
| **Liquidity narrative** | Marketplace needs **supply + demand discipline** (onboarding movers, SLA, disputes, payouts). None of that is operationalized yet — correct to defer; **risk** is stakeholder impatience if marketing works before ops SOP exists. |

---

## 2) Product, pricing & trust

| Gap | Why it matters |
|-----|----------------|
| **Drive distance is stubbed (`25 mi`)** | `lib/distance.ts` returns a constant. **Every quote using “gas/miles” is arbitrary** until Phase 2 geocoder. Misaligned vs real route undermines the “transparent pricing” story and can create **post-booking conflict**. |
| **“Final price” vs estimate** | Flow presents **dollar outcomes** from a model the customer doesn’t see (`base` / `equipment` / `gas` hidden per brief). Need **plain-language disclaimer**: *indicative estimate, subject to walkthrough, access, inventory, etc.* |
| **Three tiers (`save` / `your` / `premium`) semantics** | `save` is **labor-only** in code (`base * 0.85`, no equipment/gas). Customers may read it as “cheapest full service.” **Copy and follow-up** must define what’s included. |
| **Home size → labor/cubic feet** | Only **studio / 2BR / 3BR** buckets. No **stairs, elevator, long carry, disassembly, packing, specialty items** — all drive **time and truck**. |
| **Move **date** / window** | Form does not capture **when** the move happens. Ops cannot schedule, price peak season, or detect conflicts without a **phone step** (ok) but then **website doesn’t set that expectation**. |
| **Minimum budget** | Code: `BUDGET_MIN = 200` in `lib/pricing.ts`. Client mentioned **~$150–200** floor — **align code, copy, and ops**. |
| **Gas rate** | `GAS_RATE_PER_MILE = 2.5` is a **policy knob**, not a live fuel index. Document how/when it updates or you eat margin. |
| **Packing & materials** | **Not captured** (boxes, tape, full pack vs customer-packed). Drives **truck space, time, and margin** — see `CALL-GROWTH-PARTNER-CHEATSHEET.md` §9. |
| **Inventory / weight** | No **list of large items** (piano, safe, gun safe, etc.). Common source of **under-quoting** and crew/truck mismatch. |

---

## 3) Operations & fulfillment

| Gap | Why it matters |
|-----|----------------|
| **Single-person capacity** | Client plans to **self-fulfill until overflow**. Need **rules**: max jobs/week, max drive radius same-day, when to say no, **waitlist** behavior. |
| **Crew & equipment** | No link between **job size + truck size + # movers**. Affects cost, time, and **DOT/vehicle** assumptions (if applicable). |
| **Building requirements** | Many buildings need **COI**, reserved elevators, parking — not in flow; **sales script** should cover it. |
| **Payment** | Brief: **no payment processor**. Unclear **deposit**, **balance timing**, cancellation policy, chargebacks — **cash flow and no-show risk**. |
| **Claims / damage** | No stated **valuation / liability** options (e.g. released value vs full value). Movers live on **documentation + photos**. |
| **Scheduling & communication** | Post-submit: who texts/calls when, SLA (e.g. 15 minutes), calendar tool — **no productized handoff** in MVP. |

---

## 4) Legal, insurance & compliance (verify locally)

| Gap | Why it matters |
|-----|----------------|
| **Intrastate moving regulation (MA)** | Operating as a **for-hire mover** typically triggers **state registration / licensing / tariff** rules (exact requirements **must be verified** with MA sources and counsel). “Two guys and a truck” marketing without compliance = **enforcement and trust** risk. |
| **Insurance** | **Cargo, GL, auto, workers comp** (if employees) — customer-facing **“licensed & insured”** should map to **real docs** and renewals. |
| **Privacy** | Collecting **PII** (name, email, phone, addresses) needs **privacy policy**, retention, and secure handling (Sheet + email is fine if access-controlled). |
| **TCPA / SMS** | If later **SMS** to leads or customers, **consent and opt-out** matter. |
| **Terms of service** | Booking flow should reference **terms** or at least **estimate limitations** to reduce “you quoted $X on the site” disputes. |

---

## 5) Marketing, distribution & brand

| Gap | Why it matters |
|-----|----------------|
| **Zero reviews / proof** | Pre-revenue = **weak conversion** vs incumbents. Plan: **first-job documentation**, screenshot-able outcomes, agent referrals — not only “traffic.” |
| **Organic vs paid sequencing** | Call aligned on **GBP + on-page SEO + outbound** before paid — sensible. **Risk:** organic is **slow** for head terms; he needs **outbound volume** to hit “quit job” pace. |
| **Creative assets** | You noted lack of **photos/video** — hurts Meta later and weakens **trust blocks** now. |
| **Attribution hygiene** | **UTMs + events** still need to be **implemented correctly** (UTMs ≠ funnel analytics alone). |

---

## 6) Technology & data (current repo snapshot)

| Gap | Why it matters |
|-----|----------------|
| **`/api/lead`** | `BookingFlow` POSTs to `/api/lead`, but **no `app/api` route** appears in-repo — leads may **not persist** reliably until wired (email, Sheet, Supabase, etc.). Align with what you **sold** (`$350` close-out). |
| **`PROJECT-BRIEF` drift** | Brief still says **Phase 1 does not persist leads** — implementation and sales copy should **match reality**. |
| **Spam / bots** | No **honeypot, Turnstile, rate limit** on lead endpoint — higher risk as traffic grows. |
| **Error handling** | Submit uses **silent `.catch`** — user may see **success** without delivery; need **server confirmation** or retry UX. |
| **Accessibility / mobile** | Modal flow is complex; worth a **quick a11y pass** (focus trap, errors) before heavy traffic. |

---

## 7) Marketplace future (when he returns to it)

| Gap | Why it matters |
|-----|----------------|
| **Matching rules** | Price floor, mover availability, **quality score**, cancellation handling — product spec. |
| **Payments** | Platform fee, **payout timing**, chargebacks, **two-sided identity**. |
| **Disputes** | Mediation path, insurance split, **off-platform circumvention**. |
| **Supply onboarding** | Contract, background check level, **vehicle verification**, van line rules. |

---

## 8) Suggested “next conversation” checklist with Jermaine

Use to turn gaps into **decisions** (yes/no / later / you own / I build):

1. **Quote language:** Binding vs non-binding estimate; **what changes price** after walkthrough?  
2. **Minimum job + fees:** stairs, bulky items, **packing**, travel time.  
3. **Scheduling:** Is **move date** collected on site or **call-only**? If call-only, say so on confirmation.  
4. **Materials:** Box policy; who supplies; **how estimated**.  
5. **Payments:** Deposit %, cancellation window, accepted methods.  
6. **Insurance / COI:** What he sends to buildings; customer-facing line.  
7. **Compliance:** Who confirms **MA mover requirements** and updates site copy accordingly.  
8. **Distance:** Timeline for **real miles** (Phase 2) vs keeping stub with **explicit “example route” copy**.  
9. **Lead SLA:** Minutes to first contact; backup if he’s on a job.

---

## 9) Mapping gaps → typical sellable work (for you)

| Theme | Example deliverables |
|-------|----------------------|
| **Trust + clarity** | FAQ, service areas, disclaimers, “how pricing works,” trust row, confirmation email copy |
| **Truth in pricing** | Phase 2 geocoder; **pricing policy** doc reflected in UI |
| **Ops capture** | Optional form fields or **internal intake checklist** after lead (not always public form) |
| **Pipeline** | Working `/api/lead`, Sheet, email, spam control |
| **Growth** | GBP, analytics, UTMs, content expansion |

---

_Last updated from repo + conversation context — refresh after proposal is signed._
