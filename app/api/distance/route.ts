import { NextResponse } from 'next/server'
import { resolveRouteMiles } from '@/lib/routeDistance'

export const runtime = 'nodejs'

const STUB_FALLBACK_MILES = 25
const MAX_LEN = 500

/** POST { pickupFormatted, dropoffFormatted } → { miles, source?, fallback? } */
export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ miles: STUB_FALLBACK_MILES, fallback: true }, { status: 400 })
  }
  const o = body as Record<string, unknown>
  const pickupFormatted = String(o.pickupFormatted ?? '').trim()
  const dropoffFormatted = String(o.dropoffFormatted ?? '').trim()

  if (
    !pickupFormatted ||
    !dropoffFormatted ||
    pickupFormatted.length > MAX_LEN ||
    dropoffFormatted.length > MAX_LEN
  ) {
    return NextResponse.json({ miles: STUB_FALLBACK_MILES, fallback: true })
  }

  try {
    const resolved = await resolveRouteMiles(pickupFormatted, dropoffFormatted)
    if (!resolved) {
      return NextResponse.json({ miles: STUB_FALLBACK_MILES, fallback: true })
    }
    return NextResponse.json({
      miles: resolved.miles,
      source: resolved.source,
      fallback: false,
    })
  } catch {
    return NextResponse.json({ miles: STUB_FALLBACK_MILES, fallback: true })
  }
}
