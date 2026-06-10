'use client'

import { useRef, useEffect, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  animate,
  AnimatePresence,
} from 'framer-motion'
import Link from 'next/link'
import { locations } from '@/lib/locations'


const SPRING = [0.32, 0.72, 0, 1] as const
const EASE_OUT = [0.25, 0.1, 0.25, 1] as const

/* ─────────────────────────────────────────────
   SCROLL REVEAL — animates in AND out on scroll
───────────────────────────────────────────── */
function Reveal({
  children, from = 'bottom', distance = 36, delay = 0, duration = 0.65, amount = 0.1, className, style,
}: {
  children: React.ReactNode
  from?: 'bottom' | 'top' | 'left' | 'right' | 'scale'
  distance?: number; delay?: number; duration?: number; amount?: number
  className?: string; style?: React.CSSProperties
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, amount })
  const hidden = {
    opacity: 0,
    y: from === 'bottom' ? distance : from === 'top' ? -distance : 0,
    x: from === 'left' ? -distance : from === 'right' ? distance : 0,
    scale: from === 'scale' ? 0.93 : 1,
  }
  return (
    <motion.div ref={ref} className={className} style={{ willChange: 'transform, opacity', ...style }}
      initial={hidden} animate={inView ? { opacity: 1, y: 0, x: 0, scale: 1 } : hidden}
      transition={{ duration, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  )
}
const CREW_IMG = 'https://d8j0ntlcm91z4.cloudfront.net/user_3DXXMZN9SbWqkGqaQ24QtDHNfxy/hf_20260609_173535_516bcd8b-6811-467c-bc6c-adda4397c5cc_min.webp'


const FAQ_ITEMS = [
  {
    q: 'How does your pricing work?',
    a: 'You name the number before we ever pick up the phone. Fill out the quote form with your pickup address, dropoff address, home size, and a budget range you are comfortable with. We follow up within minutes to confirm availability and details. Most Boston local moves land between $400 and $900 depending on size and distance. Out-of-state jobs are scoped individually on a quick confirmation call — still no counter-offers, still no surprises.',
  },
  {
    q: 'Do you charge for stairs or extra floors?',
    a: 'No stair fees, no elevator fees, no long-carry fees. Boston walk-ups are the default — Back Bay brownstones, Allston three-deckers, Fenway buildings with no elevator. We know the city. Other companies use those charges to inflate the final bill after the job is done. The price you set is what you pay, period.',
  },
  {
    q: 'Are you insured?',
    a: 'Yes, fully. NoTimeMover carries general liability insurance on every move. Your belongings are covered from the moment we load the first item to the moment we set down the last box. If your building requires a Certificate of Insurance before move day — common in Boston high-rises, managed properties, and university housing — contact us a few days ahead and we will have it ready.',
  },
  {
    q: 'How quickly will I hear back after I submit?',
    a: 'Within minutes during business hours, never more than a few hours. A real person reviews your request and reaches out by phone or text to confirm timing and details — not an automated drip sequence. If you submit Friday evening, expect a reply Saturday morning. We do not leave quote requests sitting.',
  },
  {
    q: 'Do you handle Boston parking permits for the moving truck?',
    a: 'Yes, and you should not skip this step. Boston requires a moving truck permit on most residential streets, applied through the city at least 10 to 14 business days before your move date. We will tell you exactly which streets need permits and how to file, or coordinate it directly with you. Unpermitted trucks in Boston get ticketed fast — sometimes towed. Do not leave this to the week before.',
  },
  {
    q: 'How far in advance should I book?',
    a: 'For weekday moves, three to five days notice usually works. For weekend moves — especially anything Friday through Sunday in September — book at least one to two weeks out. September 1 is the single busiest moving day in the entire country because of Boston lease cycles, and we fill up weeks ahead. Same-day moves are available on weekdays if you reach out before noon and we have crew available. When in doubt, book early. Dates can always be adjusted.',
  },
] as const

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */

function AnimatedCount({
  value,
  prefix = '',
  suffix = '',
}: {
  value: number
  prefix?: string
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: false, amount: 0.3 })
  const count = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => count.on('change', (v) => setDisplay(Math.round(v))), [count])
  useEffect(() => {
    if (!inView) return
    const a = animate(count, value, { duration: 1.4, ease: 'easeOut' })
    return a.stop
  }, [inView, count, value])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{display}{suffix}
    </span>
  )
}

/* ─────────────────────────────────────────────
   CREDIBILITY STRIP — full width, large numbers
───────────────────────────────────────────── */

