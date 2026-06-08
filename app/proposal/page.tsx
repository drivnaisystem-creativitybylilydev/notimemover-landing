'use client'

import { useState } from 'react'

const AGREEMENT_DATE = 'June 8, 2026'

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] uppercase tracking-[0.28em] font-semibold mb-3" style={{ color: '#8B5230' }}>
      {children}
    </p>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[28px] sm:text-[34px] font-semibold tracking-tight text-white leading-[1.08] mb-6" style={{ fontFamily: 'var(--font-instrument-serif)', fontStyle: 'italic' }}>
      {children}
    </h2>
  )
}

function Divider() {
  return <div className="w-full h-px my-14" style={{ background: 'rgba(107,58,31,0.25)' }} />
}

function PhaseTag({ phase, label }: { phase: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em]"
      style={{ background: 'rgba(107,58,31,0.18)', color: '#8B5230', border: '1px solid rgba(107,58,31,0.35)' }}>
      {phase} · {label}
    </span>
  )
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <td className="py-3 pr-6 text-[13px] font-medium align-top" style={{ color: 'rgba(255,255,255,0.4)', width: '38%' }}>{label}</td>
      <td className={`py-3 text-[13px] leading-relaxed ${highlight ? 'font-semibold text-white' : ''}`} style={{ color: highlight ? '#fff' : 'rgba(255,255,255,0.75)' }}>{value}</td>
    </tr>
  )
}

function BuildItem({ task, notes }: { task: string; notes: string }) {
  return (
    <div className="flex gap-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="mt-1 w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: 'rgba(107,58,31,0.25)', border: '1px solid rgba(107,58,31,0.5)' }}>
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#8B5230' }} />
      </div>
      <div>
        <p className="text-[14px] font-medium text-white leading-snug">{task}</p>
        {notes && <p className="text-[13px] mt-0.5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{notes}</p>}
      </div>
    </div>
  )
}

