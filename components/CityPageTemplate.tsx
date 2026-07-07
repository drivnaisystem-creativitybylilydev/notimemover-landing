import Link from 'next/link'
import Footer from '@/components/Footer'
import FaqSection from '@/components/FaqSection'
import type { Location } from '@/lib/locations'

function cityFaqPool(loc: Location) {
  const { city, transit, housingStock, driveTime } = loc
  return [
    {
      q: `How much does it cost to move in ${city}?`,
      a: `For most ${city} moves — studios through 2-bedrooms — expect a range between $450 and $900 depending on home size and distance. You set a budget in the booking flow before we call, so there's no surprise number at the end. Enter your addresses to get a specific range for your move.`,
    },
    {
      q: `How far in advance should I book movers in ${city}?`,
      a: `For most ${city} moves, 2–3 days notice is enough. Same-day availability is possible if you contact us before noon. During peak season — especially around September 1st — booking 5–7 days ahead locks in your preferred date.`,
    },
    {
      q: `Do you cover all of ${city}?`,
      a: `Yes. We serve throughout ${city} and the surrounding neighborhoods. If you're unsure about a specific street or building, enter your address in the booking flow and we'll confirm coverage when we follow up.`,
    },
    {
      q: `Are you insured for moves in ${city}?`,
      a: `Yes — NoTimeMover is fully insured on every move, including all ${city} jobs. We carry general liability coverage and can provide a certificate of insurance for any building that requires one before move day.`,
    },
    {
      q: `How long does a ${city} move take?`,
      a: `Most ${city} studio and 1-bedroom moves take 2–4 hours. A 2-bedroom typically runs 4–6 hours. We give you a realistic time estimate when we follow up on your quote so you can plan the day.`,
    },
    {
      q: `Do you handle stairs and walk-ups in ${city}?`,
      a: `Yes, and we don't charge extra for them. Walk-ups are standard in ${city} — we price them the same as ground-floor apartments. The budget you set is the price you pay.`,
    },
    {
      q: `What's ${city} like to move in or out of?`,
      a: `${city} is mostly ${housingStock.charAt(0).toLowerCase() + housingStock.slice(1)}. It's ${driveTime.replace('~', 'about ').replace('downtown Boston', 'downtown')}, and the main transit link is ${transit.split(';')[0]}. Our crews know the parking, loading, and access patterns specific to the area.`,
    },
    {
      q: `Do you offer packing help for ${city} moves?`,
      a: `Yes. Let us know when you submit your quote if you want help packing — we'll factor it into your budget upfront rather than adding it as a surprise line item on move day.`,
    },
    {
      q: `What's the best day to move in ${city}?`,
      a: `Weekdays are typically easier to schedule and often faster, since weekends fill up fastest. Around September 1st, book as early as possible regardless of day — that's the single busiest week for moves in and around ${city}.`,
    },
    {
      q: `Is there a minimum move size for ${city}?`,
      a: `No. We handle everything from a single-room move to a full house in ${city} — the budget-first model works the same either way. Set your price range and we confirm what it covers.`,
    },
  ]
}

function hashSlug(slug: string) {
  let hash = 0
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0
  }
  return hash
}

function cityFaqs(loc: Location) {
  const pool = cityFaqPool(loc)
  const hash = hashSlug(loc.slug)
  // Rotate the pool by a slug-derived offset, then take 6 — gives every page
  // a different subset and order instead of the identical 6 questions.
  const offset = hash % pool.length
  const rotated = [...pool.slice(offset), ...pool.slice(0, offset)]
  return rotated.slice(0, 6)
}

const STEPS = [
  {
    num: '01',
    title: 'Pick your addresses',
    body: 'Enter your pickup and dropoff locations. We serve all of Greater Massachusetts.',
  },
  {
    num: '02',
    title: 'Choose your home size',
    body: 'Studio, 1-bed, 2-bed, or larger — select the option that fits your situation.',
  },
  {
    num: '03',
    title: 'Set your budget',
    body: 'Pick a price range you are comfortable with. We match you to a tier that fits.',
  },
  {
    num: '04',
    title: 'Get quoted instantly',
    body: 'Submit and we follow up fast to confirm timing — no waiting days for a callback.',
  },
]

