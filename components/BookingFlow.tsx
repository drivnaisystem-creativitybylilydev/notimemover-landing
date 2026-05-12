'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LocationAutocomplete from '@/components/LocationAutocomplete'
import {
  TIERS,
  TierKey,
  BUDGET_MIN,
  BUDGET_MAX,
  calculatePricing,
  formatUSD,
} from '@/lib/pricing'
import { getMiles } from '@/lib/distance'

interface Props {
  isOpen: boolean
  onClose: () => void
}

type PriceTier = 'save' | 'yourPrice' | 'premium'

interface FormState {
  pickup: string
  dropoff: string
  miles: number
  size: TierKey | ''
  budget: number
  selectedTier: PriceTier | ''
  name: string
  email: string
  phone: string
}

const TOTAL_STEPS = 5

const initialState: FormState = {
  pickup: '',
  dropoff: '',
  miles: 0,
  size: '',
  budget: 400,
  selectedTier: '',
  name: '',
  email: '',
  phone: '',
}

export default function BookingFlow({ isOpen, onClose }: Props) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormState>(initialState)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) tryClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, step])

  const reset = () => {
    setStep(1)
    setForm(initialState)
    setSubmitting(false)
    setSubmitted(false)
  }

  const tryClose = () => {
    if (submitted) {
      onClose()
      setTimeout(reset, 300)
      return
    }
    if (step > 1 && !window.confirm('Close this quote? Your progress will be lost.')) return
    onClose()
    setTimeout(reset, 300)
  }

  const pricing = useMemo(() => {
    if (!form.size) return null
    return calculatePricing(form.size, form.miles, form.budget)
  }, [form.size, form.miles, form.budget])

  const next = async () => {
    if (step === 1) {
      const miles = await getMiles(form.pickup, form.dropoff)
      setForm(f => ({ ...f, miles }))
      setStep(2)
      return
    }
    if (step === 2 && form.size) {
      setForm(f => ({ ...f, budget: TIERS[f.size as TierKey].defaultBudget }))
      setStep(3)
      return
    }
    setStep(s => Math.min(s + 1, TOTAL_STEPS))
  }

  const back = () => setStep(s => Math.max(s - 1, 1))

  const canAdvance =
    (step === 1 && !!form.pickup && !!form.dropoff) ||
    (step === 2 && !!form.size) ||
    (step === 3) ||
    (step === 4 && !!form.selectedTier) ||
    (step === 5 && !!form.name && /\S+@\S+\.\S+/.test(form.email) && form.phone.replace(/\D/g, '').length >= 10)

  const submit = async () => {
    setSubmitting(true)
    const payload = {
      pickup: form.pickup,
      dropoff: form.dropoff,
      miles: form.miles,
      size: form.size,
      sizeLabel: form.size ? TIERS[form.size as TierKey].label : '',
      budget: form.budget,
      selectedTier: form.selectedTier,
      finalPrice: form.selectedTier && pricing ? pricing[form.selectedTier as keyof typeof pricing] : null,
      name: form.name,
      email: form.email,
      phone: form.phone,
      submittedAt: new Date().toISOString(),
    }
    console.log('[NoTimeMover] Lead submitted:', payload)
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {})
    } catch {}
    await new Promise(r => setTimeout(r, 600))
    setSubmitting(false)
    setSubmitted(true)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-stretch sm:items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={tryClose}
      >
        <motion.div
          key="sheet"
          className="relative w-full sm:max-w-lg sm:rounded-3xl bg-ink border border-line shadow-2xl flex flex-col h-screen sm:h-auto sm:max-h-[90vh] overflow-hidden"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 240 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-5 pt-5 pb-3 sm:px-7 sm:pt-7">
            {step > 1 && !submitted ? (
              <button
                type="button"
                onClick={back}
                aria-label="Back"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
              </button>
            ) : <div className="w-9 h-9" />}
            <div className="flex-1 text-center text-xs uppercase tracking-[0.2em] text-white/50 font-medium">
              {submitted ? 'Confirmed' : `Step ${step} of ${TOTAL_STEPS}`}
            </div>
            <button
              type="button"
              onClick={tryClose}
              aria-label="Close"
              className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          {/* Progress bar */}
          {!submitted && (
            <div className="px-5 sm:px-7">
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-coffee-deep"
                  initial={false}
                  animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
              </div>
            </div>
          )}

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-8">
            <AnimatePresence mode="wait" initial={false}>
              {submitted ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-coffee-deep flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-3">You&rsquo;re booked.</h2>
                  <p className="text-white/70 mb-1">We&rsquo;ll be in touch shortly to confirm the details.</p>
                  {form.selectedTier && pricing && (
                    <p className="text-white/50 text-sm mt-6">
                      Locked in at <span className="text-white font-semibold">{formatUSD(pricing[form.selectedTier as keyof typeof pricing])}</span>
                    </p>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key={`step-${step}`}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  {step === 1 && <Step1 form={form} setForm={setForm} />}
                  {step === 2 && <Step2 form={form} setForm={setForm} />}
                  {step === 3 && <Step3 form={form} setForm={setForm} />}
                  {step === 4 && <Step4 form={form} setForm={setForm} pricing={pricing} />}
                  {step === 5 && <Step5 form={form} setForm={setForm} />}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          {!submitted && (
            <div className="px-5 sm:px-7 pb-6 pt-2 sm:pb-7 bg-ink border-t border-line/40">
              {step < TOTAL_STEPS ? (
                <button
                  type="button"
                  onClick={next}
                  disabled={!canAdvance}
                  className="w-full py-4 rounded-2xl bg-white text-ink font-semibold text-base hover:bg-bone transition-colors active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {step === 3 ? 'See Pricing' : 'Continue'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  disabled={!canAdvance || submitting}
                  className="w-full py-4 rounded-2xl bg-white text-ink font-semibold text-base hover:bg-bone transition-colors active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Sending…' : 'Submit Request'}
                </button>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ---------- STEPS ---------- */

function StepHeader({ kicker, title, sub }: { kicker?: string; title: string; sub?: string }) {
  return (
    <div className="mb-7">
      {kicker && <p className="text-xs uppercase tracking-[0.2em] text-coffee-light font-semibold mb-2">{kicker}</p>}
      <h2 className="text-3xl font-bold leading-tight">{title}</h2>
      {sub && <p className="text-white/60 mt-2 text-sm">{sub}</p>}
    </div>
  )
}

function Step1({ form, setForm }: { form: FormState; setForm: React.Dispatch<React.SetStateAction<FormState>> }) {
  return (
    <div>
      <StepHeader title="Where are you moving?" sub="Enter pickup and dropoff addresses." />
      <div className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-white/40 mb-2 font-semibold">Pickup</label>
          <LocationAutocomplete
            name="pickup"
            value={form.pickup}
            placeholder="Pickup address"
            onChange={v => setForm(f => ({ ...f, pickup: v }))}
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-white/40 mb-2 font-semibold">Dropoff</label>
          <LocationAutocomplete
            name="dropoff"
            value={form.dropoff}
            placeholder="Dropoff address"
            onChange={v => setForm(f => ({ ...f, dropoff: v }))}
          />
        </div>
      </div>
    </div>
  )
}

function Step2({ form, setForm }: { form: FormState; setForm: React.Dispatch<React.SetStateAction<FormState>> }) {
  const options: { key: TierKey; label: string; sub: string }[] = [
    { key: 'studio',   label: 'Studio / 1 Bedroom', sub: 'Small move · a few rooms' },
    { key: 'twoBed',   label: '2 Bedroom',          sub: 'Mid-size · couple or small family' },
    { key: 'threeBed', label: '3 Bedroom',          sub: 'Larger home · full family' },
  ]
  return (
    <div>
      <StepHeader title="What size is your move?" sub="Choose your home size." />
      <div className="space-y-3">
        {options.map(o => {
          const active = form.size === o.key
          return (
            <button
              key={o.key}
              type="button"
              onClick={() => setForm(f => ({ ...f, size: o.key }))}
              className={`w-full text-left p-5 rounded-2xl border transition-all active:scale-[0.99] ${
                active
                  ? 'border-coffee-light bg-coffee-deep'
                  : 'border-line bg-coffee/30 hover:bg-coffee/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-base font-semibold text-white">{o.label}</div>
                  <div className="text-sm text-white/50 mt-0.5">{o.sub}</div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 ${active ? 'border-white bg-white' : 'border-white/30'}`}>
                  {active && <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full p-0.5"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function Step3({ form, setForm }: { form: FormState; setForm: React.Dispatch<React.SetStateAction<FormState>> }) {
  return (
    <div>
      <StepHeader title="What's your budget?" sub="Set what you'd like to spend. You can adjust before booking." />
      <div className="text-center mb-8">
        <div className="text-6xl font-bold tracking-tight">{formatUSD(form.budget)}</div>
        <div className="text-xs uppercase tracking-[0.2em] text-white/40 mt-2">Your target</div>
      </div>
      <input
        type="range"
        min={BUDGET_MIN}
        max={BUDGET_MAX}
        step={10}
        value={form.budget}
        onChange={e => setForm(f => ({ ...f, budget: Number(e.target.value) }))}
        className="ntm-slider w-full"
      />
      <div className="flex justify-between text-xs text-white/40 mt-3 font-medium">
        <span>{formatUSD(BUDGET_MIN)}</span>
        <span>{formatUSD(BUDGET_MAX)}</span>
      </div>
      <style jsx>{`
        .ntm-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          background: rgba(255,255,255,0.08);
          border-radius: 999px;
          outline: none;
        }
        .ntm-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 26px;
          height: 26px;
          border-radius: 999px;
          background: #fff;
          cursor: pointer;
          border: 4px solid #4b2e1e;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        }
        .ntm-slider::-moz-range-thumb {
          width: 26px;
          height: 26px;
          border-radius: 999px;
          background: #fff;
          cursor: pointer;
          border: 4px solid #4b2e1e;
        }
      `}</style>
    </div>
  )
}

function Step4({
  form,
  setForm,
  pricing,
}: {
  form: FormState
  setForm: React.Dispatch<React.SetStateAction<FormState>>
  pricing: ReturnType<typeof calculatePricing> | null
}) {
  if (!pricing) return null
  const tiers: { key: PriceTier; label: string; sub: string; price: number; recommended?: boolean }[] = [
    { key: 'save',      label: 'Save',       sub: 'Labor only — no truck',         price: pricing.save },
    { key: 'yourPrice', label: 'Your Price', sub: 'Based on your budget',          price: pricing.yourPrice },
    { key: 'premium',   label: 'Premium',    sub: 'Recommended · full service',    price: pricing.premium, recommended: true },
  ]
  return (
    <div>
      <StepHeader title="Your move options" sub="Choose the one that fits you best." />
      <div className="space-y-3">
        {tiers.map(t => {
          const active = form.selectedTier === t.key
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setForm(f => ({ ...f, selectedTier: t.key }))}
              className={`w-full text-left p-5 rounded-2xl border transition-all active:scale-[0.99] ${
                active
                  ? 'border-white bg-coffee-deep'
                  : t.recommended
                    ? 'border-coffee-light bg-coffee-deep/60 hover:bg-coffee-deep'
                    : 'border-line bg-coffee/30 hover:bg-coffee/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-white">{t.label}</span>
                    {t.recommended && (
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-ink font-bold">
                        Recommended
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-white/55 mt-0.5">{t.sub}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold tracking-tight">{formatUSD(t.price)}</div>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function Step5({ form, setForm }: { form: FormState; setForm: React.Dispatch<React.SetStateAction<FormState>> }) {
  return (
    <div>
      <StepHeader title="Almost done." sub="Where can we reach you?" />
      <div className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-white/40 mb-2 font-semibold">Full Name</label>
          <input
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="input-field"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-white/40 mb-2 font-semibold">Email</label>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className="input-field"
            placeholder="jane@example.com"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-white/40 mb-2 font-semibold">Phone</label>
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            className="input-field"
            placeholder="(555) 123-4567"
          />
        </div>
        <p className="text-xs text-white/40 pt-2">No spam. We'll respond within 30 minutes.</p>
      </div>
    </div>
  )
}
