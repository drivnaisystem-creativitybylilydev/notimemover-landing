// Hidden pricing model per client PDF.
// These numbers must NEVER be shown directly to the user — they back the three quoted tiers.

export type TierKey = 'studio' | 'twoBed' | 'threeBed'

export interface Tier {
  key: TierKey
  label: string
  base: number
  equipment: number
  defaultBudget: number
}

export const TIERS: Record<TierKey, Tier> = {
  studio:   { key: 'studio',   label: 'Studio / 1 Bedroom', base: 300, equipment: 40, defaultBudget: 400 },
  twoBed:   { key: 'twoBed',   label: '2 Bedroom',          base: 500, equipment: 60, defaultBudget: 600 },
  threeBed: { key: 'threeBed', label: '3 Bedroom',          base: 915, equipment: 85, defaultBudget: 900 },
}

export const GAS_RATE_PER_MILE = 2.5

export const BUDGET_MIN = 200
export const BUDGET_MAX = 2000

export interface PricingResult {
  yourPrice: number  // budget + equipment + gas
  premium: number    // base + equipment + gas   (recommended)
  save: number       // round(base * 0.85)       (labor only, no equipment, no gas)
}

export function calculatePricing(tierKey: TierKey, miles: number, budget: number): PricingResult {
  const tier = TIERS[tierKey]
  const gas = miles * GAS_RATE_PER_MILE
  return {
    yourPrice: Math.round(budget + tier.equipment + gas),
    premium:   Math.round(tier.base + tier.equipment + gas),
    save:      Math.round(tier.base * 0.85),
  }
}

export function formatUSD(n: number): string {
  return `$${Math.round(n).toLocaleString('en-US')}`
}
