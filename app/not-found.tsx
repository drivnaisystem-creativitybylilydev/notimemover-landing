import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-ink flex flex-col items-center justify-center px-6 text-center">
      <p className="text-[11px] uppercase tracking-[0.28em] text-white/30 font-medium mb-4">404</p>
      <h1 className="text-[40px] sm:text-[56px] font-semibold tracking-tight text-white leading-[1.05] mb-4">
        Wrong address.
      </h1>
      <p className="text-white/45 text-[16px] mb-10">That page doesn&rsquo;t exist — but we can move you to the right one.</p>
      <Link
        href="/"
        className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-white text-ink font-medium text-[15px] tracking-tight"
      >
        <span>Back home</span>
        <span className="w-10 h-10 rounded-full bg-ink/10 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </span>
      </Link>
    </main>
  )
}
