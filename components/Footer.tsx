import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      className="relative bg-ink py-9 sm:py-12"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="text-[15px] font-medium tracking-tight">
          <span className="text-white">NoTime</span>
          <span className="text-coffee-light">Mover</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-[11px] uppercase tracking-[0.22em] text-white/30 hover:text-white/60 transition-colors font-medium">Privacy</Link>
            <span className="text-white/15">·</span>
            <Link href="/terms" className="text-[11px] uppercase tracking-[0.22em] text-white/30 hover:text-white/60 transition-colors font-medium">Terms</Link>
          </div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/30 text-center sm:text-right font-medium">
            Licensed &amp; Insured &nbsp;·&nbsp; &copy; {new Date().getFullYear()} NoTimeMover
          </div>
        </div>
      </div>
    </footer>
  )
}
