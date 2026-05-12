import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Instrument_Serif } from 'next/font/google'
import GrainOverlay from '@/components/GrainOverlay'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://notimemover.com'),
  title: 'NoTimeMover — Move Anywhere. You Set The Price.',
  description: 'Set your own price for your move. Pickup, dropoff, size, budget — done in 60 seconds.',
  openGraph: {
    title: 'NoTimeMover — Move Anywhere. You Set The Price.',
    description: 'Set your own price for your move. Pickup, dropoff, size, budget — done in 60 seconds.',
    url: 'https://notimemover.com',
    siteName: 'NoTimeMover',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NoTimeMover — Move Anywhere. You Set The Price.',
    description: 'Set your own price for your move. Pickup, dropoff, size, budget — done in 60 seconds.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#050505',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="bg-ink text-white antialiased">
        {children}
        <GrainOverlay />
      </body>
    </html>
  )
}
