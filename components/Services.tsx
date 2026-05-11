'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { Truck, MapPin, Package, Storefront, Wrench, Lightning } from '@phosphor-icons/react'

interface Service {
  title: string
  description: string
  icon: React.ReactNode
}

const services: Service[] = [
  {
    title: 'Local Moves',
    description: 'Fast, reliable local moves within Connecticut. Same-day quotes and flexible scheduling.',
    icon: <Truck size={40} weight="duotone" />,
  },
  {
    title: 'Long Distance',
    description: 'Cross-state moves with professional handling, real-time updates, and full insurance coverage.',
    icon: <MapPin size={40} weight="duotone" />,
  },
  {
    title: 'Commercial Moves',
    description: 'Office and business relocations handled efficiently — minimal downtime, maximum care.',
    icon: <Storefront size={40} weight="duotone" />,
  },
  {
    title: 'Packing & Unpacking',
    description: 'We pack, wrap, and unpack your belongings so you can focus on settling in.',
    icon: <Package size={40} weight="duotone" />,
  },
  {
    title: 'Labor Only',
    description: 'Need extra hands? We load, unload, and carry — you handle the truck.',
    icon: <Wrench size={40} weight="duotone" />,
  },
  {
    title: 'Last-Minute Moves',
    description: 'Life happens fast. Call us and we will do everything we can to make it work.',
    icon: <Lightning size={40} weight="duotone" />,
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
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" ref={ref} className="w-full py-20 sm:py-28 bg-neutral-cream">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-bold text-brown-dark mb-4">
            Everything You Need for a Smooth Move
          </h2>
          <p className="text-lg text-neutral-muted max-w-2xl mx-auto font-lato">
            From single rooms to full offices — handled carefully, every time.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.10)' }}
              className="group relative p-8 rounded-xl bg-white border border-neutral-sand shadow-sm hover:border-l-4 hover:border-l-orange-brand transition-all duration-300 cursor-pointer"
            >
              <div className="text-brown-dark mb-5 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold font-montserrat text-brown-dark mb-3">
                {service.title}
              </h3>
              <p className="text-neutral-muted font-lato leading-relaxed mb-5 text-sm">
                {service.description}
              </p>
              <a href="/quote" className="text-orange-brand font-semibold font-montserrat text-sm flex items-center gap-1 hover:gap-2 transition-all">
                Learn More →
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
