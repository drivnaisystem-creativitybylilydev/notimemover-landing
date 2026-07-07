import type { Metadata } from 'next'
import { getOosRoute } from '@/lib/oos-routes'
import OosPageTemplate from '@/components/OosPageTemplate'

const route = getOosRoute('boston-to-connecticut-movers')!

export const metadata: Metadata = {
  title: route.metaTitle,
  description: route.metaDescription,
  alternates: {
    canonical: '/boston-to-connecticut-movers',
  },
}

export default function Page() {
  return <OosPageTemplate route={route} />
}
