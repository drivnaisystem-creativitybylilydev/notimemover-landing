import Link from 'next/link'
import Footer from '@/components/Footer'
import type { OosRoute } from '@/lib/oos-routes'

const STEPS = [
  {
    num: '01',
    title: 'Enter your addresses',
    body: 'Pickup in Boston, dropoff at your destination. We confirm coverage before anything moves forward.',
  },
  {
    num: '02',
    title: 'Choose your home size',
    body: 'Studio through large home — pick the option that fits. Larger moves get scoped on a quick call.',
  },
  {
    num: '03',
    title: 'Set your budget',
    body: 'Name a price range you are comfortable with. No back-and-forth. No counter-offer.',
  },
  {
    num: '04',
    title: 'We follow up and confirm',
    body: 'A real person reaches out to lock in timing, building access, and logistics specific to your route.',
  },
]

export default function OosPageTemplate({ route }: { route: OosRoute }) {
  return (
    <>
      <div className="min-h-screen bg-ink text-white">
        <nav
          className="w-full flex items-center justify-between px-5 sm:px-8 py-5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          <Link href="/" className="text-[15px] font-medium tracking-tight select-none">
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

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-5 sm:px-8 pt-20 sm:pt-28 pb-20 sm:pb-24 text-center">
          <p
            className="text-[11px] sm:text-[12px] uppercase tracking-[0.24em] font-semibold mb-5"
            style={{ color: '#8B5230' }}
          >
            Boston → {route.destination}, {route.destinationState}
          </p>
          <h1 className="text-[clamp(36px,8vw,72px)] font-semibold tracking-tight text-white leading-[1.04] max-w-4xl mx-auto">
            {route.headline}
          </h1>
          <p className="mt-6 text-[15px] sm:text-[17px] text-white/50 leading-relaxed max-w-2xl mx-auto">
            {route.description}
          </p>

          {/* Route stat strip */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            <div className="text-center">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/30 font-medium mb-1">Distance</p>
              <p className="text-[18px] font-semibold text-white">{route.distance}</p>
            </div>
            <div className="hidden sm:block h-8 w-px bg-white/10" />
            <div className="text-center">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/30 font-medium mb-1">Drive time</p>
              <p className="text-[18px] font-semibold text-white">{route.driveTime}</p>
            </div>
            <div className="hidden sm:block h-8 w-px bg-white/10" />
            <div className="text-center">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/30 font-medium mb-1">Coverage</p>
              <p className="text-[18px] font-semibold text-white">Fully insured</p>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center">
            <Link
              href="/?book=1"
              className="inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full bg-white text-ink font-medium transition-transform duration-500 active:scale-[0.97]"
            >
              <span className="text-[15px] tracking-tight">Set my price</span>
              <span
                className="w-10 h-10 rounded-full bg-ink/10 flex items-center justify-center"
                style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.5)' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>
        </section>

        {/* How it works */}
        <section className="border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
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
                  <h3 className="text-[15px] font-semibold tracking-tight text-white mb-2">{step.title}</h3>
                  <p className="text-[13px] text-white/50 leading-relaxed">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Route specifics */}
        <section className="border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
            <div
              className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.02] p-8 sm:p-10"
              style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)' }}
            >
              <p
                className="text-[10px] uppercase tracking-[0.24em] font-medium mb-3"
                style={{ color: '#8B5230' }}
              >
                What to know about this route
              </p>
              <h2 className="text-[28px] sm:text-[32px] font-semibold tracking-tight text-white mb-6">
                Boston to {route.destination} — the specifics.
              </h2>
              <div className="space-y-4 mb-8">
                {route.routeFacts.map((fact, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span
                      className="mt-[5px] h-1.5 w-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: '#8B5230' }}
                      aria-hidden
                    />
                    <p className="text-[14px] text-white/60 leading-relaxed">{fact}</p>
                  </div>
                ))}
              </div>
              <div>
                <p
                  className="text-[10px] uppercase tracking-[0.24em] font-medium mb-4"
                  style={{ color: '#8B5230' }}
                >
                  Popular destinations in {route.destination}
                </p>
                <div className="flex flex-wrap gap-3">
                  {route.popularAreas.map((area) => (
                    <span
                      key={area}
                      className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-2 text-[13px] font-medium text-white/70"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: '#8B5230' }}
                        aria-hidden
                      />
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust signals */}
        <section className="border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                {
                  title: 'Budget-first, no surprises.',
                  body: 'Tell us what you can spend before we ever contact you. No back-and-forth. The total you agree to is the total on your receipt.',
                },
                {
                  title: 'No fees added at the door.',
                  body: 'Long-distance moves are where hidden fees usually show up. Not here. What you set is what you pay — fuel, tolls, and labor included.',
                },
                {
                  title: 'Fully insured, every time.',
                  body: 'General liability coverage on every job. If your building requires a Certificate of Insurance, we have it ready before move day.',
                },
              ].map((card) => (
                <div
                  key={card.title}
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
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#8B5230' }} />
                  </div>
                  <h3 className="text-[15px] font-semibold tracking-tight text-white mb-2">{card.title}</h3>
                  <p className="text-[13px] text-white/50 leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
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
                Boston → {route.destination}
              </p>
              <h2 className="text-[32px] sm:text-[42px] font-semibold tracking-tight text-white leading-[1.1] mb-4">
                Ready to move?
              </h2>
              <p className="text-[15px] text-white/50 max-w-lg mx-auto leading-relaxed mb-10">
                Tell us your budget in 60 seconds. We follow up to confirm route details, timing, and building requirements.
              </p>
              <Link
                href="/?book=1"
                className="inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full bg-white text-ink font-medium transition-transform duration-500 active:scale-[0.97]"
              >
                <span className="text-[15px] tracking-tight">Get my long-distance quote</span>
                <span
                  className="w-10 h-10 rounded-full bg-ink/10 flex items-center justify-center"
                  style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.5)' }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
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
