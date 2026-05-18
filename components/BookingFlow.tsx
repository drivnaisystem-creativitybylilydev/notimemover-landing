'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import NumberFlow from '@number-flow/react'
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

interface Address {
  street: string
  city: string
  state: string
  zip: string
}

interface FormState {
  pickup: Address
  dropoff: Address
  miles: number
  size: TierKey | ''
  budget: number
  selectedTier: PriceTier | ''
  name: string
  email: string
  phone: string
}

const TOTAL_STEPS = 5
const SPRING = [0.32, 0.72, 0, 1] as const


const emptyAddress: Address = { street: '', city: '', state: 'MA', zip: '' }

const initialState: FormState = {
  pickup: { ...emptyAddress },
  dropoff: { ...emptyAddress },
  miles: 0,
  size: '',
  budget: 400,
  selectedTier: '',
  name: '',
  email: '',
  phone: '',
}

const formatAddress = (a: Address) =>
  `${a.street}, ${a.city}, ${a.state} ${a.zip}`.trim()

const isAddressComplete = (a: Address) =>
  a.street.trim().length > 0 &&
  a.city.trim().length > 0 &&
  a.state.length === 2 &&
  /^\d{5}(-\d{4})?$/.test(a.zip.trim())

export default function BookingFlow({ isOpen, onClose }: Props) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormState>(initialState)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
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
    setSubmitError(null)
  }

  const tryClose = () => {
    if (submitted) {
      onClose()
      setTimeout(reset, 320)
      return
    }
    if (step > 1 && !window.confirm('Close this quote? Your progress will be lost.')) return
    onClose()
    setTimeout(reset, 320)
  }

  const pricing = useMemo(() => {
    if (!form.size) return null
    return calculatePricing(form.size, form.miles, form.budget)
  }, [form.size, form.miles, form.budget])

  const next = async () => {
    if (step === 1) {
      const miles = await getMiles(formatAddress(form.pickup), formatAddress(form.dropoff))
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
    (step === 1 && isAddressComplete(form.pickup) && isAddressComplete(form.dropoff)) ||
    (step === 2 && !!form.size) ||
    (step === 3) ||
    (step === 4 && !!form.selectedTier) ||
    (step === 5 && !!form.name && /\S+@\S+\.\S+/.test(form.email) && form.phone.replace(/\D/g, '').length >= 10)

  const submit = async () => {
    setSubmitting(true)
    setSubmitError(null)
    const payload = {
      pickup: form.pickup,
      pickupFormatted: formatAddress(form.pickup),
      dropoff: form.dropoff,
      dropoffFormatted: formatAddress(form.dropoff),
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
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (!res.ok || !data.ok) {
        setSubmitError(
          typeof data.error === 'string'
            ? data.error
            : 'Could not save your request. Please try again or call us directly.',
        )
        return
      }
      await new Promise(r => setTimeout(r, 450))
      setSubmitted(true)
    } catch {
      setSubmitError('Network error—check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-50 flex items-stretch sm:items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(14px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: SPRING as any }}
        onClick={tryClose}
      >
        {/* DOPPELRAND OUTER SHELL */}
        <motion.div
          key="shell"
          className="relative mx-auto w-full max-w-lg h-[100dvh] sm:h-auto sm:max-h-[92dvh] sm:m-4 flex min-w-0"
          initial={{ y: 80, opacity: 0, scale: 0.985 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 48, opacity: 0, scale: 0.99 }}
          transition={{ type: 'spring', damping: 28, stiffness: 280, mass: 0.85 }}
          onClick={e => e.stopPropagation()}
        >
          <div className="doppelrand-shell flex-1 flex">
            {/* DOPPELRAND INNER CORE */}
            <div className="doppelrand-core flex-1 flex flex-col overflow-hidden">

              {/* Header */}
              <div className="flex items-center gap-3 px-5 pt-5 pb-3 sm:px-7 sm:pt-7">
                {step > 1 && !submitted ? (
                  <button
                    type="button"
                    onClick={back}
                    aria-label="Back"
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 transition-colors duration-300 ease-spring"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
                  </button>
                ) : <div className="w-9 h-9" />}

                <div className="flex-1 text-center text-[10px] uppercase tracking-[0.24em] text-white/45 font-medium">
                  {submitted ? 'Confirmed' : `Step ${step} of ${TOTAL_STEPS}`}
                </div>

                <button
                  type="button"
                  onClick={tryClose}
                  aria-label="Close"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 transition-colors duration-300 ease-spring"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>

              {/* Progress bar */}
              {!submitted && (
                <div className="px-5 sm:px-7">
                  <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full"
                      style={{ background: 'linear-gradient(90deg, #6B3A1F 0%, #8B5230 100%)' }}
                      initial={false}
                      animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                      transition={{ duration: 0.6, ease: SPRING }}
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
                      initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: SPRING }}
                      className="w-full pb-2"
                    >
                      <div className="w-full max-w-none text-center mb-8">
                        <div
                          className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                          style={{
                            background: 'linear-gradient(180deg, #6B3A1F 0%, #4B2E1E 100%)',
                            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.18), 0 0 40px -10px rgba(107,58,31,0.7)',
                          }}
                        >
                          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <h2 className="text-[28px] sm:text-[32px] font-semibold tracking-tight leading-[1.1] text-white px-2">
                          You&rsquo;re booked.
                        </h2>
                        <p className="text-white/55 text-[15px] leading-relaxed mt-3 max-w-lg mx-auto px-2">
                          We&rsquo;ll be in touch shortly to confirm the details.
                        </p>
                      </div>

                      <div
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 text-left space-y-5"
                        style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.06)' }}
                      >
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div>
                            <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-medium mb-1.5">Pickup</div>
                            <p className="text-[14px] text-white/90 leading-snug">{formatAddress(form.pickup)}</p>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-medium mb-1.5">Dropoff</div>
                            <p className="text-[14px] text-white/90 leading-snug">{formatAddress(form.dropoff)}</p>
                          </div>
                        </div>
                        <div className="h-px bg-white/[0.08]" />
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-medium mb-1.5">Move size</div>
                            <p className="text-[14px] text-white/85">{form.size ? TIERS[form.size as TierKey].label : '—'}</p>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-medium mb-1.5">Route (est. mi)</div>
                            <p className="text-[14px] text-white/85 tabular-nums">{form.miles}</p>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-medium mb-1.5">Your selection</div>
                            <p className="text-[14px] text-white/85 capitalize">{form.selectedTier ? form.selectedTier.replace(/([A-Z])/g, ' $1').trim() : '—'}</p>
                          </div>
                          {form.selectedTier && pricing && (
                            <div>
                              <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-medium mb-1.5">Locked amount</div>
                              <p className="text-[22px] font-semibold text-white tabular-nums tracking-tight">
                                {formatUSD(pricing[form.selectedTier as keyof typeof pricing])}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="h-px bg-white/[0.08]" />
                        <div className="grid gap-4 sm:grid-cols-3">
                          <div>
                            <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-medium mb-1.5">Name</div>
                            <p className="text-[14px] text-white/85">{form.name}</p>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-medium mb-1.5">Email</div>
                            <p className="text-[14px] text-white/85 break-all">{form.email}</p>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-medium mb-1.5">Phone</div>
                            <p className="text-[14px] text-white/85 tabular-nums">{form.phone}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`step-${step}`}
                      className="w-full min-w-0"
                      initial={{ opacity: 0, x: 18, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, x: -18, filter: 'blur(6px)' }}
                      transition={{ duration: 0.5, ease: SPRING }}
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
              <div className="px-5 sm:px-7 pb-6 pt-3 sm:pb-7" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                {submitError && !submitted && step === TOTAL_STEPS && (
                  <p className="text-[13px] text-red-400/95 mb-3 text-center leading-relaxed">{submitError}</p>
                )}
                {submitted ? (
                  <PrimaryPill onClick={tryClose} label="Done" />
                ) : step < TOTAL_STEPS ? (
                  <PrimaryPill
                    onClick={next}
                    disabled={!canAdvance}
                    label={step === 3 ? 'See Pricing' : 'Continue'}
                  />
                ) : (
                  <PrimaryPill
                    onClick={submit}
                    disabled={!canAdvance || submitting}
                    label={submitting ? 'Sending…' : 'Submit Request'}
                  />
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* -------------------- Primary CTA (Button-in-Button, in-modal) -------------------- */

function PrimaryPill({
  onClick,
  disabled,
  label,
}: {
  onClick: () => void
  disabled?: boolean
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="group w-full flex items-center justify-between gap-3 pl-6 pr-2 py-2 rounded-full bg-white text-ink font-medium transition-transform duration-500 ease-spring active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
    >
      <span className="flex-1 text-center text-[15px] tracking-tight pl-9">{label}</span>
      <span
        className="w-11 h-11 rounded-full bg-ink/10 flex items-center justify-center transition-transform duration-500 ease-spring group-hover:translate-x-[2px] group-hover:-translate-y-[1px] group-disabled:opacity-50"
        style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.5)' }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
      </span>
    </button>
  )
}

/* -------------------- Step Header -------------------- */

function StepHeader({ kicker, title, sub }: { kicker?: string; title: string; sub?: string }) {
  return (
    <div className="mb-7">
      {kicker && <p className="text-[10px] uppercase tracking-[0.24em] text-coffee-light font-medium mb-2">{kicker}</p>}
      <h2 className="text-[28px] sm:text-[32px] font-semibold tracking-tight leading-[1.1]">{title}</h2>
      {sub && <p className="text-white/50 mt-2 text-[15px] leading-relaxed">{sub}</p>}
    </div>
  )
}

/* -------------------- STEP 1 — Pickup / Dropoff -------------------- */

function Step1({ form, setForm }: { form: FormState; setForm: React.Dispatch<React.SetStateAction<FormState>> }) {
  const update = (key: 'pickup' | 'dropoff', field: keyof Address) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [key]: { ...f[key], [field]: e.target.value } }))

  return (
    <div>
      <StepHeader title="Where are you moving?" sub="Enter your full pickup and dropoff addresses." />
      <motion.div
        className="space-y-7"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
        }}
      >
        <motion.div variants={fadeUp}>
          <AddressBlock
            label="Pickup"
            value={form.pickup}
            onChange={(field) => update('pickup', field)}
            autoFocusStreet
          />
        </motion.div>
        <motion.div variants={fadeUp}>
          <AddressBlock
            label="Dropoff"
            value={form.dropoff}
            onChange={(field) => update('dropoff', field)}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

function AddressBlock({
  label,
  value,
  onChange,
  autoFocusStreet,
}: {
  label: string
  value: Address
  onChange: (field: keyof Address) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  autoFocusStreet?: boolean
}) {
  return (
    <div>
      <div className="block text-[10px] uppercase tracking-[0.22em] text-white/45 mb-3 font-medium">{label}</div>
      <div className="space-y-3">
        <input
          type="text"
          autoComplete={label === 'Pickup' ? 'shipping street-address' : 'billing street-address'}
          autoFocus={autoFocusStreet}
          value={value.street}
          onChange={onChange('street')}
          className="input-field"
          placeholder="Street address"
        />
        <input
          type="text"
          autoComplete="address-level2"
          value={value.city}
          onChange={onChange('city')}
          className="input-field"
          placeholder="City"
        />
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">
            <div className="input-field flex items-center text-white/50 cursor-default select-none">MA</div>
          </div>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            value={value.zip}
            onChange={onChange('zip')}
            maxLength={10}
            className="input-field col-span-3 tabular-nums"
            placeholder="ZIP code"
          />
        </div>
      </div>
    </div>
  )
}

/* -------------------- STEP 2 — Home size -------------------- */

function Step2({ form, setForm }: { form: FormState; setForm: React.Dispatch<React.SetStateAction<FormState>> }) {
  const options: { key: TierKey; label: string; sub: string }[] = [
    { key: 'studio',   label: 'Studio / 1 Bedroom', sub: 'Small move · a few rooms' },
    { key: 'twoBed',   label: '2 Bedroom',          sub: 'Mid-size · couple or small family' },
    { key: 'threeBed', label: '3 Bedroom',          sub: 'Larger home · full family' },
  ]
  return (
    <div>
      <StepHeader title="What size is your move?" sub="Choose your home size." />
      <motion.div
        className="space-y-3"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }}
      >
        {options.map(o => {
          const active = form.size === o.key
          return (
            <motion.button
              key={o.key}
              type="button"
              variants={fadeUp}
              onClick={() => setForm(f => ({ ...f, size: o.key }))}
              className={`w-full text-left p-5 rounded-2xl border transition-all duration-500 ease-spring active:scale-[0.99] ${
                active
                  ? 'border-coffee-light bg-coffee-deep/60'
                  : 'border-white/8 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15'
              }`}
              style={active ? { boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08)' } : {}}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[16px] font-medium text-white">{o.label}</div>
                  <div className="text-[13px] text-white/45 mt-0.5">{o.sub}</div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${active ? 'border-white bg-white' : 'border-white/25'}`}>
                  {active && <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
              </div>
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}

/* -------------------- STEP 3 — Budget slider -------------------- */

function Step3({ form, setForm }: { form: FormState; setForm: React.Dispatch<React.SetStateAction<FormState>> }) {
  return (
    <div>
      <StepHeader title="What's your budget?" sub="Set what you'd like to spend. You can adjust before booking." />

      <div className="text-center mb-10 tabular-nums">
        <div className="text-[64px] sm:text-[72px] font-semibold tracking-[-0.04em] leading-none">
          <NumberFlow
            value={form.budget}
            format={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
            transformTiming={{ duration: 600, easing: 'cubic-bezier(0.32, 0.72, 0, 1)' }}
          />
        </div>
        <div className="text-[10px] uppercase tracking-[0.24em] text-white/35 mt-3 font-medium">Your target</div>
      </div>

      <input
        type="range"
        min={BUDGET_MIN}
        max={BUDGET_MAX}
        step={10}
        value={form.budget}
        onChange={e => setForm(f => ({ ...f, budget: Number(e.target.value) }))}
        className="ntm-slider w-full"
        aria-label="Budget"
      />
      <div className="flex justify-between text-[11px] text-white/35 mt-3 font-medium tabular-nums">
        <span>${BUDGET_MIN}</span>
        <span>${BUDGET_MAX}</span>
      </div>

      <style jsx>{`
        .ntm-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          background: linear-gradient(90deg, #6B3A1F 0%, #6B3A1F ${((form.budget - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100}%, rgba(255,255,255,0.06) ${((form.budget - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100}%, rgba(255,255,255,0.06) 100%);
          border-radius: 999px;
          outline: none;
          transition: background 0.2s ease;
        }
        .ntm-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 30px;
          height: 30px;
          border-radius: 999px;
          background: #fff;
          cursor: grab;
          border: 5px solid #4b2e1e;
          box-shadow:
            inset 0 1px 1px rgba(255,255,255,0.6),
            0 6px 16px rgba(0,0,0,0.5),
            0 0 30px -4px rgba(107,58,31,0.7);
          transition: transform 0.2s cubic-bezier(0.32, 0.72, 0, 1);
        }
        .ntm-slider::-webkit-slider-thumb:hover { transform: scale(1.08); }
        .ntm-slider::-webkit-slider-thumb:active { cursor: grabbing; transform: scale(0.96); }
        .ntm-slider::-moz-range-thumb {
          width: 30px;
          height: 30px;
          border-radius: 999px;
          background: #fff;
          cursor: grab;
          border: 5px solid #4b2e1e;
          box-shadow: 0 6px 16px rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  )
}

/* -------------------- STEP 4 — Pricing tiers (Doppelrand on Premium) -------------------- */

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
      <motion.div
        className="space-y-3"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }}
      >
        {tiers.map(t => {
          const active = form.selectedTier === t.key
          if (t.recommended) {
            return (
              <motion.div key={t.key} variants={fadeUp} className="rounded-[1.5rem] p-1.5" style={{
                background: 'rgba(255,255,255,0.06)',
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.10)',
              }}>
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, selectedTier: t.key }))}
                  className="w-full text-left p-5 transition-all duration-500 ease-spring active:scale-[0.99]"
                  style={{
                    borderRadius: 'calc(1.5rem - 0.375rem)',
                    background: active
                      ? 'linear-gradient(180deg, #5b3a23 0%, #2A1405 100%)'
                      : 'linear-gradient(180deg, #3a2415 0%, #1A0E04 100%)',
                    boxShadow: active
                      ? 'inset 0 1px 1px rgba(255,255,255,0.14), 0 0 50px -10px rgba(107,58,31,0.55)'
                      : 'inset 0 1px 1px rgba(255,255,255,0.08)',
                  }}
                >
                  <TierRow tier={t} />
                </button>
              </motion.div>
            )
          }
          return (
            <motion.button
              key={t.key}
              type="button"
              variants={fadeUp}
              onClick={() => setForm(f => ({ ...f, selectedTier: t.key }))}
              className={`w-full text-left p-5 rounded-2xl border transition-all duration-500 ease-spring active:scale-[0.99] ${
                active
                  ? 'border-white/30 bg-white/[0.05]'
                  : 'border-white/8 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15'
              }`}
              style={active ? { boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08)' } : {}}
            >
              <TierRow tier={t} />
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}

function TierRow({
  tier,
}: {
  tier: { label: string; sub: string; price: number; recommended?: boolean }
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 pr-4">
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-medium text-white">{tier.label}</span>
          {tier.recommended && (
            <span className="text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full bg-white text-ink font-semibold">
              Recommended
            </span>
          )}
        </div>
        <div className="text-[13px] text-white/55 mt-0.5">{tier.sub}</div>
      </div>
      <div className="text-right tabular-nums">
        <div className="text-[26px] font-semibold tracking-tight">
          <NumberFlow value={tier.price} format={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }} />
        </div>
      </div>
    </div>
  )
}

/* -------------------- STEP 5 — Contact -------------------- */

function Step5({ form, setForm }: { form: FormState; setForm: React.Dispatch<React.SetStateAction<FormState>> }) {
  return (
    <div className="w-full min-w-0">
      <StepHeader title="Almost done." sub="Where can we reach you?" />
      <motion.div
        className="space-y-4"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }}
      >
        <motion.div variants={fadeUp}>
          <label className="block text-[10px] uppercase tracking-[0.22em] text-white/40 mb-2 font-medium">Full Name</label>
          <input
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="input-field"
            placeholder="Jane Doe"
          />
        </motion.div>
        <motion.div variants={fadeUp}>
          <label className="block text-[10px] uppercase tracking-[0.22em] text-white/40 mb-2 font-medium">Email</label>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className="input-field"
            placeholder="jane@example.com"
          />
        </motion.div>
        <motion.div variants={fadeUp}>
          <label className="block text-[10px] uppercase tracking-[0.22em] text-white/40 mb-2 font-medium">Phone</label>
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            className="input-field"
            placeholder="(555) 123-4567"
          />
        </motion.div>
        <p className="text-[12px] text-white/35 pt-2 leading-relaxed">
          No spam. We&rsquo;ll respond within 30 minutes.
        </p>
      </motion.div>
    </div>
  )
}

/* -------------------- Shared variants -------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  show:   { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: SPRING } },
}
