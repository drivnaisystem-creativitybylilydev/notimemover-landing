'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { BlogPost } from '@/lib/blog'

type PostSummary = Omit<BlogPost, 'content'>

const ROTATE_MS = 3600
const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number]

const listItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
}

const featuredVariants = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0, transition: { duration: 0.38, ease } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease } },
}

function ArrowIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function BackIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  )
}

export default function BlogIndexClient({ posts }: { posts: PostSummary[] }) {
  const [featuredIdx, setFeaturedIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || posts.length <= 1) return
    const id = setInterval(() => {
      setFeaturedIdx(prev => (prev + 1) % posts.length)
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [paused, featuredIdx, posts.length])

  const featured = posts[featuredIdx]
  const rest = posts.filter((_, i) => i !== featuredIdx)

  return (
    <div className="min-h-screen bg-ink text-white">

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.06]" style={{ background: 'rgba(5,5,5,0.88)', backdropFilter: 'blur(16px)' }}>
        <div className="w-full px-8 sm:px-12 lg:px-16 h-14 flex items-center justify-between">
          <Link href="/" className="text-[13px] font-medium text-white/50 hover:text-white/90 transition-colors duration-300 flex items-center gap-2">
            <BackIcon />
            Back
          </Link>
          <Link
            href="/?book=1"
            className="inline-flex items-center gap-2 text-[12px] font-semibold px-4 py-1.5 rounded-full text-white"
            style={{ background: 'rgba(107,58,31,0.55)', border: '1px solid rgba(107,58,31,0.5)' }}
          >
            Get a quote
          </Link>
        </div>
      </nav>

      {/* ── Header ── */}
      <header className="border-b border-white/[0.05]" style={{ background: 'linear-gradient(160deg, rgba(42,20,5,0.5) 0%, rgba(5,5,5,0) 55%)' }}>
        <div className="w-full px-8 sm:px-12 lg:px-16 pt-16 pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 lg:gap-16 items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-coffee-light font-semibold mb-5">
                Moving guides
              </p>
              <h1 className="text-[clamp(34px,6vw,72px)] font-semibold tracking-tight text-white leading-[1.05]">
                Know before you move.<br />
                <span className="font-serif italic text-coffee-shimmer">No surprises.</span>
              </h1>
            </div>
            <p className="text-[14px] sm:text-[15px] text-white/35 leading-relaxed lg:pb-2">
              Honest guides on Boston moving costs, permits, timing, and how to hire a mover that won't pad the bill.
            </p>
          </div>
        </div>
      </header>

      {/* ── Featured post ── */}
      {featured && (
        <div
          className="relative border-b border-white/[0.07] px-8 sm:px-12 lg:px-16 pt-12 pb-14 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Giant ghost number */}
          <AnimatePresence mode="wait">
            <motion.span
              key={`ghost-${featuredIdx}`}
              className="pointer-events-none select-none absolute right-8 lg:right-14 top-0 font-bold leading-none text-white/[0.028]"
              style={{ fontSize: 'clamp(100px, 22vw, 280px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden
            >
              {String(featuredIdx + 1).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={featured.slug}
              variants={featuredVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 lg:gap-20 items-end"
            >
              {/* Left — title block */}
              <div>
                <div className="flex items-center gap-3 mb-7">
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.18em]"
                    style={{ background: 'rgba(107,58,31,0.3)', color: '#C07040', border: '1px solid rgba(107,58,31,0.4)' }}
                  >
                    {featured.category}
                  </span>
                  <span className="text-[11px] text-white/25">{featured.readTime}</span>
                  <span className="text-[11px] text-white/20">
                    {new Date(featured.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <h2 className="text-[clamp(30px,5vw,64px)] font-semibold tracking-tight text-white leading-[1.06]">
                  {featured.title}
                </h2>
              </div>

              {/* Right — description + CTA */}
              <div className="flex flex-col gap-7 lg:pb-1">
                <p className="text-[14px] sm:text-[15px] text-white/40 leading-relaxed">
                  {featured.description}
                </p>
                <div>
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-white text-ink font-medium"
                    style={{ transition: 'transform 500ms cubic-bezier(0.32,0.72,0,1)' }}
                  >
                    <span className="text-[14px] tracking-tight">Read guide</span>
                    <span
                      className="w-10 h-10 rounded-full bg-ink/10 flex items-center justify-center group-hover:translate-x-[2px] group-hover:-translate-y-[1px]"
                      style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.5)', transition: 'transform 500ms cubic-bezier(0.32,0.72,0,1)' }}
                    >
                      <ArrowIcon />
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress bar */}
          {!paused && (
            <motion.div
              key={`progress-${featuredIdx}`}
              className="absolute bottom-0 left-0 h-[1px] rounded-full"
              style={{ background: 'rgba(107,58,31,0.65)' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: ROTATE_MS / 1000, ease: 'linear' }}
            />
          )}
        </div>
      )}

      {/* ── Post list ── */}
      {rest.length > 0 && (
        <div className="w-full px-8 sm:px-12 lg:px-16 py-12 sm:py-14">

          <div className="flex items-center justify-between mb-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-semibold">
              All guides
            </p>
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/15 font-semibold hidden sm:block">
              {posts.length} articles
            </p>
          </div>

          {/* Column headers — desktop only */}
          <div className="hidden lg:grid border-b border-white/[0.05] pb-3 mb-1" style={{ gridTemplateColumns: '3rem 14rem 1fr 6rem 2rem' }}>
            {['#', 'Category', 'Title', 'Read time', ''].map((h) => (
              <span key={h} className="text-[9px] uppercase tracking-[0.22em] text-white/15 font-semibold">{h}</span>
            ))}
          </div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } } }}
            className="divide-y divide-white/[0.04]"
          >
            {rest.map((post, i) => {
              const postIdx = posts.indexOf(post)
              return (
                <motion.div key={post.slug} variants={listItem}>
                  <button
                    onClick={() => setFeaturedIdx(postIdx)}
                    className="group w-full text-left py-4 px-3 -mx-3 rounded-lg transition-colors duration-300 hover:bg-white/[0.028]"
                  >
                    {/* Mobile layout */}
                    <div className="flex items-start gap-4 lg:hidden">
                      <span className="text-[11px] font-mono tabular-nums text-white/20 group-hover:text-coffee-light transition-colors duration-300 pt-[3px] shrink-0 w-6">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-1">
                          <span className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-semibold">{post.category}</span>
                          <span className="text-[10px] text-white/20">{post.readTime}</span>
                        </div>
                        <p className="text-[15px] font-semibold text-white/60 group-hover:text-white/90 transition-colors duration-300 leading-snug">
                          {post.title}
                        </p>
                      </div>
                      <span className="text-white/20 group-hover:text-coffee-light group-hover:translate-x-0.5 transition-all duration-300 pt-[3px] shrink-0">
                        <ArrowIcon size={13} />
                      </span>
                    </div>

                    {/* Desktop tabular layout */}
                    <div className="hidden lg:grid items-center gap-4" style={{ gridTemplateColumns: '3rem 14rem 1fr 6rem 2rem' }}>
                      <span className="text-[11px] font-mono tabular-nums text-white/20 group-hover:text-coffee-light transition-colors duration-300">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-[0.15em] w-fit"
                        style={{ background: 'rgba(107,58,31,0.18)', color: '#A06030', border: '1px solid rgba(107,58,31,0.25)' }}
                      >
                        {post.category}
                      </span>
                      <p className="text-[15px] font-semibold text-white/60 group-hover:text-white/90 transition-colors duration-300 leading-snug truncate pr-4">
                        {post.title}
                      </p>
                      <span className="text-[11px] text-white/25 tabular-nums">{post.readTime}</span>
                      <span className="text-white/20 group-hover:text-coffee-light group-hover:translate-x-0.5 transition-all duration-300">
                        <ArrowIcon size={13} />
                      </span>
                    </div>
                  </button>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      )}

      {/* ── Bottom CTA ── */}
      <div className="border-t border-white/[0.05]">
        <div className="w-full px-8 sm:px-12 lg:px-16 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-coffee-light font-semibold mb-2">Ready to move?</p>
            <p className="text-[clamp(18px,2.5vw,26px)] font-semibold text-white tracking-tight">
              Set your budget. We confirm same day.
            </p>
          </div>
          <Link
            href="/?book=1"
            className="group inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full bg-white text-ink font-medium shrink-0"
            style={{ transition: 'transform 500ms cubic-bezier(0.32,0.72,0,1)' }}
          >
            <span className="text-[15px] tracking-tight">Get instant quote</span>
            <span
              className="w-11 h-11 rounded-full bg-ink/10 flex items-center justify-center group-hover:translate-x-[2px] group-hover:-translate-y-[1px]"
              style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.5)', transition: 'transform 500ms cubic-bezier(0.32,0.72,0,1)' }}
            >
              <ArrowIcon size={15} />
            </span>
          </Link>
        </div>
      </div>

    </div>
  )
}
