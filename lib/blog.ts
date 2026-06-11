import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  author: string
  category: string
  readTime: string
  content: string
  faqSchema?: { question: string; answer: string }[]
}

export function getAllPosts(): Omit<BlogPost, 'content'>[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8')
      const { data } = matter(raw)
      return {
        slug,
        title: data.title ?? '',
        date: data.date ?? '',
        description: data.description ?? '',
        author: data.author ?? 'NoTimeMover Team',
        category: data.category ?? 'Moving Tips',
        readTime: data.readTime ?? '5 min read',
        faqSchema: data.faqSchema ?? [],
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPost(slug: string): BlogPost | null {
  const filepath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) return null

  const raw = fs.readFileSync(filepath, 'utf8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? '',
    date: data.date ?? '',
    description: data.description ?? '',
    author: data.author ?? 'NoTimeMover Team',
    category: data.category ?? 'Moving Tips',
    readTime: data.readTime ?? '5 min read',
    content,
    faqSchema: data.faqSchema ?? [],
  }
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}
