import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import BlogIndexClient from '@/components/BlogIndexClient'

export const metadata: Metadata = {
  title: 'Moving Guides & Boston Tips | NoTimeMover Blog',
  description: 'Practical guides for moving in Boston — cost breakdowns, permit timelines, September 1 tips, and how to avoid moving scams. From NoTimeMover, your fully insured Boston movers.',
}

export default function BlogPage() {
  const posts = getAllPosts()
  return <BlogIndexClient posts={posts} />
}
