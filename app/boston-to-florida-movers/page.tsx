import type { Metadata } from 'next'
import { getOosRoute } from '@/lib/oos-routes'
import OosPageTemplate from '@/components/OosPageTemplate'

const route = getOosRoute('boston-to-florida-movers')!

export const metadata: Metadata = {
  title: route.metaTitle,
  description: route.metaDescription,
}

export default function Page() {
  return <OosPageTemplate route={route} />
}
