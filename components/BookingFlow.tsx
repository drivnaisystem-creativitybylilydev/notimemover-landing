'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { sendGAEvent } from '@next/third-parties/google'
import { useAddressAutocomplete, type AddressSuggestion } from '@/lib/useAddressAutocomplete'
import { AnimatePresence, motion } from 'framer-motion'
import NumberFlow from '@number-flow/react'
import {
  TIERS,
  TierKey,
  calculatePrice,
  formatUSD,
  type PriceBreakdown,
} from '@/lib/pricing'
import { getMiles } from '@/lib/distance'

interface Props {
  isOpen: boolean
  onClose: () => void
  initialConfirm?: 'instate' | 'oos'
  initialStep?: 'pricing'
}

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
  name: string
  email: string
  phone: string
  moveDate: string
}

const TOTAL_STEPS = 5
const SPRING = [0.32, 0.72, 0, 1] as const


const emptyAddress: Address = { street: '', city: '', state: 'MA', zip: '' }

const initialState: FormState = {
  pickup: { ...emptyAddress },
  dropoff: { ...emptyAddress },
  miles: 0,
  size: '',
  budget: TIERS.studio.defaultBudget,
  name: '',
  email: '',
  phone: '',
  moveDate: '',
}

const formatAddress = (a: Address) =>
  `${a.street}, ${a.city}, ${a.state} ${a.zip}`.trim()

const isAddressComplete = (a: Address) =>
  a.street.trim().length > 0 &&
  a.city.trim().length > 0 &&
  a.state.length === 2 &&
  /^\d{5}(-\d{4})?$/.test(a.zip.trim())

