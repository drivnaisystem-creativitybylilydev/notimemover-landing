import fs from 'fs'
import path from 'path'
import { MetadataRoute } from 'next'
import { locations } from '@/lib/locations'
import { oosRoutes } from '@/lib/oos-routes'
import { getAllPosts } from '@/lib/blog'
import { services } from '@/lib/services'

// Only appropriate for files that back exactly one page (homepage, contact) —
// for collections sharing a single source file (locations, oosRoutes,
// services), file mtime is the SAME for every entry regardless of which one
// actually changed. Use each entry's own `lastUpdated` field for those.
function fileModified(relativePath: string): Date {
  try {
    return fs.statSync(path.join(process.cwd(), relativePath)).mtime
  } catch {
    return new Date()
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const homepageModified = fileModified('app/page.tsx')

  return [
    {
      url: 'https://notimemover.com',
      lastModified: homepageModified,
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    ...locations.map((loc) => ({
      url: `https://notimemover.com/${loc.slug}`,
      lastModified: new Date(loc.lastUpdated),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...oosRoutes.map((route) => ({
      url: `https://notimemover.com/${route.slug}`,
      lastModified: new Date(route.lastUpdated),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...services.map((service) => ({
      url: `https://notimemover.com/${service.slug}`,
      lastModified: new Date(service.lastUpdated),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    {
      url: 'https://notimemover.com/contact',
      lastModified: fileModified('app/contact/page.tsx'),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
    {
      url: 'https://notimemover.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    ...getAllPosts().map((post) => ({
      url: `https://notimemover.com/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
