'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Real Massachusetts boundary — derived from USGS GeoJSON, projected to 760×399 space
// viewBox has 20px padding on all sides → "-20 -20 800 440"
const MA_OUTLINE =
  'M 551 0 L 572 5 L 580 55 L 571 96 L 537 134 L 536 178 ' +
  'L 583 184 L 611 229 L 606 265 L 629 275 L 632 308 ' +
  'L 691 336 L 760 309 L 745 349 L 643 383 L 606 385 ' +
  'L 584 358 L 549 366 L 548 386 L 508 399 ' +
  'L 492 347 L 486 338 L 464 317 L 452 250 L 421 250 ' +
  'L 364 253 L 364 248 L 97 243 L 5 240 L 0 229 ' +
  'L 51 41 L 224 46 L 471 55 L 494 28 Z'

interface City {
  id: string
  label: string
  x: number
  y: number
  major?: boolean
}

// City positions derived from same geographic projection
const CITIES: City[] = [
  { id: 'boston',      label: 'Boston',      x: 521, y: 151, major: true },
  { id: 'worcester',   label: 'Worcester',   x: 363, y: 179, major: true },
  { id: 'springfield', label: 'Springfield', x: 195, y: 226, major: true },
  { id: 'lowell',      label: 'Lowell',      x: 466, y: 73  },
  { id: 'brockton',    label: 'Brockton',    x: 530, y: 231 },
  { id: 'newbedford',  label: 'New Bedford', x: 548, y: 359 },
  { id: 'plymouth',    label: 'Plymouth',    x: 605, y: 267 },
  { id: 'pittsfield',  label: 'Pittsfield',  x: 56,  y: 126 },
  { id: 'northampton', label: 'Northampton', x: 187, y: 161 },
  { id: 'framingham',  label: 'Framingham',  x: 445, y: 175 },
  { id: 'salem',       label: 'Salem',       x: 556, y: 106 },
  { id: 'gloucester',  label: 'Gloucester',  x: 606, y: 78  },
  { id: 'lawrence',    label: 'Lawrence',    x: 499, y: 52  },
  { id: 'hyannis',     label: 'Hyannis',     x: 686, y: 354 },
]

const ROUTES: [number, number][] = [
  [0, 2],   // Boston → Springfield
  [3, 0],   // Lowell → Boston
  [1, 0],   // Worcester → Boston
  [0, 5],   // Boston → New Bedford
  [7, 1],   // Pittsfield → Worcester
  [0, 6],   // Boston → Plymouth
  [11, 0],  // Gloucester → Boston
  [2, 1],   // Springfield → Worcester
  [0, 9],   // Boston → Framingham
  [8, 2],   // Northampton → Springfield
  [12, 0],  // Lawrence → Boston
  [4, 0],   // Brockton → Boston
  [0, 13],  // Boston → Hyannis
  [1, 8],   // Worcester → Northampton
]

