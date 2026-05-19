'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Simplified Massachusetts outline — viewBox 0 0 760 420
// Clockwise from NW corner: north border → Cape Ann → east coast → Cape Cod → south coast → western border
const MA_OUTLINE = `
M 22 38
C 90 30 200 24 340 22
C 440 20 520 22 572 25
L 590 30
C 604 18 618 20 631 27
C 642 34 642 47 634 59
L 618 70
L 600 86
C 590 98 578 112 568 126
L 563 138
C 567 150 578 162 590 170
L 612 192
L 636 210
L 640 232
L 637 260
L 640 270
C 652 276 664 282 678 288
L 706 300
C 726 310 744 316 748 320
C 756 308 758 288 750 266
C 744 250 734 234 720 218
C 712 208 704 204 698 204
C 692 206 682 214 674 226
C 666 236 654 246 644 252
C 636 256 626 254 620 248
L 616 268
C 600 280 582 290 560 298
C 540 306 518 312 496 312
L 438 310
L 356 304
L 274 296
L 192 288
L 108 278
L 52 272
L 22 270
Z
`.trim()

interface City {
  id: string
  label: string
  x: number
  y: number
  major?: boolean
}

const CITIES: City[] = [
  { id: 'boston',      label: 'Boston',      x: 548, y: 118, major: true },
  { id: 'worcester',   label: 'Worcester',   x: 374, y: 144, major: true },
  { id: 'springfield', label: 'Springfield', x: 194, y: 174, major: true },
  { id: 'lowell',      label: 'Lowell',      x: 490, y: 56  },
  { id: 'brockton',    label: 'Brockton',    x: 558, y: 180 },
  { id: 'newbedford',  label: 'New Bedford', x: 554, y: 298 },
  { id: 'plymouth',    label: 'Plymouth',    x: 636, y: 200 },
  { id: 'pittsfield',  label: 'Pittsfield',  x: 52,  y: 102 },
  { id: 'northampton', label: 'Northampton', x: 192, y: 134 },
  { id: 'framingham',  label: 'Framingham',  x: 462, y: 146 },
  { id: 'salem',       label: 'Salem',       x: 574, y: 84  },
  { id: 'gloucester',  label: 'Gloucester',  x: 610, y: 62  },
  { id: 'lawrence',    label: 'Lawrence',    x: 512, y: 44  },
  { id: 'hyannis',     label: 'Hyannis',     x: 644, y: 282 },
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
  const cx = mx + (340 - mx) * 0.18
  const cy = my + (162 - my) * 0.18 - 18
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
      viewBox="0 0 760 420"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
      aria-hidden="true"
    >
      <defs>
        {/* Dot / outline glow */}
        <filter id="mmb-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Beam glow */}
        <filter id="mmb-beam" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Outer corona glow for beam */}
        <filter id="mmb-corona" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
          </feMerge>
        </filter>
      </defs>

      {/* Massachusetts shape — glass fill + subtle coffee border */}
      <path
        d={MA_OUTLINE}
        fill="rgba(107,58,31,0.07)"
        stroke="rgba(139,82,48,0.28)"
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Top-edge highlight for glass effect */}
      <path
        d={MA_OUTLINE}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={1}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* All city dots */}
      {CITIES.map(city => (
        <g key={city.id}>
          <circle cx={city.x} cy={city.y} r={city.major ? 5.5 : 4} fill="rgba(107,58,31,0.20)" />
          <circle cx={city.x} cy={city.y} r={city.major ? 2.5 : 1.8} fill="rgba(139,82,48,0.65)" />
        </g>
      ))}

      {/* City labels for major hubs */}
      {CITIES.filter(c => c.major).map(city => (
        <text
          key={`label-${city.id}`}
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

      {/* Active beam */}
      <AnimatePresence mode="sync">
        <motion.g key={beamKey} initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>

          {/* Source city — ring pulse */}
          <motion.circle
            cx={from.x} cy={from.y} r={3}
            fill="none" stroke="#6B3A1F" strokeWidth={1.5}
            filter="url(#mmb-glow)"
            initial={{ r: 3, opacity: 0.95 }}
            animate={{ r: 20, opacity: 0 }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
          />
          {/* Source dot bright */}
          <motion.circle
            cx={from.x} cy={from.y} r={3}
            fill="#8B5230"
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

          {/* Destination — ring pulse (delayed until beam arrives) */}
          <motion.circle
            cx={to.x} cy={to.y} r={3}
            fill="none" stroke="#6B3A1F" strokeWidth={1.5}
            filter="url(#mmb-glow)"
            initial={{ r: 3, opacity: 0 }}
            animate={{ r: [3, 3, 18], opacity: [0, 0.95, 0] }}
            transition={{ duration: 0.9, delay: BEAM_DUR - 0.05, ease: 'easeOut' }}
          />
          <motion.circle
            cx={to.x} cy={to.y} r={3}
            fill="#8B5230"
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
