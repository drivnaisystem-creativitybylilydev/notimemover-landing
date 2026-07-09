'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { BlogPost } from '@/lib/blog'

type PostSummary = Omit<BlogPost, 'content'>

const SPRING = { duration: 0.42, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] }
const FADE_UP = { duration: 0.38, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }

const READER_IMG = 'https://d8j0ntlcm91z4.cloudfront.net/user_3DXXMZN9SbWqkGqaQ24QtDHNfxy/hf_20260611_031627_5b3f04ac-2a88-48c2-a546-e36f31276475_min.webp'

function BookIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

export default function BlogMagazineSection({ posts }: { posts: PostSummary[] }) {
  const [featuredIdx, setFeaturedIdx] = useState(0)

  if (posts.length === 0) return null

  // Cap at 4 — featured + 3 in the stack (last one is the tease)
  const fourPosts = posts.slice(0, 4)
  const featured = fourPosts[featuredIdx]
  const stack = fourPosts.filter((_, i) => i !== featuredIdx)

  return (
    <section className="w-full border-t border-white/[0.05] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">

        {/* Header */}
        <div className="flex items-end justify-between mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="text-coffee-light opacity-70"><BookIcon /></span>
              <p className="text-[10px] uppercase tracking-[0.28em] text-coffee-light font-semibold">From the blog</p>
            </div>
            <h2 className="text-[clamp(22px,3.5vw,36px)] font-semibold tracking-tight text-white leading-tight">
              Know before you move.{' '}
              <span className="font-serif italic text-coffee-shimmer">No surprises.</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-2 text-[12px] font-medium text-white/50 hover:text-white/75 transition-colors duration-300 shrink-0 mb-1"
          >
            All guides <ArrowIcon />
          </Link>
        </div>

        {/* Magazine layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-3 sm:gap-4">

          {/* ── Featured panel ── */}
          <div
            className="relative rounded-2xl border border-white/[0.07] overflow-hidden"
            style={{ background: '#050505', minHeight: '420px' }}
          >
            {/* Reader figure — bottom-right quarter */}
            <div
              className="pointer-events-none absolute bottom-0 right-0 w-[320px] h-[420px] z-0"
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, black 28%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 28%)',
              }}
              aria-hidden
            >
              <Image
                src={READER_IMG}
                alt=""
                fill
                className="object-contain object-right-bottom"
                sizes="320px"
              />
            </div>

            {/* Coffee glow top-left */}
            <div
              className="pointer-events-none absolute inset-0 z-0"
              style={{ background: 'radial-gradient(ellipse 60% 40% at 10% 0%, rgba(107,58,31,0.12) 0%, transparent 65%)' }}
              aria-hidden
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={featured.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={FADE_UP}
                className="relative z-10 flex flex-col h-full p-8 sm:p-10"
              >
                {/* Category + date */}
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.18em]"
                    style={{ background: 'rgba(107,58,31,0.3)', color: '#C07040', border: '1px solid rgba(107,58,31,0.4)' }}
                  >
                    {featured.category}
                  </span>
                  <span className="text-[11px] text-white/50">{featured.readTime}</span>
                  <span className="text-[11px] text-white/50">
                    {new Date(featured.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[clamp(22px,3vw,34px)] font-semibold tracking-tight text-white leading-tight mb-5 max-w-lg">
                  {featured.title}
                </h3>

                {/* Excerpt */}
                <p className="text-[14px] sm:text-[15px] text-white/40 leading-relaxed max-w-md flex-1">
                  {featured.description}
                </p>

                {/* CTA */}
                <div className="mt-8">
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
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Stack panel ── */}
          <div
            className="flex flex-col rounded-2xl border border-white/[0.07] overflow-hidden divide-y divide-white/[0.05]"
            style={{ background: 'rgba(255,255,255,0.018)' }}
          >
            {stack.map((post, i) => {
              const isTeaser = i === stack.length - 1

              // ── Tease card (last slot) ──
              if (isTeaser) {
                return (
                  <Link
                    key={post.slug}
                    href="/blog"
                    className="group relative w-full text-left px-7 py-6 flex flex-col gap-2.5 hover:bg-white/[0.03] transition-colors duration-300 flex-1"
                  >
                    {/* Hover left accent */}
                    <div
                      className="absolute left-0 inset-y-0 w-[2px] rounded-r opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ background: 'rgba(107,58,31,0.7)' }}
                    />

                    {/* Index number */}
                    <span className="text-[10px] font-semibold text-white/50 tabular-nums tracking-widest">
                      0{i + 1}
                    </span>

                    {/* Category + read time */}
                    <div className="flex items-center gap-2.5">
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-[0.15em]"
                        style={{ background: 'rgba(107,58,31,0.2)', color: '#A06030', border: '1px solid rgba(107,58,31,0.28)' }}
                      >
                        {post.category}
                      </span>
                      <span className="text-[10px] text-white/50">{post.readTime}</span>
                    </div>

                    {/* Title + description with gradient fade */}
                    <div className="relative overflow-hidden" style={{ maxHeight: '4.5rem' }}>
                      <p className="text-[14px] sm:text-[15px] font-semibold text-white/65 leading-snug mb-1.5">
                        {post.title}
                      </p>
                      <p className="text-[12px] text-white/30 leading-relaxed">
                        {post.description}
                      </p>
                      {/* Gradient fade */}
                      <div
                        className="absolute bottom-0 inset-x-0 h-10"
                        style={{ background: 'linear-gradient(to bottom, transparent, rgba(10,10,10,0.97))' }}
                      />
                    </div>

                    {/* Read More CTA */}
                    <p className="text-[11px] text-coffee-light flex items-center gap-1.5 mt-1">
                      <span>Read More</span>
                      <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block">
                        <ArrowIcon />
                      </span>
                    </p>
                  </Link>
                )
              }

              // ── Normal interactive card ──
              return (
                <motion.button
                  key={post.slug}
                  onClick={() => setFeaturedIdx(fourPosts.indexOf(post))}
                  className="group relative w-full text-left px-7 py-6 flex flex-col gap-2.5 transition-colors duration-300 hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-coffee-light"
                  initial={false}
                  whileHover={{ x: 2 }}
                  transition={SPRING}
                >
                  {/* Hover left accent */}
                  <motion.div
                    className="absolute left-0 inset-y-0 w-[2px] rounded-r"
                    style={{ background: 'rgba(107,58,31,0.7)' }}
                    initial={{ scaleY: 0, opacity: 0 }}
                    whileHover={{ scaleY: 1, opacity: 1 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  />

                  {/* Index number */}
                  <span className="text-[10px] font-semibold text-white/50 tabular-nums tracking-widest">
                    0{i + 1}
                  </span>

                  {/* Category + read time */}
                  <div className="flex items-center gap-2.5">
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-[0.15em]"
                      style={{ background: 'rgba(107,58,31,0.2)', color: '#A06030', border: '1px solid rgba(107,58,31,0.28)' }}
                    >
                      {post.category}
                    </span>
                    <span className="text-[10px] text-white/50">{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <p className="text-[14px] sm:text-[15px] font-semibold text-white/65 group-hover:text-white/90 transition-colors duration-300 leading-snug">
                    {post.title}
                  </p>

                  {/* Promote hint */}
                  <p className="text-[11px] text-white/50 group-hover:text-coffee-light transition-colors duration-300 flex items-center gap-1.5">
                    <span>View</span>
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block">
                      <ArrowIcon />
                    </span>
                  </p>
                </motion.button>
              )
            })}
          </div>

        </div>

        {/* Mobile "all guides" */}
        <div className="mt-6 sm:hidden flex justify-center">
          <Link href="/blog" className="text-[12px] text-white/50 hover:text-white/70 transition-colors duration-300 flex items-center gap-2">
            See all guides <ArrowIcon />
          </Link>
        </div>

      </div>
    </section>
  )
}
