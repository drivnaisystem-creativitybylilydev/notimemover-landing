'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const MassMapBackground = dynamic(() => import('@/components/MassMapBackground'), { ssr: false })

const SPRING = [0.32, 0.72, 0, 1] as const

const FAQ_ITEMS = [
  {
    q: 'How does pricing work?',
    a: 'You choose a budget range in the flow. We show clear tier options based on home size and route—nothing hidden on the confirmation screen.',
  },
  {
    q: 'Where do you move?',
    a: 'We’re focused on Massachusetts moves—Greater Boston and surrounding regions. Submit your pickup and dropoff either way; we’ll confirm coverage when we reach out.',
  },
  {
    q: 'How fast do you respond?',
    a: 'We aim to reply quickly during business hours. Leave a phone number you answer—we’ll coordinate timing and details there.',
  },
  {
    q: 'Do I pay online?',
    a: 'This site collects your request first. Payment terms are confirmed directly before move day—we’ll spell out deposits when we talk.',
  },
] as const

const MA_FLOW_ITEMS = [
  'Boston',
  'Cambridge',
  'Somerville',
  'Brookline',
  'Newton',
  'Quincy',
  'Lexington',
  'Arlington',
  'Malden',
  'Medford',
  'Framingham',
  'Worcester',
  'Lowell',
  'Lawrence',
  'North Shore',
  'South Shore',
  'MetroWest',
  'Cape & Islands',
  'Pioneer Valley',
  'Berkshires',
  'Greater Springfield',
  'Natick',
  'Waltham',
  'Taunton',
  'Fall River',
  'Providence-adjacent',
  'Route 128 corridor',
  'I-495 ring',
  'Wellesley',
  'Needham',
] as const

const roadmapContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.06 },
  },
} as const

const roadmapItem = {
  hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: SPRING },
  },
} as const

function IconPin() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden className="text-coffee-light">
      <path
        d="M12 21s7-4.35 7-11a7 7 0 10-14 0c0 6.65 7 11 7 11z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.25" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

function IconHomeBudget() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden className="text-coffee-light">
      <path
        d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9 9h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function IconBook() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden className="text-coffee-light">
      <path
        d="M8 7h12M8 12h12M8 17h8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M6 4h13a2 2 0 012 2v14l-3-2-3 2-3-2-3 2V6a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function HorizontalTrack({ delay, pulse }: { delay: number; pulse: boolean }) {
  return (
    <motion.div
      className="hidden md:flex flex-1 items-center min-w-[32px] px-1 pt-[38px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, delay }}
    >
      <div className="relative h-[3px] w-full rounded-full bg-white/[0.07] overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 w-full rounded-full origin-left"
          style={{
            background: 'linear-gradient(90deg, rgba(107,58,31,0.2) 0%, rgba(139,82,48,0.95) 42%, rgba(107,58,31,0.35) 100%)',
            boxShadow: '0 0 14px rgba(107,58,31,0.45)',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.05, ease: SPRING, delay: delay + 0.08 }}
        />
        {pulse && (
          <motion.div
            className="absolute top-1/2 left-0 -translate-y-1/2 h-[9px] w-[9px] rounded-full bg-white/90 shadow-[0_0_12px_rgba(139,82,48,0.85)]"
            initial={{ x: '0%', opacity: 0 }}
            animate={{ x: ['0%', 'calc(100% - 9px)'], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 2.6,
              ease: 'easeInOut',
              delay: delay + 0.45,
              repeat: Infinity,
              repeatDelay: 1.8,
            }}
          />
        )}
      </div>
    </motion.div>
  )
}

function VerticalTrack({ delay }: { delay: number }) {
  return (
    <motion.div
      className="md:hidden flex justify-center py-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      <div className="relative w-[3px] h-14 rounded-full bg-white/[0.07] overflow-hidden">
        <motion.div
          className="absolute left-0 right-0 top-0 rounded-full origin-top"
          style={{
            height: '100%',
            background: 'linear-gradient(180deg, rgba(139,82,48,0.95) 0%, rgba(107,58,31,0.25) 100%)',
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.85, ease: SPRING, delay: delay + 0.06 }}
        />
      </div>
    </motion.div>
  )
}