export default function BookingFlow({ isOpen, onClose, initialConfirm, initialStep }: Props) {
  const [preStep, setPreStep] = useState(true)
  const [outOfState, setOutOfState] = useState(false)
  const [oosSubmitted, setOosSubmitted] = useState(false)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormState>(initialState)
  const [navigating, setNavigating] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const didInitConfirm = useRef(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      sendGAEvent('event', 'form_start', { event_category: 'booking' })
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

  useEffect(() => {
    if (!isOpen || !initialConfirm || didInitConfirm.current) return
    didInitConfirm.current = true
    if (initialConfirm === 'instate') {
      setPreStep(false)
      setSubmitted(true)
    } else if (initialConfirm === 'oos') {
      setPreStep(false)
      setOutOfState(true)
      setOosSubmitted(true)
    }
  }, [isOpen, initialConfirm])

  useEffect(() => {
    if (!isOpen || initialStep !== 'pricing' || didInitConfirm.current) return
    didInitConfirm.current = true
    setPreStep(false)
    setStep(4)
    setForm(f => ({ ...f, size: 'twoBed', miles: 12, budget: TIERS.twoBed.defaultBudget, }))
  }, [isOpen, initialStep])

  useEffect(() => {
    if (!isOpen || preStep || outOfState || submitted) return
    sendGAEvent('event', 'step_viewed', { step, event_category: 'booking' })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, preStep, outOfState, submitted, isOpen])

  const reset = () => {
    setPreStep(true)
    setOutOfState(false)
    setOosSubmitted(false)
    setStep(1)
    setForm(initialState)
    setNavigating(false)
    setSubmitting(false)
    setSubmitted(false)
    setSubmitError(null)
    setShowExitConfirm(false)
  }

  // X button — shows confirm dialog if the user is mid-flow
  const tryClose = () => {
    if (submitted || preStep || outOfState) {
      onClose()
      setTimeout(reset, 320)
      return
    }
    if (step > 1) {
      setShowExitConfirm(true)
      return
    }
    sendGAEvent('event', 'quote_abandoned', { step: 1, event_category: 'booking' })
    onClose()
    setTimeout(reset, 320)
  }

  const backdropClose = () => tryClose()

  const confirmExit = () => {
    sendGAEvent('event', 'quote_abandoned', { step, event_category: 'booking' })
    setShowExitConfirm(false)
    onClose()
    setTimeout(reset, 320)
  }

  const pricing = useMemo((): PriceBreakdown | null => {
    if (!form.size) return null
    return calculatePrice(form.size as TierKey, form.miles, form.budget)
  }, [form.size, form.miles, form.budget])

  const autoAdvanceStep1 = async (pickup: Address, dropoff: Address) => {
    const miles = await getMiles(formatAddress(pickup), formatAddress(dropoff))
    setForm(f => ({ ...f, miles }))
    setStep(2)
  }

  const next = async () => {
    if (navigating) return
    setNavigating(true)
    try {
      if (step === 1) {
        const miles = await getMiles(formatAddress(form.pickup), formatAddress(form.dropoff))
        setForm(f => ({ ...f, miles }))
        sendGAEvent('event', 'booking_step', { step: 2 })
        setStep(2)
        return
      }
      if (step === 2 && form.size) {
        setForm(f => ({ ...f, budget: TIERS[f.size as TierKey].defaultBudget }))
        sendGAEvent('event', 'booking_step', { step: 3 })
        setStep(3)
        return
      }
      sendGAEvent('event', 'booking_step', { step: Math.min(step + 1, TOTAL_STEPS) })
      setStep(s => Math.min(s + 1, TOTAL_STEPS))
    } finally {
      setNavigating(false)
    }
  }

  const back = () => {
    if (outOfState) { setOutOfState(false); setPreStep(true); return }
    if (step === 1) { setPreStep(true); return }
    setStep(s => Math.max(s - 1, 1))
  }

  const canAdvance =
    (step === 1 && isAddressComplete(form.pickup) && isAddressComplete(form.dropoff)) ||
    (step === 2 && !!form.size) ||
    (step === 3) ||
    (step === 4) ||
    (step === 5 && !!form.name && /\S+@\S+\.\S+/.test(form.email) && form.phone.replace(/\D/g, '').length >= 10)

  const submit = async () => {
    setSubmitting(true)
    setSubmitError(null)
    const eventId = crypto.randomUUID()
    const payload = {
      pickup: form.pickup,
      pickupFormatted: formatAddress(form.pickup),
      dropoff: form.dropoff,
      dropoffFormatted: formatAddress(form.dropoff),
      miles: form.miles,
      size: form.size,
      sizeLabel: form.size ? TIERS[form.size as TierKey].label : '',
      budget: form.budget,
      selectedTier: '',
      finalPrice: pricing ? pricing.total : null,
      name: form.name,
      email: form.email,
      phone: form.phone,
      moveDate: form.moveDate || undefined,
      submittedAt: new Date().toISOString(),
      eventId,
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
      sendGAEvent('event', 'quote_submitted', {
        event_category: 'booking',
        size: form.size,
        final_price: pricing ? pricing.total : null,
      })
      const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq
      if (typeof fbq === 'function') {
        fbq('track', 'Lead', { value: pricing ? pricing.total : undefined, currency: 'USD' }, { eventID: eventId })
      }
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
        onClick={backdropClose}
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
                {!preStep && !submitted && (step > 1 || outOfState) ? (
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
                  {submitted ? 'Confirmed' : preStep ? 'Instant quote' : outOfState ? 'Service area' : `Step ${step} of ${TOTAL_STEPS}`}
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
              {!submitted && !preStep && !outOfState && (
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
                  {preStep ? (
                    <motion.div
                      key="prestep"
                      className="w-full min-w-0"
                      initial={{ opacity: 0, x: 18, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, x: -18, filter: 'blur(6px)' }}
                      transition={{ duration: 0.5, ease: SPRING }}
                    >
                      <PreStep
                        onInState={() => setPreStep(false)}
                        onOutOfState={() => { setPreStep(false); setOutOfState(true) }}
                      />
                    </motion.div>
                  ) : outOfState ? (
                    <motion.div
                      key="outofstate"
                      className="w-full min-w-0"
                      initial={{ opacity: 0, x: 18, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, x: -18, filter: 'blur(6px)' }}
                      transition={{ duration: 0.5, ease: SPRING }}
                    >
                      <OutOfStateStep onClose={tryClose} initialSubmitted={oosSubmitted} />
                    </motion.div>
                  ) : submitted ? (
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
                          Quote request sent.
                        </h2>
                        <p className="text-white/55 text-[15px] leading-relaxed mt-3 max-w-lg mx-auto px-2">
                          Check your inbox for a confirmation email — and your spam just in case. Our team will be in touch shortly to confirm availability and lock in the details.
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
                            <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-medium mb-1.5">Your budget</div>
                            <p className="text-[14px] text-white/85 tabular-nums">{formatUSD(form.budget)}</p>
                          </div>
                          {pricing && (
                            <div>
                              <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-medium mb-1.5">Total quote</div>
                              <p className="text-[22px] font-semibold text-white tabular-nums tracking-tight">
                                {formatUSD(pricing.total)}
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
                          {form.moveDate && (
                            <div>
                              <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-medium mb-1.5">Move date</div>
                              <p className="text-[14px] text-white/85 tabular-nums">
                                {new Date(form.moveDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </p>
                            </div>
                          )}
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
                      {step === 1 && <Step1 form={form} setForm={setForm} onAutoAdvance={autoAdvanceStep1} />}
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
                {preStep || outOfState ? null : submitted ? (
                  <PrimaryPill onClick={tryClose} label="Done" />
                ) : step < TOTAL_STEPS ? (
                  <PrimaryPill
                    onClick={next}
                    disabled={!canAdvance || navigating}
                    label={navigating ? 'Loading…' : step === 3 ? 'See Pricing' : 'Continue'}
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

        {/* Exit confirm overlay — sits above the modal shell */}
        <AnimatePresence>
          {showExitConfirm && (
            <motion.div
              key="exit-confirm"
              className="absolute inset-0 z-10 flex items-center justify-center p-6"
              style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(8px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={e => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0.94, opacity: 0, y: 12 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0, y: 6 }}
                transition={{ type: 'spring', damping: 26, stiffness: 320, mass: 0.7 }}
                className="w-full max-w-sm"
              >
                <div className="rounded-[1.75rem] p-1.5" style={{
                  background: 'rgba(255,255,255,0.05)',
                  boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.09)',
                }}>
                  <div className="rounded-[1.25rem] px-6 py-7 flex flex-col gap-6" style={{
                    background: 'linear-gradient(160deg, #120A06 0%, #0A0606 100%)',
                    boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.06)',
                  }}>
                    {/* Icon */}
                    <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{
                      background: 'rgba(107,58,31,0.18)',
                      boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.06), 0 0 0 1px rgba(107,58,31,0.25)',
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(194,120,78,0.9)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    </div>

                    {/* Copy */}
                    <div>
                      <p className="text-[18px] font-semibold tracking-tight text-white leading-snug">Are you sure you want to leave?</p>
                      <p className="text-[14px] text-white/45 mt-1.5 leading-relaxed">Your progress will be lost. You can always start a new quote.</p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2.5">
                      <button
                        type="button"
                        onClick={() => setShowExitConfirm(false)}
                        className="w-full py-3.5 rounded-2xl text-[15px] font-medium text-ink transition-all duration-300 ease-spring active:scale-[0.98]"
                        style={{
                          background: 'linear-gradient(180deg, #ffffff 0%, #e8e8e8 100%)',
                          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.9)',
                        }}
                      >
                        Keep my quote
                      </button>
                      <button
                        type="button"
                        onClick={confirmExit}
                        className="w-full py-3.5 rounded-2xl text-[14px] font-medium text-white/40 transition-all duration-300 ease-spring hover:text-white/60 active:scale-[0.98]"
                      >
                        Leave anyway
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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

function Step1({ form, setForm, onAutoAdvance }: {
  form: FormState
  setForm: React.Dispatch<React.SetStateAction<FormState>>
  onAutoAdvance: (pickup: Address, dropoff: Address) => void
}) {
  const dropoffRef = useRef<HTMLInputElement>(null)
  const addressStarted = useRef(false)

  const update = (key: 'pickup' | 'dropoff', field: keyof Address) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (!addressStarted.current && key === 'pickup' && field === 'street' && e.target.value.length > 0) {
        addressStarted.current = true
        sendGAEvent('event', 'address_started', { event_category: 'booking' })
      }
      setForm(f => ({ ...f, [key]: { ...f[key], [field]: e.target.value } }))
    }

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
            onSelect={addr => {
              const pickup = { ...addr, state: 'MA' }
              setForm(f => ({ ...f, pickup }))
              setTimeout(() => dropoffRef.current?.focus(), 50)
            }}
            autoFocusStreet
          />
        </motion.div>
        <motion.div variants={fadeUp}>
          <AddressBlock
            label="Dropoff"
            value={form.dropoff}
            onChange={(field) => update('dropoff', field)}
            onSelect={addr => {
              const dropoff = { ...addr, state: 'MA' }
              setForm(f => ({ ...f, dropoff }))
              if (isAddressComplete(form.pickup)) {
                onAutoAdvance(form.pickup, dropoff)
              }
            }}
            streetInputRef={dropoffRef}
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
  onSelect,
  autoFocusStreet,
  streetInputRef,
}: {
  label: string
  value: Address
  onChange: (field: keyof Address) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onSelect: (addr: AddressSuggestion) => void
  autoFocusStreet?: boolean
  streetInputRef?: React.RefObject<HTMLInputElement>
}) {
  const { suggestions, clear } = useAddressAutocomplete(value.street)
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setOpen(suggestions.length > 0) }, [suggestions])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div>
      <div className="block text-[10px] uppercase tracking-[0.22em] text-white/45 mb-3 font-medium">{label}</div>
      <div className="space-y-3">
        <div ref={wrapRef} className="relative">
          <input
            ref={streetInputRef}
            type="text"
            autoComplete="off"
            autoFocus={autoFocusStreet}
            value={value.street}
            onChange={onChange('street')}
            onFocus={() => suggestions.length > 0 && setOpen(true)}
            className="input-field"
            placeholder="Street address"
          />
          {open && (
            <div
              className="absolute z-50 top-full mt-1 left-0 right-0 rounded-2xl overflow-y-auto"
              style={{
                background: '#0A0606',
                border: '1px solid rgba(255,255,255,0.09)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
                maxHeight: '152px',
              }}
            >
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  className="w-full text-left px-4 py-3 transition-colors duration-150 hover:bg-white/5 border-b border-white/[0.05] last:border-0"
                  onMouseDown={() => {
                    onSelect(s)
                    clear()
                    setOpen(false)
                  }}
                >
                  <span className="text-[14px] text-white/90">{s.street}</span>
                  <span className="text-[13px] text-white/40 ml-1.5">{s.city}, MA {s.zip}</span>
                </button>
              ))}
            </div>
          )}
        </div>
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
    { key: 'studio',   label: 'Studio / 1 Bedroom', sub: 'Small move · apartment or condo' },
    { key: 'twoBed',   label: '2 Bedroom',           sub: 'Mid-size · couple or small family' },
    { key: 'threeBed', label: '3 Bedroom',            sub: 'Larger home · full family' },
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
              onClick={() => setForm(f => ({ ...f, size: o.key, budget: TIERS[o.key].defaultBudget }))}
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
  if (!form.size) return null
  const tier = TIERS[form.size as TierKey]
  const { budgetMin, budgetMax, defaultBudget } = tier
  const pct = ((form.budget - budgetMin) / (budgetMax - budgetMin)) * 100
  const floorPct = ((defaultBudget - budgetMin) / (budgetMax - budgetMin)) * 100

  return (
    <div>
      <StepHeader title="Set your moving budget." sub="Tell us your maximum — we'll calculate the best price for your move." />

      <div className="text-center mb-8 tabular-nums">
        <div className="text-[64px] sm:text-[72px] font-semibold tracking-[-0.04em] leading-none">
          <NumberFlow
            value={form.budget}
            format={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
            transformTiming={{ duration: 600, easing: 'cubic-bezier(0.32, 0.72, 0, 1)' }}
          />
        </div>
        <div className="text-[10px] uppercase tracking-[0.24em] text-white/35 mt-3 font-medium">Maximum budget</div>
      </div>

      {/* Slider + floor tick */}
      <div className="relative w-full" style={{ marginBottom: '38px' }}>
        <input
          type="range"
          min={budgetMin}
          max={budgetMax}
          step={100}
          value={form.budget}
          onChange={e => setForm(f => ({ ...f, budget: Math.max(defaultBudget, Number(e.target.value)) }))}
          className="ntm-slider w-full"
          aria-label="Budget"
        />
        {/* Floor tick mark + label — positioned below the track */}
        <div
          className="absolute pointer-events-none flex flex-col items-center"
          style={{
            left: `calc(${floorPct / 100} * (100% - 30px) + 15px)`,
            top: 'calc(100% + 7px)',
            transform: 'translateX(-50%)',
          }}
        >
          <div style={{
            width: '1.5px',
            height: '7px',
            background: 'rgba(194,120,78,0.45)',
            borderRadius: '1px',
          }} />
          <span style={{
            fontSize: '10px',
            color: 'rgba(255,255,255,0.36)',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            letterSpacing: '0.05em',
            marginTop: '3px',
          }}>Move floor</span>
        </div>
      </div>

      <div className="flex justify-between text-[11px] text-white/28 font-medium tabular-nums">
        <span>${budgetMin.toLocaleString()}</span>
        <span>${budgetMax.toLocaleString()}</span>
      </div>

      <p className="text-[13px] text-white/35 mt-6 text-center leading-relaxed">
        Your exact price will be shown on the next step — fully insured, no hidden fees.
      </p>

      <style jsx>{`
        .ntm-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          background: linear-gradient(
            90deg,
            rgba(107,58,31,0.28) 0%,
            rgba(107,58,31,0.28) ${floorPct}%,
            #6B3A1F ${floorPct}%,
            #6B3A1F ${pct}%,
            rgba(255,255,255,0.06) ${pct}%,
            rgba(255,255,255,0.06) 100%
          );
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

/* -------------------- STEP 4 — Price confirmation + market comparison -------------------- */

function Step4({
  form,
  pricing,
}: {
  form: FormState
  setForm: React.Dispatch<React.SetStateAction<FormState>>
  pricing: PriceBreakdown | null
}) {
  useEffect(() => {
    if (!pricing || !form.size) return
    sendGAEvent('event', 'price_seen', {
      event_category: 'booking',
      size: form.size,
      total_price: pricing.total,
      miles: form.miles,
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!pricing || !form.size) return null

  return (
    <div>
      <StepHeader title="Your quote." sub="Here's what your move will cost." />

      <div className="text-center mb-6">
        <div className="text-[64px] sm:text-[72px] font-semibold tracking-[-0.04em] leading-none tabular-nums">
          <NumberFlow value={pricing.total} format={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }} />
        </div>
        <div className="text-[10px] uppercase tracking-[0.24em] text-white/35 mt-3 font-medium">Total estimate</div>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
        <div className="flex justify-between text-[13px] font-semibold tabular-nums">
          <span className="text-white/80">Your quote</span>
          <span className="text-white">{formatUSD(pricing.total)}</span>
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
        <motion.div variants={fadeUp}>
          <label className="block text-[10px] uppercase tracking-[0.22em] text-white/40 mb-2 font-medium">
            Move date <span className="text-white/20 normal-case tracking-normal">(optional)</span>
          </label>
          <input
            type="date"
            autoComplete="off"
            min={new Date().toISOString().split('T')[0]}
            value={form.moveDate}
            onChange={e => setForm(f => ({ ...f, moveDate: e.target.value }))}
            className="input-field"
          />
        </motion.div>
        <p className="text-[12px] text-white/35 pt-2 leading-relaxed">
          No spam. We&rsquo;ll respond within 30 minutes.
        </p>
      </motion.div>
    </div>
  )
}

/* -------------------- PRE-STEP — In-state / Out-of-state -------------------- */

function PreStep({ onInState, onOutOfState }: { onInState: () => void; onOutOfState: () => void }) {
  const options = [
    { label: 'Within Massachusetts', sub: 'Get your instant quote', value: 'instate', onClick: onInState },
    { label: 'Outside Massachusetts', sub: 'Out-of-state move', value: 'oos', onClick: onOutOfState },
  ]
  return (
    <div>
      <StepHeader title="Where are you moving?" sub="NoTimeMover serves moves within Massachusetts." />
      <motion.div
        className="space-y-3"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }}
      >
        {options.map(o => (
          <motion.button
            key={o.label}
            type="button"
            variants={fadeUp}
            onClick={() => { sendGAEvent('event', 'location_selected', { value: o.value, event_category: 'booking' }); o.onClick() }}
            className="w-full text-left p-5 rounded-2xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15 transition-all duration-500 ease-spring active:scale-[0.99]"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[16px] font-medium text-white">{o.label}</div>
                <div className="text-[13px] text-white/45 mt-0.5">{o.sub}</div>
              </div>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 flex-shrink-0"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}

/* -------------------- OUT-OF-STATE screen -------------------- */

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM',
  'NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA',
  'WA','WV','WI','WY','DC',
]

const OOS_SIZE_OPTIONS = [
  { key: 'studio',   label: 'Studio / 1 Bedroom', sub: 'Small move · a few rooms' },
  { key: 'twoBed',   label: '2 Bedroom',           sub: 'Mid-size · couple or small family' },
  { key: 'threeBed', label: '3 Bedroom',            sub: 'Larger home · full family' },
] as const

function OutOfStateStep({ onClose, initialSubmitted = false }: { onClose: () => void; initialSubmitted?: boolean }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [fromState, setFromState] = useState('')
  const [fromCity, setFromCity] = useState('')
  const [size, setSize] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(initialSubmitted)
  const [error, setError] = useState<string | null>(null)

  const canSubmit =
    name.trim().length > 0 &&
    /\S+@\S+\.\S+/.test(email) &&
    phone.replace(/\D/g, '').length >= 10 &&
    fromState.length > 0

  const submit = async () => {
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/outofstate-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, fromState, fromCity, size, notes }),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean }
      if (!res.ok || !data.ok) {
        setError('Something went wrong. Email us directly at hello@notimemover.com.')
        return
      }
      sendGAEvent('event', 'oos_submitted', { event_category: 'booking' })
      setSubmitted(true)
    } catch {
      setError('Network error — check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <motion.div
        key="oos-done"
        initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: SPRING }}
        className="text-center py-4"
      >
        <div
          className="w-14 h-14 mx-auto mb-5 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(180deg, #6B3A1F 0%, #4B2E1E 100%)',
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.18), 0 0 32px -8px rgba(107,58,31,0.6)',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h2 className="text-[26px] font-semibold tracking-tight">Request sent.</h2>
        <p className="text-white/55 text-[15px] mt-2 leading-relaxed mb-2 max-w-xs mx-auto">
          Check your inbox — and your spam just in case.
        </p>
        <p className="text-white/40 text-[14px] leading-relaxed mb-8 max-w-xs mx-auto">
          We&rsquo;ll be in touch shortly to see what we can arrange.
        </p>
        <PrimaryPill onClick={onClose} label="Done" />
      </motion.div>
    )
  }

  return (
    <div className="w-full min-w-0">
      <StepHeader
        kicker="Out of state"
        title="Tell us about your move."
        sub="We'll reach out to see what we can arrange."
      />
      <motion.div
        className="space-y-4"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } } }}
      >
        <motion.div variants={fadeUp}>
          <label className="block text-[10px] uppercase tracking-[0.22em] text-white/40 mb-2 font-medium">Full Name</label>
          <input type="text" autoComplete="name" value={name} onChange={e => setName(e.target.value)} className="input-field" placeholder="Jane Doe" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <label className="block text-[10px] uppercase tracking-[0.22em] text-white/40 mb-2 font-medium">Email</label>
          <input type="email" inputMode="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} className="input-field" placeholder="jane@example.com" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <label className="block text-[10px] uppercase tracking-[0.22em] text-white/40 mb-2 font-medium">Phone</label>
          <input type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)} className="input-field" placeholder="(555) 123-4567" />
        </motion.div>
        <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.22em] text-white/40 mb-2 font-medium">Moving from — State</label>
            <select
              value={fromState}
              onChange={e => setFromState(e.target.value)}
              className="input-field"
              style={{ appearance: 'none' }}
            >
              <option value="">Select state</option>
              {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-[0.22em] text-white/40 mb-2 font-medium">City / Area</label>
            <input type="text" value={fromCity} onChange={e => setFromCity(e.target.value)} className="input-field" placeholder="e.g. New York" />
          </div>
        </motion.div>
        <motion.div variants={fadeUp}>
          <label className="block text-[10px] uppercase tracking-[0.22em] text-white/40 mb-3 font-medium">Move size</label>
          <div className="space-y-2">
            {OOS_SIZE_OPTIONS.map(o => {
              const active = size === o.key
              return (
                <button
                  key={o.key}
                  type="button"
                  onClick={() => setSize(o.key)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-500 ease-spring active:scale-[0.99] ${
                    active
                      ? 'border-coffee-light bg-coffee-deep/60'
                      : 'border-white/8 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15'
                  }`}
                  style={active ? { boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08)' } : {}}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[15px] font-medium text-white">{o.label}</div>
                      <div className="text-[12px] text-white/45 mt-0.5">{o.sub}</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-300 flex-shrink-0 ${active ? 'border-white bg-white' : 'border-white/25'}`}>
                      {active && <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12"/></svg>}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </motion.div>
        <motion.div variants={fadeUp}>
          <label className="block text-[10px] uppercase tracking-[0.22em] text-white/40 mb-2 font-medium">Tell us more</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
            className="input-field resize-none"
            placeholder="Where are you moving to? How much do you have? Any other details…"
          />
        </motion.div>
        {error && <p className="text-[13px] text-red-400/95 text-center leading-relaxed">{error}</p>}
        <motion.div variants={fadeUp} className="pt-1">
          <PrimaryPill onClick={submit} disabled={!canSubmit || submitting} label={submitting ? 'Sending…' : 'Send Request'} />
        </motion.div>
      </motion.div>
    </div>
  )
}

/* -------------------- Shared variants -------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  show:   { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: SPRING } },
}
