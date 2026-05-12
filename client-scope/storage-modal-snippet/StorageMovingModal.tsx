'use client'

/**
 * StorageMovingModal — drop-in popup for the NoTimeStorage homepage.
 *
 * On first load (per session), asks "Looking for storage or moving?"
 *   - Storage  → closes the modal, user stays on NoTimeStorage
 *   - Moving   → redirects to the NoTimeMover site
 *
 * Usage (paste into notimestoragewebsite/app/page.tsx or a layout):
 *
 *   import StorageMovingModal from '@/components/StorageMovingModal'
 *   ...
 *   <StorageMovingModal moverUrl="https://notimemover.com" />
 *
 * Tested against: Next.js 14+/16+, React 18+/19+, Tailwind 3+/4+, Framer Motion 11+.
 */

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  moverUrl?: string
  /** sessionStorage key — change if you want the modal to show again after refresh */
  storageKey?: string
}

export default function StorageMovingModal({
  moverUrl = 'https://notimemover.com',
  storageKey = 'ntm_intent_seen_v1',
}: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return
      if (sessionStorage.getItem(storageKey)) return
      const t = setTimeout(() => setOpen(true), 350)
      return () => clearTimeout(t)
    } catch {
      setOpen(true)
    }
  }, [storageKey])

  const dismiss = () => {
    try { sessionStorage.setItem(storageKey, '1') } catch {}
    setOpen(false)
  }

  const goMoving = () => {
    try { sessionStorage.setItem(storageKey, '1') } catch {}
    window.location.href = moverUrl
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={dismiss}
          role="dialog"
          aria-modal="true"
          aria-labelledby="ntm-intent-title"
        >
          <motion.div
            className="relative w-full max-w-md rounded-3xl bg-white text-neutral-900 shadow-2xl p-7 sm:p-9"
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', damping: 26, stiffness: 240 }}
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={dismiss}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            <h2 id="ntm-intent-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-center">
              What are you looking for?
            </h2>
            <p className="text-center text-neutral-600 mt-2 text-sm sm:text-base">
              We do both — pick the right one for today.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-7">
              <button
                type="button"
                onClick={dismiss}
                className="group flex flex-col items-center text-center rounded-2xl border border-neutral-200 bg-white px-5 py-6 hover:border-[#4b2e1e] hover:bg-neutral-50 transition-all active:scale-[0.98]"
              >
                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-3 group-hover:bg-[#4b2e1e] transition-colors">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-700 group-hover:text-white transition-colors">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <path d="M3 9h18"/>
                    <path d="M9 21V9"/>
                  </svg>
                </div>
                <span className="font-semibold">Storage</span>
                <span className="text-xs text-neutral-500 mt-1">Stay here</span>
              </button>

              <button
                type="button"
                onClick={goMoving}
                className="group flex flex-col items-center text-center rounded-2xl bg-[#2A1405] text-white px-5 py-6 hover:bg-[#4b2e1e] transition-all active:scale-[0.98]"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
                    <path d="M15 18H9"/>
                    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
                    <circle cx="17" cy="18" r="2"/>
                    <circle cx="7" cy="18" r="2"/>
                  </svg>
                </div>
                <span className="font-semibold">Moving</span>
                <span className="text-xs text-white/70 mt-1">Take me there →</span>
              </button>
            </div>

            <p className="text-center text-[11px] text-neutral-400 mt-5">
              You can always switch later.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
