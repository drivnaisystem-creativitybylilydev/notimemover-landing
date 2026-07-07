import Link from 'next/link'
import Footer from '@/components/Footer'
import FaqSection from '@/components/FaqSection'
import type { Service } from '@/lib/services'
import { TIERS } from '@/lib/pricing'
import { getLocation } from '@/lib/locations'
import { getOosRoute } from '@/lib/oos-routes'

export default function ServicePageTemplate({ service }: { service: Service }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://notimemover.com' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://notimemover.com/#areas' },
      { '@type': 'ListItem', position: 3, name: service.name, item: `https://notimemover.com/${service.slug}` },
    ],
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    name: service.name,
    description: service.description,
    url: `https://notimemover.com/${service.slug}`,
    provider: {
      '@type': 'MovingCompany',
      name: 'NoTimeMover',
      url: 'https://notimemover.com',
      telephone: '+12039194098',
    },
    areaServed: {
      '@type': 'State',
      name: 'Massachusetts',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: TIERS.studio.budgetMin,
        priceCurrency: 'USD',
      },
    },
  }

  const relatedLocations = service.relatedLocationSlugs.map((slug) => getLocation(slug)).filter(Boolean)
  const relatedOos = service.relatedOosSlugs.map((slug) => getOosRoute(slug)).filter(Boolean)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
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

        <section className="max-w-5xl mx-auto px-5 sm:px-8 pt-20 sm:pt-28 pb-20 sm:pb-24 text-center">
          <p
            className="text-[11px] sm:text-[12px] uppercase tracking-[0.24em] font-semibold mb-5"
            style={{ color: '#8B5230' }}
          >
            {service.eyebrow}
          </p>
          <h1 className="text-[clamp(36px,8vw,72px)] font-semibold tracking-tight text-white leading-[1.04] max-w-4xl mx-auto">
            {service.headline}
          </h1>
          <p className="mt-6 text-[15px] sm:text-[17px] text-white/50 leading-relaxed max-w-2xl mx-auto">
            {service.description}
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
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>
        </section>

        {/* Who it's for */}
        <section>
          <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-10 sm:pb-14">
            <div className="text-center mb-14">
              <p
                className="text-[11px] sm:text-[12px] uppercase tracking-[0.24em] font-semibold mb-4"
                style={{ color: '#8B5230' }}
              >
                Who this is for
              </p>
              <h2 className="text-[32px] sm:text-[40px] font-semibold tracking-tight text-white leading-[1.1]">
                Built around your situation.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {service.whoItsFor.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
                  style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)' }}
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: '#8B5230' }}
                    aria-hidden
                  />
                  <p className="text-[14px] text-white/70 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Real pricing snapshot */}
        <section>
          <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-10 sm:pb-14">
            <div className="text-center mb-14">
              <p
                className="text-[11px] sm:text-[12px] uppercase tracking-[0.24em] font-semibold mb-4"
                style={{ color: '#8B5230' }}
              >
                What it costs
              </p>
              <h2 className="text-[32px] sm:text-[40px] font-semibold tracking-tight text-white leading-[1.1]">
                Your budget, compared.
              </h2>
              <p className="mt-4 text-[14px] text-white/45 max-w-xl mx-auto leading-relaxed">
                Typical starting budgets by home size, next to what the two largest Boston movers publicly quote for the same size move.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full max-w-3xl mx-auto text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.1]">
                    <th className="py-3 px-4 text-[11px] uppercase tracking-[0.18em] text-white/40 font-semibold">Home size</th>
                    <th className="py-3 px-4 text-[11px] uppercase tracking-[0.18em] font-semibold" style={{ color: '#8B5230' }}>NoTimeMover</th>
                    {TIERS.studio.competitors.map((c) => (
                      <th key={c.name} className="py-3 px-4 text-[11px] uppercase tracking-[0.18em] text-white/40 font-semibold">{c.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.values(TIERS).map((tier) => (
                    <tr key={tier.key} className="border-b border-white/[0.05]">
                      <td className="py-4 px-4 text-[14px] text-white/70">{tier.label}</td>
                      <td className="py-4 px-4 text-[14px] font-semibold text-white">
                        from ${tier.budgetMin.toLocaleString('en-US')}
                      </td>
                      {tier.competitors.map((c) => (
                        <td key={c.name} className="py-4 px-4 text-[14px] text-white/50">
                          ~${c.price.toLocaleString('en-US')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-6 text-[12px] text-white/30 text-center max-w-2xl mx-auto leading-relaxed">
                NoTimeMover figures are starting budgets in our booking flow — you can set a higher budget for more room, and we confirm exactly what it covers before anything is booked. Competitor figures are approximate, based on publicly available local-move estimates for comparable home sizes.
              </p>
            </div>
          </div>
        </section>

        <FaqSection faqs={service.faqs} eyebrow={`${service.name} FAQ`} heading="Questions about this service." />

        {/* Related pages */}
        {(relatedLocations.length > 0 || relatedOos.length > 0) && (
          <section>
            <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-10 sm:pb-14">
              <div
                className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.02] p-8 sm:p-10"
                style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)' }}
              >
                <p className="text-[10px] uppercase tracking-[0.24em] font-medium mb-3" style={{ color: '#8B5230' }}>
                  Where we do this
                </p>
                <h2 className="text-[28px] sm:text-[32px] font-semibold tracking-tight text-white mb-6">
                  Coverage areas for {service.name.toLowerCase()}.
                </h2>
                <div className="flex flex-wrap gap-3">
                  {relatedLocations.map((loc) => (
                    <Link
                      key={loc!.slug}
                      href={`/${loc!.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-2 text-[13px] font-medium text-white/70 hover:text-white hover:border-white/[0.2] hover:bg-white/[0.06] transition-colors duration-200"
                    >
                      Movers in {loc!.city}, MA
                    </Link>
                  ))}
                  {relatedOos.map((route) => (
                    <Link
                      key={route!.slug}
                      href={`/${route!.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-2 text-[13px] font-medium text-white/70 hover:text-white hover:border-white/[0.2] hover:bg-white/[0.06] transition-colors duration-200"
                    >
                      Boston → {route!.destination}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <section>
          <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-16 sm:pb-24">
            <div
              className="rounded-[1.75rem] border border-white/[0.10] p-10 sm:p-14 text-center"
              style={{ background: 'linear-gradient(145deg, rgba(107,58,31,0.22) 0%, rgba(42,20,5,0.35) 45%, rgba(5,5,5,0.60) 100%)' }}
            >
              <p className="text-[11px] uppercase tracking-[0.24em] font-semibold mb-5" style={{ color: '#8B5230' }}>
                {service.name}
              </p>
              <h2 className="text-[32px] sm:text-[42px] font-semibold tracking-tight text-white leading-[1.1] mb-4">
                Ready to move on your terms?
              </h2>
              <p className="text-[15px] text-white/50 max-w-lg mx-auto leading-relaxed mb-10">
                Tell us your budget in 60 seconds. No obligation until you confirm — we follow up to lock in the details.
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
