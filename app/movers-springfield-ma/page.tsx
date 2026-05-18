import type { Metadata } from 'next'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Movers in Springfield, MA — NoTimeMover | You Set The Price',
  description:
    'Looking for movers in Springfield? NoTimeMover lets you set your own price. Enter your addresses, choose your home size, set your budget — get an instant quote in 60 seconds.',
}

const BRAND = '#8B5230'

export default function MoversSpringfieldMA() {
  return (
    <div className="min-h-screen bg-ink text-white">
      <nav className="max-w-5xl mx-auto px-5 sm:px-8 py-5 flex items-center justify-between">
        <span className="text-[15px] font-medium tracking-tight">
          NoTime<span style={{ color: BRAND }}>Mover</span>
        </span>
        <a
          href="/"
          className="text-[13px] font-medium tracking-tight px-5 py-2.5 rounded-full text-white"
          style={{ backgroundColor: BRAND }}
        >
          Get a Quote
        </a>
      </nav>

      <section className="max-w-5xl mx-auto px-5 sm:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <p
          className="text-[11px] uppercase tracking-[0.24em] font-medium mb-5"
          style={{ color: BRAND }}
        >
          Springfield, MA
        </p>
        <h1 className="text-[32px] sm:text-[56px] font-semibold tracking-tight leading-[1.1] max-w-3xl mb-6">
          Movers in Springfield, MA — You Set The Price
        </h1>
        <p className="text-[15px] text-white/70 max-w-xl leading-relaxed mb-10">
          NoTimeMover gives Springfield residents a better way to book a move. Pick
          your addresses, choose your home size, and set the budget that works for
          you — get an instant quote in under 60 seconds. No surprises, no hidden
          fees.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 text-[13px] font-medium tracking-tight px-6 py-3 rounded-full text-white"
          style={{ backgroundColor: BRAND }}
        >
          Get an Instant Quote
        </a>
      </section>

      <section
        className="py-16 sm:py-20"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <p className="text-[11px] uppercase tracking-[0.24em] font-medium text-white/30 mb-3">
            How It Works
          </p>
          <h2 className="text-[32px] font-semibold tracking-tight mb-12">
            Quote in 60 seconds
          </h2>
          <ol className="grid sm:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Pick your addresses', body: 'Enter your pickup and drop-off locations. We handle routes across Springfield and Western MA.' },
              { step: '02', title: 'Choose your home size', body: 'Studio, one-bedroom, full house — tell us what you\'re moving so we can match you with the right crew.' },
              { step: '03', title: 'Set your budget', body: 'Name the price that works for you. We\'ll confirm instantly if we can make it happen.' },
            ].map(({ step, title, body }) => (
              <li key={step} className="flex flex-col gap-3">
                <span
                  className="text-[11px] uppercase tracking-[0.24em] font-medium"
                  style={{ color: BRAND }}
                >
                  {step}
                </span>
                <h3 className="text-[15px] font-semibold tracking-tight">{title}</h3>
                <p className="text-[13px] text-white/50 leading-relaxed">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <p className="text-[11px] uppercase tracking-[0.24em] font-medium text-white/30 mb-3">
            Coverage
          </p>
          <h2 className="text-[32px] font-semibold tracking-tight mb-8">
            Areas we serve
          </h2>
          <ul className="flex flex-wrap gap-2">
            {[
              'Forest Park',
              'East Springfield',
              'Sixteen Acres',
              'Longmeadow',
              'East Longmeadow',
              'Agawam',
              'Chicopee',
              'Holyoke',
              'Westfield',
              'West Springfield',
            ].map((area) => (
              <li
                key={area}
                className="text-[13px] font-medium tracking-tight px-4 py-2 rounded-full text-white/70"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              >
                {area}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="py-16 sm:py-20"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <p className="text-[11px] uppercase tracking-[0.24em] font-medium text-white/30 mb-3">
            Why NoTimeMover
          </p>
          <h2 className="text-[32px] font-semibold tracking-tight mb-12">
            Built differently
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                title: 'You set the price',
                body: 'Unlike traditional movers who quote you, you tell us what you can spend. We work with your budget — not against it.',
              },
              {
                title: 'No hidden fees',
                body: 'The price you set is the price you pay. No fuel surcharges, stair fees, or last-minute add-ons.',
              },
              {
                title: 'Book in 60 seconds',
                body: 'Our booking flow is four steps. No phone calls, no waiting for callbacks, no paperwork.',
              },
            ].map(({ title, body }) => (
              <div
                key={title}
                className="flex flex-col gap-3 p-6 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span
                  className="w-8 h-0.5 block rounded-full"
                  style={{ backgroundColor: BRAND }}
                />
                <h3 className="text-[15px] font-semibold tracking-tight">{title}</h3>
                <p className="text-[13px] text-white/50 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-20 sm:py-28"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-[32px] sm:text-[40px] font-semibold tracking-tight mb-4">
            Ready to move in Springfield?
          </h2>
          <p className="text-[15px] text-white/50 mb-8 max-w-md mx-auto leading-relaxed">
            Set your price, confirm your dates, and let NoTimeMover handle the rest.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-[13px] font-medium tracking-tight px-7 py-3.5 rounded-full text-white"
            style={{ backgroundColor: BRAND }}
          >
            Get a Quote Now
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
