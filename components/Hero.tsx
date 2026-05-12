'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import StickFigures from '@/components/StickFigures'
import BookingFlow from '@/components/BookingFlow'

export default function Hero() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <>
      <section className="relative min-h-[100svh] flex flex-col bg-ink overflow-hidden">
        {/* Top bar */}
        <header className="relative z-10 px-5 sm:px-10 pt-6 sm:pt-8 flex items-center justify-between">
          <div className="text-white text-lg sm:text-xl font-extrabold tracking-tight">
            <span className="text-white">NoTime</span>
            <span className="text-coffee-light">Mover</span>
          </div>
          <button
            type="button"
            onClick={() => setBookingOpen(true)}
            className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-full bg-white text-ink text-sm font-semibold hover:bg-bone transition-colors active:scale-[0.98]"
          >
            Get a Quote
          </button>
        </header>

        {/* Center content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-6">
          <motion.h1
            className="font-extrabold tracking-[-0.04em] leading-[0.95] text-white"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            <span className="block text-[clamp(48px,11vw,112px)]">Move Anywhere.</span>
            <span className="block text-[clamp(40px,10vw,96px)] text-coffee-light mt-1 sm:mt-2">
              You Set The Price.
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 sm:mt-8 max-w-md text-white/55 text-base sm:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Tell us where, set your budget, and book your move in 60 seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-8 sm:mt-10"
          >
            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-white text-ink text-base sm:text-lg font-semibold hover:bg-bone transition-all active:scale-[0.98] shadow-2xl"
            >
              Get a Quote
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
            </button>
          </motion.div>
        </div>

        {/* Stick figures pinned to bottom */}
        <motion.div
          className="relative z-0 w-full pointer-events-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
        >
          <StickFigures className="w-full h-[150px] sm:h-[200px] md:h-[240px] max-w-3xl mx-auto" />
        </motion.div>

        {/* Subtle radial vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 30%, rgba(75,46,30,0.15) 0%, rgba(0,0,0,0) 60%)',
          }}
        />
      </section>

      <BookingFlow isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