const CRED_STATS = [
  {
    label: 'Response time',
    display: 'Within Minutes',
    animated: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    label: 'Insured coverage',
    display: null,
    value: 100, suffix: '%', prefix: '',
    animated: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    label: 'Mile service radius',
    display: null,
    value: 50, suffix: '+', prefix: '',
    animated: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
] as const

function CredibilityStrip() {
  return (
    <section className="w-full pt-16 sm:pt-20 pb-4">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
          {CRED_STATS.map((stat, i) => (
            <Reveal key={stat.label} from="bottom" delay={i * 0.08} amount={0.2}
              className={`flex flex-col items-center text-center py-8 sm:py-10 ${
                i < CRED_STATS.length - 1 ? 'sm:border-r border-white/[0.06]' : ''
              }`}
            >
              {/* Icon */}
              <span className="mb-4 text-coffee-light" style={{ opacity: 0.85 }}>
                {stat.icon}
              </span>
              {/* Number / text — amber */}
              <span className="text-[clamp(28px,4vw,48px)] font-semibold tracking-tight leading-none text-coffee-shimmer">
                {stat.animated
                  ? <AnimatedCount value={(stat as typeof CRED_STATS[1]).value} prefix={(stat as typeof CRED_STATS[1]).prefix} suffix={(stat as typeof CRED_STATS[1]).suffix} />
                  : stat.display}
              </span>
              {/* Label — white bold */}
              <span className="mt-3 text-[11px] uppercase tracking-[0.2em] font-bold text-white">
                {stat.label}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   HOW IT WORKS — 3 steps, horizontal
───────────────────────────────────────────── */

const STEPS = [
  {
    n: '01',
    title: 'Set your budget',
    body: 'Tell us what you can spend. No ballpark — an actual number. That is where we start.',
  },
  {
    n: '02',
    title: 'See exactly what it covers',
    body: 'We confirm hours, movers, and truck for your route and home size. No guesswork.',
  },
  {
    n: '03',
    title: 'Move on your terms',
    body: 'We show up, handle everything, and you pay the number you set. Nothing added at the end.',
  },
] as const

function HowItWorks({ onOpenBooking }: { onOpenBooking: () => void }) {
  return (
    <section id="how-it-works" className="w-full py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <Reveal from="left" distance={50} className="mb-12 sm:mb-14">
          <h2 className="text-[clamp(28px,5vw,44px)] font-semibold tracking-tight text-white leading-tight">
            The only moving company
            <br />
            <span className="font-serif italic text-coffee-shimmer">
              where you control the price.
            </span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
          {STEPS.map(({ n, title, body }, i) => (
            <Reveal key={n} from="bottom" delay={i * 0.1} duration={0.6} amount={0.15}
              className={`relative py-10 pr-8 ${i > 0 ? 'sm:pl-10 sm:border-l border-white/[0.06]' : ''}`}
            >
              <span
                className="absolute top-8 right-6 text-[clamp(64px,8vw,88px)] font-semibold leading-none select-none pointer-events-none"
                style={{ color: 'rgba(255,255,255,0.04)' }}
                aria-hidden
              >
                {n}
              </span>
              <p className="text-[10px] uppercase tracking-[0.24em] text-coffee-light font-semibold mb-4">{n}</p>
              <h3 className="text-[18px] sm:text-[20px] font-semibold tracking-tight text-white leading-snug mb-3">
                {title}
              </h3>
              <p className="text-[14px] text-white/40 leading-relaxed max-w-[280px]">{body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal from="bottom" delay={0.1} className="mt-10">
          <button
            type="button"
            onClick={onOpenBooking}
            className="group inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full bg-white text-ink font-medium active:scale-[0.97]"
            style={{ transition: 'transform 500ms cubic-bezier(0.32,0.72,0,1)' }}
          >
            <span className="text-[15px] tracking-tight">Name your budget</span>
            <span
              className="w-11 h-11 rounded-full bg-ink/10 flex items-center justify-center group-hover:translate-x-[2px] group-hover:-translate-y-[1px]"
              style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.5)', transition: 'transform 500ms cubic-bezier(0.32,0.72,0,1)' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </Reveal>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   BENTO
───────────────────────────────────────────── */

function BentoSection() {
  const [val, setVal] = useState(650)
  const coverage =
    val < 400 ? 'Studio move, ~2 hrs, 2 movers'
    : val < 700 ? 'Studio move, ~4 hrs, 2 movers'
    : val < 1200 ? '2-bedroom, ~5 hrs, 2 movers'
    : '3-bedroom, ~6 hrs, 3 movers'

  return (
    <section className="w-full py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4">

        {/* Card 1 — full width, price calculator */}
        <motion.div
          initial={{ opacity: 0, x: -60, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="sm:col-span-12 py-10 sm:py-12 border-b border-white/[0.06]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-10 sm:gap-16">
            <div className="sm:flex-1">
              <h3 className="text-[clamp(32px,4.5vw,58px)] font-semibold tracking-tight text-white leading-[1.08] mb-5">
                You name the number.
                <br />
                <span className="font-serif italic text-coffee-shimmer">
                  We tell you exactly what it covers.
                </span>
              </h3>
              <p className="text-[15px] sm:text-[16px] text-white/42 leading-relaxed max-w-lg">
                Most movers quote you a rate and bill for time. We do it differently. Set your budget first and see exactly what your move includes before you commit.
              </p>
            </div>
            <div
              className="w-full sm:w-96 shrink-0 rounded-2xl border border-white/[0.1] px-8 py-8"
              style={{ background: 'rgba(0,0,0,0.3)' }}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-[13px] text-white/35 font-medium">Your budget</span>
                <span className="text-[32px] font-semibold text-white tabular-nums leading-none">${val.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={200}
                max={2000}
                value={val}
                onChange={(e) => setVal(Number(e.target.value))}
                className="w-full cursor-pointer"
                style={{ accentColor: '#8B5230' }}
                aria-label="Budget"
              />
              <div className="flex justify-between mt-2 text-[11px] text-white/22 font-medium">
                <span>$200</span><span>$2,000</span>
              </div>
              <div className="mt-6 pt-6 border-t border-white/[0.07]">
                <p className="text-[12px] text-white/35 mb-2">What that covers</p>
                <p className="text-[15px] font-semibold text-coffee-light">{coverage}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 2 — insured */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0 }}
          className="sm:col-span-4 pt-10 pb-4 sm:pr-10 sm:border-r border-white/[0.06]"
        >
          <div
            className="w-10 h-10 rounded-2xl mb-5 flex items-center justify-center"
            style={{ background: 'rgba(107,58,31,0.18)', border: '1px solid rgba(107,58,31,0.35)' }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(139,82,48,1)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <h3 className="text-[17px] font-semibold text-white tracking-tight mb-2">Fully insured</h3>
          <p className="text-[13px] text-white/38 leading-relaxed">
            Your belongings are covered from the first item loaded to the last box set down. No exceptions.
          </p>
        </motion.div>

        {/* Card 3 — no stair fees */}
        <motion.div
          initial={{ opacity: 0, y: 44, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.07 }}
          className="sm:col-span-4 pt-10 pb-4 sm:px-10 sm:border-r border-white/[0.06]"
        >
          <div
            className="w-10 h-10 rounded-2xl mb-5 flex items-center justify-center"
            style={{ background: 'rgba(107,58,31,0.18)', border: '1px solid rgba(107,58,31,0.35)' }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(139,82,48,1)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <h3 className="text-[17px] font-semibold text-white tracking-tight mb-2">No stair fees</h3>
          <p className="text-[13px] text-white/38 leading-relaxed">
            Boston walk-ups are part of the job. We do not add charges for flights of stairs. What you set is what you pay.
          </p>
        </motion.div>

        {/* Card 4 — response */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.14 }}
          className="sm:col-span-4 pt-10 pb-4 sm:pl-10"
        >
          <div
            className="w-10 h-10 rounded-2xl mb-5 flex items-center justify-center"
            style={{ background: 'rgba(107,58,31,0.18)', border: '1px solid rgba(107,58,31,0.35)' }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(139,82,48,1)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <h3 className="text-[17px] font-semibold text-white tracking-tight mb-2">Same-day response</h3>
          <p className="text-[13px] text-white/38 leading-relaxed">
            Submit your request and hear back the same day, usually within the hour. A real person confirms your details.
          </p>
        </motion.div>

      </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   CREW
───────────────────────────────────────────── */

function CrewSection() {
  const imageRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.55], [0.95, 1.0])

  return (
    <section className="w-full py-16 sm:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[520px]">

        {/* Image — left, full bleed */}
        <Reveal from="right" distance={60} amount={0.1} className="relative overflow-hidden min-h-[340px] md:min-h-[520px]">
          <div ref={imageRef} className="absolute inset-0 will-change-transform">
            <motion.div className="absolute inset-0" style={{ scale }}>
              <img
                src={CREW_IMG}
                alt="NoTimeMover crew loading a truck"
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.88) contrast(1.05)' }}
              />
            </motion.div>
            {/* right-edge fade into section bg */}
            <div className="absolute inset-y-0 right-0 w-24 hidden md:block" style={{ background: 'linear-gradient(to right, transparent, #050505)' }} />
            {/* bottom fade on mobile */}
            <div className="absolute inset-x-0 bottom-0 h-24 md:hidden" style={{ background: 'linear-gradient(to bottom, transparent, #050505)' }} />
          </div>
        </Reveal>

        {/* Text — right */}
        <Reveal from="left" distance={60} amount={0.1} className="flex flex-col justify-center px-8 sm:px-14 lg:px-20 py-14 md:py-0">
          <h2 className="text-[clamp(28px,4vw,48px)] font-semibold tracking-tight text-white leading-[1.1] mb-5">
            The people you book
            <br />
            <span className="font-serif italic text-coffee-shimmer">
              are the ones who show up.
            </span>
          </h2>
          <p className="text-[15px] text-white/42 leading-relaxed mb-10 max-w-md">
            NoTimeMover is a small Boston-based team. No franchise dispatch. No subcontractors. The crew that confirms your move is the crew that handles it.
          </p>
          <div className="grid grid-cols-2 gap-x-10 gap-y-6">
            {[
              ['Fully', 'insured'],
              ['Same-week', 'availability'],
              ['No stair', 'fees, ever'],
              ['Boston', 'based'],
            ].map(([top, bottom]) => (
              <div key={top}>
                <p className="text-[15px] font-semibold text-white leading-tight">{top}</p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/30 font-medium mt-1">{bottom}</p>
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   TRUST / GUARANTEES
───────────────────────────────────────────── */

const GUARANTEES = [
  {
    title: 'You name the price.',
    body: 'Tell us your budget before we ever contact you. We confirm exactly what it covers — hours, crew size, truck. The number you set is the number on your receipt.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: 'No fees added at the door.',
    body: 'No stair fees. No fuel surcharges. No assembly add-ons. What you confirm online is what you pay when the truck pulls away — nothing added after the fact.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'A real person responds.',
    body: 'Submit your move and someone follows up within minutes. No automated callbacks, no waiting two days for a quote. We confirm your details on the same day you reach out.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h.01M12 10h.01M16 10h.01" />
      </svg>
    ),
  },
  {
    title: 'Fully insured, every time.',
    body: 'Your belongings are covered from the moment we load the first item to the moment we set down the last box. Every move, every crew, no exceptions.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
  },
]

function TrustSection() {
  return (
    <section className="w-full py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <Reveal from="bottom" className="mb-12 sm:mb-16">
          <p className="text-[10px] uppercase tracking-[0.28em] text-coffee-light font-semibold mb-3">Our guarantee</p>
          <h2 className="text-[clamp(28px,5vw,44px)] font-semibold tracking-tight text-white leading-tight">
            Moving that works{' '}
            <span className="font-serif italic text-coffee-shimmer">for you.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {GUARANTEES.map((g, i) => (
            <Reveal key={g.title} from="bottom" delay={i * 0.07} amount={0.15}>
              <div
                className="h-full rounded-2xl border border-white/[0.08] p-7 sm:p-8 flex flex-col gap-5"
                style={{
                  background: 'linear-gradient(145deg, rgba(107,58,31,0.10) 0%, rgba(20,10,3,0.40) 60%, rgba(5,5,5,0.55) 100%)',
                  boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.06)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-coffee-light"
                  style={{ background: 'rgba(139,82,48,0.15)', border: '1px solid rgba(139,82,48,0.25)' }}
                >
                  {g.icon}
                </div>
                <div>
                  <h3 className="text-[16px] sm:text-[17px] font-semibold tracking-tight text-white mb-2">
                    {g.title}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-white/45 leading-relaxed">
                    {g.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   SERVICE AREAS
───────────────────────────────────────────── */


/* ─────────────────────────────────────────────
   FAQ — divider style, no glass cards
───────────────────────────────────────────── */

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="w-full py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
      <Reveal from="right" distance={40} className="mb-10 sm:mb-12">
        <h2 className="text-[clamp(26px,4.5vw,40px)] font-semibold tracking-tight text-white">
          Common questions.
        </h2>
      </Reveal>

      <div>
        {FAQ_ITEMS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.45, ease: EASE_OUT, delay: i * 0.04 }}
            className="border-t border-white/[0.07]"
          >
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-6 py-5 sm:py-6 text-left cursor-pointer group"
            >
              <span className="text-[15px] sm:text-[16px] font-medium text-white group-hover:text-white/80 transition-colors duration-200">
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: open === i ? 45 : 0 }}
                transition={{ duration: 0.25, ease: SPRING }}
                className="shrink-0 text-white/30 group-hover:text-white/50 transition-colors duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: SPRING }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-[14px] text-white/40 leading-relaxed max-w-2xl">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
        <div className="border-t border-white/[0.07]" />
      </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */

export default function LandingSections({ onOpenBooking }: { onOpenBooking: () => void }) {
  return (
    <div className="relative bg-ink border-t border-white/[0.05] overflow-x-hidden">

      <CredibilityStrip />

      <div className="h-px bg-white/[0.04]" />

      <HowItWorks onOpenBooking={onOpenBooking} />

      <div className="h-px bg-white/[0.04]" />

      <BentoSection />

      <div className="border-t border-white/[0.05]">
        <CrewSection />
      </div>

      <div className="border-t border-white/[0.05]">
        <TrustSection />
      </div>

      {/* Service Areas */}
      <div className="border-t border-white/[0.05]">
        <section id="areas" className="relative w-full py-16 sm:py-24 overflow-hidden">
          {/* MA constellation background */}
          <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
            <img
              src="https://d8j0ntlcm91z4.cloudfront.net/user_3DXXMZN9SbWqkGqaQ24QtDHNfxy/hf_20260610_195819_d3660ced-40c9-4063-8822-7a0e6248c110_min.webp"
              alt=""
              className="w-full h-full object-cover opacity-60"
              style={{ filter: 'brightness(0.85) saturate(1.1)' }}
            />
            {/* top/bottom fade into page bg */}
            <div className="absolute inset-x-0 top-0 h-32" style={{ background: 'linear-gradient(180deg, #050505 0%, transparent 100%)' }} />
            <div className="absolute inset-x-0 bottom-0 h-32" style={{ background: 'linear-gradient(0deg, #050505 0%, transparent 100%)' }} />
            {/* subtle amber vignette overlay */}
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(139,82,48,0.08) 0%, transparent 70%)' }} />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
            <Reveal from="bottom" className="mb-10 sm:mb-14 text-center">
              <p className="text-[10px] uppercase tracking-[0.28em] text-coffee-light font-semibold mb-3">
                Service areas
              </p>
              <h2 className="text-[clamp(28px,5vw,44px)] font-semibold tracking-tight text-white leading-tight">
                We move all of{' '}
                <span className="font-serif italic text-coffee-shimmer">Massachusetts.</span>
              </h2>
              <p className="mt-4 text-[14px] sm:text-[15px] text-white/40 max-w-lg leading-relaxed mx-auto">
                From Boston neighborhoods to the South Shore, MetroWest, and beyond — set your price and we confirm coverage instantly.
              </p>
            </Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
              {locations.map((loc) => (
                <Reveal key={loc.slug} from="bottom" distance={20} delay={0.03}>
                  <Link
                    href={`/${loc.slug}`}
                    className="group flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-[13px] font-medium text-white/60 hover:text-white/90 hover:border-white/[0.14] hover:bg-white/[0.04] transition-all duration-300"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full shrink-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: '#8B5230' }}
                      aria-hidden
                    />
                    {loc.city}
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* FAQ */}
      <div className="border-t border-white/[0.05]">
        <FAQSection />
      </div>

      {/* Final CTA */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.75, ease: EASE_OUT }}
        className="border-t border-white/[0.05] w-full px-6 sm:px-16 py-16 sm:py-24"
        style={{
          background: 'linear-gradient(145deg, rgba(107,58,31,0.2) 0%, rgba(42,20,5,0.36) 45%, rgba(5,5,5,0.58) 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.28em] text-coffee-light font-semibold mb-5">Boston moving season</p>
          <h2 className="text-[clamp(28px,5.5vw,52px)] font-semibold tracking-tight text-white leading-[1.06] mb-4 max-w-xl">
            May through September
            <br />
            <span className="font-serif italic text-coffee-shimmer">
              is the busiest stretch.
            </span>
          </h2>
          <p className="text-[14px] sm:text-[15px] text-white/38 max-w-md leading-relaxed mb-10">
            Availability fills fast when leases turn over. Tell us your dates, set your budget, and we confirm the same day.
          </p>
          <button
            type="button"
            onClick={onOpenBooking}
            className="group inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full bg-white text-ink font-medium active:scale-[0.97]"
            style={{ transition: 'transform 500ms cubic-bezier(0.32,0.72,0,1)' }}
          >
            <span className="text-[15px] tracking-tight">Book your move</span>
            <span
              className="w-11 h-11 rounded-full bg-ink/10 flex items-center justify-center group-hover:translate-x-[2px] group-hover:-translate-y-[1px]"
              style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.5)', transition: 'transform 500ms cubic-bezier(0.32,0.72,0,1)' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
      </motion.div>

    </div>
  )
}
