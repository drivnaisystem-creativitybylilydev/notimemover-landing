import { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/locations'
import { getAllOosSlugs } from '@/lib/oos-routes'
import { getAllPostSlugs } from '@/lib/blog'

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
    ...getAllOosSlugs().map((slug) => ({
      url: `https://notimemover.com/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: 'https://notimemover.com/contact',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
    {
      url: 'https://notimemover.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    ...getAllPostSlugs().map((slug) => ({
      url: `https://notimemover.com/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
