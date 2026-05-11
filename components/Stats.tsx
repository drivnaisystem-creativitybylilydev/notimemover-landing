'use client'

import { ShieldCheck, Lightning, Heart, ClipboardText } from '@phosphor-icons/react'

const promises = [
  { icon: Lightning, label: 'Same-Day Quotes' },
  { icon: ShieldCheck, label: 'Licensed & Insured' },
  { icon: Heart, label: 'Faith-Driven Service' },
  { icon: ClipboardText, label: 'Free Estimates' },
]

export default function Stats() {
  return (
    <section className="w-full border-y border-neutral-sand bg-neutral-linen">
      <div className="container-max">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-neutral-sand">
          {promises.map(({ icon: Icon, label }, i) => (
            <div key={i} className="flex items-center justify-center gap-2.5 py-5 px-4">
              <Icon size={20} weight="fill" className="text-orange-brand flex-shrink-0" />
              <span className="text-sm font-semibold font-montserrat text-brand-brown">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
