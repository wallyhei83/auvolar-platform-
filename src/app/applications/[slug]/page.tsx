import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getApplication, getAllApplicationSlugs, type ApplicationData } from '@/lib/applications-data'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { RecommendedProducts } from '@/components/applications/recommended-products'
import ApplicationPageClient from './application-client'

// Pre-render all application pages at build time
export function generateStaticParams() {
  return getAllApplicationSlugs().map(slug => ({ slug }))
}

// Dynamic metadata for each application page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const app = getApplication(slug)
  if (!app) return { title: 'Application Not Found | Auvolar' }

  return {
    title: app.metaTitle,
    description: app.metaDescription,
    keywords: app.keywords,
    openGraph: {
      title: app.metaTitle,
      description: app.metaDescription,
      type: 'website',
      url: `https://www.auvolar.com/applications/${slug}`,
    },
    twitter: {
      card: 'summary',
      title: app.metaTitle,
      description: app.metaDescription,
    },
    alternates: {
      canonical: `https://www.auvolar.com/applications/${slug}`,
    },
  }
}

export default async function ApplicationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const app = getApplication(slug)
  if (!app) notFound()

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* JSON-LD: Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: app.title,
            description: app.description,
            provider: {
              '@type': 'Organization',
              name: 'Auvolar',
              url: 'https://www.auvolar.com',
            },
            url: `https://www.auvolar.com/applications/${slug}`,
            areaServed: 'US',
            serviceType: 'Commercial LED Lighting',
          }),
        }}
      />

      {/* Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.auvolar.com' },
              { '@type': 'ListItem', position: 2, name: 'Applications', item: 'https://www.auvolar.com/applications' },
              { '@type': 'ListItem', position: 3, name: app.title, item: `https://www.auvolar.com/applications/${slug}` },
            ],
          }),
        }}
      />

      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: `What are the recommended light levels for ${app.title.toLowerCase().replace(' lighting', '')} spaces?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: app.lightLevels.map(l => `${l.area}: ${l.recommendedFc}`).join('. '),
                },
              },
              {
                '@type': 'Question',
                name: `What LED fixtures does Auvolar recommend for ${app.title.toLowerCase().replace(' lighting', '')}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: app.recommendedProducts.map(p => `${p.name} (${p.wattage}) — ${p.description}`).join('. '),
                },
              },
              {
                '@type': 'Question',
                name: `How much can I save by switching to LED ${app.title.toLowerCase()}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: app.caseStudy
                    ? `${app.caseStudy.description} Annual savings: ${app.caseStudy.savings}. Payback period: ${app.caseStudy.payback}.`
                    : `LED upgrades typically reduce energy costs by 50-70% compared to metal halide, HPS, or fluorescent systems. Contact Auvolar for a free energy savings analysis.`,
                },
              },
            ],
          }),
        }}
      />

      <main>
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm flex-wrap">
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <span className="text-gray-300">›</span>
              <Link href="/applications" className="text-gray-500 hover:text-gray-700">Applications</Link>
              <span className="text-gray-300">›</span>
              <span className="text-gray-900 font-medium">{app.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{app.title}</h1>
            <p className="text-gray-400 mt-1 text-lg">{app.subtitle}</p>
            <p className="text-xl text-gray-300 mt-6 max-w-3xl">{app.description}</p>
            <div className="flex gap-4 mt-8 flex-wrap">
              <Link
                href="/contact"
                className="px-6 py-3 bg-yellow-400 text-black font-medium rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/tools/replacement"
                className="px-6 py-3 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                Find Replacements
              </Link>
            </div>
          </div>
        </div>

        {/* Challenges & Solutions */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Common Challenges</h2>
              <ul className="space-y-4">
                {app.challenges.map((challenge, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-600 text-sm font-bold">{i + 1}</span>
                    </div>
                    <span className="text-gray-700">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6">Auvolar Solutions</h2>
              <ul className="space-y-4">
                {app.solutions.map((solution, i) => (
                  <li key={i} className="flex gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="text-gray-700">{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* IES Light Level Standards — SEO rich table */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-2">Recommended Light Levels (IES Standards)</h2>
            <p className="text-gray-600 mb-8">Based on Illuminating Engineering Society (IES) recommendations for {app.title.toLowerCase().replace(' lighting', '')} facilities.</p>
            <div className="bg-white rounded-xl border overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Area</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Minimum</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Recommended</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {app.lightLevels.map((level, i) => (
                    <tr key={i} className={i % 2 === 0 ? '' : 'bg-gray-50'}>
                      <td className="px-6 py-3 text-gray-900 font-medium">{level.area}</td>
                      <td className="px-6 py-3 text-gray-600">{level.minFc}</td>
                      <td className="px-6 py-3 text-gray-900 font-medium">{level.recommendedFc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recommended Products — client component with live BC data */}
        <RecommendedProducts
          title={`Recommended Products for ${app.title}`}
          products={app.recommendedProducts}
          appSlug={slug}
        />

        {/* Case Study */}
        {app.caseStudy && (
          <div className="max-w-7xl mx-auto px-4 pb-16">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white">
              <p className="text-yellow-400 text-sm font-medium uppercase tracking-wider mb-2">Case Study</p>
              <h3 className="text-2xl font-bold mb-4">{app.caseStudy.title}</h3>
              <p className="text-gray-300 mb-6">{app.caseStudy.description}</p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-3xl font-bold text-yellow-400">{app.caseStudy.savings}</p>
                  <p className="text-gray-400 text-sm">Annual Savings</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-yellow-400">{app.caseStudy.payback}</p>
                  <p className="text-gray-400 text-sm">Payback Period</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEO Content Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold mb-6">About {app.title}</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{app.seoContent}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-yellow-400 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Upgrade Your {app.title.replace(' Lighting', '').replace(' & ', ' and ')} Lighting?</h2>
            <p className="text-gray-800 mb-6">Get a free lighting assessment and custom quote for your project.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                href="/contact"
                className="px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                Request a Quote
              </Link>
              <Link
                href="/tools/bom-upload"
                className="px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Upload Your BOM
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
