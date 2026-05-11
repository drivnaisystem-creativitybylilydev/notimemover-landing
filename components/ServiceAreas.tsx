'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const areas = [
  'Boston', 'Worcester', 'Springfield', 'Cambridge', 'Lowell',
  'Brockton', 'Quincy', 'Lynn', 'New Bedford', 'Fall River',
  'Newton', 'Somerville', 'Lawrence', 'Framingham', 'Haverhill',
  'Waltham', 'Malden', 'Brookline', 'Plymouth', 'Medford',
]

export default function ServiceAreas() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="service-areas" ref={ref} className="py-16 sm:py-20 bg-neutral-linen">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-brown-dark mb-3">
            Serving Massachusetts and Surrounding Areas
          </h2>
          <p className="text-neutral-muted font-lato">
            Not sure if we cover your location? Give us a call — we will make it work.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {areas.map((area, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.03 }}
              className="px-4 py-2 rounded-full bg-white border border-neutral-sand text-sm font-medium font-montserrat text-brand-brown shadow-sm"
            >
              {area}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
