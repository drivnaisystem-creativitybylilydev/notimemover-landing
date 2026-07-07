import type { Metadata } from 'next'
import CityPageTemplate from '@/components/CityPageTemplate'
import { getLocation } from '@/lib/locations'

const loc = getLocation('movers-lowell-ma')!

export const metadata: Metadata = {
  title: loc.metaTitle,
  description: loc.metaDescription,
  alternates: {
    canonical: '/movers-lowell-ma',
  },
}

export default function Page() {
  return <CityPageTemplate loc={loc} />
}
