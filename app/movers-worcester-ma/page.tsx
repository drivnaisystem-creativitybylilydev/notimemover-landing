import type { Metadata } from 'next'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Movers in Worcester, MA — NoTimeMover | You Set The Price',
  description:
    'Looking for movers in Worcester? NoTimeMover lets you set your own price. Enter your addresses, choose your home size, set your budget — get an instant quote in 60 seconds.',
}

const BROWN = '#8B5230'

const neighborhoods = [
  'Main South',
  'Clark University Area',
  'Shrewsbury',
  'Auburn',
  'Grafton',
  'Northborough',
  'Westborough',
  'Millbury',
  'Leicester',
  'Holden',
]

const steps = [
  { num: '01', label: 'Pick your addresses', body: 'Enter your pickup and drop-off locations. We serve Worcester and all surrounding towns.' },
  { num: '02', label: 'Choose your home size', body: 'Studio, 1-bed, 2-bed, 3-bed, or larger — select what fits your move.' },
  { num: '03', label: 'Set your budget', body: 'You name the number. No opaque pricing, no bait-and-switch. Your offer, your move.' },
  { num: '04', label: 'Get quoted instantly', body: 'Submit and receive a confirmed quote in seconds. Book your Worcester move on the spot.' },
]

const benefits = [
  { heading: 'You set the price', body: 'Name what you want to pay. We match you with movers who accept it — no haggling required.' },
  { heading: 'No hidden fees', body: 'The number you enter is the number you pay. Fuel surcharges and mystery charges are not our style.' },
  { heading: 'Book in 60 seconds', body: 'Addresses, size, budget — three fields. Instant confirmation. No phone tag, no waiting.' },
]

export default function WorcesterPage() {
  return (
    <>
      <main className="min-h-screen bg-ink text-white">

        <nav
          className="w-full flex items-center justify-between px-5 sm:px-10 py-5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          <span className="text-[15px] font-semibold tracking-tight">
            NoTime<span style={{ color: BROWN }}>Mover</span>
          </span>
          <a
            href="/"
            className="text-[13px] font-medium tracking-tight px-5 py-2 rounded-full text-white"
            style={{ background: BROWN }}
          >
            Get a Quote
          </a>
        </nav>

        <section className="max-w-4xl mx-auto px-5 sm:px-10 pt-20 pb-24 text-center">
          <p
            className="text-[11px] uppercase tracking-[0.24em] font-medium mb-6"
            style={{ color: BROWN }}
          >
            Worcester, MA
          </p>
          <h1 className="text-[38px] sm:text-[56px] font-semibold tracking-tight leading-[1.08] mb-6">
            Movers in Worcester, MA<br />
            <span style={{ color: BROWN }}>You Set The Price.</span>
          </h1>
          <p className="text-[15px] sm:text-[17px] text-white/70 max-w-xl mx-auto leading-relaxed mb-10">
            NoTimeMover gives Worcester residents full control of their moving budget.
            Enter your pickup and drop-off, pick your home size, name your price — and get
            an instant quote in under a minute.
          </p>
          <a
            href="/"
            className="inline-block text-[14px] font-semibold tracking-tight px-8 py-3.5 rounded-full text-white"
            style={{ background: BROWN }}
          >
            Start Your Free Quote →
          </a>
        </section>

        <section className="max-w-4xl mx-auto px-5 sm:px-10 pb-24">
          <p
            className="text-[11px] uppercase tracking-[0.24em] font-medium mb-3 text-center"
            style={{ color: BROWN }}
          >
            How It Works
          </p>
          <h2 className="text-[28px] sm:text-[32px] font-semibold tracking-tight text-center mb-12">
            Four steps to your Worcester move
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {steps.map((step) => (
              <div
                key={step.num}
                className="rounded-2xl px-7 py-7"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <p
                  className="text-[11px] uppercase tracking-[0.24em] font-medium mb-3"
                  style={{ color: BROWN }}
                >
                  Step {step.num}
                </p>
                <h3 className="text-[17px] font-semibold tracking-tight mb-2">{step.label}</h3>
                <p className="text-[13px] text-white/50 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          className="max-w-4xl mx-auto px-5 sm:px-10 pb-24"
        >
          <p
            className="text-[11px] uppercase tracking-[0.24em] font-medium mb-3 text-center"
            style={{ color: BROWN }}
          >
            Coverage
          </p>
          <h2 className="text-[28px] sm:text-[32px] font-semibold tracking-tight text-center mb-10">
            Areas we serve around Worcester
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {neighborhoods.map((name) => (
              <span
                key={name}
                className="text-[13px] font-medium text-white/70 px-4 py-2 rounded-full"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {name}
              </span>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-5 sm:px-10 pb-28">
          <p
            className="text-[11px] uppercase tracking-[0.24em] font-medium mb-3 text-center"
            style={{ color: BROWN }}
          >
            Why NoTimeMover
          </p>
          <h2 className="text-[28px] sm:text-[32px] font-semibold tracking-tight text-center mb-12">
            Moving in Worcester, on your terms
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {benefits.map((b) => (
              <div
                key={b.heading}
                className="rounded-2xl px-6 py-7 text-center"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div
                  className="w-9 h-9 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ background: `${BROWN}22` }}
                >
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: BROWN }} />
                </div>
                <h3 className="text-[15px] font-semibold tracking-tight mb-2">{b.heading}</h3>
                <p className="text-[13px] text-white/50 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          className="w-full py-20 text-center px-5"
          style={{ background: 'rgba(139,82,48,0.08)', borderTop: '1px solid rgba(139,82,48,0.15)', borderBottom: '1px solid rgba(139,82,48,0.15)' }}
        >
          <p
            className="text-[11px] uppercase tracking-[0.24em] font-medium mb-4"
            style={{ color: BROWN }}
          >
            Ready to move?
          </p>
          <h2 className="text-[32px] sm:text-[42px] font-semibold tracking-tight mb-5">
            Get your Worcester moving quote<br className="hidden sm:block" /> in 60 seconds.
          </h2>
          <p className="text-[15px] text-white/50 max-w-md mx-auto mb-9 leading-relaxed">
            No phone call. No waiting. Just your address, your home size, and the price you want to pay.
          </p>
          <a
            href="/"
            className="inline-block text-[14px] font-semibold tracking-tight px-9 py-4 rounded-full text-white"
            style={{ background: BROWN }}
          >
            Book My Worcester Move →
          </a>
        </section>

      </main>
      <Footer />
    </>
  )
}
