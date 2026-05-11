'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { Truck, Package, MapPin } from '@phosphor-icons/react'

interface Service {
  title: string
  description: string
  icon: React.ReactNode
}

const services: Service[] = [
  {
    title: 'Local Moving',
    description: 'Fast, reliable local moves within your region. Same-day quotes and flexible scheduling.',
    icon: <Truck size={48} weight="duotone" />,
  },
  {
    title: 'Long Distance',
    description: 'Cross-country moves with professional handling. Real-time tracking and full insurance coverage.',
    icon: <MapPin size={48} weight="duotone" />,
  },
  {
    title: 'Packing & Storage',
    description: 'Complete packing services and secure storage solutions. Climate-controlled facilities.',
    icon: <Package size={48} weight="duotone" />,
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" ref={ref} className="w-full py-20 sm:py-32 bg-cream">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-brown-dark mb-4">
            Our Services
          </h2>
          <p className="text-lg text-brown-dark/70 max-w-2xl mx-auto font-lato">
            Comprehensive moving solutions tailored to your needs
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ rotateX: 5, rotateY: 5, scale: 1.02 }}
              style={{
                perspective: '1000px',
              }}
              className="group relative p-8 rounded-2xl bg-white border-2 border-brown-dark/10 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-orange-brand mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl text-brown-dark mb-4">
                  {service.title}
                </h3>
                <p className="text-brown-dark/70 font-lato leading-relaxed mb-6">
                  {service.description}
                </p>
                <a
                  href="/quote"
                  className="text-orange-brand font-semibold hover:gap-2 flex items-center gap-1 transition-all"
                >
                  Learn More →
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
