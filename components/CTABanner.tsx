'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

export default function CTABanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="w-full py-20 sm:py-32 bg-orange-brand">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="container-max text-center"
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl text-white font-montserrat font-bold mb-6">
          Ready to Move?
        </h2>
        <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-lato">
          Get your free moving quote in just 3 minutes. No obligations, no hassle.
        </p>
        <Link
          href="/quote"
          className="inline-block px-8 py-4 bg-white text-orange-brand font-semibold rounded-lg hover:bg-cream hover:shadow-2xl transition-all duration-300 active:scale-95"
        >
          Start Your Free Quote
        </Link>
      </motion.div>
    </section>
  )
}
