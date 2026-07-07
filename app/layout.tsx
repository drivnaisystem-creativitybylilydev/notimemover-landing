import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Instrument_Serif } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
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
  verification: {
    google: 's4PeiDBEdKAfhaX6aGQk7hw9sjtowGwTJiDbLH0q32I',
  },
  metadataBase: new URL('https://notimemover.com'),
  alternates: {
    canonical: '/',
  },
  title: 'Boston Moving Company — NoTimeMover | No Surprise Fees',
  description: 'Fully insured Boston movers. Tell us your budget — we work around it. Local, out-of-state, and same-day moves across Greater Massachusetts. No surprise quotes.',
  openGraph: {
    title: 'Boston Moving Company — NoTimeMover | No Surprise Fees',
    description: 'Fully insured Boston movers. Tell us your budget — we work around it. Local, out-of-state, and same-day moves across Greater Massachusetts. No surprise quotes.',
    url: 'https://notimemover.com',
    siteName: 'NoTimeMover',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boston Moving Company — NoTimeMover | No Surprise Fees',
    description: 'Fully insured Boston movers. Tell us your budget — we work around it. Local, out-of-state, and same-day moves across Greater Massachusetts. No surprise quotes.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#050505',
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'MovingCompany',
  name: 'NoTimeMover',
  url: 'https://notimemover.com',
  telephone: '+12039194098',
  email: 'contact@notimemover.com',
  description:
    'Fully insured moving company serving Boston, MA and Greater Massachusetts. Local moves, out-of-state moves, and same-day moves. We work around your budget — no surprise fees.',
  areaServed: [
    'Boston, MA', 'Cambridge, MA', 'Somerville, MA', 'Brookline, MA',
    'Newton, MA', 'Quincy, MA', 'Medford, MA', 'Waltham, MA',
    'Everett, MA', 'Malden, MA', 'Revere, MA', 'Chelsea, MA',
    'Watertown, MA', 'Arlington, MA', 'Belmont, MA', 'Needham, MA',
    'Dedham, MA', 'Braintree, MA', 'Milton, MA', 'Lynn, MA',
  ],
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 42.36008,
    longitude: -71.05888,
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 5.0,
    reviewCount: 7,
  },
  openingHours: 'Mo-Su 00:00-23:59',
  priceRange: '$600-$3000',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <GrainOverlay />
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
          (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','1013633921060206');
          fbq('track','PageView');
        `}</Script>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <noscript><img height="1" width="1" style={{display:'none'}} src="https://www.facebook.com/tr?id=1013633921060206&ev=PageView&noscript=1" alt="" /></noscript>
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  )
}
