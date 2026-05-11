'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CaretDown } from '@phosphor-icons/react'

export default function HeroScrollSection() {
  return (
    <div className="h-screen overflow-hidden">
      <div className="relative h-full">

        <div className="absolute inset-0">
          <img src="/hero-bg.png" alt="" className="w-full h-full object-cover object-center" />
        </div>
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <motion.div
            className="text-center max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-montserrat font-bold mb-4 sm:mb-6 leading-tight drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              We Move You Fast.
              <br />
              <span className="text-orange-brand drop-shadow-lg">No Time Wasted.</span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-xl text-white/90 mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto font-lato drop-shadow px-2 sm:px-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Serving families and businesses with speed, care, and faith.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link
                href="/quote"
                className="px-8 py-4 bg-orange-brand text-white font-montserrat font-semibold rounded-lg shadow-xl hover:shadow-2xl hover:bg-orange-brand/90 hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
              >
                Book Your Move
              </Link>
              <a
                href="#services"
                className="px-8 py-4 border-2 border-white text-white font-montserrat font-semibold rounded-lg hover:bg-white hover:text-brown-dark transition-all duration-300 active:scale-95"
              >
                Learn More
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-white/60 text-sm font-lato tracking-widest uppercase">Scroll down</span>
            <CaretDown size={28} weight="fill" className="text-white/70" />
          </motion.div>
        </div>

      </div>
    </div>
  )
}
