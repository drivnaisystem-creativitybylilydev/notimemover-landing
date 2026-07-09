'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import type { BlogPost } from '@/lib/blog'

const EASE_OUT = [0.25, 0.1, 0.25, 1] as const

function Reveal({
  children,
  delay = 0,
  from = 'bottom',
  className,
}: {
  children: React.ReactNode
  delay?: number
  from?: 'bottom' | 'left'
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, amount: 0.1 })
  const hidden = {
    opacity: 0,
    y: from === 'bottom' ? 32 : 0,
    x: from === 'left' ? -40 : 0,
  }
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ willChange: 'transform, opacity' }}
      initial={hidden}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : hidden}
      transition={{ duration: 0.65, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  )
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function BookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

type PostSummary = Omit<BlogPost, 'content'>

export default function BlogTeaserSection({ posts }: { posts: PostSummary[] }) {
  if (posts.length === 0) return null

  return (
    <section className="w-full border-t border-white/[0.05] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16">
          <Reveal from="left">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="text-coffee-light opacity-70">
                <BookIcon />
              </span>
              <p className="text-[10px] uppercase tracking-[0.28em] text-coffee-light font-semibold">
                From the blog
              </p>
            </div>
            <h2 className="text-[clamp(26px,4.5vw,42px)] font-semibold tracking-tight text-white leading-tight">
              Know before you move.{' '}
              <span className="font-serif italic text-coffee-shimmer">
                No surprises.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="shrink-0">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-[13px] font-medium text-white/40 hover:text-white/80 transition-colors duration-300"
            >
              All guides
              <span className="group-hover:translate-x-0.5 transition-transform duration-300">
                <ArrowIcon />
              </span>
            </Link>
          </Reveal>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {posts.map((post, i) => (
            <Reveal key={post.slug} from="bottom" delay={i * 0.08}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <article
                  className="relative h-full flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.025] p-7 overflow-hidden transition-all duration-400 group-hover:border-white/[0.13] group-hover:bg-white/[0.04]"
                  style={{ transition: 'background 400ms ease, border-color 400ms ease' }}
                >
                  {/* Subtle inner glow on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(107,58,31,0.12) 0%, transparent 70%)',
                    }}
                    aria-hidden
                  />

                  {/* Category + read time */}
                  <div className="flex items-center gap-2.5 mb-5">
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.18em]"
                      style={{
                        background: 'rgba(107,58,31,0.25)',
                        color: '#C07040',
                        border: '1px solid rgba(107,58,31,0.35)',
                      }}
                    >
                      {post.category}
                    </span>
                    <span className="text-[11px] text-white/25">{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-[16px] sm:text-[17px] font-semibold tracking-tight text-white leading-snug mb-3 group-hover:text-white/90 transition-colors duration-300">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-[13px] text-white/38 leading-relaxed flex-1">
                    {post.description.length > 110
                      ? post.description.slice(0, 110).trimEnd() + '…'
                      : post.description}
                  </p>

                  {/* Footer row */}
                  <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/[0.06]">
                    <span className="text-[11px] text-white/25">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        timeZone: 'UTC',
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-coffee-light group-hover:text-white/70 transition-colors duration-300">
                      Read
                      <span className="group-hover:translate-x-0.5 transition-transform duration-300">
                        <ArrowIcon />
                      </span>
                    </span>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}
