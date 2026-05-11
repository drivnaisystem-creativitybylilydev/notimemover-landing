'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from '@phosphor-icons/react'

interface Testimonial {
  name: string
  quote: string
  rating: number
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Johnson',
    quote: 'NoTimeMoving made our cross-country move stress-free. Professional team, quick response, and fair pricing.',
    rating: 5,
    avatar: '🎨',
  },
  {
    name: 'Mike Chen',
    quote: 'Best moving experience ever. They handled our antique furniture with care. Highly recommended!',
    rating: 5,
    avatar: '🏢',
  },
  {
    name: 'Emma Davis',
    quote: 'Fast, reliable, and trustworthy. Exactly what they promised. Will use them again for my next move.',
    rating: 5,
    avatar: '👤',
  },
  {
    name: 'James Wilson',
    quote: 'Exceptional service from start to finish. The team went above and beyond to ensure everything was perfect.',
    rating: 5,
    avatar: '💼',
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="testimonials" ref={ref} className="w-full py-20 sm:py-32 bg-white">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-brown-dark mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-brown-dark/70 max-w-2xl mx-auto font-lato">
            Real reviews from families and businesses we've helped move
          </p>
        </motion.div>

        <motion.div
          className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex-shrink-0 w-full sm:w-96 bg-cream rounded-2xl p-8 border-2 border-brown-dark/10 snap-start"
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(232, 112, 32, 0.1)' }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-orange-brand/20 flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="text-brown-dark font-montserrat font-bold">
                    {testimonial.name}
                  </h4>
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} size={16} weight="fill" className="text-orange-brand" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-brown-dark/80 font-lato leading-relaxed italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
