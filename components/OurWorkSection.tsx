'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useInView, animate as motionAnimate } from 'framer-motion'

const EASE_OUT = [0.25, 0.1, 0.25, 1] as const
const SPRING   = [0.32, 0.72, 0, 1]   as const
const SPEED    = 52 // px per second

const PHOTOS = [
  {
    src:      '/media/jobs/sofa-walkway-exterior.jpg',
    alt:      'NoTimeMover crew carrying a sectional sofa down a brick-paved driveway',
    label:    'Full-load haul',
    location: 'Suburban MA',
    wide:     true,
  },
  {
    src:      '/media/jobs/tv-move-action.jpg',
    alt:      'Two crew members carefully lowering a large flat-screen TV off its stand',
    label:    'Living room move',
    location: 'Greater Boston',
    wide:     false,
  },
  {
    src:      '/media/jobs/crew-hallway-delivery.jpg',
    alt:      'NoTimeMover crew rolling a loaded dolly through an upscale residential hallway',
    label:    'High-rise delivery',
    location: 'Boston, MA',
    wide:     false,
  },
  {
    src:      '/media/jobs/truck-interior-loaded.jpg',
    alt:      'Interior of a fully packed NoTimeMover moving truck',
    label:    'Loaded and ready',
    location: 'On route',
    wide:     true,
  },
  {
    src:      '/media/jobs/boxes-elevator-lobby.jpg',
    alt:      'Moving boxes stacked near an elevator lobby ready for delivery',
    label:    'Building drop',
    location: 'Floor 2',
    wide:     false,
  },
] as const

type Photo = typeof PHOTOS[number]

/* Duplicate for seamless loop */
const TRACK = [...PHOTOS, ...PHOTOS]