function makeBeamPath(from: City, to: City): string {
  const mx = (from.x + to.x) / 2
  const my = (from.y + to.y) / 2
  // Control point curves slightly toward geographic center of MA
  const cx = mx + (370 - mx) * 0.18
  const cy = my + (200 - my) * 0.18 - 18
  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`
}

const BEAM_DUR = 0.9
const FADE_DUR = 1.8

export default function MassMapBackground() {
  const [idx, setIdx] = useState(0)
  const [beamKey, setBeamKey] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIdx(i => (i + 1) % ROUTES.length)
      setBeamKey(k => k + 1)
    }, 2700)
    return () => clearInterval(id)
  }, [])

  const from = CITIES[ROUTES[idx][0]]
  const to   = CITIES[ROUTES[idx][1]]
  const path = makeBeamPath(from, to)

  return (
    <svg
      viewBox="-20 -20 800 440"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <filter id="mmb-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="mmb-beam" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="mmb-corona" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
          </feMerge>
        </filter>
      </defs>

      {/* Massachusetts outline — glass fill + coffee border */}
      <path
        d={MA_OUTLINE}
        fill="rgba(107,58,31,0.07)"
        stroke="rgba(139,82,48,0.30)"
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Top-edge glass highlight */}
      <path
        d={MA_OUTLINE}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={1}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* City dots */}
      {CITIES.map(city => (
        <g key={city.id}>
          <circle cx={city.x} cy={city.y} r={city.major ? 5.5 : 4} fill="rgba(107,58,31,0.20)" />
          <circle cx={city.x} cy={city.y} r={city.major ? 2.5 : 1.8} fill="rgba(139,82,48,0.65)" />
        </g>
      ))}

      {/* Major city labels */}
      {CITIES.filter(c => c.major).map(city => (
        <text
          key={`lbl-${city.id}`}
          x={city.x + 7}
          y={city.y + 4}
          fontSize={9}
          fill="rgba(139,82,48,0.45)"
          fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
          letterSpacing={0.8}
        >
          {city.label.toUpperCase()}
        </text>
      ))}

      {/* Animated beam */}
      <AnimatePresence mode="sync">
        <motion.g key={beamKey} initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>

          {/* Source ring pulse */}
          <motion.circle
            cx={from.x} cy={from.y} r={3}
            fill="none" stroke="#6B3A1F" strokeWidth={1.5}
            filter="url(#mmb-glow)"
            initial={{ r: 3, opacity: 0.95 }}
            animate={{ r: 20, opacity: 0 }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
          />
          <motion.circle
            cx={from.x} cy={from.y} r={3} fill="#8B5230"
            filter="url(#mmb-glow)"
            initial={{ opacity: 1, scale: 1.4 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          />

          {/* Beam — wide soft corona */}
          <motion.path
            d={path} stroke="#6B3A1F" strokeWidth={6} fill="none" strokeLinecap="round"
            filter="url(#mmb-corona)"
            initial={{ pathLength: 0, opacity: 0.6 }}
            animate={{ pathLength: 1, opacity: [0.6, 0.5, 0] }}
            transition={{
              pathLength: { duration: BEAM_DUR, ease: [0.32, 0.72, 0, 1] },
              opacity: { duration: FADE_DUR, times: [0, 0.5, 1] },
            }}
          />
          {/* Beam — mid glow */}
          <motion.path
            d={path} stroke="#8B5230" strokeWidth={2.5} fill="none" strokeLinecap="round"
            filter="url(#mmb-beam)"
            initial={{ pathLength: 0, opacity: 0.9 }}
            animate={{ pathLength: 1, opacity: [0.9, 0.9, 0] }}
            transition={{
              pathLength: { duration: BEAM_DUR, ease: [0.32, 0.72, 0, 1] },
              opacity: { duration: FADE_DUR, times: [0, 0.55, 1] },
            }}
          />
          {/* Beam — bright core */}
          <motion.path
            d={path} stroke="rgba(230,170,110,0.75)" strokeWidth={1} fill="none" strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.9 }}
            animate={{ pathLength: 1, opacity: [0.9, 0.9, 0] }}
            transition={{
              pathLength: { duration: BEAM_DUR, ease: [0.32, 0.72, 0, 1] },
              opacity: { duration: FADE_DUR, times: [0, 0.55, 1] },
            }}
          />

          {/* Destination ring pulse */}
          <motion.circle
            cx={to.x} cy={to.y} r={3}
            fill="none" stroke="#6B3A1F" strokeWidth={1.5}
            filter="url(#mmb-glow)"
            initial={{ r: 3, opacity: 0 }}
            animate={{ r: [3, 3, 18], opacity: [0, 0.95, 0] }}
            transition={{ duration: 0.9, delay: BEAM_DUR - 0.05, ease: 'easeOut' }}
          />
          <motion.circle
            cx={to.x} cy={to.y} r={3} fill="#8B5230"
            filter="url(#mmb-glow)"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: [0.4, 1, 0.5] }}
            transition={{ duration: 0.5, delay: BEAM_DUR - 0.05 }}
          />
        </motion.g>
      </AnimatePresence>
    </svg>
  )
}
