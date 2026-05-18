import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — NoTimeMover',
  description: 'How NoTimeMover collects, uses, and protects your personal information.',
  robots: { index: false },
}

export default function PrivacyPolicy() {
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
          <h1 className="text-[36px] sm:text-[48px] font-semibold tracking-tight leading-[1.05] mb-4">Privacy Policy</h1>
          <p className="text-white/40 text-[14px] mb-12">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <div className="space-y-10 text-[15px] leading-relaxed text-white/70">

            <section>
              <h2 className="text-[18px] font-semibold text-white mb-3 tracking-tight">Who we are</h2>
              <p>
                NoTimeMover is a Massachusetts-based moving service. This policy explains what personal information we collect when you use notimemover.com, how we use it, and your rights over it.
              </p>
              <p className="mt-3">
                For privacy questions, contact us at{' '}
                <a href="mailto:hello@notimemover.com" className="text-white underline underline-offset-2">hello@notimemover.com</a>.
              </p>
            </section>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />

            <section>
              <h2 className="text-[18px] font-semibold text-white mb-3 tracking-tight">What we collect</h2>
              <p>When you submit a quote request through our booking form, we collect:</p>
              <ul className="mt-3 space-y-2 list-none">
                {[
                  'Full name',
                  'Email address',
                  'Phone number',
                  'Pickup and dropoff addresses',
                  'Home size (studio, 2 bedroom, 3 bedroom)',
                  'Your stated budget and selected price tier',
                  'Estimated route distance',
                  'Date and time of submission',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-[6px] w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#8B5230' }} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                We do not collect payment information. No credit card or bank details pass through this website.
              </p>
            </section>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />

            <section>
              <h2 className="text-[18px] font-semibold text-white mb-3 tracking-tight">How we use it</h2>
              <p>We use your information solely to:</p>
              <ul className="mt-3 space-y-2 list-none">
                {[
                  'Contact you to confirm your move request',
                  'Provide a final price and confirm availability',
                  'Coordinate logistics before and on move day',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-[6px] w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#8B5230' }} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                We do not sell your data. We do not use it for advertising. We do not add you to mailing lists without your consent.
              </p>
            </section>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />

            <section>
              <h2 className="text-[18px] font-semibold text-white mb-3 tracking-tight">Where it's stored</h2>
              <p>
                Submitted requests are stored in a private Google Sheets document accessible only to NoTimeMover staff. Google's infrastructure is used solely as an internal record-keeping tool. No data is shared with Google for advertising or profiling purposes.
              </p>
            </section>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />

            <section>
              <h2 className="text-[18px] font-semibold text-white mb-3 tracking-tight">Third-party services</h2>
              <p>This site uses the following third-party services:</p>
              <ul className="mt-3 space-y-4 list-none">
                <li className="flex items-start gap-3">
                  <span className="mt-[6px] w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#8B5230' }} />
                  <span><span className="text-white font-medium">Mapbox</span> — powers address autocomplete when you type your pickup and dropoff locations. Your partial address queries are sent to Mapbox servers. Mapbox's privacy policy applies: mapbox.com/legal/privacy.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[6px] w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#8B5230' }} />
                  <span><span className="text-white font-medium">Vercel</span> — hosts this website. Vercel processes standard web traffic data (IP address, browser type, pages visited) as part of normal hosting operations. Vercel's privacy policy applies: vercel.com/legal/privacy-policy.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[6px] w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#8B5230' }} />
                  <span><span className="text-white font-medium">OSRM / Photon</span> — used server-side to estimate driving distance between your addresses. No personally identifiable data is retained by these services.</span>
                </li>
              </ul>
            </section>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />

            <section>
              <h2 className="text-[18px] font-semibold text-white mb-3 tracking-tight">Cookies</h2>
              <p>
                This site does not use tracking cookies or advertising cookies. Standard session and performance cookies may be set by Vercel's hosting infrastructure. We do not use Google Analytics, Meta Pixel, or any other behavioral tracking tools.
              </p>
            </section>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />

            <section>
              <h2 className="text-[18px] font-semibold text-white mb-3 tracking-tight">Your rights</h2>
              <p>You can request at any time:</p>
              <ul className="mt-3 space-y-2 list-none">
                {[
                  'A copy of the data we hold about you',
                  'Correction of any inaccurate data',
                  'Deletion of your data from our records',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-[6px] w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#8B5230' }} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                Email{' '}
                <a href="mailto:hello@notimemover.com" className="text-white underline underline-offset-2">hello@notimemover.com</a>{' '}
                with your request. We will respond within 30 days.
              </p>
            </section>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />

            <section>
              <h2 className="text-[18px] font-semibold text-white mb-3 tracking-tight">Children</h2>
              <p>
                This site is not directed at children under 13. We do not knowingly collect data from anyone under 13. If you believe a child has submitted information through this site, contact us and we will delete it promptly.
              </p>
            </section>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />

            <section>
              <h2 className="text-[18px] font-semibold text-white mb-3 tracking-tight">Changes to this policy</h2>
              <p>
                If we make material changes to this policy, we will update the date at the top of this page. Continued use of the site after changes are posted constitutes acceptance of the updated policy.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
