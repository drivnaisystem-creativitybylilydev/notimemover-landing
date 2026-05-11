import type { Metadata, Viewport } from 'next'
import { Montserrat, Lato, Playfair_Display } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })
const lato = Lato({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-lato' })
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  style: ['normal', 'italic'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'NoTimeMoving - We Move You Fast. No Time Wasted.',
  description: 'Professional moving services. Serving families and businesses with speed, care, and faith.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${lato.variable} ${playfair.variable} bg-cream text-brown-dark`}>
        {children}
      </body>
    </html>
  )
}
