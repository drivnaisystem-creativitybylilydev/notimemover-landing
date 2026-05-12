'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const STATE_ABBREVS: Record<string, string> = {
  Alabama: 'AL', Alaska: 'AK', Arizona: 'AZ', Arkansas: 'AR',
  California: 'CA', Colorado: 'CO', Connecticut: 'CT', Delaware: 'DE',
  Florida: 'FL', Georgia: 'GA', Hawaii: 'HI', Idaho: 'ID',
  Illinois: 'IL', Indiana: 'IN', Iowa: 'IA', Kansas: 'KS',
  Kentucky: 'KY', Louisiana: 'LA', Maine: 'ME', Maryland: 'MD',
  Massachusetts: 'MA', Michigan: 'MI', Minnesota: 'MN', Mississippi: 'MS',
  Missouri: 'MO', Montana: 'MT', Nebraska: 'NE', Nevada: 'NV',
  'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY',
  'North Carolina': 'NC', 'North Dakota': 'ND', Ohio: 'OH', Oklahoma: 'OK',
  Oregon: 'OR', Pennsylvania: 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
  'South Dakota': 'SD', Tennessee: 'TN', Texas: 'TX', Utah: 'UT',
  Vermont: 'VT', Virginia: 'VA', Washington: 'WA', 'West Virginia': 'WV',
  Wisconsin: 'WI', Wyoming: 'WY', 'District of Columbia': 'DC',
}

interface Suggestion {
  label: string
  primary: string
  secondary: string
}

interface Props {
  name: string
  value: string
  placeholder?: string
  className?: string
  autoFocus?: boolean
  onChange: (value: string) => void
}

function formatResult(item: any): Suggestion | null {
  const addr = item.address || {}
  const city = addr.city || addr.town || addr.village || addr.hamlet || addr.county
  const stateFull = addr.state
  if (!city || !stateFull) return null
  const state = STATE_ABBREVS[stateFull] ?? stateFull
  const houseNumber = addr.house_number
  const road = addr.road

  let primary = ''
  if (road && houseNumber) primary = `${houseNumber} ${road}`
  else if (road) primary = road
  else primary = city

  const secondary = road ? `${city}, ${state}` : state

  const label = road ? `${primary}, ${secondary}` : `${city}, ${state}`
  return { label, primary, secondary }
}

export default function LocationAutocomplete({
  name,
  value,
  placeholder,
  className = '',
  autoFocus,
  onChange,
}: Props) {
  const [query, setQuery] = useState(value)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setQuery(value) }, [value])

  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.length < 3) { setSuggestions([]); setOpen(false); return }
    setLoading(true)
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=8&countrycodes=us&addressdetails=1`
      const res = await fetch(url, { headers: { 'Accept-Language': 'en' } })
      const data = await res.json()
      const seen = new Set<string>()
      const results: Suggestion[] = []
      for (const item of data) {
        const s = formatResult(item)
        if (s && !seen.has(s.label)) {
          seen.add(s.label)
          results.push(s)
        }
      }
      setSuggestions(results)
      setOpen(results.length > 0)
    } catch {
      setSuggestions([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setQuery(val)
    onChange(val)
    setActiveIndex(-1)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 320)
  }

  const select = (s: Suggestion) => {
    setQuery(s.label)
    onChange(s.label)
    setSuggestions([])
    setOpen(false)
    setActiveIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex(i => Math.min(i + 1, suggestions.length - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIndex(i => Math.max(i - 1, -1)) }
    if (e.key === 'Enter' && activeIndex >= 0) { e.preventDefault(); select(suggestions[activeIndex]) }
    if (e.key === 'Escape')    { setOpen(false); setActiveIndex(-1) }
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        name={name}
        value={query}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete="off"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        className={className || 'input-field'}
      />
      {loading && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/50">
          …
        </span>
      )}
      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 left-0 right-0 top-full mt-2 bg-coffee/95 backdrop-blur-md border border-line rounded-2xl shadow-2xl overflow-hidden max-h-72 overflow-y-auto">
          {suggestions.map((s, i) => (
            <li
              key={s.label}
              onMouseDown={() => select(s)}
              className={`px-5 py-3 cursor-pointer transition-colors border-b border-line/40 last:border-b-0 ${
                i === activeIndex ? 'bg-coffee-deep' : 'hover:bg-coffee-deep/60'
              }`}
            >
              <div className="text-white text-sm font-medium">{s.primary}</div>
              <div className="text-white/50 text-xs mt-0.5">{s.secondary}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
