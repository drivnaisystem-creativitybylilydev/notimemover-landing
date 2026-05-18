import type { Metadata } from 'next'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Movers in Cambridge, MA — NoTimeMover | You Set The Price',
  description:
    'Looking for movers in Cambridge? NoTimeMover lets you set your own price. Enter your addresses, choose your home size, set your budget — get an instant quote in 60 seconds.',
}

const BRAND = '#8B5230'

export default function MoversCambridgeMA() {
  return (
    <div className="bg-ink text-white min-h-screen flex flex-col">
      <nav className="w-full flex items-center justify-between px-5 sm:px-10 py-5">
        <span className="text-[15px] font-medium tracking-tight">
          <span className="text-white">NoTime</span>
          <span style={{ color: BRAND }}>Mover</span>
        </span>
        <a
          href="/"
          className="rounded-full text-white text-[13px] font-medium tracking-tight px-5 py-2.5"
          style={{ backgroundColor: BRAND }}
        >
          Get a Quote
        </a>
      </nav>

      <main className="flex-1">
        <section className="max-w-4xl mx-auto px-5 sm:px-10 pt-20 pb-24 text-center">
          <p
            className="text-[11px] uppercase tracking-[0.24em] font-medium mb-6"
            style={{ color: BRAND }}
          >
            Cambridge, MA
          </p>
          <h1 className="text-[40px] sm:text-[56px] font-bold tracking-tight leading-[1.08] mb-6">
            Movers in Cambridge, MA<br />
            <span className="text-white/70">You Set The Price.</span>
          </h1>
          <p className="text-[15px] sm:text-[17px] text-white/50 max-w-xl mx-auto leading-relaxed mb-10">
            No haggling, no surprises. Tell us your move — pick your addresses,
            choose your home size, name your budget — and get an instant quote
            in 60 seconds.
          </p>
          <a
            href="/"
            className="inline-block rounded-full text-white text-[15px] font-semibold tracking-tight px-8 py-4"
            style={{ backgroundColor: BRAND }}
          >
            Book Your Cambridge Move
          </a>
        </section>

        <section
          className="border-t border-b py-20"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <div className="max-w-4xl mx-auto px-5 sm:px-10">
            <p
              className="text-[11px] uppercase tracking-[0.24em] font-medium text-center mb-3"
              style={{ color: BRAND }}
            >
              How It Works
            </p>
            <h2 className="text-[28px] sm:text-[32px] font-bold tracking-tight text-center mb-14">
              Move booked in 60 seconds
            </h2>
            <ol className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Pick your addresses',
                  body: 'Enter your pickup and drop-off locations. We serve Cambridge and all surrounding areas.',
                },
                {
                  step: '02',
                  title: 'Choose your home size',
                  body: 'Studio, 1-bed, 2-bed, or larger — select the option that fits your move.',
                },
                {
                  step: '03',
                  title: 'Set your budget',
                  body: 'Name the price you want to pay. Get an instant quote — no phone tag, no waiting.',
                },
              ].map(({ step, title, body }) => (
                <li
                  key={step}
                  className="rounded-2xl px-6 py-7 flex flex-col gap-3"
                  style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                >
                  <span
                    className="text-[11px] uppercase tracking-[0.24em] font-semibold"
                    style={{ color: BRAND }}
                  >
                    {step}
                  </span>
                  <span className="text-[17px] font-semibold tracking-tight">{title}</span>
                  <span className="text-[13px] text-white/50 leading-relaxed">{body}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-5 sm:px-10">
            <p
              className="text-[11px] uppercase tracking-[0.24em] font-medium text-center mb-3"
              style={{ color: BRAND }}
            >
              Service Area
            </p>
            <h2 className="text-[28px] sm:text-[32px] font-bold tracking-tight text-center mb-10">
              Areas we serve in &amp; around Cambridge
            </h2>
            <ul className="flex flex-wrap justify-center gap-3">
              {[
                'Harvard Square',
                'Central Square',
                'Kendall Square',
                'Inman Square',
                'Porter Square',
                'MIT Area',
                'Somerville',
                'Medford',
                'Arlington',
                'Watertown',
              ].map((area) => (
                <li
                  key={area}
                  className="rounded-full text-[13px] font-medium text-white/70 px-4 py-2"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="border-t py-20"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <div className="max-w-4xl mx-auto px-5 sm:px-10">
            <p
              className="text-[11px] uppercase tracking-[0.24em] font-medium text-center mb-3"
              style={{ color: BRAND }}
            >
              Why NoTimeMover
            </p>
            <h2 className="text-[28px] sm:text-[32px] font-bold tracking-tight text-center mb-14">
              Moving, on your terms
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                {
                  title: 'You set the price',
                  body: 'No inflated estimates. Enter what you can pay — our movers compete for your job.',
                },
                {
                  title: 'No hidden fees',
                  body: 'What you quote is what you pay. Stairs, distance, heavy items — all factored upfront.',
                },
                {
                  title: 'Book in 60 seconds',
                  body: 'No phone calls, no waiting for callbacks. Confirm your move instantly, right from your phone.',
                },
              ].map(({ title, body }) => (
                <div
                  key={title}
                  className="rounded-2xl px-6 py-7 flex flex-col gap-3"
                  style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                >
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold"
                    style={{ backgroundColor: BRAND }}
                  >
                    ✓
                  </span>
                  <span className="text-[17px] font-semibold tracking-tight">{title}</span>
                  <span className="text-[13px] text-white/50 leading-relaxed">{body}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="py-24 text-center"
          style={{ backgroundColor: 'rgba(139,82,48,0.10)' }}
        >
          <div className="max-w-2xl mx-auto px-5 sm:px-10">
            <h2 className="text-[28px] sm:text-[40px] font-bold tracking-tight mb-4">
              Ready to move in Cambridge?
            </h2>
            <p className="text-[15px] text-white/50 mb-10 leading-relaxed">
              Set your budget, get an instant quote. No phone calls, no guessing.
            </p>
            <a
              href="/"
              className="inline-block rounded-full text-white text-[15px] font-semibold tracking-tight px-8 py-4"
              style={{ backgroundColor: BRAND }}
            >
              Get an Instant Quote
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
