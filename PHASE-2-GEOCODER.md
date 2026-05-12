# Phase 2 — Geocoder & Driving-Distance Upgrade

_Status: planning doc, no code changes shipped yet. Last verified: May 2026._

---

## TL;DR

**Recommendation:** Use **Google Places Autocomplete (New)** for the pickup/dropoff inputs and **Google Routes: Compute Route Matrix (Essentials)** for driving miles. For a ~1,000-quote/month demand test (≈2,000 autocomplete sessions, 1,000 matrix elements) the entire flow stays inside Google's free per-SKU monthly caps — projected bill **$0/month**, with a hard ceiling of about **$15–$25/month** even if traffic doubles and session-token hygiene slips.

**Fallback:** **Mapbox Search Box (Sessions) + Mapbox Matrix API.** Pick this if you want a cheaper post-free-tier curve (Matrix is $2/1k vs Google's $5/1k) or if you're already invested in Mapbox GL tiles. Standard Search Box pricing kicked in Q4 2025: 2,500 sessions/month free, then $11.50/1k.

**Cheap-at-volume alternative:** **Radar Maps Platform** — 100K free requests/month across the board, $0.50/1k for autocomplete _and_ distance after that. Best economics if the demand test converts and you scale past ~10K quotes/month.

**Skip:** **LocationIQ** (Nominatim/OSM under the hood — same blurry suburban accuracy + the transparent-dropdown problem you already hit), **USPS Address API** (verification only, no autocomplete, no distance, deliverable-mail addresses only).

Estimated effort: **6–8 hours** end-to-end including key provisioning, a proxy route, the new autocomplete component, and the feature flag.

---

## Provider comparison (verified May 2026)

| Provider | Free tier (monthly) | Paid (next tier) | US street accuracy | Autocomplete UX | Distance / Matrix | Setup complexity | Notes |
|---|---|---|---|---|---|---|---|
| **Google Places Autocomplete (New) + Routes Matrix** | 10,000 Autocomplete Requests + Unlimited Autocomplete Session Usage + 10,000 Route Matrix elements + 10,000 Place Details | $2.83/1k autocomplete requests · $5/1k matrix elements · $5/1k place details | Best-in-class | Best-in-class (well-known dropdown, biased toward business) | Routes: Compute Route Matrix Essentials | Medium — billing project, key restrictions, session tokens | $200 monthly credit ended Mar 1 2025 — replaced with free-per-SKU caps |
| **Mapbox Search Box + Matrix API** | 2,500 Search Box sessions + 100,000 Matrix elements + 100,000 Temporary Geocoding requests | $11.50/1k Search Box sessions (2,501–100k) · $2.00/1k matrix elements | Excellent for US; OSM-backed but heavily curated | Very good; full JS SDK + dropdown component | Matrix API (10 coords max for `driving-traffic`, 25 otherwise) | Low–medium — one access token, public or proxied | "Introductory preview" pricing expired Q4 2025 |
| **Radar.io (Maps Platform)** | 100,000 requests/month across geocoding, autocomplete, distance | $0.50/1k autocomplete · $0.50/1k distance · $2/1k places search | Very good for US addresses | Good; less ubiquitous than Google but clean | Distance API (server-side) | Low | Cheapest pay-as-you-go in this list |
| **Geoapify** | 3,000 credits/day (~90k/mo) | $59/mo starts at 10k credits/day, then tiered | Decent (OSM + multiple sources) | OK; less polished | Routing API, 1 credit/waypoint pair | Low | Daily cap can bite during launch spikes |
| **HERE Platform** | 30,000 transactions/month across geocoding + routing | $1.00/1k geocoding · $1.50/1k routing | Excellent | Solid autosuggest widget | Routing API | Medium | Base Plan +6% effective Apr 1 2026 |
| **Smarty (US Address Autocomplete + Verify)** | None — 42-day trial / 1,000 lookups | Autocomplete from $20/mo · Verify from $50/mo | Authoritative for US (USPS + non-USPS) | Good for forms, limited POI | None (no distance API) | Low | Subscription, US-only, no free monthly tier |
| **LocationIQ** | 5,000/day on free dev plan | $49+/mo | Mediocre street-level (Nominatim/OSM) | OK; same data limitations | Routing API | Low | Underlying OSM data is the reason your last attempt felt off |
| **USPS Web Tools** | Free for verification of deliverable mail addresses | Free | Authoritative for USPS-deliverable addresses only | None (no autocomplete) | None | Medium (registration + XML) | Verification only — does not replace a geocoder |

---

## Recommended: Google Places Autocomplete (New) + Distance Matrix

### Why

1. **Best US street-level accuracy** — Google's first-party building/parcel data still beats every OSM-derived provider for residential suburb addresses, which is exactly where the Massachusetts moving lead is.
2. **Familiar UX** — the "type 3 chars → dropdown of formatted addresses → select" interaction is the implicit baseline every user expects. Lower friction at Step 1 = higher Step 1→2 conversion.
3. **Free tier covers the demand test by a wide margin** — see math below.
4. **Session tokens make the bill predictable** — keystrokes inside an autocomplete session that terminates in a `Place Details` call get wrapped under the "Autocomplete Session Usage" SKU, which is **unlimited and free**.

### SKUs you'll touch

| SKU | Category | Free cap | First paid tier |
|---|---|---|---|
| `Autocomplete Requests` | Essentials | 10,000 / mo | $2.83 per 1,000 (10,001 – 100,000) |
| `Autocomplete Session Usage` | Essentials | Unlimited | $0 (the wrapper SKU when a session terminates correctly) |
| `Places API Place Details Essentials` | Essentials | 10,000 / mo | $5.00 per 1,000 |
| `Routes: Compute Route Matrix Essentials` | Essentials | 10,000 / mo | $5.00 per 1,000 elements |

### Free-tier math for ~1,000 quotes/month

Assumptions:
- 1,000 successful Step 1 completions/month → 2,000 address selections (pickup + dropoff).
- ~6–8 keystrokes per address with a 200 ms debounce and a 3-char minimum before the first request. Call it ~8 autocomplete requests per session worst case.
- Every selection ends with one `Place Details (New)` call to retrieve the coordinates → terminates the session correctly.
- 1,000 trips → 1,000 Route Matrix elements (1 origin × 1 destination).

| Line item | Volume | Free cap | Billable | Cost |
|---|---|---|---|---|
| Autocomplete Requests | 2,000 sessions × ~8 = 16,000 | 10,000 free | 6,000 @ $2.83/1k | **$16.98** |
| Autocomplete Session Usage | 2,000 wrapper events | Unlimited free | 0 | **$0.00** |
| Place Details Essentials | 2,000 | 10,000 free | 0 | **$0.00** |
| Route Matrix Essentials | 1,000 elements | 10,000 free | 0 | **$0.00** |
| **Total** | | | | **~$17/mo worst case** |

In practice the keystroke count drops sharply with `minLength: 3` + 250 ms debounce, so the expected bill for the demand test is **$0–$5/month**. Even a 5× traffic spike sits well under $100/month.

### Gotchas

1. **Session tokens are mandatory or the bill changes.** A Places Autocomplete request without a `sessionToken`, or with one that never terminates in a `Place Details` call, is billed individually under `Autocomplete Requests` for every keystroke. Generate one UUID per address field, pass it on every `/autocomplete` call for that field, then pass the **same** token to the `/details` call when the user picks a suggestion. Drop the token after.
2. **Billing project must be enabled before the API will return results.** Even on the free tier you need a Cloud project with a billing account attached — Google returns `REQUEST_DENIED` otherwise.
3. **Restrict the API key.** Two separate keys is the safe pattern:
   - `GOOGLE_MAPS_BROWSER_KEY` — referrer-restricted to `notimemover.com` + `localhost`, scoped to **Places API (New)** only. Used by the `/api/places` proxy if you want to skip the proxy on dev, or for any future client-rendered widget. Even with a proxy this key shouldn't be able to call billable SKUs you don't use.
   - `GOOGLE_MAPS_SERVER_KEY` — IP-restricted to Vercel's egress (or unrestricted but server-only), scoped to **Routes API** + **Places API (New)**. Used by `/api/distance` and `/api/places`.
4. **`Routes: Compute Route Matrix Essentials` ≠ legacy `Distance Matrix`.** The legacy Distance Matrix API still works but new projects are nudged to Routes API v2. Same price, better response shape. The code sample below uses the Routes endpoint.
5. **Field masks on Places (New).** The new API requires an explicit `X-Goog-FieldMask` header on every call. Asking only for `id, formattedAddress, location` keeps you in the Essentials price tier; pulling Pro/Enterprise fields silently upgrades the SKU and bills at the higher rate.
6. **Bias and filter the autocomplete.** Pass `includedRegionCodes: ["US"]` and a `locationBias` rectangle around Massachusetts so the dropdown isn't full of Springfield, MO and Cambridge, UK.

---

## Fallback: Mapbox Search Box + Matrix API

### When to pick this over Google

- You don't want a Google Cloud billing project attached to your account, or the Maps Platform agreement is friction with the client.
- You expect to scale past the Google free caps but stay well under Mapbox's 2,500 free sessions — between roughly 10k–60k quote attempts/month Mapbox starts to win on price.
- You're already paying Mapbox for tiles elsewhere.
- The Matrix curve is the differentiator: $2.00/1k vs Google's $5/1k after free, and 100,000 free Matrix elements/month vs Google's 10,000.

### Setup steps

1. Sign up at mapbox.com, create a public access token (`pk.*`) and a secret token (`sk.*`).
2. Add the public token to `NEXT_PUBLIC_MAPBOX_TOKEN` and restrict it by URL pattern.
3. Use `@mapbox/search-js-react`'s `<AddressAutofill>` component, or call `/search/searchbox/v1/suggest` + `/retrieve` directly via your own `/api/places` proxy (preferred — same shape as the Google plan below, key stays server-side).
4. For driving miles, hit `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/<lng1>,<lat1>;<lng2>,<lat2>?annotations=distance,duration&access_token=...`. Read `distances[0][1]` in meters, divide by 1609.34.
5. Pass a UUID `session_token` on every `/suggest` call. The session auto-closes after 2 minutes of inactivity or 50 `/suggest` calls.

Net effect: drop-in replacement for the Google version below — same proxy shape, same `getMiles` signature, only the upstream URLs and parsing change.

---

## Cheap-at-volume alternative: Radar.io

Best raw economics in this list once you're past Google's free caps. 100,000 free requests/month across every API, then a flat $0.50/1k for both autocomplete and distance. If the demand test converts and Phase 3 ships at multi-thousand-quote/month volume, re-evaluate against Radar before paying Google rates.

API shape is close enough to Google that the same `/api/places` + `/api/distance` proxy pattern works — only the endpoint URLs and field names change. Endpoints: `https://api.radar.io/v1/search/autocomplete` and `https://api.radar.io/v1/route/distance`. Key header: `Authorization: <publishable_or_secret_key>`.

The accuracy isn't quite Google-tier for obscure rural addresses, but it's well ahead of OSM-based providers for the kind of suburban Massachusetts moves NoTimeMover serves.

---

## Skip

- **LocationIQ** — sells itself as a Google alternative but the underlying geocoder is Nominatim on OSM data. That's the exact stack that produced the suburban-address misses and the dropdown-styling pain in the Phase 1 spike. Same data → same problems.
- **USPS Web Tools** — verification API only. No type-ahead, no coordinates, no distance, can't validate addresses that aren't on a USPS carrier route. Useful at submission time as a sanity-check on the final selected address, never as the primary geocoder.

---

## Drop-in code

The shape below keeps the `getMiles(from: string, to: string)` signature intact so `BookingFlow.tsx` doesn't need touch-ups beyond optionally swapping the `<AddressBlock>` for `<AddressAutocomplete>`.

### `lib/distance.ts` (rewrite)

```typescript
// Distance calculation between two formatted addresses.
// Phase 2: thin client wrapper that calls /api/distance server-side so the
// Google Maps key never leaves the server. Same signature as Phase 1 so
// BookingFlow.tsx doesn't need to change.

const STUB_MILES = 25

export async function getMiles(from: string, to: string): Promise<number> {
  if (!from || !to) return 0

  // Feature flag — fall back to the stub if the geocoder isn't wired up yet.
  if (process.env.NEXT_PUBLIC_USE_GEOCODER !== '1') {
    return STUB_MILES
  }

  try {
    const res = await fetch('/api/distance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to }),
    })
    if (!res.ok) return STUB_MILES
    const data = (await res.json()) as { miles?: number }
    return typeof data.miles === 'number' && data.miles > 0 ? data.miles : STUB_MILES
  } catch {
    return STUB_MILES
  }
}
```

### `app/api/distance/route.ts` (new, Node.js runtime)

```typescript
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const ENDPOINT = 'https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix'
const METERS_PER_MILE = 1609.34

export async function POST(req: Request) {
  const key = process.env.GOOGLE_MAPS_SERVER_KEY
  if (!key) {
    return NextResponse.json({ error: 'GOOGLE_MAPS_SERVER_KEY not set', miles: 0 }, { status: 500 })
  }

  let body: { from?: string; to?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON', miles: 0 }, { status: 400 })
  }

  const { from, to } = body
  if (!from || !to) {
    return NextResponse.json({ error: 'Missing from/to', miles: 0 }, { status: 400 })
  }

  const upstream = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': key,
      'X-Goog-FieldMask': 'originIndex,destinationIndex,distanceMeters,duration,status',
    },
    body: JSON.stringify({
      origins: [{ waypoint: { address: from } }],
      destinations: [{ waypoint: { address: to } }],
      travelMode: 'DRIVE',
      routingPreference: 'TRAFFIC_UNAWARE',
      units: 'IMPERIAL',
    }),
  })

  if (!upstream.ok) {
    const text = await upstream.text()
    console.error('[distance] upstream error', upstream.status, text)
    return NextResponse.json({ error: 'Upstream failed', miles: 0 }, { status: 502 })
  }

  const rows = (await upstream.json()) as Array<{ distanceMeters?: number; status?: { code?: number } }>
  const meters = rows?.[0]?.distanceMeters ?? 0
  const miles = Math.round((meters / METERS_PER_MILE) * 10) / 10

  return NextResponse.json({ miles })
}
```

### `app/api/places/route.ts` (new, Node.js runtime, proxies Autocomplete + Details)

```typescript
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const AUTOCOMPLETE = 'https://places.googleapis.com/v1/places:autocomplete'
const DETAILS_BASE = 'https://places.googleapis.com/v1/places'

// Bias toward Massachusetts so the demand test doesn't return Cambridge, UK.
const MA_BIAS = {
  rectangle: {
    low:  { latitude: 41.187,  longitude: -73.508 },
    high: { latitude: 42.887,  longitude: -69.928 },
  },
}

export async function POST(req: Request) {
  const key = process.env.GOOGLE_MAPS_SERVER_KEY
  if (!key) return NextResponse.json({ error: 'GOOGLE_MAPS_SERVER_KEY not set' }, { status: 500 })

  const body = (await req.json().catch(() => ({}))) as {
    action?: 'autocomplete' | 'details'
    input?: string
    placeId?: string
    sessionToken?: string
  }

  if (!body.sessionToken) {
    return NextResponse.json({ error: 'sessionToken required' }, { status: 400 })
  }

  if (body.action === 'autocomplete') {
    if (!body.input || body.input.trim().length < 3) {
      return NextResponse.json({ suggestions: [] })
    }
    const upstream = await fetch(AUTOCOMPLETE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': key,
      },
      body: JSON.stringify({
        input: body.input,
        sessionToken: body.sessionToken,
        includedRegionCodes: ['us'],
        locationBias: MA_BIAS,
        includedPrimaryTypes: ['street_address', 'premise', 'subpremise', 'route'],
      }),
    })
    const json = await upstream.json()
    const suggestions = (json.suggestions ?? []).map((s: any) => ({
      placeId: s.placePrediction?.placeId,
      text: s.placePrediction?.text?.text,
      primary: s.placePrediction?.structuredFormat?.mainText?.text,
      secondary: s.placePrediction?.structuredFormat?.secondaryText?.text,
    })).filter((s: any) => s.placeId)
    return NextResponse.json({ suggestions })
  }

  if (body.action === 'details') {
    if (!body.placeId) return NextResponse.json({ error: 'placeId required' }, { status: 400 })
    const upstream = await fetch(`${DETAILS_BASE}/${body.placeId}?sessionToken=${body.sessionToken}`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'id,formattedAddress,location,addressComponents',
      },
    })
    const place = await upstream.json()
    return NextResponse.json({ place })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
```

### `components/AddressAutocomplete.tsx` (new)

Same look as `<AddressBlock>` — single dark input, opaque solid dropdown (`#0A0606`, the same `--core` background used by the doppelrand modal, so there's no transparency), matches `.input-field` styling. Exposes `onSelect(formattedAddress)` so Step 1 can store the picked string and `getMiles` keeps working.

```tsx
'use client'

import { useEffect, useId, useRef, useState } from 'react'

interface Suggestion {
  placeId: string
  text: string
  primary: string
  secondary: string
}

interface Props {
  label: string
  value: string
  onChange: (next: string) => void
  onSelect: (formatted: string) => void
  autoFocus?: boolean
  placeholder?: string
}

function uuid() {
  return crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export default function AddressAutocomplete({
  label,
  value,
  onChange,
  onSelect,
  autoFocus,
  placeholder = 'Start typing your address',
}: Props) {
  const listboxId = useId()
  const [items, setItems] = useState<Suggestion[]>([])
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const [loading, setLoading] = useState(false)
  const sessionToken = useRef<string>(uuid())
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  // Close on outside click.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('mousedown', onDown)
    return () => window.removeEventListener('mousedown', onDown)
  }, [])

  // Debounced fetch.
  useEffect(() => {
    if (debounce.current) clearTimeout(debounce.current)
    if (value.trim().length < 3) {
      setItems([])
      return
    }
    debounce.current = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/places', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'autocomplete',
            input: value,
            sessionToken: sessionToken.current,
          }),
        })
        const data = (await res.json()) as { suggestions?: Suggestion[] }
        setItems(data.suggestions ?? [])
        setActive(0)
        setOpen(true)
      } finally {
        setLoading(false)
      }
    }, 220)
    return () => {
      if (debounce.current) clearTimeout(debounce.current)
    }
  }, [value])

  const pick = async (s: Suggestion) => {
    setOpen(false)
    onChange(s.text)
    // Terminate the session with a Place Details call.
    const res = await fetch('/api/places', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'details',
        placeId: s.placeId,
        sessionToken: sessionToken.current,
      }),
    })
    const data = (await res.json()) as { place?: { formattedAddress?: string } }
    onSelect(data.place?.formattedAddress ?? s.text)
    // Rotate to a fresh session token for the next address.
    sessionToken.current = uuid()
  }

  return (
    <div>
      <div className="block text-[10px] uppercase tracking-[0.22em] text-white/45 mb-3 font-medium">
        {label}
      </div>
      <div ref={wrapRef} className="relative">
        <input
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          autoComplete="off"
          autoFocus={autoFocus}
          value={value}
          placeholder={placeholder}
          onFocus={() => items.length > 0 && setOpen(true)}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (!open || items.length === 0) return
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              setActive((i) => Math.min(i + 1, items.length - 1))
            } else if (e.key === 'ArrowUp') {
              e.preventDefault()
              setActive((i) => Math.max(i - 1, 0))
            } else if (e.key === 'Enter') {
              e.preventDefault()
              pick(items[active])
            } else if (e.key === 'Escape') {
              setOpen(false)
            }
          }}
          className="input-field"
        />
        {open && items.length > 0 && (
          <ul
            id={listboxId}
            role="listbox"
            // Solid dark background — no transparency, no backdrop-blur — to match the
            // doppelrand-core panel and fix the readability complaint from Phase 1.
            className="absolute z-30 left-0 right-0 mt-2 rounded-2xl overflow-hidden"
            style={{
              background: '#0A0606',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow:
                'inset 0 1px 1px rgba(255,255,255,0.04), 0 24px 48px -20px rgba(0,0,0,0.9)',
            }}
          >
            {items.map((s, i) => {
              const isActive = i === active
              return (
                <li
                  key={s.placeId}
                  role="option"
                  aria-selected={isActive}
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    pick(s)
                  }}
                  className="px-5 py-3 cursor-pointer transition-colors duration-150"
                  style={{
                    background: isActive ? 'rgba(107,58,31,0.22)' : 'transparent',
                    borderBottom:
                      i === items.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  <div className="text-[14px] text-white leading-tight">{s.primary}</div>
                  <div className="text-[12px] text-white/45 mt-0.5">{s.secondary}</div>
                </li>
              )
            })}
          </ul>
        )}
        {loading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-white/30 border-t-transparent animate-spin" />
        )}
      </div>
    </div>
  )
}
```

### Wiring it into `BookingFlow.tsx` (minimal patch)

`FormState` already has `pickup`/`dropoff` as `Address` objects. Two options:

**A. Soft swap (keep `Address` shape).** Replace `<AddressBlock>` with `<AddressAutocomplete>` and on `onSelect` parse the formatted address into `{ street, city, state, zip }` via the `addressComponents` field returned by Places Details. `isAddressComplete` keeps working unchanged.

**B. Cleaner — store a `formatted: string` field per address.** Add `formatted: string` to `Address`, set it from `onSelect`, change `isAddressComplete` to `a.formatted.trim().length > 6`, change `formatAddress` to return `a.formatted`. `getMiles` already takes the formatted string, so nothing else moves.

Recommend **B**: less brittle than parsing components, and Google's `formattedAddress` is exactly the string Distance Matrix wants on the way back in.

---

## Environment variables

Add to `.env.local` (and to **Production** + **Preview** in Vercel):

```bash
# Server-only. Routes API + Places API (New). IP-restricted if possible.
GOOGLE_MAPS_SERVER_KEY=AIza...

# Optional — only if you ever client-render a Map or use the JS Place Autocomplete widget.
# Referrer-restricted to your domain. Not used by the proxy routes above.
NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY=AIza...

# Feature flag. Set to "1" to enable the live geocoder + distance matrix.
# Unset / "0" falls back to plain inputs + 25-mile stub (the current Phase 1 behavior).
NEXT_PUBLIC_USE_GEOCODER=1
```

Vercel environment scopes:
- `GOOGLE_MAPS_SERVER_KEY` → **Production**, **Preview**. Not needed in Development unless you want real data locally.
- `NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY` → all three, if you end up using it.
- `NEXT_PUBLIC_USE_GEOCODER` → **Production** + **Preview** = `1`; leave unset in **Development** so local runs keep using the stub.

---

## Effort breakdown (6–8 hours total)

| # | Step | Estimate |
|---|---|---|
| 1 | Create Google Cloud project, enable Places API (New) + Routes API, attach billing, mint server + browser keys, restrict them | 0.75 h |
| 2 | Add env vars locally + in Vercel (Prod + Preview) | 0.25 h |
| 3 | Add `app/api/distance/route.ts` and `app/api/places/route.ts`, wire `Authorization` + `X-Goog-FieldMask`, smoke test with `curl` | 1.5 h |
| 4 | Build `components/AddressAutocomplete.tsx` with the opaque dropdown styling | 2.0 h |
| 5 | Patch `BookingFlow.tsx` Step 1 to use the new component + extend `Address` with `formatted` | 1.0 h |
| 6 | Add `NEXT_PUBLIC_USE_GEOCODER` feature flag + verify fallback path still works | 0.5 h |
| 7 | Manual QA: MA → MA local, MA → NY long, garbage input, slow network, mobile keyboard | 1.0 h |
| 8 | Buffer for Google billing onboarding friction + key restriction iteration | 1.0 h |
| | **Total** | **~8 h** |

---

## Rollback plan

The whole upgrade sits behind a single env var: `NEXT_PUBLIC_USE_GEOCODER`. With it unset (or set to anything other than `"1"`), `lib/distance.ts` returns the same 25-mile stub it does today and `BookingFlow.tsx` Step 1 falls back to the existing four-field `<AddressBlock>` (keep the original component in the file and gate the new `<AddressAutocomplete>` on the same flag). To roll back in production: flip `NEXT_PUBLIC_USE_GEOCODER` to `0` in Vercel → redeploy (or trigger a rebuild) → the form reverts to Phase 1 behavior with zero code changes, no key revocation, and no data loss for in-flight leads. If Google billing or quota turns into a problem mid-launch, the rollback path is one env-var toggle away.
