'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Heart, ShieldCheck, CheckCircle, Truck } from '@phosphor-icons/react'

const values = [
  { icon: Heart, text: 'Faith-driven care in every move' },
  { icon: ShieldCheck, text: 'Fully licensed & insured' },
  { icon: CheckCircle, text: 'On time, every time' },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="py-20 sm:py-28 bg-neutral-cream">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Copy block */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-orange-brand/30 text-orange-brand text-sm font-semibold font-montserrat mb-6">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-bold text-brown-dark mb-6 leading-tight">
              Moving with Purpose,<br />Led by Faith
            </h2>
            <p className="text-neutral-muted font-lato leading-relaxed mb-4 text-lg">
              NoTimeMoving was built on a simple belief: that every family deserves a move handled with respect, speed, and genuine care. We are not just movers — we are neighbors serving neighbors.
            </p>
            <p className="text-neutral-muted font-lato leading-relaxed mb-8 text-lg">
              Based in Connecticut, our team brings professionalism and heart to every job, from single-room apartments to full commercial relocations.
            </p>

            {/* Faith pull-quote */}
            <blockquote className="border-l-4 border-orange-brand pl-5 mb-8">
              <p className="font-playfair italic text-orange-brand text-lg leading-relaxed">
                "Galatians 5:13 — Serve one another through love."
              </p>
            </blockquote>

            {/* Value bullets */}
            <ul className="space-y-3">
              {values.map(({ icon: Icon, text }, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Icon size={22} weight="fill" className="text-orange-brand flex-shrink-0" />
                  <span className="font-lato text-brown-dark">{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Photo placeholder — swap with real team photo when available */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="rounded-2xl overflow-hidden bg-neutral-linen border border-neutral-sand aspect-[4/3] flex items-center justify-center"
          >
            <div className="text-center text-neutral-muted p-10">
              <Truck size={72} weight="duotone" className="text-orange-brand/25 mx-auto mb-4" />
              <p className="font-lato text-sm">Team photo coming soon</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
