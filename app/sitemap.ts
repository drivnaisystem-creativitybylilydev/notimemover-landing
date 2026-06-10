import { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/locations'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://notimemover.com',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    ...getAllSlugs().map((slug) => ({
      url: `https://notimemover.com/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
