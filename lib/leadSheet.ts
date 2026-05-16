/** Column order for Sheets append (A–T). Row 1 header text can be friendly labels—the API writes by column position only. */

export const LEAD_SHEET_HEADERS = [
  'submitted_at_iso',
  'customer_name',
  'customer_email',
  'customer_phone',
  'pickup_street',
  'pickup_city',
  'pickup_state',
  'pickup_zip',
  'pickup_full',
  'dropoff_street',
  'dropoff_city',
  'dropoff_state',
  'dropoff_zip',
  'dropoff_full',
  'route_miles_display',
  'size_key',
  'size_label',
  'budget_usd',
  'selected_tier',
  'final_price_usd',
] as const

export type LeadPayload = {
  pickup: { street: string; city: string; state: string; zip: string }
  pickupFormatted: string
  dropoff: { street: string; city: string; state: string; zip: string }
  dropoffFormatted: string
  miles: number
  size: string
  sizeLabel: string
  budget: number
  selectedTier: string
  finalPrice: number | null
  name: string
  email: string
  phone: string
  submittedAt: string
}

export function leadPayloadToRow(p: LeadPayload): string[] {
  return [
    p.submittedAt,
    p.name,
    p.email,
    p.phone,
    p.pickup.street,
    p.pickup.city,
    p.pickup.state,
    p.pickup.zip,
    p.pickupFormatted,
    p.dropoff.street,
    p.dropoff.city,
    p.dropoff.state,
    p.dropoff.zip,
    p.dropoffFormatted,
    String(p.miles ?? ''),
    p.size,
    p.sizeLabel,
    String(p.budget),
    p.selectedTier,
    p.finalPrice != null ? String(p.finalPrice) : '',
  ]
}
