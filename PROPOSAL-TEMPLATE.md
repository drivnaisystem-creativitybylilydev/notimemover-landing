# NoTimeMover — Proposal & agreement (template)

Use this as the backbone for a DocuSign envelope: copy sections into your PDF or DocuSign “document,” then fill in brackets. Replace bracketed fields; delete sections you don’t need.

---

## Cover / subject line (email)

**Subject:** NoTimeMover — Proposal & agreement (Phase 1)

**Parties**

- **Service provider:** [Your legal name / business name], [address], [email]
- **Client:** NoTimeStorage / Jermaine [last name if using formally], [business address if any], [email]

**Project:** Demand-test landing page and booking flow for **NoTimeMover** (moving marketplace positioning).

**Effective date:** [Date upon mutual execution]

---

## 1. Executive summary

[1–2 paragraphs: what you’re delivering, why it matters for Jermaine’s demand test, and that Phase 1 is a fixed-scope build with optional ongoing support.]

---

## 2. Background & goals

- **Product:** Single-page, mobile-first landing where visitors set a budget-style flow and see tiered options; establishes interest before backend matching.
- **Business goal:** Validate demand and capture leads without payment processing in Phase 1.
- **Related work:** Client operates **notimestorage.co** ([URL]); optional cross-link / modal integration can be scoped separately.

---

## 3. Scope of work — Phase 1 (included in setup fee)

**Included**

- [x] Next.js landing on Vercel-aligned stack (as built in repo `notimemover-landing`)
- [x] Dark, minimal brand-aligned UI; hero, trust line, animated headline/subline, booking modal
- [x] Five-step booking flow: structured addresses (street / city / state / ZIP), home size, budget slider, three pricing tiers (logic per agreed formula), contact fields, confirmation UI
- [x] **Lead handling for Phase 1:**

  **Currently:** quote submission is **frontend-only** (e.g. console / no persistent storage) unless otherwise specified in a change order.

  **If lead capture is added under this proposal:** [specify: email to Jermaine via Resend/SendGrid, Airtable, Google Sheet, etc. — or leave as “out of scope for $350”]

- [x] Deployment to **Vercel** from **GitHub**; production URL as agreed ([domain or Vercel subdomain])
- [x] Basic **metadata**: title, description, icon, Open Graph image (as provided in repo)
- [x] **Documentation** in-repo: brief, phase-2 notes (`PHASE-2-GEOCODER.md`), agent notes (`AGENTS.md`)

**Explicitly out of scope for this fixed fee (unless added by change order)**

- Payment processing, CRM build, mover dashboard, automated SMS, full email marketing sequences
- **Google Places / Distance Matrix** (real miles) — documented as **Phase 2** upgrade
- Content or photography not already in the build
- Unlimited redesign rounds beyond the revision policy (below)
- Legal review of insurance/licensing copy (client supplies final claims compliance)
- 24/7 support or guaranteed response SLAs

---

## 4. Deliverables checklist

| Deliverable                         | Status / notes   |
|-------------------------------------|------------------|
| Production URL                      | [URL]            |
| GitHub repo access / handoff        | [yes/no]         |
| Env vars documented (if any keys) | [list or N/A]    |
| Client walkthrough / Loom           | [optional]       |

---

## 5. Timeline

| Milestone              | Target date   |
|------------------------|---------------|
| Demo acceptance        | [TBD]         |
| Final tweaks (if any)  | [TBD]         |
| Launch / sign-off      | [TBD]         |

*[Adjust to “already delivered; this proposal ratifies Phase 1” if the build is done.]*

---

## 6. Investment (Phase 1)

**One-time setup (Phase 1 demand-test build): $350.00 USD**

- Due: **[Upon signature / 50% at sign, 50% at launch — pick one]**
- Method: **[Invoice / PayPal / Stripe / DocuSign payment if enabled]**

**Optional — not required to go live**

- **Hosting:** Vercel (client or your account); typical hobby/pro costs are **[client’s or yours — clarify]**.
- **Domain:** [who registers / points DNS]

---

## 7. Maintenance & retainer (optional addendum)

Pick one row to attach as “Schedule A” or a second DocuSign document.

