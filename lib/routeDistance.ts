/**
 * Driving distance resolver — tries Google Routes API first (accurate),
 * falls back to Photon + OSRM (free, OSM-quality) if key is absent or call fails.
 */

const GEO_TIMEOUT_MS = 9000
const METERS_PER_MILE = 1609.344

// ─── Google Routes API ────────────────────────────────────────────────────────

async function googleRouteMiles(from: string, to: string): Promise<number | null> {
  const key = process.env.GOOGLE_MAPS_SERVER_KEY
  if (!key) return null

  try {
    const res = await fetch(
      'https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': key,
          'X-Goog-FieldMask': 'originIndex,destinationIndex,distanceMeters,status',
        },
        body: JSON.stringify({
          origins:      [{ waypoint: { address: from } }],
          destinations: [{ waypoint: { address: to } }],
          travelMode:         'DRIVE',
          routingPreference:  'TRAFFIC_UNAWARE',
        }),
        signal: AbortSignal.timeout(GEO_TIMEOUT_MS),
        cache: 'no-store',
      },
    )
    if (!res.ok) return null
    const rows = (await res.json()) as Array<{ distanceMeters?: number; status?: { code?: number } }>
    const meters = rows?.[0]?.distanceMeters
    if (typeof meters !== 'number' || !Number.isFinite(meters) || meters <= 0) return null
    return Math.max(1, Math.round(meters / METERS_PER_MILE))
  } catch {
    return null
  }
}

// ─── Free fallback: Photon geocode + OSRM routing ────────────────────────────

export function haversineMiles(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

async function geocodePhoton(query: string): Promise<{ lat: number; lon: number } | null> {
  const trimmed = query.trim().slice(0, 450)
  if (!trimmed) return null
  const url = `https://photon.komoot.io/api?q=${encodeURIComponent(trimmed)}&limit=1&lang=en`
  try {
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
  } catch {
    return null
  }
}

async function osrmMiles(
  a: { lat: number; lon: number },
  b: { lat: number; lon: number },
): Promise<number | null> {
  const url = `https://router.project-osrm.org/route/v1/driving/${a.lon},${a.lat};${b.lon},${b.lat}?overview=false`
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(GEO_TIMEOUT_MS), cache: 'no-store' })
    if (!res.ok) return null
    const data = (await res.json()) as { routes?: { distance?: number }[] }
    const meters = data?.routes?.[0]?.distance
    if (typeof meters !== 'number' || !Number.isFinite(meters) || meters < 0) return null
    return meters / METERS_PER_MILE
  } catch {
    return null
  }
}

// ─── Public resolver ──────────────────────────────────────────────────────────

export type DistanceSource = 'google' | 'osrm' | 'haversine'

export async function resolveRouteMiles(
  pickupFormatted: string,
  dropoffFormatted: string,
): Promise<{ miles: number; source: DistanceSource } | null> {
  // 1. Google Routes API — accurate, free up to 10K calls/mo
  const googleMiles = await googleRouteMiles(pickupFormatted, dropoffFormatted)
  if (googleMiles !== null) return { miles: googleMiles, source: 'google' }

  // 2. Photon geocode + OSRM driving distance — free, OSM-quality
  const [origin, dest] = await Promise.all([
    geocodePhoton(pickupFormatted),
    geocodePhoton(dropoffFormatted),
  ])
  if (!origin || !dest) return null

  const driving = await osrmMiles(origin, dest)
  if (driving != null && driving >= 0) {
    return { miles: Math.max(1, Math.round(driving)), source: 'osrm' }
  }

  // 3. Straight-line haversine as last resort
  const crow = haversineMiles(origin.lat, origin.lon, dest.lat, dest.lon)
  if (!Number.isFinite(crow) || crow <= 0) return null
  return { miles: Math.max(1, Math.round(crow)), source: 'haversine' }
}
