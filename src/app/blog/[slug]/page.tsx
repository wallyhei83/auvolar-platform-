import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, User, Tag, ArrowRight } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { getBlogPost, getAllBlogPosts } from '@/lib/blog-posts'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// Generate static params for all blog posts
export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }))
}

// Dynamic metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return { title: 'Post Not Found' }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://www.auvolar.com/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      siteName: 'Auvolar',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `https://www.auvolar.com/blog/${post.slug}`,
    },
  }
}

// Simple markdown-to-HTML renderer for blog content
function renderContent(content: string): string {
  return content
    // Tables
    .replace(/\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)+)/g, (_, header, body) => {
      const headers = header.split('|').map((h: string) => h.trim()).filter(Boolean)
      const rows = body.trim().split('\n').map((row: string) =>
        row.split('|').map((cell: string) => cell.trim()).filter(Boolean)
      )
      return `<div class="overflow-x-auto my-6"><table class="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
        <thead class="bg-gray-50"><tr>${headers.map((h: string) => `<th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">${h}</th>`).join('')}</tr></thead>
        <tbody class="divide-y divide-gray-100">${rows.map((row: string[]) => `<tr class="hover:bg-gray-50">${row.map((cell: string) => `<td class="px-4 py-3 text-sm text-gray-700">${cell}</td>`).join('')}</tr>`).join('')}</tbody>
      </table></div>`
    })
    // H2
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">$1</h2>')
    // H3
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-gray-800 mt-8 mb-3">$1</h3>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li class="ml-4 text-gray-700">$1</li>')
    .replace(/((?:<li[^>]*>.*<\/li>\n?)+)/g, '<ul class="list-disc pl-6 space-y-1.5 my-4">$1</ul>')
    // Numbered lists
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 text-gray-700">$1</li>')
    // Paragraphs (lines that aren't already wrapped in HTML)
    .replace(/^(?!<[a-z])((?!^\s*$).+)$/gm, (match) => {
      if (match.startsWith('<')) return match
      return `<p class="text-gray-700 leading-relaxed my-4">${match}</p>`
    })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const allPosts = getAllBlogPosts()
  const relatedPosts = allPosts.filter(p => p.slug !== post.slug).slice(0, 3)

  // Article JSON-LD
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'Auvolar Lighting Engineers',
      url: 'https://www.auvolar.com/about',
      logo: 'https://www.auvolar.com/logo.png',
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.auvolar.com/#organization',
      name: 'Auvolar',
      url: 'https://www.auvolar.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.auvolar.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.auvolar.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    about: {
      '@type': 'Thing',
      name: 'Commercial LED Lighting',
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['article h1', 'article h2', 'article p:first-of-type'],
    },
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://www.auvolar.com/#website',
      name: 'Auvolar',
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.auvolar.com' },
          { name: 'Blog', url: 'https://www.auvolar.com/blog' },
          { name: post.title, url: `https://www.auvolar.com/blog/${post.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Header />

      {/* Article */}
      <article className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-10">
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
              {post.category}
            </span>
            <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl leading-tight">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-gray-600">{post.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-500 border-b border-gray-200 pb-6">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </header>

          {/* Content */}
          <div
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
          />

          {/* Tags */}
          <div className="mt-10 flex flex-wrap gap-2 border-t border-gray-200 pt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
              >
                <Tag className="h-3.5 w-3.5" />
                {tag}
              </span>
            ))}
          </div>

          {/* CTA box */}
          <div className="mt-10 rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 p-8">
            <h3 className="text-xl font-bold text-gray-900">Need Help With Your Lighting Project?</h3>
            <p className="mt-2 text-gray-700">
              Auvolar provides free lighting design, photometric layouts, and rebate assistance for commercial projects.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
              >
                Get a Free Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:border-gray-400"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900">More Lighting Guides</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {relatedPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group rounded-lg border border-gray-200 bg-white p-5 transition-all hover:border-yellow-400 hover:shadow"
                >
                  <span className="text-xs font-medium text-yellow-700">{p.category}</span>
                  <h3 className="mt-2 font-semibold text-gray-900 group-hover:text-yellow-600 line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">{p.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
