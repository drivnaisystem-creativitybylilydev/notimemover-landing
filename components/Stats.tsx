'use client'

import { useRef } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'

interface Stat {
  value: number
  label: string
  suffix: string
}

const stats: Stat[] = [
  { value: 500, label: 'Moves Completed', suffix: '+' },
  { value: 5, label: 'Average Rating', suffix: '★' },
  { value: 3, label: 'Hour Response Time', suffix: 'hr' },
  { value: 100, label: 'Licensed & Insured', suffix: '%' },
]

function CounterComponent({ value, label, suffix }: Stat) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const springValue = useSpring(0, {
    duration: 2000,
  })

  const displayValue = useTransform(springValue, (latest) =>
    Math.floor(latest)
  )

  if (isInView) {
    springValue.set(value)
  }

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="flex items-baseline gap-1">
        <motion.div className="text-5xl sm:text-6xl font-bold text-orange-brand font-montserrat">
          {displayValue}
        </motion.div>
        <span className="text-2xl text-orange-brand">{suffix}</span>
      </div>
      <p className="text-brown-dark/70 mt-4 font-lato text-center">{label}</p>
    </div>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="stats" ref={ref} className="w-full py-20 sm:py-32 bg-gradient-to-br from-cream via-white to-cream">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-brown-dark mb-4">
            By The Numbers
          </h2>
          <p className="text-lg text-brown-dark/70 max-w-2xl mx-auto font-lato">
            Trusted by thousands of families and businesses
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex justify-center"
            >
              <CounterComponent {...stat} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
