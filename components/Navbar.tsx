'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Phone, List, X } from '@phosphor-icons/react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const shadowOpacity = useTransform(scrollY, [0, 100], [0, 0.1])

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 border-b border-gray-200/50 bg-cream overflow-visible"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        style={{ opacity: shadowOpacity }}
        className="absolute inset-0 shadow-lg pointer-events-none"
      />

      <div className="w-full pl-6 pr-4 md:pr-6 flex items-center h-20 relative">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="/LOGO/full logo.png"
            alt="NoTimeMoving"
            width={600}
            height={200}
            className="object-contain h-48 w-auto"
            priority
          />
        </Link>

        {/* Center links — desktop only */}
        <div className="hidden md:flex gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="text-brown-dark hover:text-orange-brand transition-colors font-lato">
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Phone — always visible */}
          <a
            href="tel:+12039194098"
            className="flex items-center gap-1.5 text-brown-dark font-bold font-montserrat hover:text-orange-brand transition-colors text-sm md:text-base"
          >
            <Phone size={16} weight="fill" className="text-orange-brand flex-shrink-0" />
            <span className="hidden sm:inline">+1 (203) 919-4098</span>
          </a>

          {/* Get a Quote — always visible */}
          <Link
            href="/quote"
            className="px-4 py-2 md:px-5 md:py-2.5 bg-orange-brand text-white text-sm font-semibold font-montserrat rounded-lg hover:bg-orange-brand/90 transition-colors shadow-md whitespace-nowrap"
          >
            Get a Quote
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden p-2 text-brown-dark hover:text-orange-brand transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-cream border-t border-gray-200/50"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-brown-dark hover:text-orange-brand transition-colors font-lato text-lg py-1"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              {/* Phone number in full on mobile menu */}
              <a
                href="tel:+12039194098"
                className="flex items-center gap-2 text-brown-dark font-bold font-montserrat hover:text-orange-brand transition-colors pt-2 border-t border-gray-200/50"
              >
                <Phone size={16} weight="fill" className="text-orange-brand" />
                +1 (203) 919-4098
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
