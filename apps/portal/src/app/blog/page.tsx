import Link from 'next/link'
import { ArrowRight, Clock, Tag } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { getAllBlogPosts } from '@/lib/blog-posts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LED Lighting Blog & Guides',
  description: 'Expert guides on commercial LED lighting: high bay selection, wall pack installation, DLC rebates, parking lot design, ROI calculators, and solar lighting. By Auvolar engineering team.',
  keywords: [
    'LED lighting guide', 'commercial lighting blog', 'high bay buying guide',
    'wall pack guide', 'DLC rebate guide', 'LED retrofit ROI',
    'parking lot lighting design', 'solar LED lighting guide',
  ],
  openGraph: {
    title: 'LED Lighting Blog & Guides | Auvolar',
    description: 'Expert guides on commercial LED lighting selection, installation, and savings.',
    type: 'website',
    url: 'https://www.auvolar.com/blog',
  },
}

export default function BlogPage() {
  const posts = getAllBlogPosts()

  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.auvolar.com' },
          { name: 'Blog', url: 'https://www.auvolar.com/blog' },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">LED Lighting Blog & Guides</h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-300">
            Expert resources to help you choose, install, and save with commercial LED lighting. 
            Written by our engineering team with 10+ years in the lighting industry.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-yellow-400 hover:shadow-lg"
              >
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="rounded-full bg-yellow-100 px-3 py-0.5 text-xs font-medium text-yellow-800">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-bold text-gray-900 group-hover:text-yellow-600">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm text-gray-600 line-clamp-3">
                  {post.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 text-sm">
                  <span className="text-gray-400">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <span className="flex items-center gap-1 font-medium text-yellow-600 group-hover:gap-2 transition-all">
                    Read <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">Need Help Choosing the Right LED Fixtures?</h2>
          <p className="mt-4 text-gray-600">
            Our engineering team provides free lighting design, photometric layouts, and product recommendations for your project.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-black hover:bg-yellow-500"
            >
              Contact Our Team
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:border-gray-400"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
