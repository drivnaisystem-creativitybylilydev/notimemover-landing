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
        <div className="text-[11px] uppercase tracking-[0.22em] text-white/30 text-center sm:text-right font-medium">
          Licensed &amp; Insured &nbsp;·&nbsp; &copy; {new Date().getFullYear()} NoTimeMover
        </div>
      </div>
    </footer>
  )
}
