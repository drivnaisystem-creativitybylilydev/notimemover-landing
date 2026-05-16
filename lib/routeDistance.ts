/**
 * Free-tier routing stack (no API keys):
 * - Geocode: Photon (Komoot) https://photon.komoot.io/
 * - Driving distance: OSRM demo https://router.project-osrm.org/
 * Fallbacks: straight-line haversine → caller may stub miles if both fail.
 */

const GEO_TIMEOUT_MS = 9000

export function haversineMiles(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959 // Earth radius miles
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

async function geocodePhoton(query: string): Promise<{ lat: number; lon: number } | null> {
  const trimmed = query.trim().slice(0, 450)
  if (!trimmed) return null
  const url = `https://photon.komoot.io/api?q=${encodeURIComponent(trimmed)}&limit=1&lang=en`
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(GEO_TIMEOUT_MS),
    cache: 'no-store',
  })
  if (!res.ok) return null
  const data = (await res.json()) as {
    features?: { geometry?: { coordinates?: [number, number] } }[]
  }
  const coords = data?.features?.[0]?.geometry?.coordinates
  if (!Array.isArray(coords) || coords.length < 2) return null
  const [lon, lat] = coords
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null
  return { lat, lon }
}

async function drivingMilesOsrm(a: { lat: number; lon: number }, b: { lat: number; lon: number }): Promise<number | null> {
  const url = `https://router.project-osrm.org/route/v1/driving/${a.lon},${a.lat};${b.lon},${b.lat}?overview=false`
  const res = await fetch(url, {
    signal: AbortSignal.timeout(GEO_TIMEOUT_MS),
    cache: 'no-store',
  })
  if (!res.ok) return null
  const data = (await res.json()) as { routes?: { distance?: number }[] }
  const meters = data?.routes?.[0]?.distance
  if (typeof meters !== 'number' || !Number.isFinite(meters) || meters < 0) return null
  return meters / 1609.344
}

export type DistanceSource = 'osrm' | 'haversine'

/** Returns driving miles when possible; otherwise straight-line miles; throws nothing — caller stubs if null. */
export async function resolveRouteMiles(
  pickupFormatted: string,
  dropoffFormatted: string,
): Promise<{ miles: number; source: DistanceSource } | null> {
  const [origin, dest] = await Promise.all([
    geocodePhoton(pickupFormatted),
    geocodePhoton(dropoffFormatted),
  ])
  if (!origin || !dest) return null

  const driving = await drivingMilesOsrm(origin, dest)
  if (driving != null && driving >= 0) {
    const mi = Math.max(1, Math.round(driving))
    return { miles: mi, source: 'osrm' }
  }

  const crow = haversineMiles(origin.lat, origin.lon, dest.lat, dest.lon)
  if (!Number.isFinite(crow) || crow <= 0) return null
  const mi = Math.max(1, Math.round(crow))
  return { miles: mi, source: 'haversine' }
}
