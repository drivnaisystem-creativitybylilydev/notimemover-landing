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
  studio:   { key: 'studio',   label: 'Studio / 1 Bedroom', base: 300, equipment: 40, defaultBudget: 210 },
  twoBed:   { key: 'twoBed',   label: '2 Bedroom',          base: 500, equipment: 60, defaultBudget: 350 },
  threeBed: { key: 'threeBed', label: '3 Bedroom',          base: 915, equipment: 85, defaultBudget: 640 },
}

export const GAS_RATE_PER_MILE = 2.5

export const BUDGET_MIN = 200
export const BUDGET_MAX = 2000

export interface PricingResult {
  yourPrice: number  // budget + equipment + gas
  premium: number    // base + equipment + gas        (slider capped at base → always ≥ yourPrice)
  save: number       // budget × 0.85                (always < yourPrice, ordering guaranteed)
}

export function calculatePricing(tierKey: TierKey, miles: number, budget: number): PricingResult {
  const tier = TIERS[tierKey]
  const gas = miles * GAS_RATE_PER_MILE
  return {
    save:      Math.round(budget * 0.85),
    yourPrice: Math.round(budget + tier.equipment + gas),
    premium:   Math.round(tier.base + tier.equipment + gas),
  }
}

export function formatUSD(n: number): string {
  return `$${Math.round(n).toLocaleString('en-US')}`
}
