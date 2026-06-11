'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const HERO_IMG = 'https://d8j0ntlcm91z4.cloudfront.net/user_3DXXMZN9SbWqkGqaQ24QtDHNfxy/hf_20260609_172318_278f5bd1-c102-4c96-ae57-299263986088_min.webp'
const SPRING = [0.32, 0.72, 0, 1] as const

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col">

      {/* Hero background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={HERO_IMG}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ opacity: 0.22, filter: 'brightness(0.7) contrast(1.1) saturate(0.8)' }}
        />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 30%, rgba(5,5,5,0.78) 0%, rgba(5,5,5,0.45) 50%, rgba(5,5,5,0.15) 100%)' }} />
        <div className="absolute inset-x-0 bottom-0 h-64" style={{ background: 'linear-gradient(0deg, #050505 0%, transparent 100%)' }} />
        <div className="absolute inset-x-0 top-0 h-32" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, transparent 100%)' }} />
      </div>

      {/* Sticky nav */}
      <nav
        className="sticky top-0 z-50 border-b border-white/[0.06]"
        style={{ background: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)' }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-[13px] font-medium text-white/50 hover:text-white/90 transition-colors duration-300">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
          <Link href="/" className="text-[15px] font-semibold tracking-tight">
            <span className="text-white">NoTime</span>
            <span className="text-coffee-light">Mover</span>
          </Link>
          <Link
            href="/?book=1"
            className="text-[12px] font-semibold px-4 py-1.5 rounded-full text-white"
            style={{ background: 'rgba(107,58,31,0.55)', border: '1px solid rgba(107,58,31,0.5)' }}
          >
            Get a quote
          </Link>
        </div>
      </nav>

      {/* Page content */}
      <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-6 sm:px-10 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: SPRING, delay: 0.1 }}
          >
            <p className="text-[10px] uppercase tracking-[0.28em] text-coffee-light font-semibold mb-4">
              Get in touch
            </p>
            <h1 className="text-[clamp(32px,5vw,52px)] font-semibold tracking-tight text-white leading-tight mb-5">
              Questions?{' '}
              <span className="font-serif italic text-coffee-shimmer">We reply fast.</span>
            </h1>
            <p className="text-[15px] sm:text-[16px] text-white/45 leading-relaxed max-w-md mb-10">
              Not ready to book yet? Send us a message — move date, location, anything on your mind. We respond within a few hours, never with an automated reply.
            </p>

            <div className="flex flex-col gap-5">
              <a
                href="mailto:contact@notimemover.com"
                className="group flex items-center gap-4"
              >
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(107,58,31,0.2)', border: '1px solid rgba(107,58,31,0.3)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-coffee-light">
                    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-semibold mb-0.5">Email</p>
                  <p className="text-[14px] text-white/60 group-hover:text-white/90 transition-colors duration-200">contact@notimemover.com</p>
                </div>
              </a>

              <a
                href="tel:+12039194098"
                className="group flex items-center gap-4"
              >
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(107,58,31,0.2)', border: '1px solid rgba(107,58,31,0.3)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-coffee-light">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.19-1.19a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-semibold mb-0.5">Phone</p>
                  <p className="text-[14px] text-white/60 group-hover:text-white/90 transition-colors duration-200">(203) 919-4098</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(107,58,31,0.2)', border: '1px solid rgba(107,58,31,0.3)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-coffee-light">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-semibold mb-0.5">Response time</p>
                  <p className="text-[14px] text-white/60">Within minutes during business hours</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: SPRING, delay: 0.2 }}
          >
            {status === 'success' ? (
              <div
                className="rounded-2xl border border-white/[0.08] p-10 flex flex-col items-center justify-center text-center gap-5"
                style={{ background: 'rgba(10,6,6,0.7)', backdropFilter: 'blur(12px)', minHeight: '340px' }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(107,58,31,0.25)', border: '1px solid rgba(107,58,31,0.4)' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-coffee-light">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-[18px] mb-2">Message sent.</p>
                  <p className="text-white/40 text-[14px]">We'll follow up within a few hours.</p>
                </div>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 text-[12px] text-white/30 hover:text-white/60 transition-colors duration-200 underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-white/[0.08] p-8 sm:p-10 flex flex-col gap-5"
                style={{ background: 'rgba(10,6,6,0.65)', backdropFilter: 'blur(16px)' }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-[11px] text-white/35 uppercase tracking-[0.18em] font-semibold mb-2">Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[11px] text-white/35 uppercase tracking-[0.18em] font-semibold mb-2">Email</label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[11px] text-white/35 uppercase tracking-[0.18em] font-semibold mb-2">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    placeholder="Move date, origin, destination, questions..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="input-field resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-[12px] text-red-400">Something went wrong — try emailing us directly at contact@notimemover.com</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full bg-white text-ink font-medium self-start transition-opacity duration-200 disabled:opacity-50"
                  style={{ transition: 'transform 500ms cubic-bezier(0.32,0.72,0,1)' }}
                >
                  <span className="text-[15px] tracking-tight">
                    {status === 'loading' ? 'Sending…' : 'Send message'}
                  </span>
                  <span
                    className="w-11 h-11 rounded-full bg-ink/10 flex items-center justify-center group-hover:translate-x-[2px] group-hover:-translate-y-[1px]"
                    style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.5)', transition: 'transform 500ms cubic-bezier(0.32,0.72,0,1)' }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  )
}
