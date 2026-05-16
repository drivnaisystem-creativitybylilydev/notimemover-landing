// Driving miles for gas pricing — computed server-side via POST /api/distance (Photon + OSRM).
// Falls back to 25 mi if geocoding/routing fails or services are unreachable.

const STUB_MILES = 25

export async function getMiles(from: string, to: string): Promise<number> {
  if (!from?.trim() || !to?.trim()) return 0
  try {
    const res = await fetch('/api/distance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pickupFormatted: from.trim(), dropoffFormatted: to.trim() }),
    })
    const data = (await res.json().catch(() => ({}))) as {
      miles?: unknown
      fallback?: unknown
    }
    const miles = typeof data.miles === 'number' ? data.miles : Number(data.miles)
    if (Number.isFinite(miles) && miles >= 0) {
      return Math.max(0, Math.round(miles))
    }
  } catch {
    /* network / parse */
  }
  return STUB_MILES
}
