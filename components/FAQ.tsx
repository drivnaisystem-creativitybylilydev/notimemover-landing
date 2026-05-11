'use client'

import { useState } from 'react'
import { Plus, Minus } from '@phosphor-icons/react'

const faqs = [
  {
    question: 'How far in advance should I book my move?',
    answer: 'We recommend booking at least 2 weeks in advance, especially for weekend or end-of-month moves. That said, we do our best to accommodate last-minute requests — give us a call and we\'ll see what we can do.',
  },
  {
    question: 'Are you licensed and insured?',
    answer: 'Yes. NoTimeMoving is fully licensed and insured. Your belongings are protected throughout the entire move.',
  },
  {
    question: 'Do you disassemble and reassemble furniture?',
    answer: 'Yes, our team handles basic furniture disassembly and reassembly as part of our service — beds, desks, shelving units, and more.',
  },
  {
    question: 'What areas do you serve?',
    answer: 'We currently serve Massachusetts and surrounding areas. Contact us to confirm whether we cover your specific route.',
  },
  {
    question: 'How is pricing determined?',
    answer: 'Pricing is based on the size of your home, the distance of your move, and any additional services required. Get a free quote in under 3 minutes using our quote form.',
  },
  {
    question: 'What if my move date changes?',
    answer: 'Life happens. Just give us a call as early as possible and we\'ll work with you to reschedule at no extra charge, subject to availability.',
  },
  {
    question: 'Do you provide packing services?',
    answer: 'We focus on the move itself — loading, transport, and unloading. If you need help with packing, let us know and we can discuss options.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-20 sm:py-28 bg-cream">
      <div className="container-max max-w-3xl">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full border border-orange-brand/30 text-orange-brand text-sm font-semibold font-montserrat mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-bold text-brown-dark mb-4">
            Common Questions
          </h2>
          <p className="text-gray-500 text-lg font-lato">
            Everything you need to know before your move.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold font-montserrat text-brown-dark">{faq.question}</span>
                {open === i
                  ? <Minus size={20} className="text-orange-brand flex-shrink-0" />
                  : <Plus size={20} className="text-orange-brand flex-shrink-0" />
                }
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-gray-500 font-lato leading-relaxed border-t border-gray-50 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
