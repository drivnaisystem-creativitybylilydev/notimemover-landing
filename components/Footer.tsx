export default function Footer() {
  return (
    <footer className="bg-ink border-t border-line/40 py-8 sm:py-10">
      <div className="max-w-5xl mx-auto px-5 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-white font-extrabold tracking-tight text-sm sm:text-base">
          <span className="text-white">NoTime</span>
          <span className="text-coffee-light">Mover</span>
        </div>
        <div className="text-xs text-white/35 text-center sm:text-right">
          Licensed &amp; insured &nbsp;·&nbsp; &copy; {new Date().getFullYear()} NoTimeMover
        </div>
      </div>
    </footer>
  )
}
