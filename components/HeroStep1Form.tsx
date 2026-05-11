'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import LocationAutocomplete from '@/components/LocationAutocomplete'

const inputClass = "w-full px-4 py-3 text-sm border-2 border-neutral-sand rounded-lg focus:border-orange-brand focus:outline-none transition-colors bg-white text-brown-dark placeholder:text-gray-400"

export default function HeroStep1Form() {
  const router = useRouter()
  const [form, setForm] = useState({ movingFrom: '', movingTo: '', moveDate: '' })

  const isValid = form.movingFrom && form.movingTo && form.moveDate

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    sessionStorage.setItem('ntm_quote_step1', JSON.stringify(form))
    router.push('/quote')
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md lg:max-w-full">
      <p className="text-xs font-semibold font-montserrat text-orange-brand uppercase tracking-widest mb-1">
        Free Quote — 60 Seconds
      </p>
      <h3 className="text-xl font-bold font-montserrat text-brown-dark mb-5">
        Where are you moving?
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold font-montserrat text-neutral-muted uppercase tracking-wide mb-1.5">
            Moving From
          </label>
          <LocationAutocomplete
            name="movingFrom"
            value={form.movingFrom}
            placeholder="City, State"
            className={inputClass}
            onChange={val => setForm(prev => ({ ...prev, movingFrom: val }))}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold font-montserrat text-neutral-muted uppercase tracking-wide mb-1.5">
            Moving To
          </label>
          <LocationAutocomplete
            name="movingTo"
            value={form.movingTo}
            placeholder="City, State"
            className={inputClass}
            onChange={val => setForm(prev => ({ ...prev, movingTo: val }))}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold font-montserrat text-neutral-muted uppercase tracking-wide mb-1.5">
            Move Date
          </label>
          <input
            type="date"
            name="moveDate"
            value={form.moveDate}
            onChange={e => setForm(prev => ({ ...prev, moveDate: e.target.value }))}
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="w-full py-3.5 bg-orange-brand text-white font-bold font-montserrat rounded-lg shadow-lg hover:bg-brand-orange-dark hover:shadow-xl transition-all duration-300 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
        >
          Get My Free Quote →
        </button>
      </form>

      <p className="text-center text-xs text-neutral-muted font-lato mt-3">
        No commitment. We respond within 30 minutes.
      </p>
    </div>
  )
}
