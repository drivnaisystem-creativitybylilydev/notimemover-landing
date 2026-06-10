import type { Metadata } from 'next'
import CityPageTemplate from '@/components/CityPageTemplate'
import { getLocation } from '@/lib/locations'

const loc = getLocation('movers-worcester-ma')!

export const metadata: Metadata = {
  title: loc.metaTitle,
  description: loc.metaDescription,
}

export default function Page() {
  return <CityPageTemplate loc={loc} />
}
