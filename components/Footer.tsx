'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-brown-dark text-gray-200 py-16 sm:py-20">
      <div className="container-max">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand column */}
          <div>
            <div className="inline-flex items-center justify-center bg-white rounded-full p-3 mb-4">
              <Image
                src="/LOGO/icon_logo.png"
                alt="NoTimeMoving"
                width={160}
                height={160}
                className="object-contain h-40 w-auto"
              />
            </div>
            <p className="font-playfair italic text-brand-amber text-sm leading-relaxed mb-2">
              Galatians 5:13 — Serve one another through love.
            </p>
          </div>

          {/* Services */}
          <div>
            <h5 className="text-white font-montserrat font-semibold mb-4">Services</h5>
            <ul className="space-y-2 text-sm font-lato">
              <li><a href="#services" className="hover:text-brand-amber transition">Local Moving</a></li>
              <li><a href="#services" className="hover:text-brand-amber transition">Long Distance</a></li>
              <li><a href="#services" className="hover:text-brand-amber transition">Commercial Moves</a></li>
              <li><a href="#services" className="hover:text-brand-amber transition">Packing &amp; Unpacking</a></li>
              <li><a href="#services" className="hover:text-brand-amber transition">Labor Only</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white font-montserrat font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2 text-sm font-lato">
              <li><Link href="/" className="hover:text-brand-amber transition">Home</Link></li>
              <li><a href="#how-it-works" className="hover:text-brand-amber transition">How It Works</a></li>
              <li><a href="#testimonials" className="hover:text-brand-amber transition">Reviews</a></li>
              <li><a href="#faq" className="hover:text-brand-amber transition">FAQ</a></li>
              <li><Link href="/quote" className="hover:text-brand-amber transition">Get a Quote</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-white font-montserrat font-semibold mb-4">Contact</h5>
            <ul className="space-y-2 text-sm font-lato">
              <li>
                <a href="tel:+12039194098" className="hover:text-brand-amber transition">
                  +1 (203) 919-4098
                </a>
              </li>
              <li>
                <a href="mailto:info@notimemoving.com" className="hover:text-brand-amber transition">
                  info@notimemoving.com
                </a>
              </li>
              <li className="text-gray-400 text-xs mt-2">Connecticut &amp; Surrounding Areas</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm font-lato text-gray-400">
          <p>Licensed &amp; Insured &nbsp;|&nbsp; &copy; 2025 NoTimeMoving</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-brand-amber transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-brand-amber transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
