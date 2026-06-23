'use client'

import { useState } from 'react'

interface FaqItem {
  q: string
  a: string
}

interface FaqSectionProps {
  faqs: FaqItem[]
  eyebrow?: string
  heading?: string
}

export default function FaqSection({
  faqs,
  eyebrow = 'FAQ',
  heading = 'Common questions.',
}: FaqSectionProps) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <div className="mb-12">
          <p
            className="text-[11px] sm:text-[12px] uppercase tracking-[0.24em] font-semibold mb-4"
            style={{ color: '#8B5230' }}
          >
            {eyebrow}
          </p>
          <h2 className="text-[32px] sm:text-[40px] font-semibold tracking-tight text-white leading-[1.1]">
            {heading}
          </h2>
        </div>

        <div>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border-t"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start justify-between gap-6 py-5 text-left"
                aria-expanded={open === i}
              >
                <span className="text-[15px] sm:text-[16px] font-medium text-white leading-snug">
                  {faq.q}
                </span>
                <span
                  className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 transition-colors duration-200"
                  style={{
                    backgroundColor: open === i ? 'rgba(139,82,48,0.2)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${open === i ? 'rgba(139,82,48,0.4)' : 'rgba(255,255,255,0.1)'}`,
                    color: open === i ? '#8B5230' : 'rgba(255,255,255,0.35)',
                  }}
                  aria-hidden
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    {open === i ? (
                      <path d="M2 5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    ) : (
                      <>
                        <path d="M5 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M2 5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </>
                    )}
                  </svg>
                </span>
              </button>

              {open === i && (
                <p className="pb-6 text-[14px] sm:text-[15px] text-white/50 leading-relaxed max-w-2xl">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
          <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }} />
        </div>
      </div>
    </section>
  )
}