export default function ProposalPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [signed, setSigned] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [signedAt, setSignedAt] = useState('')

  const canSign = name.trim().length >= 2 && /\S+@\S+\.\S+/.test(email) && agreed && !submitting

  const handleSign = async () => {
    if (!canSign) return
    setSubmitting(true)
    setError(null)
    const now = new Date().toISOString()
    try {
      const res = await fetch('/api/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jermaineName: name.trim(), jermaineEmail: email.trim(), signedAt: now }),
      })
      const data = await res.json().catch(() => ({})) as { ok?: boolean; error?: string }
      if (!res.ok || !data.ok) {
        setError(data.error ?? 'Something went wrong. Please screenshot this page and send it to Finn.')
        return
      }
      setSignedAt(new Date(now).toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'long', timeStyle: 'short' }) + ' ET')
      setSigned(true)
    } catch {
      setError('Network error. Please screenshot this page and send it to Finn.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#070504', color: '#fff' }}>

      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(107,58,31,0.2)' }}>
        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-8 sm:py-10 flex items-center justify-between">
          <div>
            <span className="text-[18px] font-semibold tracking-tight">NoTime<span style={{ color: '#8B5230' }}>Mover</span></span>
            <span className="mx-3 text-[18px]" style={{ color: 'rgba(107,58,31,0.5)' }}>×</span>
            <span className="text-[18px] font-semibold tracking-tight" style={{ color: 'rgba(255,255,255,0.55)' }}>Drivn.AI</span>
          </div>
          <span className="text-[11px] uppercase tracking-[0.2em] font-medium" style={{ color: 'rgba(255,255,255,0.3)' }}>{AGREEMENT_DATE}</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 sm:px-10 py-14 sm:py-20">

        {/* Hero */}
        <div className="mb-16">
          <Kicker>Partnership Agreement</Kicker>
          <h1 className="text-[40px] sm:text-[56px] font-semibold tracking-tight leading-[1.0] text-white mb-6" style={{ fontFamily: 'var(--font-instrument-serif)' }}>
            Digital Services &<br /><span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.65)' }}>Equity Partnership</span>
          </h1>
          <p className="text-[16px] leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,0.5)' }}>
            This agreement formalises the partnership discussed on {AGREEMENT_DATE} between Finn Schueler (Drivn.AI) and Jermaine Williams (NoTimeMover), covering the scope of digital work, equity structure, timeline, and responsibilities of each party.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            {[
              { label: 'Jermaine Williams', sub: 'NoTimeMover — Founder' },
              { label: 'Finn Schueler', sub: 'Drivn.AI — Consultant & Co-Founder' },
            ].map(p => (
              <div key={p.label} className="px-4 py-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-[14px] font-semibold text-white">{p.label}</p>
                <p className="text-[12px] mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{p.sub}</p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* Section 1: Background */}
        <div className="mb-12">
          <Kicker>01 — Background</Kicker>
          <SectionHeading>What was discussed</SectionHeading>
          <p className="text-[15px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.55)' }}>
            On June 8, 2026, Finn and Jermaine held a video call to review the current state of NoTimeMover, qualify the business opportunity, and agree on a plan. Key findings: NoTimeMover has completed two moves (both within the last week), is going all-in with capacity for one move per day, and has an existing crew of former teammates on rotation. Leads have been sourced manually through Facebook Marketplace and word of mouth. The main challenge is trust — the flexible pricing model is a differentiator but needs clearer presentation. Both parties agreed the right sequence is to build a professional digital foundation first, then systematically drive and automate leads.
          </p>
        </div>

        <Divider />

        {/* Section 2: Equity & Core Terms */}
        <div className="mb-12">
          <Kicker>02 — Equity & Core Terms</Kicker>
          <SectionHeading>What's agreed</SectionHeading>
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(107,58,31,0.3)' }}>
            <table className="w-full">
              <tbody>
                <Row label="Equity granted to Finn" value="35% of NoTimeMover, effective upon execution of this agreement" highlight />
                <Row label="Path to 45%" value="Milestone-based escalation — to be defined and signed in a separate document within 7 days of this agreement" />
                <Row label="Monthly retainer" value="$49/month commencing June 18, 2026 — covers the live website in its entirety: hosting oversight, all SEO work, content updates, booking flow changes, technical maintenance, and any future modifications to the site. This rate represents exceptional value relative to standard agency pricing for equivalent ongoing digital services." />
                <Row label="Build compensation" value="All digital work described in Section 4 is performed in exchange for equity. No additional cash payment for builds." />
                <Row label="Ad spend" value="Funded from organic job revenue. Cost-sharing strategy to be agreed before any paid campaigns begin." />
                <Row label="Timeline" value="15–20 days from execution date" highlight />
                <Row label="Effective date" value={AGREEMENT_DATE} />
              </tbody>
            </table>
          </div>
        </div>

        <Divider />

        {/* Section 3: Phase 0 */}
        <div className="mb-12">
          <Kicker>03 — Scope of Work</Kicker>
          <div className="mb-2">
            <PhaseTag phase="Phase 0" label="Immediate — June 8 2026" />
          </div>
          <SectionHeading>Already completed</SectionHeading>
          <p className="text-[14px] mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>The following were completed before this agreement was sent, as discussed on the call.</p>
          <BuildItem task="Pricing slider defaults updated" notes="Studio: $600 default · 2BR: $800 default · 3BR: $1,000 default · Max cap raised to $3,000 across all categories" />
          <BuildItem task="'Licensed & Insured' copy removed sitewide" notes="Updated to 'Fully Insured' across all pages, emails, and components. Reflects actual insurance status accurately." />
        </div>

        {/* Phase 1 */}
        <div className="mb-12">
          <div className="mb-2">
            <PhaseTag phase="Phase 1" label="Days 1–8 · Website, SEO & GBP" />
          </div>
          <SectionHeading>Build the digital foundation</SectionHeading>

          <div className="mb-8">
            <p className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>Website redesign</p>
            <BuildItem task="Full visual rebuild of notimemover.com" notes="Jermaine's job photos and video used throughout — crew shots, truck, real moves. Hero video from available footage. Looks like an established, trusted business." />
            <BuildItem task="Full copy rewrite" notes="Clear service areas, how pricing works, trust signals throughout. Positions the flexible pricing model as a feature, not a source of confusion." />
            <BuildItem task="Move date field added to booking flow" notes="Eliminates the need for a callback just to get the date. Every lead comes with a scheduled date." />
            <BuildItem task="GA4 analytics + conversion event" notes="Installed during the website build. Tracks form starts, step completions, and submissions from day one. Required before any paid spend." />
          </div>

          <div className="mb-8">
            <p className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>SEO foundation</p>
            <BuildItem task="JSON-LD structured data" notes="LocalBusiness + MovingCompany schema on homepage. Tells Google this is a real, established business." />
            <BuildItem task="FAQ schema" notes="Makes FAQ section eligible for Google rich results." />
            <BuildItem task="Meta titles, descriptions, heading structure on all pages" notes="" />
            <BuildItem task="Alt text on all images, sitemap updated" notes="" />
            <BuildItem task="2–3 keyword-targeted blog posts" notes="'Moving in Boston: What to Expect' · 'How to Find an Affordable Mover in Boston' · 'Boston Apartment Moving Checklist'. Builds topical authority." />
          </div>

          <div className="mb-8">
            <p className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>50+ programmatic neighbourhood pages</p>
            <BuildItem task="Dynamic Next.js template — 50+ Boston neighbourhood slugs" notes="'Movers in Allston' · 'Same-day movers Beacon Hill' · 'Cheap movers South Boston' etc. Generated from a data file, not 50 individual files." />
            <BuildItem task="Each page: unique local copy, embedded quote form, JSON-LD schema, internal linking" notes="SEO compounding engine — starts ranking within weeks. Captures hyperlocal search intent." />
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>Google Business Profile</p>
            <BuildItem task="Complete and fully optimise GBP listing" notes="Primary category: Moving Company. All service areas listed. Business description, hours, phone, website URL wired." />
            <BuildItem task="Upload all job photos" notes="Crew, truck, moves in progress. Visual proof on Google Maps search results." />
            <BuildItem task="Services list, Q&A seed answers, review request template" notes="Pre-answers the top questions. Review template ready for Jermaine to send after every job." />
            <BuildItem task="GBP identity verification" notes="Finn sets everything up. Jermaine completes the identity verification steps (required by Google — business owner only)." />
          </div>
        </div>

        {/* Phase 2 */}
        <div className="mb-12">
          <div className="mb-2">
            <PhaseTag phase="Phase 2" label="Days 8–14 · Automation & Leak Sealing" />
          </div>
          <SectionHeading>Make sure nothing slips through</SectionHeading>
          <BuildItem task="Twilio SMS to Jermaine on every lead submission" notes="Instant alert the second someone submits the form. Jermaine can be on a job and still catch a hot lead." />
          <BuildItem task="Automated SMS to customer within 60 seconds of submission" notes="'Hey [name], got your move request — Jermaine will be in touch within the hour.' Eliminates dead silence after form submit." />
          <BuildItem task="24-hour follow-up SMS if customer hasn't responded" notes="Automatically recovers ghosted leads without Jermaine having to chase manually." />
          <BuildItem task="Honeypot + rate limiting on lead submission endpoint" notes="Prevents spam from degrading the lead sheet as traffic grows." />
          <BuildItem task="Status + lead source columns in Google Sheet" notes="New Lead · Contacted · Quoted · Booked · Completed. Plus source tracking: website, referral, Facebook etc." />
          <BuildItem task="Post-job review request SMS" notes="Fires automatically when Jermaine marks a job complete. Direct Google review link. Builds GBP reputation over time." />
        </div>

        {/* Phase 3 */}
        <div className="mb-12">
          <div className="mb-2">
            <PhaseTag phase="Phase 3" label="Concurrent · Social Presence" />
          </div>
          <SectionHeading>Get a real presence online</SectionHeading>
          <BuildItem task="NoTimeMover Facebook Business Page" notes="Separate from Jermaine's personal account. Professional, can run ads later, won't get his personal account flagged." />
          <BuildItem task="Instagram account setup + first 3–5 posts" notes="Jermaine already has video clips from the NJ job. Use them. Immediate social proof." />
          <BuildItem task="Brand assets package for Jermaine" notes="Logo, colour palette, and simple posting guidelines so he can create content himself." />
        </div>

        <Divider />

        {/* Section 4: Out of scope */}
        <div className="mb-12">
          <Kicker>04 — Out of Scope</Kicker>
          <SectionHeading>Not included in this agreement</SectionHeading>
          <p className="text-[15px] leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
            The following are not part of this scope. They will be assessed and quoted separately as the business grows.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'Meta and Google advertising campaigns',
              'AI phone receptionist',
              'Marketplace / mover-matching platform',
            ].map(item => (
              <div key={item} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <span className="text-[13px]" style={{ color: '#555' }}>—</span>
                <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.5)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* Section 5: Client responsibilities */}
        <div className="mb-12">
          <Kicker>05 — Client Responsibilities</Kicker>
          <SectionHeading>What Jermaine provides</SectionHeading>
          <p className="text-[14px] mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>Finn cannot start Phase 1 without the following. Jermaine agrees to provide these within 48 hours of signing.</p>
          <BuildItem task="Google account access or add Finn as GBP manager" notes="Required to complete and optimise the Google Business Profile." />
          <BuildItem task="Complete GBP identity verification" notes="Google requires the business owner to verify. Finn will provide step-by-step instructions." />
          <BuildItem task="Phone number for lead SMS alerts" notes="The number Twilio sends to when a form submission comes in." />
          <BuildItem task="All available job photos and videos" notes="NJ job clips, crew shots, truck photos. Used for website hero, GBP photos, and Instagram." />
          <BuildItem task="Service area confirmation" notes="Exact cities and regions to list on GBP and neighbourhood pages." />
          <BuildItem task="Decision on Facebook: keep personal or switch to business page" notes="Finn can create the NoTimeMover business page — just confirm the preference." />
          <BuildItem task="Equity milestone feedback" notes="Jermaine's preferred milestones for the 35→45% escalation. Separate document to be agreed within 7 days." />
          <BuildItem task="First $49/month retainer payment by June 18, 2026" notes="The monthly website retainer begins June 18, 2026. Covers the live site in full — all SEO, updates, and maintenance going forward." />
        </div>

        <Divider />

        {/* Section 6: Financial terms */}
        <div className="mb-12">
          <Kicker>06 — Financial Terms</Kicker>
          <SectionHeading>How costs work</SectionHeading>
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(107,58,31,0.3)' }}>
            <table className="w-full">
              <tbody>
                <Row label="All Phase 1–3 builds" value="Compensated by 35% equity. No additional cash payment from Jermaine for the digital build-out." />
                <Row label="$49/month retainer" value="Covers ongoing site maintenance, dependency upkeep, and minor tweaks. Separate from equity." />
                <Row label="Ad spend (when applicable)" value="Funded from NoTimeMover's organic revenue. Finn manages the campaigns; Jermaine funds them. Exact budget and cost-sharing to be agreed in writing before any paid campaign begins." />
                <Row label="Third-party APIs (Twilio, Google Maps, etc.)" value="API costs to be agreed per service before implementation. Billed to NoTimeMover's accounts where applicable." />
              </tbody>
            </table>
          </div>
        </div>

        <Divider />

        {/* Section 7: General */}
        <div className="mb-12">
          <Kicker>07 — General</Kicker>
          <SectionHeading>Governing terms</SectionHeading>
          <div className="space-y-4">
            {[
              ['Good faith', 'Both parties agree to act in good faith, communicate openly, and raise concerns directly before escalating.'],
              ['Changes to scope', 'Any work outside this scope requires written agreement from both parties before it begins.'],
              ['Intellectual property', 'Jermaine retains full ownership of the NoTimeMover brand and business. Finn may reference this engagement in professional portfolio materials.'],
              ['Confidentiality', 'Both parties agree to keep non-public business information confidential.'],
              ['Milestone document', 'The 35%→45% equity escalation terms will be documented in a separate agreement within 7 days of this agreement being signed.'],
              ['Entire agreement', 'This document, together with the forthcoming milestone agreement, constitutes the full agreement for the described scope.'],
            ].map(([title, body]) => (
              <div key={title as string} className="rounded-xl px-5 py-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-[13px] font-semibold text-white mb-1">{title}</p>
                <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* Signatures */}
        <div className="mb-12">
          <Kicker>08 — Signatures</Kicker>
          <SectionHeading>Execute this agreement</SectionHeading>

          {signed ? (
            <div className="rounded-[1.75rem] p-8 sm:p-10 text-center" style={{ background: 'linear-gradient(160deg, rgba(107,58,31,0.2) 0%, rgba(42,20,5,0.35) 100%)', border: '1px solid rgba(107,58,31,0.4)' }}>
              <div className="w-14 h-14 mx-auto mb-5 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #6B3A1F 0%, #4B2E1E 100%)', boxShadow: '0 0 40px -8px rgba(107,58,31,0.7)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <h3 className="text-[26px] font-semibold tracking-tight text-white mb-2">Agreement executed.</h3>
              <p className="text-[15px] leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Signed by {name} on {signedAt}.<br />Confirmation emails sent to both parties. Check your inbox.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 text-left">
                <div className="px-5 py-4 rounded-xl" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <p className="text-[10px] uppercase tracking-[0.2em] mb-2 font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>Signed — Jermaine Williams · Founder, NoTimeMover</p>
                  <p className="text-[20px]" style={{ fontFamily: 'cursive', color: '#fff' }}>{name}</p>
                  <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>{signedAt}</p>
                </div>
                <div className="px-5 py-4 rounded-xl" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <p className="text-[10px] uppercase tracking-[0.2em] mb-2 font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>Signed — Finn Schueler · Consultant & Co-Founder, Drivn.AI</p>
                  <p className="text-[20px]" style={{ fontFamily: 'cursive', color: '#fff' }}>Finn Schueler</p>
                  <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>{AGREEMENT_DATE}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Finn's pre-signature */}
              <div className="rounded-2xl p-6 sm:p-7" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-[10px] uppercase tracking-[0.22em] font-medium mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>Consultant & Co-Founder — Finn Schueler · Drivn.AI</p>
                <div className="flex items-end gap-6">
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-[0.18em] mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>Signature</p>
                    <p className="text-[30px] sm:text-[36px]" style={{ fontFamily: 'cursive', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '6px' }}>Finn Schueler</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>Date</p>
                    <p className="text-[14px] font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>{AGREEMENT_DATE}</p>
                  </div>
                </div>
              </div>

              {/* Jermaine's signature input */}
              <div className="rounded-2xl p-6 sm:p-7" style={{ background: 'rgba(107,58,31,0.08)', border: '1px solid rgba(107,58,31,0.35)' }}>
                <p className="text-[10px] uppercase tracking-[0.22em] font-medium mb-6" style={{ color: '#8B5230' }}>Founder — Jermaine Williams · NoTimeMover</p>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.22em] font-medium mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Full Legal Name</label>
                    <input
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Type your full name to sign"
                      className="w-full rounded-xl px-4 py-3 text-[15px] text-white placeholder-white/25 outline-none transition-colors duration-300"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', fontFamily: name ? 'cursive' : 'inherit', fontSize: name ? '22px' : '15px' }}
                    />
                    {name && <p className="text-[11px] mt-1.5" style={{ color: 'rgba(255,255,255,0.3)' }}>This will appear as your digital signature</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.22em] font-medium mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Email Address</label>
                    <input
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Your email for confirmation"
                      className="w-full rounded-xl px-4 py-3 text-[15px] text-white placeholder-white/25 outline-none transition-colors duration-300"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}
                    />
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer mb-6 select-none">
                  <div
                    onClick={() => setAgreed(v => !v)}
                    className="mt-0.5 w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center transition-colors duration-200 cursor-pointer"
                    style={{ background: agreed ? '#6B3A1F' : 'rgba(255,255,255,0.05)', border: `1px solid ${agreed ? '#8B5230' : 'rgba(255,255,255,0.2)'}` }}
                  >
                    {agreed && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                  </div>
                  <span className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    I have read and understood this agreement in full. By typing my name above and clicking the button below, I agree to be legally bound by its terms.
                  </span>
                </label>

                {error && (
                  <p className="text-[13px] mb-4 text-center leading-relaxed" style={{ color: '#f87171' }}>{error}</p>
                )}

                <button
                  type="button"
                  onClick={handleSign}
                  disabled={!canSign}
                  className="w-full flex items-center justify-between pl-6 pr-2 py-2 rounded-full font-medium transition-all duration-500 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ background: canSign ? '#fff' : 'rgba(255,255,255,0.15)', color: canSign ? '#050505' : 'rgba(255,255,255,0.3)' }}
                >
                  <span className="flex-1 text-center text-[15px] tracking-tight pl-9">
                    {submitting ? 'Signing…' : 'Sign & Execute Agreement'}
                  </span>
                  <span className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.1)', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.5)' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center pt-8 pb-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
            NoTimeMover · notimemover.com · Boston, MA · © {new Date().getFullYear()}
          </p>
        </div>

      </div>
    </div>
  )
}