function JourneyMap() {
  const reducedMotion = useReducedMotion()

  const stations = [
    {
      step: '01',
      title: 'Addresses',
      body: 'Pickup and dropoff—structured fields so quotes stay accurate.',
      icon: <IconPin />,
    },
    {
      step: '02',
      title: 'Size & budget',
      body: 'Home size and your target spend, with clear tier choices.',
      icon: <IconHomeBudget />,
    },
    {
      step: '03',
      title: 'Book',
      body: 'Contact info and your selected option—then we reach out fast.',
      icon: <IconBook />,
    },
  ] as const

  const pulseTracks = !reducedMotion

  const stationCard = (s: (typeof stations)[number]) => (
    <motion.div variants={roadmapItem} className="flex flex-col items-center text-center flex-1 min-w-0 px-2">
      <div
        className="relative mb-5 flex h-[76px] w-[76px] items-center justify-center rounded-[1.35rem] border border-white/[0.12]"
        style={{
          background:
            'linear-gradient(165deg, rgba(107,58,31,0.35) 0%, rgba(42,20,5,0.85) 55%, rgba(10,6,6,0.95) 100%)',
          boxShadow:
            'inset 0 1px 1px rgba(255,255,255,0.12), 0 0 40px -12px rgba(107,58,31,0.55)',
        }}
      >
        {s.icon}
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-ink px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/55 border border-white/10 whitespace-nowrap">
          Stop {s.step}
        </span>
      </div>
      <div className="text-[11px] uppercase tracking-[0.22em] text-white/38 font-semibold mb-2">{s.step}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
      <p className="text-[14px] text-white/48 leading-relaxed max-w-[280px]">{s.body}</p>
    </motion.div>
  )

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: SPRING }}
        className="text-center text-[13px] sm:text-[14px] text-white/45 leading-relaxed max-w-2xl mx-auto mb-10 sm:mb-12 px-2"
      >
        Tell us where you&rsquo;re going, set your home size and budget, then pick the option that fits—we follow up to lock timing and specifics on a quick call.
      </motion.p>

      {/* Desktop: horizontal route */}
      <motion.div
        variants={roadmapContainer}
        initial="hidden"
        animate="show"
        className="hidden md:flex w-full flex-row items-start justify-between gap-1"
      >
        {stationCard(stations[0])}
        <HorizontalTrack delay={0.12} pulse={pulseTracks} />
        {stationCard(stations[1])}
        <HorizontalTrack delay={0.26} pulse={pulseTracks} />
        {stationCard(stations[2])}
      </motion.div>

      {/* Mobile: vertical route */}
      <motion.div
        variants={roadmapContainer}
        initial="hidden"
        animate="show"
        className="md:hidden flex flex-col items-center"
      >
        {stationCard(stations[0])}
        <VerticalTrack delay={0.14} />
        {stationCard(stations[1])}
        <VerticalTrack delay={0.22} />
        {stationCard(stations[2])}
      </motion.div>

      {!reducedMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-x-8 top-[52px] hidden md:block h-[120px] opacity-[0.07]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.07 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 40%, rgba(107,58,31,0.5) 0%, transparent 35%), radial-gradient(circle at 80% 60%, rgba(75,46,30,0.4) 0%, transparent 40%)',
          }}
        />
      )}
    </div>
  )
}

