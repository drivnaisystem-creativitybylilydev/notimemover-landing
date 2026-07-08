import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getAllPostSlugs, getPost } from '@/lib/blog'

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} | NoTimeMover`,
    description: post.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://notimemover.com/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: ['/opengraph-image.png'],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const faqSchema =
    post.faqSchema && post.faqSchema.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqSchema.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }
      : null

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author:
      post.author === 'Jermaine Williams'
        ? { '@type': 'Person', name: 'Jermaine Williams', jobTitle: 'Founder, NoTimeMover', url: 'https://notimemover.com' }
        : { '@type': 'Organization', name: post.author, url: 'https://notimemover.com' },
    publisher: { '@type': 'Organization', name: 'NoTimeMover', url: 'https://notimemover.com' },
  }

  return (
    <div className="min-h-screen">
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Sticky nav */}
      <nav
        className="sticky top-0 z-50 border-b border-white/[0.06]"
        style={{ background: 'rgba(5,5,5,0.88)', backdropFilter: 'blur(16px)' }}
      >
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/blog"
            className="text-[13px] font-medium text-white/50 hover:text-white/90 transition-colors duration-300 flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All guides
          </Link>
          <Link
            href="/?book=1"
            className="inline-flex items-center gap-2 text-[12px] font-semibold px-4 py-1.5 rounded-full text-white transition-colors duration-300"
            style={{ background: 'rgba(107,58,31,0.55)', border: '1px solid rgba(107,58,31,0.5)' }}
          >
            Get a quote
          </Link>
        </div>
      </nav>

      {/* Article header */}
      <header
        className="border-b border-white/[0.05]"
        style={{ background: 'linear-gradient(160deg, rgba(42,20,5,0.5) 0%, rgba(5,5,5,0) 65%)' }}
      >
        <div className="max-w-3xl mx-auto px-6 pt-14 pb-12">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.18em]"
              style={{ background: 'rgba(107,58,31,0.25)', color: '#C07040', border: '1px solid rgba(107,58,31,0.35)' }}
            >
              {post.category}
            </span>
            <span className="text-white/25 text-[11px]">{post.readTime}</span>
            <span className="text-white/[0.12]">·</span>
            <span className="text-white/25 text-[11px]">
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <h1 className="text-[clamp(24px,4.5vw,38px)] font-semibold tracking-tight text-white leading-[1.12] mb-5">
            {post.title}
          </h1>
          <p className="text-[15px] sm:text-[16px] text-white/50 leading-relaxed max-w-2xl">
            {post.description}
          </p>
          <p className="mt-5 text-[12px] text-white/25">
            By {post.author}
            {post.author === 'Jermaine Williams' && <span className="text-white/15"> — Founder, NoTimeMover</span>}
          </p>
        </div>
      </header>

      {/* Article body */}
      <main className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
        <div
          className="
            prose max-w-none
            prose-p:text-white/65 prose-p:leading-relaxed prose-p:text-[15px] prose-p:sm:text-[16px]
            prose-headings:text-white prose-headings:font-semibold prose-headings:tracking-tight
            prose-h2:text-[20px] prose-h2:sm:text-[22px] prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-[17px] prose-h3:sm:text-[18px] prose-h3:mt-8 prose-h3:mb-3
            prose-strong:text-white prose-strong:font-semibold
            prose-a:text-[#C07040] prose-a:no-underline hover:prose-a:underline prose-a:font-medium
            prose-li:text-white/65 prose-li:text-[15px] prose-li:leading-relaxed
            prose-ul:my-4 prose-ol:my-4
            prose-hr:border-white/[0.08] prose-hr:my-10
            prose-blockquote:border-l-[3px] prose-blockquote:border-coffee-light prose-blockquote:pl-5 prose-blockquote:text-white/50 prose-blockquote:not-italic
            prose-table:w-full prose-table:text-[13px] prose-table:border-collapse
            prose-thead:border-b prose-thead:border-white/[0.1]
            prose-th:text-white/50 prose-th:font-semibold prose-th:text-left prose-th:py-2 prose-th:pr-4
            prose-td:text-white/60 prose-td:py-2.5 prose-td:pr-4 prose-td:border-b prose-td:border-white/[0.05]
          "
        >
          <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </div>
      </main>

      {/* Bottom CTA */}
      <div className="border-t border-white/[0.05]">
        <div
          className="max-w-3xl mx-auto px-6 py-14 sm:py-16"
        >
          <div
            className="rounded-2xl border border-white/[0.08] p-8 sm:p-10 text-center"
            style={{ background: 'linear-gradient(145deg, rgba(42,20,5,0.5) 0%, rgba(10,6,6,0.7) 100%)' }}
          >
            <p className="text-[10px] uppercase tracking-[0.28em] text-coffee-light font-semibold mb-3">
              Ready to move?
            </p>
            <h2 className="text-[22px] sm:text-[26px] font-semibold tracking-tight text-white mb-3 leading-snug">
              Set your budget.{' '}
              <span className="font-serif italic text-coffee-shimmer">We handle the rest.</span>
            </h2>
            <p className="text-[14px] text-white/40 mb-8 max-w-sm mx-auto leading-relaxed">
              Fully insured. You name the price upfront — no stair fees, no fuel surcharges, nothing added at the door.
            </p>
            <Link
              href="/?book=1"
              className="group inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full bg-white text-ink font-medium"
              style={{ transition: 'transform 500ms cubic-bezier(0.32,0.72,0,1)' }}
            >
              <span className="text-[15px] tracking-tight">Get instant quote</span>
              <span
                className="w-11 h-11 rounded-full bg-ink/10 flex items-center justify-center group-hover:translate-x-[2px] group-hover:-translate-y-[1px]"
                style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.5)', transition: 'transform 500ms cubic-bezier(0.32,0.72,0,1)' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
