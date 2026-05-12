'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Stick figures asset slot.
 *
 * Drop the AI-generated image into:
 *   public/stick-figures.png   (or .webp / .svg)
 *
 * Until then the slot renders empty so the hero composition stays balanced
 * without showing a broken-image icon.
 *
 * Recommended source:
 *   - transparent background
 *   - two brown stick-figure characters facing each other holding a box between them
 *   - export at 1200×600 (or larger 2x for retina)
 *   - colors tuned to the coffee palette (#3B1F0A / #4b2e1e / #6B3A1F)
 *
 * Animation: subtle vertical sway, slightly offset cycles on each figure for life.
 * The wrapper handles the motion so the asset itself can be a static image.
 */

const ASSET_SRC = '/stick-figures.png'

export default function StickFigures({ className = '' }: { className?: string }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <div className={className} aria-hidden="true" />
  }

  return (
    <motion.div
      className={`relative ${className}`}
      aria-hidden="true"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      style={{ opacity: loaded ? 1 : 0, transition: 'opacity 600ms ease-out' }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ASSET_SRC}
        alt=""
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className="w-full h-full object-contain object-bottom select-none pointer-events-none"
        draggable={false}
        style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.5))' }}
      />
    </motion.div>
  )
}
