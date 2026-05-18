import { useEffect, useRef, useState } from 'react'

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ''
const MA_BBOX = '-73.508,41.187,-69.858,42.887'

export interface AddressSuggestion {
  street: string
  city: string
  zip: string
}

interface MapboxFeature {
  text: string
  address?: string
  context?: { id: string; text: string }[]
}

function parse(f: MapboxFeature): AddressSuggestion | null {
  const ctx = f.context ?? []
  const zip = ctx.find(c => c.id.startsWith('postcode'))?.text ?? ''
  const city = ctx.find(c => c.id.startsWith('place'))?.text ?? ''
  const street = f.address ? `${f.address} ${f.text}` : f.text
  if (!street || !city || !zip) return null
  return { street, city, zip }
}

export function useAddressAutocomplete(query: string) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current)
    const q = query.trim()
    if (q.length < 3 || !TOKEN) { setSuggestions([]); return }

    timer.current = setTimeout(async () => {
      try {
        const url =
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(q)}.json` +
          `?access_token=${TOKEN}&country=US&bbox=${MA_BBOX}&types=address&autocomplete=true&limit=5&language=en`
        const res = await fetch(url)
        if (!res.ok) return
        const data = (await res.json()) as { features?: MapboxFeature[] }
        setSuggestions((data.features ?? []).map(parse).filter(Boolean) as AddressSuggestion[])
      } catch {
        // user can still fill manually
      }
    }, 250)

    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [query])

  return { suggestions, clear: () => setSuggestions([]) }
}
