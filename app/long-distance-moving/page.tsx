import type { Metadata } from 'next'
import ServicePageTemplate from '@/components/ServicePageTemplate'
import { getService } from '@/lib/services'

const service = getService('long-distance-moving')!

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: {
    canonical: '/long-distance-moving',
  },
}

export default function Page() {
  return <ServicePageTemplate service={service} />
}
