'use client'

import { motion } from 'framer-motion'
import HeroStep1Form from '@/components/HeroStep1Form'

export default function HeroScrollSection() {
  return (
    <div className="min-h-screen overflow-hidden">
      <div className="relative min-h-screen">

        <div className="absolute inset-0">
          <img src="/hero-bg.png" alt="" className="w-full h-full object-cover object-center" />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(59,31,10,0.92) 0%, rgba(59,31,10,0.75) 55%, rgba(59,31,10,0.55) 100%)' }}
        />

        <div className="relative z-10 min-h-screen flex items-center px-6 sm:px-12 lg:px-20 py-32">
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left: Copy */}
            <div className="text-white">

              {/* Faith tagline */}
              <motion.p
                className="font-playfair italic text-brand-amber text-sm mb-5"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
              >
                Galatians 5:13 — Serve one another through love.
              </motion.p>

              <motion.h1
                className="font-playfair font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-5 leading-[1.1] drop-shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                We Move You{' '}
                <span className="text-brand-amber">Fast</span>
                <span className="text-brand-amber">.</span><br />
                Handled with{' '}
                <span className="text-brand-amber">Care</span>
                <span className="text-brand-amber">.</span>
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg text-neutral-linen mb-8 leading-relaxed max-w-lg font-lato"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                Faith-driven moving for Massachusetts families — same-day quotes,
                on-time crews, <span className="text-brand-amber font-semibold">zero stress</span>.
              </motion.p>


            </div>

            {/* Right: Step 1 form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <HeroStep1Form />
            </motion.div>

          </div>
        </div>

      </div>
    </div>
  )
}
