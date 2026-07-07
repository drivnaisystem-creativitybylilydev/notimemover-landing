import fs from 'fs'
import path from 'path'
import { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/locations'
import { getAllOosSlugs } from '@/lib/oos-routes'
import { getAllPosts } from '@/lib/blog'

function fileModified(relativePath: string): Date {
  try {
    return fs.statSync(path.join(process.cwd(), relativePath)).mtime
  } catch {
    return new Date()
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const locationsModified = fileModified('lib/locations.ts')
  const oosModified = fileModified('lib/oos-routes.ts')
  const homepageModified = fileModified('app/page.tsx')

  return [
    {
      url: 'https://notimemover.com',
      lastModified: homepageModified,
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    ...getAllSlugs().map((slug) => ({
      url: `https://notimemover.com/${slug}`,
      lastModified: locationsModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...getAllOosSlugs().map((slug) => ({
      url: `https://notimemover.com/${slug}`,
      lastModified: oosModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
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