| Tier   | Monthly | What it typically covers |
|--------|---------|---------------------------|
| **Light** | **$99** | Keep deploys working; dependency awareness; **small** copy or tier text tweaks (define **e.g. ≤30 min/mo** or **one micro-request/mo**); best-effort bug triage when something breaks after a platform update. |
| **Standard** | **$149** | Everything in Light + **~1 hr/mo** banked for small features (analytics event, form field, notification channel wiring to **one** destination). |
| **Dual-property** | **$199** | Standard + coordinated updates for **notimestorage.co** + NoTimeMover when both are in scope (same sprint, not two full sites). |

**Retainer does *not* include** (bill separately): Phase 2 geocoder, new booking steps, major redesign, CRM integrations beyond a single pipe, or mover-matching product work.

**Separate context:** Client already maintains **[notimestorage.co]** at **[$90/mo or state actual]** — clarify whether NoTimeMover retainer is **additive** or **replaces** nothing (usually **additive** for a second product surface).

---

## 8. Responsibilities

### Service provider (you)

- Deliver the scoped build and deploy per Section 3.
- Keep **source code** in the agreed GitHub repository and grant Client access as agreed.
- Provide **reasonable support** during the acceptance window [define: e.g. **14 days after launch**] for **defects** in delivered scope (bugs, broken flow), not new features.
- Document environment variables and deploy steps needed for Client or Client’s future dev to reproduce.

### Client (Jermaine / NoTimeStorage)

- Provide **timely feedback** during acceptance (ideally within **[5–7 business days]** of demo).
- Provide or approve **final copy** for legally sensitive claims (licensed, insured, service area).
- Own **third-party accounts**: Vercel, domain registrar, Google Cloud (if Phase 2), email APIs, Airtable, etc., unless you manage them under a separate fee.
- **Payment** per Section 6 (and retainer if elected).

---

## 9. Revisions & change orders

- **Included in Phase 1 fee:** [e.g. **one round** of minor UI/copy adjustments after demo sign-off, or **two rounds** — pick what you offered.]
- **Change order:** Any work outside Section 3 (new step, new integration, redesign) — **quoted separately** before work begins. Minimum increment: **[e.g. $100 or 1 hr @ $X]**.

---

## 10. Intellectual property

Upon **full payment** for Phase 1:

- Client receives a **license to use** the delivered site for the NoTimeMover business purpose.
- **Recommendation:** State whether **source code ownership** transfers to Client, remains with you with a license, or is joint — **pick one** and have a lawyer review if unsure:

  *[Example clause — not legal advice]*  
  “Upon receipt of full payment, Provider assigns to Client all Provider’s right, title, and interest in the custom front-end deliverables described in Section 3, excluding third-party open-source libraries and Provider’s generic tooling. Provider may retain anonymized portfolio rights.”

---

## 11. Confidentiality (lightweight)

Both parties agree not to disclose non-public business information learned during the project, except as needed to perform the work or as required by law.

---

## 12. Limitation of liability (lightweight)

To the maximum extent permitted by law, Provider’s total liability under this agreement shall not exceed **fees paid** for the Phase 1 scope. No guarantee of business results, lead volume, or revenue.

*[Have a lawyer tune this for your jurisdiction if the stakes rise.]*

---

## 13. Term & termination

- **Acceptance:** Client acceptance is confirmed by **[written approval / email / payment of final installment — pick one].**
- **Retainer (if any):** **[Month-to-month / 3-month minimum]**; either party may terminate with **[30 days’ written notice]** unless otherwise agreed.

---

## 14. Signatures

| Role        | Name | Title | Date | Signature |
|-------------|------|-------|------|-----------|
| Provider    |      |       |      |           |
| Client      | Jermaine [ ] | [ ] |      |           |

---

## 15. DocuSign checklist

- [ ] Replace all `[brackets]`
- [ ] Attach Schedule A if retainer is selected
- [ ] Attach URL of production site as exhibit
- [ ] Payment terms and legal sections reviewed by you (and counsel if needed)
- [ ] Send envelope; archive executed PDF in your records

---

## Reference docs in this repo (for you, not necessarily attached)

- [PROJECT-BRIEF.md](PROJECT-BRIEF.md) — product scope
- [UPSSELLS-AND-RETAINER.md](UPSSELLS-AND-RETAINER.md) — upsells and retainer framing
- [PHASE-2-GEOCODER.md](PHASE-2-GEOCODER.md) — optional maps/autocomplete phase
