import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/blog'

export default function Footer() {
  const posts = getAllPosts()

  return (
    <footer className="bg-ink border-t border-white/[0.05]">

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-14 sm:pt-18 pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-8">

          {/* Brand column */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="inline-flex items-center mb-4">
              <span className="text-[17px] font-semibold tracking-tight text-white">NoTime</span>
              <span className="text-[17px] font-semibold tracking-tight text-coffee-light">Mover</span>
            </Link>
            <p className="text-[13px] text-white/50 leading-relaxed max-w-[200px] mb-6">
              Fully insured Boston movers. Tell us your budget — we confirm same day.
            </p>
            <div className="flex flex-col gap-2.5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/50 font-semibold mb-1">Business</p>
                <p className="text-[13px] text-white/50 font-medium">NoTimeMover</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/50 font-semibold mb-1">Service Area</p>
                <p className="text-[13px] text-white/50">Greater Boston, MA</p>
              </div>
              <a href="tel:+12039194098" className="text-[13px] text-white/50 hover:text-white/70 transition-colors duration-200 font-medium">
                (203) 919-4098
              </a>
              <a href="mailto:contact@notimemover.com" className="text-[12px] text-white/50 hover:text-white/70 transition-colors duration-200">
                contact@notimemover.com
              </a>
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/50 font-semibold mb-4">Navigation</p>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'How it works', href: '/#how-it-works' },
                { label: 'Service areas', href: '/#areas' },
                { label: 'FAQ', href: '/#faq' },
                { label: 'Blog', href: '/blog' },
                { label: 'Contact', href: '/contact' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-[13px] text-white/50 hover:text-white/80 transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services column */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/50 font-semibold mb-4">Services</p>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'Local moving', href: '/local-moving' },
                { label: 'Long-distance moving', href: '/long-distance-moving' },
                { label: 'Same-day moving', href: '/same-day-moving' },
                { label: 'Boston → New York', href: '/boston-to-new-york-movers' },
                { label: 'Boston → New Jersey', href: '/boston-to-new-jersey-movers' },
                { label: 'Boston → Connecticut', href: '/boston-to-connecticut-movers' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-[13px] text-white/50 hover:text-white/80 transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog column */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/50 font-semibold mb-4">Blog</p>
            <ul className="flex flex-col gap-2.5">
              {posts.slice(0, 4).map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-[13px] text-white/50 hover:text-white/80 transition-colors duration-200 leading-snug block"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
              <li className="pt-0.5">
                <Link href="/blog" className="text-[12px] text-coffee-shimmer/60 hover:text-coffee-shimmer transition-colors duration-200">
                  View all guides →
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/50 uppercase tracking-[0.18em] font-medium">
            © {new Date().getFullYear()} NoTimeMover &nbsp;·&nbsp; Fully Insured &nbsp;·&nbsp; Boston, MA
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-[11px] uppercase tracking-[0.18em] text-white/50 hover:text-white/70 transition-colors font-medium">Privacy</Link>
            <Link href="/terms" className="text-[11px] uppercase tracking-[0.18em] text-white/50 hover:text-white/70 transition-colors font-medium">Terms</Link>
            <Link href="/contact" className="text-[11px] uppercase tracking-[0.18em] text-white/50 hover:text-white/70 transition-colors font-medium">Contact</Link>
          </div>
        </div>
      </div>

      {/* Powered by Drivn.ai */}
      <div className="pb-6 flex items-center justify-center gap-2.5">
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
            style={{ filter: 'grayscale(1) sepia(1) saturate(1.4) brightness(1.15)', objectFit: 'contain' }}
          />
        </Link>
      </div>

    </footer>
  )
}
