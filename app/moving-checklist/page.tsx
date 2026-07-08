import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { checklistPhases, checklistTitle, checklistSubtitle, checklistTotalItems } from '@/lib/checklist-data'

const PDF_PATH = '/notimemover-moving-checklist.pdf'

export const metadata: Metadata = {
  title: 'Free Homeowner\'s Moving Checklist — NoTimeMover',
  description: 'A free, no-signup moving checklist built for homeowners — 8 weeks out through move day and after. Read it here or download the PDF.',
  alternates: {
    canonical: '/moving-checklist',
  },
}

export default function MovingChecklistPage() {
  return (
    <div className="min-h-screen bg-ink text-white flex flex-col">
      <nav
        className="sticky top-0 z-50 border-b border-white/[0.06]"
        style={{ background: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)' }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-[13px] font-medium text-white/50 hover:text-white/90 transition-colors duration-300">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
          <Link href="/" className="text-[15px] font-semibold tracking-tight">
            <span className="text-white">NoTime</span>
            <span className="text-coffee-light">Mover</span>
          </Link>
          <Link
            href="/?book=1"
            className="text-[12px] font-semibold px-4 py-1.5 rounded-full text-white"
            style={{ background: 'rgba(107,58,31,0.55)', border: '1px solid rgba(107,58,31,0.5)' }}
          >
            Get a quote
          </Link>
        </div>
      </nav>

      <div className="flex-1 max-w-3xl mx-auto w-full px-6 sm:px-10 py-16 sm:py-24">
        <p className="text-[10px] uppercase tracking-[0.28em] text-coffee-light font-semibold mb-4">
          Free Download
        </p>
        <h1 className="text-[clamp(32px,5vw,52px)] font-semibold tracking-tight text-white leading-tight mb-5">
          {checklistTitle}
        </h1>
        <p className="text-[15px] sm:text-[16px] text-white/45 leading-relaxed max-w-xl mb-10">
          {checklistSubtitle} {checklistTotalItems} tasks across 7 phases, from 8 weeks out through the week after you move in.
        </p>

        <a
          href={PDF_PATH}
          download="NoTimeMover-Moving-Checklist.pdf"
          className="group inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full bg-white text-ink font-medium mb-16 active:scale-[0.97]"
          style={{ transition: 'transform 500ms cubic-bezier(0.32,0.72,0,1)' }}
        >
          <span className="text-[15px] tracking-tight">Download free PDF</span>
          <span
            className="w-11 h-11 rounded-full bg-ink/10 flex items-center justify-center group-hover:translate-y-[2px]"
            style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.5)', transition: 'transform 500ms cubic-bezier(0.32,0.72,0,1)' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v13m0 0 5-5m-5 5-5-5M5 21h14" />
            </svg>
          </span>
        </a>

        <p className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-semibold mb-8">
          Full checklist — read it here first
        </p>

        <div className="flex flex-col gap-10">
          {checklistPhases.map((phase) => (
            <div key={phase.phase}>
              <h2 className="text-[13px] uppercase tracking-[0.18em] font-semibold text-coffee-light mb-4 pb-3 border-b border-white/[0.08]">
                {phase.phase}
              </h2>
              <div className="flex flex-col gap-4">
                {phase.items.map((item) => (
                  <div key={item.task} className="flex gap-3">
                    <span
                      className="w-4 h-4 rounded shrink-0 mt-1 border"
                      style={{ borderColor: 'rgba(139,82,48,0.55)' }}
                      aria-hidden
                    />
                    <div>
                      <p className="text-[14px] sm:text-[15px] font-medium text-white/90 leading-snug">
                        {item.task}
                      </p>
                      {item.detail && (
                        <p className="text-[13px] text-white/40 leading-relaxed mt-0.5">
                          {item.detail}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-16 rounded-2xl border border-white/[0.08] p-8 sm:p-10 text-center"
          style={{ background: 'linear-gradient(145deg, rgba(107,58,31,0.2) 0%, rgba(42,20,5,0.36) 45%, rgba(5,5,5,0.58) 100%)' }}
        >
          <h2 className="text-[22px] sm:text-[26px] font-semibold tracking-tight text-white mb-3">
            Ready to book your move?
          </h2>
          <p className="text-[14px] text-white/50 max-w-md mx-auto leading-relaxed mb-8">
            Set your budget in 60 seconds — fully insured, same-day response, no surprise fees.
          </p>
          <Link
            href="/?book=1"
            className="group inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full bg-white text-ink font-medium active:scale-[0.97]"
            style={{ transition: 'transform 500ms cubic-bezier(0.32,0.72,0,1)' }}
          >
            <span className="text-[15px] tracking-tight">Get my instant quote</span>
            <span
              className="w-11 h-11 rounded-full bg-ink/10 flex items-center justify-center group-hover:translate-x-[2px] group-hover:-translate-y-[1px]"
              style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.5)', transition: 'transform 500ms cubic-bezier(0.32,0.72,0,1)' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
