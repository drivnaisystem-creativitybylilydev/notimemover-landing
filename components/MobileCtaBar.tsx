'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function MobileCtaBar() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 200)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.div
      className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-neutral-sand px-4 py-3 flex gap-3 md:hidden"
      initial={{ y: 80 }}
      animate={{ y: show ? 0 : 80 }}
      transition={{ duration: 0.3 }}
    >
      <a
        href="tel:+12039194098"
        className="flex-1 rounded-lg border-2 border-orange-brand text-orange-brand font-semibold font-montserrat text-center py-3 text-sm"
      >
        Call Now
      </a>
      <a
        href="/quote"
        className="flex-1 rounded-lg bg-orange-brand text-white font-semibold font-montserrat text-center py-3 text-sm"
      >
        Get a Quote
      </a>
    </motion.div>
  )
}
