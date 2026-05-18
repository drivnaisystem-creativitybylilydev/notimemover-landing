import type { Metadata } from 'next'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Movers in Lowell, MA — NoTimeMover | You Set The Price',
  description:
    'Looking for movers in Lowell? NoTimeMover lets you set your own price. Enter your addresses, choose your home size, set your budget — get an instant quote in 60 seconds.',
}

const ACCENT = '#8B5230'

export default function MoversLowellMA() {
  return (
    <>
      <main className="min-h-screen bg-ink text-white">

        <nav className="max-w-5xl mx-auto px-5 sm:px-8 py-5 flex items-center justify-between">
          <span className="text-[15px] font-medium tracking-tight">
            <span className="text-white">NoTime</span>
            <span style={{ color: ACCENT }}>Mover</span>
          </span>
          <a
            href="/"
            className="rounded-full px-5 py-2 text-[13px] font-medium tracking-tight text-white"
            style={{ background: ACCENT }}
          >
            Get a Quote
          </a>
        </nav>

        <section className="max-w-5xl mx-auto px-5 sm:px-8 pt-16 pb-24 sm:pt-24 sm:pb-32">
          <p
            className="text-[11px] uppercase tracking-[0.24em] font-medium mb-5"
            style={{ color: ACCENT }}
          >
            Movers in Lowell, MA
          </p>
          <h1 className="text-[32px] sm:text-[56px] font-semibold tracking-tight leading-[1.1] max-w-3xl mb-6">
            Local movers in Lowell who work on your budget — not theirs.
          </h1>
          <p className="text-[15px] text-white/70 max-w-xl mb-10 leading-relaxed">
            NoTimeMover flips the script. You enter your addresses, pick your home size, and set your budget.
            We match you with a mover instantly — no phone calls, no haggling.
          </p>
          <a
            href="/"
            className="inline-block rounded-full px-7 py-3 text-[15px] font-semibold tracking-tight text-white"
            style={{ background: ACCENT }}
          >
            Set My Price Now
          </a>
        </section>

        <section className="max-w-5xl mx-auto px-5 sm:px-8 pb-24">
          <p
            className="text-[11px] uppercase tracking-[0.24em] font-medium mb-8"
            style={{ color: ACCENT }}
          >
            How It Works
          </p>
          <div className="grid sm:grid-cols-4 gap-6">
            {[
              { step: '01', label: 'Pick your addresses', body: 'Enter your pickup and drop-off locations anywhere in or around Lowell.' },
              { step: '02', label: 'Choose home size', body: 'Studio, 1-bed, 2-bed, or larger — select what fits.' },
              { step: '03', label: 'Set your budget', body: 'You decide what you want to pay. No surprise markups.' },
              { step: '04', label: 'Get quoted instantly', body: 'See your match and confirm in under 60 seconds.' },
            ].map(({ step, label, body }) => (
              <div
                key={step}
                className="rounded-2xl p-6"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <p
                  className="text-[11px] uppercase tracking-[0.24em] font-medium mb-3"
                  style={{ color: ACCENT }}
                >
                  {step}
                </p>
                <p className="text-[15px] font-semibold tracking-tight text-white mb-2">{label}</p>
                <p className="text-[13px] text-white/50 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-5 sm:px-8 pb-24">
          <p
            className="text-[11px] uppercase tracking-[0.24em] font-medium mb-6"
            style={{ color: ACCENT }}
          >
            Areas We Serve
          </p>
          <h2 className="text-[32px] font-semibold tracking-tight mb-8">
            Covering Lowell &amp; surrounding towns
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              'Centralville',
              'Belvidere',
              'Pawtucketville',
              'Back Central',
              'Chelmsford',
              'Dracut',
              'Tewksbury',
              'Billerica',
              'Wilmington',
              'Methuen',
            ].map((area) => (
              <span
                key={area}
                className="rounded-full px-4 py-2 text-[13px] font-medium text-white/70"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {area}
              </span>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-5 sm:px-8 pb-24">
          <p
            className="text-[11px] uppercase tracking-[0.24em] font-medium mb-8"
            style={{ color: ACCENT }}
          >
            Why NoTimeMover
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: 'You set the price',
                body: 'Name your budget upfront. No bait-and-switch estimates after the truck is loaded.',
              },
              {
                title: 'No hidden fees',
                body: 'Stair fees, fuel surcharges, assembly add-ons — none of that. What you see is what you pay.',
              },
              {
                title: 'Book in 60 seconds',
                body: 'Skip the phone tag. The entire booking flow is online and takes less than a minute.',
              },
            ].map(({ title, body }) => (
              <div
                key={title}
                className="rounded-2xl p-7"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div
                  className="w-8 h-8 rounded-full mb-5"
                  style={{ background: ACCENT, opacity: 0.9 }}
                />
                <p className="text-[15px] font-semibold tracking-tight text-white mb-2">{title}</p>
                <p className="text-[13px] text-white/50 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          className="w-full py-20 sm:py-28"
          style={{ background: 'rgba(255,255,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center">
            <h2 className="text-[32px] sm:text-[44px] font-semibold tracking-tight mb-5">
              Ready to move in Lowell?
            </h2>
            <p className="text-[15px] text-white/50 mb-10 max-w-md mx-auto leading-relaxed">
              Set your price, pick your date, and get matched with a local mover in under a minute.
            </p>
            <a
              href="/"
              className="inline-block rounded-full px-8 py-3.5 text-[15px] font-semibold tracking-tight text-white"
              style={{ background: ACCENT }}
            >
              Get an Instant Quote
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
