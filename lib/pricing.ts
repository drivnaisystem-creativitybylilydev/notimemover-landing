export type TierKey = 'studio' | 'twoBed' | 'threeBed'

export interface Competitor {
  name: string
  price: number
}

export interface Tier {
  key: TierKey
  label: string
  moverCost: number
  truckCost: number
  budgetMin: number
  budgetMax: number
  defaultBudget: number
  competitors: Competitor[]
}

// Same formula for all sizes (confirmed by Jermaine + Google Sheet)
const INSURANCE = 14
const MARGIN = 0.8
const MULTIPLIER = 0.65
export const GAS_RATE_PER_MILE = 2.5

export const TIERS: Record<TierKey, Tier> = {
  studio:   { key: 'studio',   label: 'Studio / 1 Bedroom', moverCost: 250, truckCost: 60, budgetMin: 400, budgetMax: 600,  defaultBudget: 500, competitors: [{ name: 'Gentle Giant',          price: 700  }, { name: 'Two Men and a Truck', price: 650  }] },
  twoBed:   { key: 'twoBed',   label: '2 Bedroom',          moverCost: 300, truckCost: 60, budgetMin: 600, budgetMax: 800,  defaultBudget: 700, competitors: [{ name: 'Gentle Giant',          price: 1250 }, { name: 'Two Men and a Truck', price: 1100 }] },
  threeBed: { key: 'threeBed', label: '3 Bedroom',          moverCost: 300, truckCost: 75, budgetMin: 800, budgetMax: 1000, defaultBudget: 900, competitors: [{ name: 'Gentle Giant',          price: 1750 }, { name: 'Two Men and a Truck', price: 1500 }] },
}

export interface PriceBreakdown {
  gas: number
  costOfMove: number
  minPrice: number
  total: number
  profit: number
}

export function calculatePrice(tierKey: TierKey, miles: number, budget: number): PriceBreakdown {
  const tier = TIERS[tierKey]
  const gas = Math.round(miles * GAS_RATE_PER_MILE)
  const costOfMove = tier.moverCost + tier.truckCost + gas + INSURANCE
  const minPrice = costOfMove / MARGIN
  const total = Math.round(minPrice + MULTIPLIER * Math.max(0, budget - minPrice))
  return { gas, costOfMove, minPrice: Math.round(minPrice), total, profit: total - costOfMove }
}

export function formatUSD(n: number): string {
  return `$${Math.round(n).toLocaleString('en-US')}`
}
