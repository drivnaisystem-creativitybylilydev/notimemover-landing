'use client'

import { useCallback, useMemo, useState } from 'react'
import NumberFlow from '@number-flow/react'
import { TIERS, TierKey, calculatePrice, formatUSD, GAS_RATE_PER_MILE } from '@/lib/pricing'
import { getMiles } from '@/lib/distance'
import { useAddressAutocomplete, type AddressSuggestion } from '@/lib/useAddressAutocomplete'

type InputMode = 'city' | 'address'

export default function JermainePricingTest() {
  const [size, setSize] = useState<TierKey>('twoBed')
  const [miles, setMiles] = useState(10)
  const [budget, setBudget] = useState(TIERS.twoBed.defaultBudget)
  const [inputMode, setInputMode] = useState<InputMode>('city')

  // City mode
  const [pickupCity, setPickupCity] = useState('')
  const [dropoffCity, setDropoffCity] = useState('')

  // Address mode
  const [pickupQuery, setPickupQuery] = useState('')
  const [dropoffQuery, setDropoffQuery] = useState('')
  const [pickupFormatted, setPickupFormatted] = useState('')
  const [dropoffFormatted, setDropoffFormatted] = useState('')

  // Route state
  const [calculating, setCalculating] = useState(false)
  const [routeLabel, setRouteLabel] = useState('')
  const [calculatedMiles, setCalculatedMiles] = useState<number | null>(null)

  // Copy state
  const [copied, setCopied] = useState(false)

  const { suggestions: pickupSuggestions, clear: clearPickup } = useAddressAutocomplete(pickupQuery)
  const { suggestions: dropoffSuggestions, clear: clearDropoff } = useAddressAutocomplete(dropoffQuery)

  const tier = TIERS[size]
  const pricing = useMemo(() => calculatePrice(size, miles, budget), [size, miles, budget])
  const gas = Math.round(miles * GAS_RATE_PER_MILE)
  const marginPct = pricing.total > 0 ? ((pricing.profit / pricing.total) * 100).toFixed(1) : '0'

  const sizes: { key: TierKey; label: string }[] = [
    { key: 'studio', label: 'Studio / 1 BR' },
    { key: 'twoBed', label: '2 Bedroom' },
    { key: 'threeBed', label: '3 Bedroom' },
  ]

  const handleSizeChange = (key: TierKey) => {
    setSize(key)
    setBudget(TIERS[key].defaultBudget)
  }

  const applyMiles = (computed: number, from: string, to: string) => {
    setCalculatedMiles(computed)
    setMiles(computed)
    setRouteLabel(`${from} → ${to}`)
  }

  const calcFromCities = useCallback(async () => {
    const p = pickupCity.trim()
    const d = dropoffCity.trim()
    if (!p || !d) return
    setCalculating(true)
    const computed = await getMiles(`${p}, MA`, `${d}, MA`)
    applyMiles(computed, p, d)
    setCalculating(false)
  }, [pickupCity, dropoffCity])

  const calcFromAddresses = useCallback(async (pf: string, df: string) => {
    if (!pf || !df) return
    setCalculating(true)
    const computed = await getMiles(pf, df)
    // Use the city portion for the label
    const pCity = pf.split(',')[1]?.trim() || pf.split(',')[0].trim()
    const dCity = df.split(',')[1]?.trim() || df.split(',')[0].trim()
    applyMiles(computed, pCity, dCity)
    setCalculating(false)
  }, [])

  const handlePickupSelect = (s: AddressSuggestion) => {
    const formatted = `${s.street}, ${s.city}, MA ${s.zip}`
    setPickupQuery(`${s.street}, ${s.city}`)
    setPickupFormatted(formatted)
    clearPickup()
    if (dropoffFormatted) calcFromAddresses(formatted, dropoffFormatted)
  }

  const handleDropoffSelect = (s: AddressSuggestion) => {
    const formatted = `${s.street}, ${s.city}, MA ${s.zip}`
    setDropoffQuery(`${s.street}, ${s.city}`)
    setDropoffFormatted(formatted)
    clearDropoff()
    if (pickupFormatted) calcFromAddresses(pickupFormatted, formatted)
  }

  const switchMode = (m: InputMode) => {
    setInputMode(m)
    setPickupCity('')
    setDropoffCity('')
    setPickupQuery('')
    setDropoffQuery('')
    setPickupFormatted('')
    setDropoffFormatted('')
    setCalculatedMiles(null)
    setRouteLabel('')
    setMiles(10)
  }

  const copyQuote = () => {
    const sizeStr = size === 'studio' ? 'studio/1BR' : size === 'twoBed' ? '2BR' : '3BR'
    const locationStr = routeLabel
      ? ` (${routeLabel}, ~${miles} miles)`
      : ` (~${miles} miles)`
    const msg = `For a ${sizeStr} move${locationStr}, I can do it for ${formatUSD(pricing.total)} — fully insured, I'll bring the crew and handle everything. Want to lock in a date?`
    navigator.clipboard.writeText(msg).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ background: 'linear-gradient(160deg, #0A0606 0%, #120A06 100%)', fontFamily: 'inherit' }}
    >
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-8 text-center">
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/35 font-medium mb-2">NoTimeMover</p>
          <h1 className="text-[26px] font-semibold tracking-tight text-white">Pricing Preview</h1>
          <p className="text-[13px] text-white/40 mt-1">Internal tool — play with the inputs below</p>
        </div>

        {/* Mode toggle */}
        <div
          className="flex mb-6 rounded-2xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {(['city', 'address'] as InputMode[]).map(m => (
            <button
              key={m}
              type="button"
              onClick={() => switchMode(m)}
              className="flex-1 py-2.5 text-[13px] font-medium transition-all duration-200"
              style={inputMode === m ? {
                background: 'rgba(107,58,31,0.45)',
                color: '#fff',
              } : {
                color: 'rgba(255,255,255,0.35)',
              }}
            >
              {m === 'city' ? 'City' : 'Full Address'}
            </button>
          ))}
        </div>

        {/* Location inputs */}
        <div className="mb-2">
          <label className="block text-[10px] uppercase tracking-[0.22em] text-white/40 mb-3 font-medium">
            Location
          </label>

          {inputMode === 'city' ? (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Pickup city (e.g. Allston)"
                value={pickupCity}
                onChange={e => setPickupCity(e.target.value)}
                onBlur={() => { if (pickupCity && dropoffCity) calcFromCities() }}
                onKeyDown={e => { if (e.key === 'Enter' && pickupCity && dropoffCity) calcFromCities() }}
                className="w-full px-4 py-3 rounded-2xl text-[14px] text-white placeholder-white/25 outline-none"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}
              />
              <input
                type="text"
                placeholder="Dropoff city (e.g. Cambridge)"
                value={dropoffCity}
                onChange={e => setDropoffCity(e.target.value)}
                onBlur={() => { if (pickupCity && dropoffCity) calcFromCities() }}
                onKeyDown={e => { if (e.key === 'Enter' && pickupCity && dropoffCity) calcFromCities() }}
                className="w-full px-4 py-3 rounded-2xl text-[14px] text-white placeholder-white/25 outline-none"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}
              />
              <button
                type="button"
                onClick={calcFromCities}
                disabled={!pickupCity || !dropoffCity || calculating}
                className="w-full py-3 rounded-2xl text-[13px] font-medium transition-all duration-200 active:scale-[0.98]"
                style={{
                  background: pickupCity && dropoffCity && !calculating
                    ? 'rgba(107,58,31,0.5)'
                    : 'rgba(255,255,255,0.04)',
                  border: pickupCity && dropoffCity && !calculating
                    ? '1px solid rgba(194,120,78,0.4)'
                    : '1px solid rgba(255,255,255,0.07)',
                  color: pickupCity && dropoffCity && !calculating
                    ? '#fff'
                    : 'rgba(255,255,255,0.25)',
                }}
              >
                {calculating ? 'Calculating...' : 'Calculate distance'}
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Pickup */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pickup address"
                  value={pickupQuery}
                  onChange={e => { setPickupQuery(e.target.value); setPickupFormatted('') }}
                  className="w-full px-4 py-3 rounded-2xl text-[14px] text-white placeholder-white/25 outline-none"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}
                />
                {pickupSuggestions.length > 0 && (
                  <div
                    className="absolute z-20 w-full mt-1 rounded-2xl overflow-hidden"
                    style={{ background: '#1a0d07', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
                  >
                    {pickupSuggestions.map((s, i) => (
                      <button
                        key={i}
                        type="button"
                        onMouseDown={() => handlePickupSelect(s)}
                        className="w-full text-left px-4 py-3 text-[13px] text-white/70 transition-colors"
                        style={{ borderBottom: i < pickupSuggestions.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        {s.street}, {s.city}, MA {s.zip}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Dropoff */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Dropoff address"
                  value={dropoffQuery}
                  onChange={e => { setDropoffQuery(e.target.value); setDropoffFormatted('') }}
                  className="w-full px-4 py-3 rounded-2xl text-[14px] text-white placeholder-white/25 outline-none"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}
                />
                {dropoffSuggestions.length > 0 && (
                  <div
                    className="absolute z-20 w-full mt-1 rounded-2xl overflow-hidden"
                    style={{ background: '#1a0d07', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
                  >
                    {dropoffSuggestions.map((s, i) => (
                      <button
                        key={i}
                        type="button"
                        onMouseDown={() => handleDropoffSelect(s)}
                        className="w-full text-left px-4 py-3 text-[13px] text-white/70 transition-colors"
                        style={{ borderBottom: i < dropoffSuggestions.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        {s.street}, {s.city}, MA {s.zip}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {calculating && (
                <p className="text-[12px] text-white/35 text-center pt-1">Calculating route...</p>
              )}
            </div>
          )}
        </div>

        {/* Route result OR manual slider */}
        <div className="mb-6 mt-4">
          {calculatedMiles !== null ? (
            <div
              className="flex items-center justify-between px-4 py-3 rounded-2xl"
              style={{ background: 'rgba(107,58,31,0.18)', border: '1px solid rgba(107,58,31,0.3)' }}
            >
              <span className="text-[12px] text-white/50 truncate pr-3">{routeLabel}</span>
              <span className="text-[15px] font-semibold text-white shrink-0">{calculatedMiles} mi</span>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-baseline mb-3">
                <label className="text-[10px] uppercase tracking-[0.22em] text-white/35 font-medium">
                  Distance <span className="text-white/20">(manual)</span>
                </label>
                <span className="text-[20px] font-semibold text-white tabular-nums">{miles} mi</span>
              </div>
              <MilesSlider value={miles} onChange={setMiles} />
              <div className="flex justify-between text-[11px] text-white/25 mt-2 tabular-nums">
                <span>1 mi</span>
                <span>50 mi</span>
              </div>
            </>
          )}
        </div>

        {/* Size selector */}
        <div className="mb-6">
          <label className="block text-[10px] uppercase tracking-[0.22em] text-white/40 mb-3 font-medium">Apartment Size</label>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map(s => (
              <button
                key={s.key}
                type="button"
                onClick={() => handleSizeChange(s.key)}
                className="py-3 px-2 rounded-2xl border text-[13px] font-medium transition-all duration-300"
                style={size === s.key ? {
                  background: 'rgba(107,58,31,0.3)',
                  border: '1px solid rgba(194,120,78,0.6)',
                  color: '#fff',
                } : {
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.45)',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Budget slider */}
        <div className="mb-8">
          <div className="flex justify-between items-baseline mb-3">
            <label className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-medium">Customer Budget</label>
            <span className="text-[20px] font-semibold text-white tabular-nums">{formatUSD(budget)}</span>
          </div>
          <BudgetSlider tier={tier} value={budget} onChange={setBudget} />
          <div className="flex justify-between text-[11px] text-white/25 mt-2 tabular-nums">
            <span>{formatUSD(tier.budgetMin)}</span>
            <span>{formatUSD(tier.budgetMax)}</span>
          </div>
        </div>

        {/* Quote card */}
        <div
          className="rounded-3xl p-1"
          style={{
            background: 'rgba(255,255,255,0.05)',
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.07)',
          }}
        >
          <div
            className="rounded-[1.375rem] px-6 py-7"
            style={{
              background: 'linear-gradient(160deg, #120A06 0%, #0D0707 100%)',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)',
            }}
          >
            {/* Big price */}
            <div className="text-center mb-6">
              <div className="text-[10px] uppercase tracking-[0.24em] text-white/35 mb-3 font-medium">Customer Sees</div>
              <div className="text-[72px] font-semibold tracking-[-0.04em] leading-none tabular-nums text-white">
                <NumberFlow
                  value={pricing.total}
                  format={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
                  transformTiming={{ duration: 500, easing: 'cubic-bezier(0.32, 0.72, 0, 1)' }}
                />
              </div>
            </div>

            <div className="h-px bg-white/[0.07] mb-5" />

            {/* Math breakdown */}
            <div className="space-y-2.5 mb-5">
              <div className="flex justify-between text-[13px] text-white/50">
                <span>Mover cost</span>
                <span className="tabular-nums">{formatUSD(tier.moverCost)}</span>
              </div>
              <div className="flex justify-between text-[13px] text-white/50">
                <span>Truck cost</span>
                <span className="tabular-nums">{formatUSD(tier.truckCost)}</span>
              </div>
              <div className="flex justify-between text-[13px] text-white/50">
                <span>Gas ({miles} mi × $2.50)</span>
                <span className="tabular-nums">{formatUSD(gas)}</span>
              </div>
              <div className="flex justify-between text-[13px] text-white/50">
                <span>Insurance</span>
                <span className="tabular-nums">$14</span>
              </div>
              <div className="h-px bg-white/[0.06]" />
              <div className="flex justify-between text-[13px] text-white/70">
                <span>Cost of move</span>
                <span className="tabular-nums">{formatUSD(pricing.costOfMove)}</span>
              </div>
              <div className="flex justify-between text-[13px] text-white/70">
                <span>Min price (cost ÷ 0.8)</span>
                <span className="tabular-nums">{formatUSD(pricing.minPrice)}</span>
              </div>
              <div className="flex justify-between text-[13px] text-white/70">
                <span>Customer budget</span>
                <span className="tabular-nums">{formatUSD(budget)}</span>
              </div>
            </div>

            <div className="h-px bg-white/[0.07] mb-5" />

            {/* Profit row */}
            <div className="flex justify-between items-baseline mb-5">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-white/35 mb-1 font-medium">Jermaine&apos;s Profit</div>
                <div className="text-[28px] font-semibold tabular-nums" style={{ color: pricing.profit >= 150 ? '#4ade80' : '#f87171' }}>
                  <NumberFlow
                    value={pricing.profit}
                    format={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
                    transformTiming={{ duration: 500, easing: 'cubic-bezier(0.32, 0.72, 0, 1)' }}
                  />
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-[0.22em] text-white/35 mb-1 font-medium">Margin</div>
                <div className="text-[20px] font-semibold text-white/70 tabular-nums">{marginPct}%</div>
              </div>
            </div>

            {/* Budget vs quote */}
            {budget > pricing.minPrice ? (
              <div className="mb-5 rounded-2xl p-3.5 text-center" style={{ background: 'rgba(107,58,31,0.18)', border: '1px solid rgba(107,58,31,0.3)' }}>
                <p className="text-[12px] text-white/60">
                  Customer budgeted <span className="text-white font-medium">{formatUSD(budget)}</span> · quoted <span className="text-white font-medium">{formatUSD(pricing.total)}</span> · saves <span className="text-white font-medium">{formatUSD(budget - pricing.total)}</span>
                </p>
              </div>
            ) : (
              <div className="mb-5 rounded-2xl p-3.5 text-center" style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.25)' }}>
                <p className="text-[12px] text-red-400/80">Budget below min — customer quoted at floor</p>
              </div>
            )}

            {/* Copy quote button */}
            <button
              type="button"
              onClick={copyQuote}
              className="w-full py-3.5 rounded-2xl text-[13px] font-semibold transition-all duration-200 active:scale-[0.98]"
              style={{
                background: copied ? 'rgba(74,222,128,0.15)' : 'rgba(107,58,31,0.4)',
                border: copied ? '1px solid rgba(74,222,128,0.3)' : '1px solid rgba(194,120,78,0.4)',
                color: copied ? '#4ade80' : '#fff',
              }}
            >
              {copied ? 'Copied!' : 'Copy quote message'}
            </button>
          </div>
        </div>

        <p className="text-center text-[11px] text-white/20 mt-6">
          notimemover.com/jermaine · internal use only
        </p>
      </div>
    </div>
  )
}

function MilesSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const pct = ((value - 1) / 49) * 100
  return (
    <>
      <input
        type="range" min={1} max={50} step={1} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="ntm-slider-j w-full"
      />
      <style jsx>{`
        .ntm-slider-j {
          -webkit-appearance: none; appearance: none; height: 6px;
          background: linear-gradient(90deg, #6B3A1F 0%, #6B3A1F ${pct}%, rgba(255,255,255,0.06) ${pct}%, rgba(255,255,255,0.06) 100%);
          border-radius: 999px; outline: none;
        }
        .ntm-slider-j::-webkit-slider-thumb {
          -webkit-appearance: none; width: 28px; height: 28px; border-radius: 999px;
          background: #fff; cursor: grab; border: 5px solid #4b2e1e;
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.6), 0 4px 12px rgba(0,0,0,0.5);
        }
        .ntm-slider-j::-webkit-slider-thumb:active { cursor: grabbing; }
      `}</style>
    </>
  )
}

function BudgetSlider({ tier, value, onChange }: { tier: typeof TIERS[TierKey]; value: number; onChange: (v: number) => void }) {
  const pct = ((value - tier.budgetMin) / (tier.budgetMax - tier.budgetMin)) * 100
  return (
    <>
      <input
        type="range" min={tier.budgetMin} max={tier.budgetMax} step={100} value={value}
        onChange={e => onChange(Math.max(tier.defaultBudget, Number(e.target.value)))}
        className="ntm-slider-b w-full"
      />
      <p className="text-center text-[11px] text-white/40 mt-2 tabular-nums">
        Your range: ${tier.budgetMin.toLocaleString()} – ${value.toLocaleString()}
      </p>
      <style jsx>{`
        .ntm-slider-b {
          -webkit-appearance: none; appearance: none; height: 6px;
          background: linear-gradient(90deg, #6B3A1F 0%, #6B3A1F ${pct}%, rgba(255,255,255,0.06) ${pct}%, rgba(255,255,255,0.06) 100%);
          border-radius: 999px; outline: none;
        }
        .ntm-slider-b::-webkit-slider-thumb {
          -webkit-appearance: none; width: 28px; height: 28px; border-radius: 999px;
          background: #fff; cursor: grab; border: 5px solid #4b2e1e;
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.6), 0 4px 12px rgba(0,0,0,0.5);
        }
        .ntm-slider-b::-webkit-slider-thumb:active { cursor: grabbing; }
      `}</style>
    </>
  )
}
