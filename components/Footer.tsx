'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-brown-dark text-gray-200 py-16 sm:py-20">
      <div className="container-max">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
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
            <p className="text-sm font-lato leading-relaxed">
              Serving families and businesses with speed, care, and faith.
            </p>
          </div>

          <div>
            <h5 className="text-white font-montserrat font-semibold mb-4">Navigation</h5>
            <ul className="space-y-2 text-sm font-lato">
              <li>
                <Link href="/" className="hover:text-orange-brand transition">
                  Home
                </Link>
              </li>
              <li>
                <a href="#services" className="hover:text-orange-brand transition">
                  Services
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-orange-brand transition">
                  Reviews
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-montserrat font-semibold mb-4">Services</h5>
            <ul className="space-y-2 text-sm font-lato">
              <li>
                <a href="#services" className="hover:text-orange-brand transition">
                  Local Moving
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-orange-brand transition">
                  Long Distance
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-orange-brand transition">
                  Packing & Storage
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-montserrat font-semibold mb-4">Contact</h5>
            <ul className="space-y-2 text-sm font-lato">
              <li>
                <a href="mailto:info@notimemoving.com" className="hover:text-orange-brand transition">
                  info@notimemoving.com
                </a>
              </li>
              <li>
                <a href="tel:+18005555683" className="hover:text-orange-brand transition">
                  (800) 555-MOVE
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm font-lato">
          <p>&copy; 2024 NoTimeMoving. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-orange-brand transition">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-orange-brand transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
