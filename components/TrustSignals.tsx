'use client'

import { Clock, ShieldCheck, Percent } from '@phosphor-icons/react'

interface Signal {
  icon: React.ReactNode
  title: string
  description: string
}

export default function TrustSignals() {
  const signals: Signal[] = [
    {
      icon: <Clock size={32} weight="duotone" className="text-secondary-600" />,
      title: '24-Hour Response',
      description: 'Get a quote within 24 hours, guaranteed',
    },
    {
      icon: <ShieldCheck size={32} weight="duotone" className="text-secondary-600" />,
      title: 'Licensed & Insured',
      description: 'All movers are professionally licensed and fully insured',
    },
    {
      icon: <Percent size={32} weight="duotone" className="text-secondary-600" />,
      title: 'Best Price Guarantee',
      description: 'We&apos;ll match any competing quote. Always.',
    },
  ]

  return (
    <section className="py-20 sm:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-50 rounded-full blur-3xl opacity-40 -z-10"></div>

      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {signals.map((signal, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl border border-gray-100/80 hover:border-secondary-200 hover:shadow-xl transition-all duration-300 bg-white hover:bg-gradient-to-br hover:from-white hover:to-secondary-50/30"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1 transform group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300">
                  {signal.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {signal.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-[45ch]">
                    {signal.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
