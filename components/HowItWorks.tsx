'use client'

import { ClipboardText, Phone, Truck } from '@phosphor-icons/react'

const steps = [
  {
    number: '01',
    icon: ClipboardText,
    title: 'Get Your Quote',
    description: 'Fill out our quick 3-step form with your move details. No obligations, no hassle.',
    badge: '~3 minutes',
    badgeColor: 'bg-orange-brand/10 text-orange-brand',
  },
  {
    number: '02',
    icon: Phone,
    title: 'We Reach Out',
    description: 'A moving specialist will contact you to confirm details and answer any questions.',
    badge: 'Within 24 hours',
    badgeColor: 'bg-brown-dark/10 text-brown-dark',
  },
  {
    number: '03',
    icon: Truck,
    title: 'We Move You',
    description: 'Our professional team shows up on time and handles your move with care and speed.',
    badge: 'On your schedule',
    badgeColor: 'bg-orange-brand/10 text-orange-brand',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="container-max">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-orange-brand/30 text-orange-brand text-sm font-semibold font-montserrat mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-bold text-brown-dark mb-4">
            Moving Made Simple
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto font-lato">
            From quote to move day — we make every step easy.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Connecting line desktop */}
          <div className="hidden md:block absolute top-16 h-px bg-gradient-to-r from-transparent via-orange-brand/30 to-transparent z-0" style={{ left: '18%', right: '18%' }} />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-2xl bg-orange-brand/8 flex items-center justify-center">
                    <Icon size={52} weight="duotone" className="text-orange-brand" />
                  </div>
                  <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-orange-brand text-white text-sm font-bold font-montserrat flex items-center justify-center shadow-md">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-montserrat text-brown-dark mb-3">{step.title}</h3>
                <p className="text-gray-500 font-lato leading-relaxed mb-4 max-w-xs">{step.description}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold font-montserrat ${step.badgeColor}`}>
                  {step.badge}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
