'use client'

import { useId } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Strict palette
const INK = '#050505'
const COFFEE = '#4b2e1e'        // matches Tailwind coffee-deep
const COFFEE_MED = '#6B3A1F'
const HIGHLIGHT = '#8B5230'

const EASE = [0.45, 0, 0.55, 1] as const

type Props = { className?: string }

export default function StickFigures({ className = '' }: Props) {
  const reduceMotion = useReducedMotion()
  const rid = useId().replace(/:/g, '')
  const p = `ntm-${rid}`
  const on = !reduceMotion

  return (
    <svg
      viewBox="0 0 360 180"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      className={className}
      style={{ filter: 'drop-shadow(0 18px 30px rgba(75, 46, 30, 0.25)) drop-shadow(0 6px 14px rgba(0, 0, 0, 0.55))' }}
    >
      <defs>
        <linearGradient id={`${p}-stroke`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={HIGHLIGHT} />
          <stop offset="100%" stopColor={COFFEE} />
        </linearGradient>

        <linearGradient id={`${p}-house`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(139, 82, 48, 0.18)" />
          <stop offset="100%" stopColor="rgba(75, 46, 30, 0.45)" />
        </linearGradient>

        <linearGradient id={`${p}-roof`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COFFEE_MED} />
          <stop offset="100%" stopColor={COFFEE} />
        </linearGradient>

        <linearGradient id={`${p}-truck`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COFFEE_MED} />
          <stop offset="55%" stopColor={COFFEE} />
          <stop offset="100%" stopColor="#3a2316" />
        </linearGradient>

        <linearGradient id={`${p}-box`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5b3a23" />
          <stop offset="100%" stopColor="#2a1607" />
        </linearGradient>

        <radialGradient id={`${p}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(139, 82, 48, 0.38)" />
          <stop offset="55%" stopColor="rgba(75, 46, 30, 0.16)" />
          <stop offset="100%" stopColor="rgba(5, 5, 5, 0)" />
        </radialGradient>

        <linearGradient id={`${p}-ground`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(139, 82, 48, 0)" />
          <stop offset="50%" stopColor="rgba(139, 82, 48, 0.35)" />
          <stop offset="100%" stopColor="rgba(139, 82, 48, 0)" />
        </linearGradient>
      </defs>

      {/* Soft radial glow behind truck */}
      <motion.ellipse
        cx={180}
        cy={132}
        rx={108}
        ry={32}
        fill={`url(#${p}-glow)`}
        animate={on ? { opacity: [0.55, 0.95, 0.55] } : false}
        transition={{ duration: 8, repeat: on ? Infinity : 0, ease: EASE }}
      />

      {/* Ground horizon */}
      <line x1={28} y1={160} x2={332} y2={160} stroke={`url(#${p}-ground)`} strokeWidth={0.6} />

      {/* Dashed route — pickup → truck → dropoff, flow animation */}
      <motion.path
        d="M 60 118 C 96 70 138 70 180 100 C 222 130 260 130 300 118"
        fill="none"
        stroke={HIGHLIGHT}
        strokeWidth={1.1}
        strokeLinecap="round"
        strokeDasharray="2 6"
        strokeOpacity={0.45}
        animate={on ? { strokeDashoffset: [0, -32] } : false}
        transition={{ duration: 6, repeat: on ? Infinity : 0, ease: 'linear' }}
      />

      {/* LEFT HOUSE */}
      <g strokeLinejoin="round">
        <rect
          x={42}
          y={122}
          width={34}
          height={34}
          rx={2}
          fill={`url(#${p}-house)`}
          stroke={`url(#${p}-stroke)`}
          strokeWidth={1.3}
        />
        <path
          d="M 38 122 L 59 102 L 80 122 Z"
          fill={`url(#${p}-roof)`}
          stroke={`url(#${p}-stroke)`}
          strokeWidth={1.3}
        />
        <rect
          x={55}
          y={134}
          width={8}
          height={22}
          rx={0.6}
          fill="rgba(5,5,5,0.55)"
          stroke={COFFEE_MED}
          strokeWidth={0.55}
          opacity={0.9}
        />
      </g>

      {/* Left pin */}
      <motion.g
        animate={on ? { y: [0, -1.5, 0], opacity: [0.85, 1, 0.85] } : false}
        transition={{ duration: 5, repeat: on ? Infinity : 0, ease: EASE }}
      >
        <circle cx={59} cy={88} r={4.5} fill={HIGHLIGHT} opacity={0.18} />
        <circle cx={59} cy={88} r={2.2} fill={HIGHLIGHT} />
        <circle cx={59} cy={88} r={0.9} fill={INK} />
      </motion.g>

      {/* RIGHT HOUSE */}
      <g strokeLinejoin="round">
        <rect
          x={284}
          y={122}
          width={34}
          height={34}
          rx={2}
          fill={`url(#${p}-house)`}
          stroke={`url(#${p}-stroke)`}
          strokeWidth={1.3}
        />
        <path
          d="M 280 122 L 301 102 L 322 122 Z"
          fill={`url(#${p}-roof)`}
          stroke={`url(#${p}-stroke)`}
          strokeWidth={1.3}
        />
        <rect
          x={297}
          y={134}
          width={8}
          height={22}
          rx={0.6}
          fill="rgba(5,5,5,0.55)"
          stroke={COFFEE_MED}
          strokeWidth={0.55}
          opacity={0.9}
        />
      </g>

      {/* Right pin */}
      <motion.g
        animate={on ? { y: [0, -1.5, 0], opacity: [0.85, 1, 0.85] } : false}
        transition={{ duration: 5, repeat: on ? Infinity : 0, ease: EASE, delay: 0.7 }}
      >
        <circle cx={301} cy={88} r={4.5} fill={HIGHLIGHT} opacity={0.18} />
        <circle cx={301} cy={88} r={2.2} fill={HIGHLIGHT} />
        <circle cx={301} cy={88} r={0.9} fill={INK} />
      </motion.g>

      {/* Marketplace offer card — floats above truck */}
      <motion.g
        animate={on ? { y: [-1.5, 1.5, -1.5], opacity: [0.85, 1, 0.85] } : false}
        transition={{ duration: 9, repeat: on ? Infinity : 0, ease: EASE }}
      >
        <rect
          x={146}
          y={28}
          width={68}
          height={28}
          rx={6}
          fill="rgba(10, 6, 6, 0.94)"
          stroke={`url(#${p}-stroke)`}
          strokeWidth={0.85}
        />
        {/* tiny dot indicator */}
        <circle cx={154} cy={42} r={1.6} fill={HIGHLIGHT} />
        {/* title bar */}
        <line
          x1={160}
          y1={39}
          x2={182}
          y2={39}
          stroke={HIGHLIGHT}
          strokeWidth={1.4}
          strokeLinecap="round"
          opacity={0.55}
        />
        {/* price bar */}
        <line
          x1={160}
          y1={45}
          x2={176}
          y2={45}
          stroke="rgba(139, 82, 48, 0.45)"
          strokeWidth={1.1}
          strokeLinecap="round"
        />
        {/* CTA mini-chip */}
        <rect x={188} y={34} width={22} height={16} rx={3.5} fill={HIGHLIGHT} opacity={0.9} />
        <line
          x1={193}
          y1={42}
          x2={205}
          y2={42}
          stroke={INK}
          strokeWidth={1.4}
          strokeLinecap="round"
          opacity={0.7}
        />
      </motion.g>

      {/* TRUCK — slow horizontal drift */}
      <motion.g
        animate={on ? { x: [-2, 2, -2] } : false}
        transition={{ duration: 14, repeat: on ? Infinity : 0, ease: EASE }}
      >
        {/* Cargo box */}
        <rect
          x={158}
          y={98}
          width={64}
          height={44}
          rx={2.5}
          fill={`url(#${p}-truck)`}
          stroke={`url(#${p}-stroke)`}
          strokeWidth={1.4}
        />
        {/* top edge highlight */}
        <line
          x1={160}
          y1={104}
          x2={220}
          y2={104}
          stroke={HIGHLIGHT}
          strokeWidth={0.5}
          opacity={0.3}
          strokeLinecap="round"
        />
        {/* center door seam */}
        <line x1={190} y1={98} x2={190} y2={142} stroke={COFFEE} strokeWidth={0.9} opacity={0.6} />
        {/* faint horizontal panel line */}
        <line
          x1={162}
          y1={120}
          x2={218}
          y2={120}
          stroke={HIGHLIGHT}
          strokeWidth={0.35}
          opacity={0.18}
        />
        {/* handle stubs on doors */}
        <line x1={185} y1={118} x2={185} y2={124} stroke={COFFEE_MED} strokeWidth={0.7} opacity={0.65} />
        <line x1={195} y1={118} x2={195} y2={124} stroke={COFFEE_MED} strokeWidth={0.7} opacity={0.65} />

        {/* Cab — angular hood */}
        <path
          d="M 158 118 L 136 118 L 130 130 L 130 142 L 158 142 Z"
          fill={`url(#${p}-truck)`}
          stroke={`url(#${p}-stroke)`}
          strokeWidth={1.4}
          strokeLinejoin="round"
        />
        {/* Cab window */}
        <path
          d="M 138 122 L 154 122 L 154 132 L 132 132 Z"
          fill="rgba(5, 5, 5, 0.65)"
          stroke={HIGHLIGHT}
          strokeWidth={0.45}
          opacity={0.9}
        />
        {/* Headlight */}
        <circle cx={132.5} cy={136} r={1.1} fill={HIGHLIGHT} opacity={0.65} />

        {/* Bumper */}
        <line
          x1={126}
          y1={146}
          x2={222}
          y2={146}
          stroke={COFFEE}
          strokeWidth={1.3}
          strokeLinecap="round"
          opacity={0.75}
        />

        {/* Wheels */}
        <circle cx={146} cy={150} r={6.5} fill={INK} stroke={COFFEE_MED} strokeWidth={1.1} />
        <circle cx={146} cy={150} r={2.5} fill={COFFEE} opacity={0.85} />
        <circle cx={208} cy={150} r={6.5} fill={INK} stroke={COFFEE_MED} strokeWidth={1.1} />
        <circle cx={208} cy={150} r={2.5} fill={COFFEE} opacity={0.85} />
      </motion.g>

      {/* Stacked moving boxes near rear */}
      <motion.g
        animate={on ? { y: [0, -1.4, 0] } : false}
        transition={{ duration: 6.5, repeat: on ? Infinity : 0, ease: EASE }}
      >
        <g transform="translate(230, 120)">
          <rect
            width={22}
            height={22}
            rx={1.2}
            fill={`url(#${p}-box)`}
            stroke={`url(#${p}-stroke)`}
            strokeWidth={1}
          />
          {/* tape strip */}
          <line x1={0} y1={7} x2={22} y2={7} stroke={COFFEE_MED} strokeWidth={1.6} opacity={0.85} />
          {/* center seam above tape */}
          <line x1={11} y1={0} x2={11} y2={7} stroke={COFFEE_MED} strokeWidth={0.7} opacity={0.55} />
        </g>
      </motion.g>

      <motion.g
        animate={on ? { y: [0, -1, 0] } : false}
        transition={{ duration: 7.5, repeat: on ? Infinity : 0, ease: EASE, delay: 0.4 }}
      >
        <g transform="translate(256, 130)">
          <rect
            width={14}
            height={12}
            rx={1}
            fill={`url(#${p}-box)`}
            stroke={`url(#${p}-stroke)`}
            strokeWidth={0.9}
            opacity={0.92}
          />
          <line x1={0} y1={4} x2={14} y2={4} stroke={COFFEE_MED} strokeWidth={1.1} opacity={0.75} />
          <line x1={7} y1={0} x2={7} y2={4} stroke={COFFEE_MED} strokeWidth={0.55} opacity={0.5} />
        </g>
      </motion.g>
    </svg>
  )
}
