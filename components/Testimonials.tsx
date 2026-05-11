'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from '@phosphor-icons/react'

interface Testimonial {
  name: string
  city: string
  quote: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Johnson',
    city: 'Stamford, CT',
    quote: 'NoTimeMoving made our move completely stress-free. Professional team, quick response, and fair pricing. Could not have asked for more.',
    rating: 5,
  },
  {
    name: 'Mike Chen',
    city: 'New Haven, CT',
    quote: 'Best moving experience I have ever had. They handled our antique furniture with incredible care. Highly recommend to anyone in CT.',
    rating: 5,
  },
  {
    name: 'Emma Davis',
    city: 'Bridgeport, CT',
    quote: 'Fast, reliable, and trustworthy — exactly what they promised. The faith-driven values really show in how they treat your belongings.',
    rating: 5,
  },
  {
    name: 'James Wilson',
    city: 'Greenwich, CT',
    quote: 'Exceptional service from start to finish. The team went above and beyond to make sure everything was perfect on move day.',
    rating: 5,
  },
]

function initials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="testimonials" ref={ref} className="w-full py-20 sm:py-28 bg-white">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-bold text-brown-dark mb-4">
            Families Trust NoTimeMoving
          </h2>
          <p className="text-lg text-neutral-muted max-w-2xl mx-auto font-lato">
            Real reviews from families and businesses we have helped move.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-white border border-neutral-sand rounded-xl p-8 shadow-sm"
            >
              {/* Opening quote mark */}
              <span className="absolute top-4 left-6 font-playfair text-6xl leading-none text-brand-amber/60 pointer-events-none select-none">
                &ldquo;
              </span>

              <p className="text-neutral-body font-lato leading-relaxed text-base mb-6 pt-6">
                {t.quote}
              </p>

              <div className="flex items-center gap-3">
                {/* Initials avatar */}
                <div className="w-11 h-11 rounded-full bg-neutral-linen text-orange-brand font-bold font-montserrat flex items-center justify-center text-sm flex-shrink-0">
                  {initials(t.name)}
                </div>
                <div>
                  <p className="font-semibold font-montserrat text-brand-brown text-sm">{t.name}</p>
                  <p className="text-neutral-muted text-xs font-lato">{t.city}</p>
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={13} weight="fill" className="text-orange-brand" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