function MassachusettsMarquee() {
  const reducedMotion = useReducedMotion()
  const loop = [...MA_FLOW_ITEMS, ...MA_FLOW_ITEMS]

  if (reducedMotion) {
    return (
      <div className="mt-10 rounded-2xl border border-white/[0.07] bg-black/20 px-5 py-6">
        <p className="text-[12px] uppercase tracking-[0.2em] text-white/35 mb-4 font-medium">Regions & corridors</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2.5">
          {[...MA_FLOW_ITEMS].slice(0, 18).map(label => (
            <span
              key={label}
              className="inline-flex items-center gap-2 text-[13px] font-medium tracking-tight text-white/45"
            >
              <span className="h-1 w-1 rounded-full bg-coffee-light/90" aria-hidden />
              {label}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative mt-10 rounded-2xl border border-white/[0.07] bg-black/20 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-20 sm:w-28 bg-gradient-to-r from-[#050505] via-[#050505]/95 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-12 sm:w-20 bg-gradient-to-l from-[#050505]/90 to-transparent"
        aria-hidden
      />
      <div
        className="flex flex-nowrap gap-x-10 sm:gap-x-14 py-5 pl-6 animate-mass-marquee-fast sm:animate-mass-marquee-slow will-change-transform"
        style={{ backfaceVisibility: 'hidden' }}
      >
        {loop.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="shrink-0 inline-flex items-center gap-3 text-[13px] sm:text-[14px] font-medium tracking-tight text-white/45 whitespace-nowrap"
          >
            <span className="h-1 w-1 rounded-full bg-coffee-light/90 shadow-[0_0_10px_rgba(107,58,31,0.55)]" aria-hidden />
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function LandingSections({ onOpenBooking }: { onOpenBooking: () => void }) {
  const [howOpen, setHowOpen] = useState(false)

  return (
    <div className="relative bg-ink border-t border-white/[0.06]">
      <section id="how-it-works" className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: SPRING }}
            className="max-w-3xl"
          >
            <p className="text-[11px] sm:text-[12px] uppercase tracking-[0.28em] text-coffee-light font-semibold mb-5">
              How it works
            </p>
            <h2 className="text-[clamp(30px,6.5vw,46px)] font-semibold tracking-tight text-white leading-[1.08]">
              Three steps. One straightforward booking flow.
            </h2>
          </motion.div>

          <motion.button
            type="button"
            onClick={() => setHowOpen(v => !v)}
            aria-expanded={howOpen}
            aria-controls="how-it-works-expanded"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08, ease: SPRING }}
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/[0.12] bg-white/[0.03] px-6 py-3 text-[14px] font-medium text-white/85 hover:bg-white/[0.06] hover:border-white/[0.18] transition-colors duration-300 ease-spring"
            style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.06)' }}
          >
            <span>{howOpen ? 'Hide booking route' : 'See the booking route'}</span>
            <motion.span animate={{ rotate: howOpen ? 180 : 0 }} transition={{ duration: 0.35, ease: SPRING }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
          </motion.button>
        </div>

        <AnimatePresence initial={false}>
          {howOpen && (
            <motion.div
              id="how-it-works-expanded"
              key="expanded"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.5, ease: SPRING }}
              className="mt-14 rounded-[1.75rem] border border-white/[0.08] bg-white/[0.02] px-5 py-10 sm:px-10 sm:py-12"
              style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)' }}
            >
              <JourneyMap />

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: SPRING, delay: 0.35 }}
                className="mt-14 flex justify-center"
              >
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="group inline-flex items-center gap-3 pl-8 pr-2 py-2 rounded-full bg-white text-ink font-medium transition-transform duration-500 ease-spring active:scale-[0.97]"
                >
                  <span className="text-[15px] tracking-tight">Book your move</span>
                  <span
                    className="w-11 h-11 rounded-full bg-ink/10 flex items-center justify-center transition-transform duration-500 ease-spring group-hover:translate-x-[2px] group-hover:-translate-y-[1px]"
                    style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.5)' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section id="areas" className="max-w-5xl mx-auto px-5 sm:px-8 pb-16 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: SPRING }}
          className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.02]"
          style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)' }}
        >
          {/* Animated Massachusetts map background */}
          <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
            <div className="absolute inset-0 opacity-80">
              <MassMapBackground />
            </div>
            {/* Left-to-right fade so text stays readable */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(90deg, #050505 0%, #050505 28%, rgba(5,5,5,0.82) 48%, transparent 72%)' }}
            />
            {/* Top + bottom edge fade */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(180deg, rgba(5,5,5,0.45) 0%, transparent 25%, transparent 70%, rgba(5,5,5,0.55) 100%)' }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 sm:p-10">
            <p className="text-[10px] uppercase tracking-[0.24em] text-coffee-light font-medium mb-3">
              Service areas
            </p>
            <h2 className="text-[clamp(22px,4vw,30px)] font-semibold tracking-tight text-white">
              Massachusetts-first coverage
            </h2>
            <p className="mt-4 text-[15px] text-white/50 leading-relaxed max-w-3xl">
              Based in <strong className="text-white/78 font-medium">Greater Boston</strong> and serving all of <strong className="text-white/78 font-medium">Massachusetts</strong>—city apartments, suburbs, college towns, and everywhere in between. Out-of-state moves are welcome too; just drop your addresses in the form and we&rsquo;ll confirm the details on the call.
            </p>
            <MassachusettsMarquee />
            <div className="mt-8">
              <button onClick={onOpenBooking} className="btn-primary">
                <span className="btn-primary-text">Get a free quote</span>
                <span className="btn-pocket" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="faq" className="max-w-5xl mx-auto px-5 sm:px-8 pb-20 sm:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: SPRING }}
        >
          <p className="text-[10px] uppercase tracking-[0.24em] text-coffee-light font-medium mb-3">
            FAQ
          </p>
          <h2 className="text-[clamp(26px,5vw,36px)] font-semibold tracking-tight text-white">
            Questions before you book
          </h2>
          <div className="mt-10 space-y-3">
            {FAQ_ITEMS.map(item => (
              <details
                key={item.q}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden"
              >
                <summary className="cursor-pointer list-none px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-4 text-left font-medium text-white text-[15px]">
                  {item.q}
                  <span className="text-white/35 group-open:rotate-180 transition-transform duration-300 shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 pb-4 sm:px-6 sm:pb-5 pt-0 text-[14px] text-white/50 leading-relaxed border-t border-white/[0.06]">
                  <p className="pt-4">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="max-w-5xl mx-auto px-5 sm:px-8 pb-24">
        <div
          className="rounded-[1.75rem] border border-white/[0.1] p-10 sm:p-12 text-center"
          style={{
            background:
              'linear-gradient(145deg, rgba(107,58,31,0.22) 0%, rgba(42,20,5,0.35) 45%, rgba(5,5,5,0.6) 100%)',
          }}
        >
          <h2 className="text-[clamp(22px,4vw,30px)] font-semibold tracking-tight text-white">
            Ready when you are.
          </h2>
          <p className="mt-3 text-[15px] text-white/55 max-w-lg mx-auto leading-relaxed">
            Same booking flow—pick your tier and we’ll follow up to confirm timing and specifics.
          </p>
          <button
            type="button"
            onClick={onOpenBooking}
            className="mt-8 inline-flex items-center gap-3 pl-8 pr-2 py-2 rounded-full bg-white text-ink font-medium transition-transform duration-500 ease-spring active:scale-[0.97]"
          >
            <span className="text-[15px] tracking-tight">Book your move</span>
            <span
              className="w-11 h-11 rounded-full bg-ink/10 flex items-center justify-center"
              style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.5)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </div>
      </section>
    </div>
  )
}
