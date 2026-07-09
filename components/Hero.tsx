'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import LandingSections from '@/components/LandingSections'
import type { BlogPost } from '@/lib/blog'
import { getLocationsByRegion } from '@/lib/locations'

type PostSummary = Omit<BlogPost, 'content'>

const BookingFlow = dynamic(() => import('@/components/BookingFlow'), { ssr: false })

const HERO_IMG = 'https://d8j0ntlcm91z4.cloudfront.net/user_3DXXMZN9SbWqkGqaQ24QtDHNfxy/hf_20260609_172318_278f5bd1-c102-4c96-ae57-299263986088_min.webp'

const SPRING = [0.32, 0.72, 0, 1] as const
const STORAGE_SITE_URL = 'https://notimestorage.co'

/* -------------------- Moving / Storage — nested pill (brown / bone, nav-adjacent rhythm) -------------------- */

function TruckGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18h2" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  )
}

function PackageGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  )
}

function ServiceModePicker() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: SPRING, delay: 0.88 }}
      className="mt-8 sm:mt-10 flex justify-center px-2"
    >
      <nav
        aria-label="Moving or storage"
        className="inline-flex items-center gap-0.5 p-1 rounded-full"
        style={{
          background: 'linear-gradient(180deg, rgba(75,46,30,0.95) 0%, rgba(42,20,5,0.98) 100%)',
          boxShadow:
            'inset 0 1px 1px rgba(245,241,235,0.08), inset 0 -1px 1px rgba(0,0,0,0.35), 0 0 0 1px rgba(139,82,48,0.35)',
        }}
      >
        <div
          className="inline-flex items-center gap-2 pl-3 sm:pl-4 pr-2 py-2 rounded-full bg-bone text-coffee shadow-[inset_0_1px_1px_rgba(255,255,255,0.65),0_6px_20px_-8px_rgba(0,0,0,0.55)]"
          aria-current="page"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-coffee/12 text-coffee ring-1 ring-coffee/20">
            <TruckGlyph />
          </span>
          <span className="text-[13px] sm:text-[14px] font-semibold tracking-tight text-coffee leading-none pr-1">
            Moving
          </span>
          <span className="sr-only">NoTime Mover — current site</span>
        </div>

        <a
          href={STORAGE_SITE_URL}
          className="group inline-flex items-center gap-2 pl-2 pr-3 sm:pr-4 py-2 rounded-full outline-none text-bone/55 hover:text-bone/85 transition-colors duration-300 ease-spring focus-visible:ring-2 focus-visible:ring-[#8B5230] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2A1405]"
        >
          <PackageGlyph className="opacity-55 group-hover:opacity-85 transition-opacity duration-300 ease-spring text-current shrink-0" />
          <span className="text-[13px] sm:text-[14px] font-medium tracking-tight leading-none">
            Storage
          </span>
          <span className="sr-only">No Time Storage — sister site</span>
        </a>
      </nav>
    </motion.div>
  )
}

/* -------------------- Floating Island Nav -------------------- */

const NAV_LINKS = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Service areas', menu: 'areas' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Blog', menu: 'blog' },
  { label: 'Free checklist', href: '/moving-checklist' },
  { label: 'Contact', href: '/contact' },
] as const

const REGIONS = getLocationsByRegion()

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.2, ease: SPRING }}
      className="ml-1 shrink-0 opacity-60"
    >
      <path d="M6 9l6 6 6-6" />
    </motion.svg>
  )
}

function NavDropdownPanel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18, ease: SPRING }}
      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 rounded-2xl border border-white/[0.08] p-5 z-50"
      style={{
        background: 'rgba(10,8,6,0.98)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 20px 50px -12px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.06)',
      }}
    >
      {children}
    </motion.div>
  )
}

function ServiceAreasMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <NavDropdownPanel>
      <div className="grid grid-cols-3 gap-6 w-[620px] max-w-[80vw]">
        {REGIONS.map(({ region, locations }) => (
          <div key={region}>
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-coffee-light mb-3">
              {region}
            </p>
            <div className="flex flex-col gap-0.5 max-h-64 overflow-y-auto pr-1">
              {locations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/${loc.slug}`}
                  onClick={onNavigate}
                  className="text-[13px] text-white/50 hover:text-white/90 py-1 rounded transition-colors duration-150"
                >
                  {loc.city}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-white/[0.07] mt-4 pt-4">
        <a
          href="/#areas"
          onClick={onNavigate}
          className="text-[13px] font-medium text-coffee-shimmer hover:text-white transition-colors duration-150"
        >
          View all service areas →
        </a>
      </div>
    </NavDropdownPanel>
  )
}

function BlogMenu({ posts, onNavigate }: { posts: PostSummary[]; onNavigate: () => void }) {
  return (
    <NavDropdownPanel>
      <div className="flex flex-col gap-0.5 w-[340px] max-w-[85vw]">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            onClick={onNavigate}
            className="text-[13px] text-white/60 hover:text-white/95 py-2 leading-snug rounded transition-colors duration-150"
          >
            {post.title}
          </Link>
        ))}
      </div>
      <div className="border-t border-white/[0.07] mt-3 pt-4">
        <Link
          href="/blog"
          onClick={onNavigate}
          className="text-[13px] font-medium text-coffee-shimmer hover:text-white transition-colors duration-150"
        >
          View all posts →
        </Link>
      </div>
    </NavDropdownPanel>
  )
}

function FloatingNav({ onCta, posts }: { onCta: () => void; posts: PostSummary[] }) {
  const [openMenu, setOpenMenu] = useState<'areas' | 'blog' | null>(null)
  const navRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!openMenu) return
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null)
      }
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenu(null)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [openMenu])

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-40"
      style={{
        background: 'rgba(5,5,5,0.8)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: SPRING, delay: 0.15 }}
    >
      <nav
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between gap-6"
      >
        {/* Wordmark — left */}
        <a href="/" className="inline-flex items-center shrink-0 text-[15px] font-semibold tracking-tight leading-none">
          <span className="text-white">NoTime</span>
          <span className="text-coffee-light">Mover</span>
        </a>

        {/* Nav links — desktop center */}
        <div ref={navRef} className="hidden sm:flex items-center gap-0.5 flex-1 justify-center">
          {NAV_LINKS.map((link) => {
            if ('menu' in link) {
              const isOpen = openMenu === link.menu
              return (
                <div key={link.label} className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenMenu(isOpen ? null : link.menu)}
                    aria-expanded={isOpen}
                    className="inline-flex items-center h-9 px-3.5 text-[13px] font-medium text-white/45 hover:text-white/90 transition-colors duration-200 tracking-tight leading-none rounded-full hover:bg-white/[0.05]"
                  >
                    {link.label}
                    <ChevronIcon open={isOpen} />
                  </button>
                  <AnimatePresence>
                    {isOpen && link.menu === 'areas' && (
                      <ServiceAreasMenu onNavigate={() => setOpenMenu(null)} />
                    )}
                    {isOpen && link.menu === 'blog' && (
                      <BlogMenu posts={posts} onNavigate={() => setOpenMenu(null)} />
                    )}
                  </AnimatePresence>
                </div>
              )
            }
            return (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex items-center h-9 px-3.5 text-[13px] font-medium text-white/45 hover:text-white/90 transition-colors duration-200 tracking-tight leading-none rounded-full hover:bg-white/[0.05]"
              >
                {link.label}
              </a>
            )
          })}
        </div>

        {/* CTA — right */}
        <button
          type="button"
          onClick={onCta}
          className="group inline-flex items-center justify-center gap-2 h-9 pl-5 pr-1.5 rounded-full bg-white text-ink text-[13px] font-semibold leading-none transition-transform duration-500 ease-spring active:scale-[0.97] shrink-0"
        >
          <span className="leading-none">Get an instant quote</span>
          <span
            className="w-6 h-6 rounded-full bg-ink/10 flex items-center justify-center transition-transform duration-500 ease-spring group-hover:translate-x-[2px] group-hover:-translate-y-[1px]"
            style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.5)' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
          </span>
        </button>
      </nav>
    </motion.header>
  )
}

/* -------------------- Magnetic CTA -------------------- */

function MagneticCTA({ onClick }: { onClick: () => void }) {
  const ref = useRef<HTMLButtonElement | null>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * 0.18
    const dy = (e.clientY - cy) * 0.22
    const max = 14
    setOffset({
      x: Math.max(-max, Math.min(max, dx)),
      y: Math.max(-max, Math.min(max, dy)),
    })
  }
  const reset = () => setOffset({ x: 0, y: 0 })

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="group relative inline-flex items-center gap-2.5 pl-5 sm:pl-8 pr-1.5 sm:pr-2 py-1.5 sm:py-2 rounded-full bg-white text-ink font-medium will-change-transform active:scale-[0.97]"
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 250, damping: 22, mass: 0.7 }}
    >
      <span className="text-[14px] sm:text-[16px] tracking-tight">Get an instant quote</span>
      <span
        className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-ink/10 flex items-center justify-center transition-transform duration-500 ease-spring group-hover:translate-x-[3px] group-hover:-translate-y-[1px]"
        style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.5)' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
      </span>
    </motion.button>
  )
}

/* -------------------- Cycling Bullet Points -------------------- */

const CYCLE_POINTS = ['Tell us where', 'Set your budget', 'Quote in under 1 minute'] as const
const CYCLE_INTERVAL_MS = 1900
const CYCLE_START_DELAY_MS = 850

function CyclingPoints() {
  const [mounted, setMounted] = useState(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), CYCLE_START_DELAY_MS)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const t = setInterval(() => {
      setIndex(prev => (prev + 1) % CYCLE_POINTS.length)
    }, CYCLE_INTERVAL_MS)
    return () => clearInterval(t)
  }, [mounted])

  return (
    <div
      className="mt-14 sm:mt-16 h-7 sm:h-8 flex items-center justify-center overflow-hidden"
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.div
            key={index}
            className="inline-flex items-center gap-3 text-white/90 text-[17px] sm:text-[19px] font-semibold tracking-tight leading-none"
            initial={{ x: 36, opacity: 0, filter: 'blur(4px)' }}
            animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ x: -36, opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.32, ease: SPRING }}
          >
            <span className="w-2 h-2 rounded-full bg-coffee-light" aria-hidden="true" />
            <span>{CYCLE_POINTS[index]}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


/* -------------------- Hero -------------------- */

export default function Hero({ posts = [] }: { posts?: PostSummary[] }) {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [initialConfirm, setInitialConfirm] = useState<'instate' | 'oos' | undefined>()
  const [initialStep, setInitialStep] = useState<'pricing' | undefined>()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    // ?book=1 — used by city pages and external CTAs to auto-open the flow
    if (params.get('book') !== null) {
      setBookingOpen(true)
      return
    }
    // dev-only shortcuts
    if (process.env.NODE_ENV !== 'development') return
    const p = params.get('confirm') as 'instate' | 'oos' | null
    if (p === 'instate' || p === 'oos') {
      setInitialConfirm(p)
      setBookingOpen(true)
    }
    if (params.get('pricing') !== null) {
      setInitialStep('pricing')
      setBookingOpen(true)
    }
  }, [])

  return (
    <>
      <section ref={sectionRef} className="relative min-h-[100dvh] flex flex-col bg-ink">

        {/* Backdrop layers (z-0) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">

          {/* Higgsfield hero photo — parallax */}
          <motion.div className="absolute inset-0 will-change-transform" style={{ y: bgY, scale: bgScale }}>
            <Image
              src={HERO_IMG}
              alt=""
              aria-hidden="true"
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ opacity: 0.32, filter: 'brightness(0.8) contrast(1.1) saturate(0.85)' }}
            />
          </motion.div>

          <div className="absolute inset-0 grid-bg" />
          <div className="orb orb-a" style={{ mixBlendMode: 'screen' }} />
          <div className="orb orb-b" style={{ mixBlendMode: 'screen' }} />

          {/* Readability vignettes */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 46%, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0.38) 45%, rgba(5,5,5,0) 72%)' }} />
          <div className="absolute inset-x-0 bottom-0 h-48" style={{ background: 'linear-gradient(180deg, transparent 0%, #050505 100%)' }} />
          <div className="absolute inset-x-0 top-0 h-40" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 100%)' }} />
        </div>

        <FloatingNav onCta={() => setBookingOpen(true)} posts={posts} />

        {/* Center content (z-10) */}
        <div className="relative z-10 flex-1 flex flex-col justify-start sm:justify-center items-center text-center px-5 sm:px-8 pt-[calc(env(safe-area-inset-top,0px)+6rem)] sm:pt-36">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: SPRING, delay: 0.45 }}
          >
            <div
              role="list"
              className="flex flex-row flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:gap-x-3 sm:gap-y-2"
            >
              <span
                role="listitem"
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.035] px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-[13px] uppercase tracking-[0.14em] sm:tracking-[0.16em] font-semibold text-white/[0.88] leading-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="text-coffee-light shrink-0 sm:w-4 sm:h-4"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                </svg>
                Massachusetts
              </span>
              <span
                role="presentation"
                className="hidden sm:inline-block h-[14px] w-px shrink-0 bg-white/[0.14]"
                aria-hidden="true"
              />
              <span
                role="listitem"
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.035] px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-[13px] uppercase tracking-[0.14em] sm:tracking-[0.16em] font-semibold text-white/[0.88] leading-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="text-coffee-light shrink-0 sm:w-[15px] sm:h-[15px]"
                >
                  <path d="M12 1.5L3.75 5v6.25c0 5.4 3.52 10.44 8.25 11.75 4.73-1.31 8.25-6.35 8.25-11.75V5L12 1.5zm-1.4 14.55L7.05 12.5l1.4-1.4 2.15 2.15 4.95-4.95 1.4 1.4-6.35 6.35z" />
                </svg>
                Fully Insured
              </span>
              <span
                role="presentation"
                className="hidden sm:inline-block h-[14px] w-px shrink-0 bg-white/[0.14]"
                aria-hidden="true"
              />
              <span role="listitem">
                <a
                  href="https://www.google.com/maps/place/NoTimeMover/@42.340288,-71.0250365,11z/data=!4m6!3m5!1s0x223ebce33c8b2c21:0x17a114d1bb1cdcd9!8m2!3d42.340288!4d-71.0250365!16s%2Fg%2F11zkxt0k38"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.035] px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-[13px] font-semibold text-white/[0.88] leading-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
                >
                  <svg width="14" height="14" viewBox="0 0 48 48" aria-hidden="true" className="shrink-0 sm:w-4 sm:h-4">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                  </svg>
                  <span className="tracking-[0.02em]">5.0</span>
                  <span className="inline-flex items-center gap-[1px]" style={{ color: '#FFC107' }} aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="9" height="9" viewBox="0 0 24 24" fill="currentColor" className="sm:w-[10px] sm:h-[10px]">
                        <path d="M12 2.5l2.9 6.4 6.98.7-5.24 4.77 1.53 6.9L12 17.6l-6.17 3.67 1.53-6.9L2.12 9.6l6.98-.7L12 2.5z" />
                      </svg>
                    ))}
                  </span>
                </a>
              </span>
            </div>
          </motion.div>

          <h1 className="mt-10 sm:mt-14 md:mt-20 leading-[0.95] tracking-[-0.04em] font-semibold px-3 sm:px-12">
            <motion.span
              className="block text-white text-[clamp(40px,6vw,58px)] tracking-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              Boston's only moving company where
            </motion.span>
            <motion.span
              className="block font-editorial text-coffee-shimmer text-[clamp(40px,6vw,58px)] tracking-tight px-6 pb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              you control the price.
            </motion.span>
          </h1>

          <CyclingPoints />

          <ServiceModePicker />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: SPRING, delay: 1.02 }}
            className="mt-7 sm:mt-9"
          >
            <MagneticCTA onClick={() => setBookingOpen(true)} />
          </motion.div>

          <motion.p
            className="mt-6 text-[12px] sm:text-[13px] uppercase tracking-[0.22em] text-white/75 font-medium flex items-center justify-center gap-2.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.2 }}
          >
            <span>No commitment</span>
            <span className="w-1 h-1 rounded-full bg-coffee-light" aria-hidden="true" />
            <span>Free quote</span>
          </motion.p>
        </div>


      </section>

      <LandingSections onOpenBooking={() => setBookingOpen(true)} posts={posts} />

      <BookingFlow isOpen={bookingOpen} onClose={() => setBookingOpen(false)} initialConfirm={initialConfirm} initialStep={initialStep} />
    </>
  )
}