const BENEFITS = [
  {
    title: 'You set the budget',
    body: 'Tell us what you can spend before we ever contact you. We work around it — no surprise quotes.',
  },
  {
    title: 'No hidden fees',
    body: 'What you see in the booking flow is what you pay. Every charge is spelled out before move day.',
  },
  {
    title: 'Book in 60 seconds',
    body: 'Two addresses, home size, budget — done. We follow up to lock in timing and specifics on a quick call.',
  },
]

export default function CityPageTemplate({ loc }: { loc: Location }) {
  const faqs = cityFaqs(loc)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-ink text-white">
        <nav
          className="w-full flex items-center justify-between px-5 sm:px-8 py-5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          <Link
            href="/"
            className="text-[15px] font-medium tracking-tight select-none"
          >
            <span className="text-white">NoTime</span>
            <span style={{ color: '#8B5230' }}>Mover</span>
          </Link>
          <Link
            href="/?book=1"
            className="inline-flex items-center rounded-full border border-white/[0.14] bg-white/[0.04] px-5 py-2.5 text-[13px] font-medium text-white/90 hover:bg-white/[0.08] hover:border-white/[0.22] transition-colors duration-300"
            style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.06)' }}
          >
            Get a Quote
          </Link>
        </nav>

        <section className="max-w-5xl mx-auto px-5 sm:px-8 pt-20 sm:pt-28 pb-20 sm:pb-24 text-center">
          <p
            className="text-[11px] sm:text-[12px] uppercase tracking-[0.24em] font-semibold mb-5"
            style={{ color: '#8B5230' }}
          >
            Movers in {loc.city}, MA
          </p>
          <h1 className="text-[clamp(36px,8vw,72px)] font-semibold tracking-tight text-white leading-[1.04] max-w-4xl mx-auto">
            Movers in {loc.city}, MA{' '}
            <span className="font-serif italic">on your terms.</span>
          </h1>
          <p className="mt-6 text-[15px] sm:text-[17px] text-white/50 leading-relaxed max-w-2xl mx-auto">
            {loc.description}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/?book=1"
              className="inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full bg-white text-ink font-medium transition-transform duration-500 active:scale-[0.97]"
            >
              <span className="text-[15px] tracking-tight">Set my price</span>
              <span
                className="w-10 h-10 rounded-full bg-ink/10 flex items-center justify-center"
                style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.5)' }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </section>

        <section
          className="border-t"
          style={{ borderColor: 'rgba(255,255,255,0.05)' }}
        >
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-5 rounded-[1.75rem] border border-white/[0.08] bg-white/[0.02] p-7 sm:p-9"
              style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)' }}
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] font-semibold mb-2" style={{ color: '#8B5230' }}>
                  Getting there
                </p>
                <p className="text-[14px] text-white/60 leading-relaxed">{loc.driveTime}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] font-semibold mb-2" style={{ color: '#8B5230' }}>
                  Transit access
                </p>
                <p className="text-[14px] text-white/60 leading-relaxed">{loc.transit}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] font-semibold mb-2" style={{ color: '#8B5230' }}>
                  Housing stock
                </p>
                <p className="text-[14px] text-white/60 leading-relaxed">{loc.housingStock}</p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="border-t"
          style={{ borderColor: 'rgba(255,255,255,0.05)' }}
        >
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
            <div className="text-center mb-14">
              <p
                className="text-[11px] sm:text-[12px] uppercase tracking-[0.24em] font-semibold mb-4"
                style={{ color: '#8B5230' }}
              >
                How it works
              </p>
              <h2 className="text-[32px] sm:text-[40px] font-semibold tracking-tight text-white leading-[1.1]">
                Four steps to a confirmed move.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {STEPS.map((step) => (
                <div
                  key={step.num}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
                  style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)' }}
                >
                  <div
                    className="text-[11px] uppercase tracking-[0.24em] font-semibold mb-4"
                    style={{ color: '#8B5230' }}
                  >
                    Step {step.num}
                  </div>
                  <h3 className="text-[15px] font-semibold tracking-tight text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-white/50 leading-relaxed">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="border-t"
          style={{ borderColor: 'rgba(255,255,255,0.05)' }}
        >
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
            <div
              className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.02] p-8 sm:p-10"
              style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)' }}
            >
              <p
                className="text-[10px] uppercase tracking-[0.24em] font-medium mb-3"
                style={{ color: '#8B5230' }}
              >
                {loc.areasLabel}
              </p>
              <h2 className="text-[28px] sm:text-[32px] font-semibold tracking-tight text-white mb-3">
                {loc.city} &amp; the surrounding area.
              </h2>
              <p className="text-[15px] text-white/50 leading-relaxed max-w-2xl mb-8">
                We move throughout {loc.city} and its neighboring towns. Below are
                the areas we cover most — if you don&rsquo;t see yours, enter your
                address in the flow and we&rsquo;ll confirm coverage.
              </p>
              <div className="flex flex-wrap gap-3">
                {loc.neighborhoods.map((hood) => (
                  <span
                    key={hood}
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-2 text-[13px] font-medium text-white/70"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: '#8B5230' }}
                      aria-hidden
                    />
                    {hood}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="border-t"
          style={{ borderColor: 'rgba(255,255,255,0.05)' }}
        >
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
            <div className="text-center mb-14">
              <p
                className="text-[11px] sm:text-[12px] uppercase tracking-[0.24em] font-semibold mb-4"
                style={{ color: '#8B5230' }}
              >
                Why NoTimeMover
              </p>
              <h2 className="text-[32px] sm:text-[40px] font-semibold tracking-tight text-white leading-[1.1]">
                Moving that respects your budget.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {BENEFITS.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-white/[0.08] p-7"
                  style={{
                    background:
                      'linear-gradient(165deg, rgba(107,58,31,0.14) 0%, rgba(42,20,5,0.30) 55%, rgba(5,5,5,0.55) 100%)',
                    boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.07)',
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center mb-5"
                    style={{ backgroundColor: 'rgba(139,82,48,0.18)', border: '1px solid rgba(139,82,48,0.30)' }}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: '#8B5230' }}
                    />
                  </div>
                  <h3 className="text-[15px] font-semibold tracking-tight text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-[13px] text-white/50 leading-relaxed">
                    {benefit.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FaqSection
          faqs={faqs}
          eyebrow={`${loc.city} moving FAQ`}
          heading="Questions about your move."
        />

        <section
          className="border-t"
          style={{ borderColor: 'rgba(255,255,255,0.05)' }}
        >
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
            <div
              className="rounded-[1.75rem] border border-white/[0.10] p-10 sm:p-14 text-center"
              style={{
                background:
                  'linear-gradient(145deg, rgba(107,58,31,0.22) 0%, rgba(42,20,5,0.35) 45%, rgba(5,5,5,0.60) 100%)',
              }}
            >
              <p
                className="text-[11px] uppercase tracking-[0.24em] font-semibold mb-5"
                style={{ color: '#8B5230' }}
              >
                {loc.city}, MA
              </p>
              <h2 className="text-[32px] sm:text-[42px] font-semibold tracking-tight text-white leading-[1.1] mb-4">
                Ready to move on your terms?
              </h2>
              <p className="text-[15px] text-white/50 max-w-lg mx-auto leading-relaxed mb-10">
                Tell us your budget in 60 seconds. No obligation until you confirm
                — we follow up to lock in the details.
              </p>
              <Link
                href="/?book=1"
                className="inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full bg-white text-ink font-medium transition-transform duration-500 active:scale-[0.97]"
              >
                <span className="text-[15px] tracking-tight">Get my instant quote</span>
                <span
                  className="w-10 h-10 rounded-full bg-ink/10 flex items-center justify-center"
                  style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.5)' }}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
