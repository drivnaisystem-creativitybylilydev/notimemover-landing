import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const cities = [
    'movers-boston-ma',
    'movers-worcester-ma',
    'movers-springfield-ma',
    'movers-cambridge-ma',
    'movers-lowell-ma',
  ]

  return [
    {
      url: 'https://notimemover.com',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    ...cities.map(slug => ({
      url: `https://notimemover.com/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