/* ── Single photo card ────────────────────────────────────── */
function PhotoCard({ photo, index }: { photo: Photo; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="relative shrink-0 rounded-2xl overflow-hidden"
      style={{
        width:  photo.wide ? 'clamp(280px, 27vw, 400px)' : 'clamp(200px, 18vw, 280px)',
        height: 'clamp(340px, 52vh, 560px)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.7, ease: SPRING }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          draggable={false}
          sizes="30vw"
          className="object-cover select-none pointer-events-none"
          style={{
            filter:     `brightness(${hovered ? 0.92 : 0.76}) contrast(1.07)`,
            transition: 'filter 500ms ease',
          }}
        />
      </motion.div>

      {/* Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.14) 44%, transparent 68%)',
        }}
      />

      {/* Amber border on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={
          hovered
            ? { boxShadow: 'inset 0 0 0 1.5px rgba(139,82,48,0.6)' }
            : { boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.07)' }
        }
        transition={{ duration: 0.25 }}
      />

      {/* Ghost index */}
      <span
        className="absolute top-4 left-4 text-[11px] font-semibold tabular-nums pointer-events-none"
        style={{ color: 'rgba(255,255,255,0.13)' }}
        aria-hidden
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Caption */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-5"
        animate={{ y: hovered ? 0 : 6, opacity: hovered ? 1 : 0.7 }}
        transition={{ duration: 0.35, ease: SPRING }}
      >
        <p
          className="text-[10px] uppercase tracking-[0.22em] font-semibold mb-1"
          style={{ color: 'rgba(192,112,64,0.9)' }}
        >
          {photo.location}
        </p>
        <p className="text-[15px] font-semibold text-white tracking-tight leading-snug">
          {photo.label}
        </p>
      </motion.div>
    </motion.div>
  )
}

/* ── Main export ──────────────────────────────────────────── */
export default function OurWorkSection({ onOpenBooking }: { onOpenBooking: () => void }) {
  const headerRef    = useRef<HTMLDivElement>(null)
  const trackRef     = useRef<HTMLDivElement>(null)
  const animRef      = useRef<{ stop: () => void } | null>(null)
  const isPaused     = useRef(false)
  const singleWidth  = useRef(0)

  const x           = useMotionValue(0)
  const headerInView = useInView(headerRef, { once: true, amount: 0.25 })

  /* Recursive smooth loop — pure transform, no overflow scroll */
  const runLoop = useCallback((fromX: number) => {
    const w = singleWidth.current
    if (!w) return
    const distance = Math.abs(-w - fromX)
    animRef.current?.stop()
    animRef.current = motionAnimate(x, -w, {
      duration: distance / SPEED,
      ease: 'linear',
      onComplete: () => {
        x.set(0)
        if (!isPaused.current) runLoop(0)
      },
    })
  }, [x])

  /* Measure and start after paint */
  useEffect(() => {
    if (!trackRef.current) return
    singleWidth.current = trackRef.current.scrollWidth / 2
    runLoop(0)
    return () => animRef.current?.stop()
  }, [runLoop])

  const pause = () => {
    isPaused.current = true
    animRef.current?.stop()
  }
  const resume = () => {
    isPaused.current = false
    runLoop(x.get())
  }

  return (
    <section className="border-t border-white/[0.05]">

      {/* ── Header ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-16 sm:pt-24 pb-12 text-center">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.65, ease: EASE_OUT }}
        >
          <p className="text-[10px] uppercase tracking-[0.28em] text-coffee-light font-semibold mb-4">
            Our work across Massachusetts
          </p>
          <h2 className="text-[clamp(30px,5vw,52px)] font-semibold tracking-tight text-white leading-[1.05]">
            Our crew at work.
          </h2>
        </motion.div>
      </div>

      {/* ── Auto-scroll marquee — no overflow, pure transform ── */}
      <div
        className="relative"
        style={{ contain: 'paint' }}
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        {/* Amber-tinted left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-28 sm:w-40 z-10 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, #050505 20%, rgba(42,20,5,0.82) 55%, transparent 100%)',
          }}
          aria-hidden
        />
        {/* Amber-tinted right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-28 sm:w-40 z-10 pointer-events-none"
          style={{
            background:
              'linear-gradient(to left, #050505 20%, rgba(42,20,5,0.82) 55%, transparent 100%)',
          }}
          aria-hidden
        />

        {/* Track — translateX only, never changes overflow */}
        <motion.div
          ref={trackRef}
          className="flex gap-4 sm:gap-5 py-3"
          style={{ x, width: 'max-content' }}
        >
          {TRACK.map((photo, i) => (
            <PhotoCard
              key={`${photo.src}-${i}`}
              photo={photo}
              index={i % PHOTOS.length}
            />
          ))}
        </motion.div>
      </div>

      {/* ── Bottom copy + CTA ──────────────────────────────── */}
      <div className="border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 sm:gap-12">

            {/* Statement copy */}
            <div className="space-y-1">
              <p
                className="font-semibold text-white tracking-tight leading-[1.1]"
                style={{ fontSize: 'clamp(22px, 2.8vw, 40px)' }}
              >
                Real photos from real jobs
              </p>
              <p
                className="font-semibold tracking-tight leading-[1.1]"
                style={{ fontSize: 'clamp(22px, 2.8vw, 40px)' }}
              >
                <span style={{ color: 'rgba(255,255,255,0.32)' }}>
                  across Greater Boston.
                </span>
              </p>
              <p
                className="font-semibold tracking-tight leading-[1.1]"
                style={{ fontSize: 'clamp(22px, 2.8vw, 40px)' }}
              >
                <span style={{ color: 'rgba(255,255,255,0.32)' }}>
                  No staging, no stock{' '}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.32)' }}>photos.</span>
              </p>
            </div>

            {/* CTA — bottom-aligned with last line of copy */}
            <div className="shrink-0 sm:pb-[3px]">
              <button
                type="button"
                onClick={onOpenBooking}
                className="group inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full bg-white text-ink font-medium active:scale-[0.97]"
                style={{ transition: 'transform 500ms cubic-bezier(0.32,0.72,0,1)' }}
              >
                <span className="text-[15px] tracking-tight">Get my instant quote</span>
                <span
                  className="w-11 h-11 rounded-full bg-ink/10 flex items-center justify-center group-hover:translate-x-[2px] group-hover:-translate-y-[1px]"
                  style={{
                    boxShadow:  'inset 0 1px 1px rgba(255,255,255,0.5)',
                    transition: 'transform 500ms cubic-bezier(0.32,0.72,0,1)',
                  }}
                >
                  <svg
                    width="15" height="15" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor"
                    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
