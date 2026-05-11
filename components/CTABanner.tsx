'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

export default function CTABanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="w-full py-20 sm:py-28"
      style={{ background: 'linear-gradient(135deg, #E87020 0%, #C55E15 100%)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="container-max text-center"
      >
        <h2 className="font-playfair font-bold text-4xl sm:text-5xl text-white mb-4">
          Ready to Make Your Move?
        </h2>
        <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-xl mx-auto font-lato">
          Get your free quote now — no commitment, no stress.
        </p>
        <Link
          href="/quote"
          className="inline-block px-10 py-4 bg-white text-orange-brand font-bold font-montserrat rounded-lg hover:bg-neutral-cream hover:shadow-2xl transition-all duration-300 active:scale-95 text-lg"
        >
          Get My Free Quote
        </Link>
      </motion.div>
    </section>
  )
}
