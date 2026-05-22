import Link from 'next/link'
import Image from 'next/image'

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

      {/* Powered by Drivn.ai */}
      <div className="mt-7 flex items-center justify-center gap-2.5">
        <span className="text-coffee-shimmer text-[10px] uppercase tracking-[0.22em] font-medium">Powered by</span>
        <Link
          href="https://drivn-ai-website.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-25 hover:opacity-45 transition-opacity duration-300"
        >
          <Image
            src="/brand/drivn-logo.png"
            alt="Drivn.ai"
            width={72}
            height={28}
            style={{
              filter: 'grayscale(1) sepia(1) saturate(1.4) brightness(1.15)',
              objectFit: 'contain',
            }}
          />
        </Link>
      </div>
    </footer>
  )
}
