import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CityPageTemplate from '@/components/CityPageTemplate'
import { locations, getLocation } from '@/lib/locations'

export async function generateStaticParams() {
  return locations.map((loc) => ({ slug: loc.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const loc = getLocation(slug)
  if (!loc) return {}
  return {
    title: loc.metaTitle,
    description: loc.metaDescription,
    alternates: {
      canonical: `/${loc.slug}`,
    },
  }
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const loc = getLocation(slug)
  if (!loc) notFound()
  return <CityPageTemplate loc={loc} />
}
