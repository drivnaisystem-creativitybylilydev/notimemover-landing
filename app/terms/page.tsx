import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service — NoTimeMover',
  description: 'Terms and conditions for using NoTimeMover.',
  robots: { index: false },
}

export default function Terms() {
  return (
    <>
      <main className="min-h-screen bg-ink text-white">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 py-16 sm:py-24">

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-white/35 hover:text-white/60 transition-colors mb-12 font-medium"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
            Back
          </Link>

          <p className="text-[11px] uppercase tracking-[0.28em] text-white/30 font-medium mb-4">Legal</p>
          <h1 className="text-[36px] sm:text-[48px] font-semibold tracking-tight leading-[1.05] mb-4">Terms of Service</h1>
          <p className="text-white/40 text-[14px] mb-12">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <div className="space-y-10 text-[15px] leading-relaxed text-white/70">

            <section>
              <h2 className="text-[18px] font-semibold text-white mb-3 tracking-tight">Agreement</h2>
              <p>
                By using notimemover.com or submitting a quote request, you agree to these terms. If you do not agree, do not use this site. These terms apply to all visitors and customers of NoTimeMover, a Massachusetts-based moving service.
              </p>
            </section>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />

            <section>
              <h2 className="text-[18px] font-semibold text-white mb-3 tracking-tight">What this site does</h2>
              <p>
                This website allows you to submit a move request and receive an estimated price. Submitting a request is not a binding booking. It is an expression of interest. A confirmed booking only exists once NoTimeMover has contacted you directly, confirmed availability, agreed on a final price, and you have accepted those terms verbally or in writing.
              </p>
            </section>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />

            <section>
              <h2 className="text-[18px] font-semibold text-white mb-3 tracking-tight">Pricing</h2>
              <p>
                Prices shown during the quote process are estimates based on the information you provide, including route distance, home size, and your stated budget. They are not binding quotes.
              </p>
              <p className="mt-3">
                Final pricing is confirmed directly with you before move day. Factors that may affect the final price include access restrictions at your property, the actual volume of items, additional services requested on the day, and any changes to the route or move date.
              </p>
              <p className="mt-3">
                We will always confirm the final price with you before proceeding. You are never charged without explicit agreement.
              </p>
            </section>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />

            <section>
              <h2 className="text-[18px] font-semibold text-white mb-3 tracking-tight">Cancellations</h2>
              <p>
                Cancellation terms are confirmed at the time of booking. If you need to cancel or reschedule, contact us as early as possible at{' '}
                <a href="mailto:hello@notimemover.com" className="text-white underline underline-offset-2">hello@notimemover.com</a>.
                Cancellations made with less than 24 hours notice may be subject to a fee, which will be communicated to you at the time of booking.
              </p>
            </section>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />

            <section>
              <h2 className="text-[18px] font-semibold text-white mb-3 tracking-tight">Your responsibilities</h2>
              <p>You are responsible for:</p>
              <ul className="mt-3 space-y-2 list-none">
                {[
                  'Providing accurate pickup and dropoff addresses',
                  'Disclosing access restrictions such as narrow stairs, no elevator, or parking limitations',
                  'Ensuring items are ready to be moved at the agreed time',
                  'Being present or having an authorised person present at both locations',
                  'Disclosing any fragile, high-value, or oversized items before move day',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-[6px] w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#8B5230' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />

            <section>
              <h2 className="text-[18px] font-semibold text-white mb-3 tracking-tight">Liability</h2>
              <p>
                NoTimeMover carries liability insurance covering damage caused by our movers during a confirmed, paid move. Coverage limits and specific terms are provided at the time of booking.
              </p>
              <p className="mt-3">
                We are not liable for damage resulting from items that were improperly packed by the customer, pre-existing damage, or items the customer chose not to disclose as fragile or high-value.
              </p>
              <p className="mt-3">
                Our liability for any claim does not exceed the total amount paid for the move.
              </p>
            </section>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />

            <section>
              <h2 className="text-[18px] font-semibold text-white mb-3 tracking-tight">Service area</h2>
              <p>
                NoTimeMover currently serves moves within Massachusetts. We may decline requests outside our service area. If we cannot cover your route, we will let you know promptly after you submit your request.
              </p>
            </section>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />

            <section>
              <h2 className="text-[18px] font-semibold text-white mb-3 tracking-tight">No guarantee of availability</h2>
              <p>
                Submitting a request does not guarantee a mover is available on your requested date. Availability is confirmed when we contact you directly. We recommend submitting your request as early as possible.
              </p>
            </section>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />

            <section>
              <h2 className="text-[18px] font-semibold text-white mb-3 tracking-tight">Governing law</h2>
              <p>
                These terms are governed by the laws of the Commonwealth of Massachusetts. Any disputes arising from these terms or from services provided by NoTimeMover will be subject to the jurisdiction of the courts of Massachusetts.
              </p>
            </section>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />

            <section>
              <h2 className="text-[18px] font-semibold text-white mb-3 tracking-tight">Contact</h2>
              <p>
                Questions about these terms? Email us at{' '}
                <a href="mailto:hello@notimemover.com" className="text-white underline underline-offset-2">hello@notimemover.com</a>.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
