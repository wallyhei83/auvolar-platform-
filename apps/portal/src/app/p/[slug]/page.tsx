import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllProducts, getRelatedProducts, type BCProductFull } from '@/lib/bc-products-server'
import { generateProductSEO } from '@/lib/product-seo'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import ProductDetailClient from './product-detail-client'

// Generate all product pages at build time
export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map((p) => ({ slug: p.slug }))
}

// Dynamic metadata for each product
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const products = await getAllProducts()
  const product = products.find((p) => p.slug === slug)
  if (!product) return { title: 'Product Not Found | Auvolar' }

  const primaryImage = product.images.find((img) => img.isPrimary)?.url || product.images[0]?.url
  const seo = generateProductSEO({
    id: product.id,
    name: product.name,
    sku: product.sku,
    price: product.price,
    description: product.description,
    categories: product.categories,
    slug: product.slug,
    imageUrl: primaryImage,
    inStock: product.availability === 'available' || product.inventoryLevel > 0,
    inventory: product.inventoryLevel,
  })

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords.slice(0, 30),
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: 'website',
      url: `https://www.auvolar.com/p/${slug}`,
      images: primaryImage ? [{ url: primaryImage, width: 600, height: 600, alt: product.name }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
    },
    alternates: {
      canonical: `https://www.auvolar.com/p/${slug}`,
    },
  }
}

// Parse HTML description to extract specs
function parseSpecs(html: string): { key: string; value: string }[] {
  const specs: { key: string; value: string }[] = []
  // Match <strong>Key:</strong> Value patterns
  const regex = /<strong>([^<]+):<\/strong>\s*([^<]+)/gi
  let match
  while ((match = regex.exec(html)) !== null) {
    specs.push({ key: match[1].trim(), value: match[2].trim() })
  }
  return specs
}

// Strip HTML tags
function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

// Category name mapping
const catNames: Record<number, string> = {
  26: 'Area Lights', 27: 'Wall Packs', 28: 'Flood Lights', 29: 'Solar',
  30: 'UFO High Bay', 31: 'Linear High Bay', 32: 'Strip Lights', 33: 'Panel Lights',
  35: 'Vapor Tight', 36: 'LED Tubes', 43: 'Parking Lot', 45: 'Bollard Lights',
  46: 'Post Top Lights', 47: 'Solar Wall Pack', 48: 'Exit Signs', 51: 'Downlights',
  52: 'Ceiling Lights', 53: 'Canopy Lights', 54: 'Vanity Lights', 55: 'Barn Lights',
  56: 'Grow Lights', 57: 'Security Lights', 58: 'Low Bay', 59: 'Solar Area Light',
  74: 'High Bay', 75: 'Troffer Panel', 76: 'LED Tubes', 77: 'Strip Lights',
  78: 'Vapor Tight', 79: 'Downlights', 80: 'Garage Lights', 81: 'Wrap Lights',
  82: 'Area Lights', 83: 'Flood Lights', 84: 'Wall Packs', 85: 'Canopy Lights',
  88: 'Solar Street', 89: 'Solar Flood', 91: 'Retrofit', 93: 'Corn Bulbs',
  95: 'Accessories', 96: 'Sensors', 97: 'Photocells',
}

// Category → subcategory slug mapping for links
const catToSubcategory: Record<number, { main: string; sub: string }> = {
  30: { main: 'indoor', sub: 'high-bay' },
  31: { main: 'indoor', sub: 'high-bay' },
  58: { main: 'indoor', sub: 'high-bay' },
  33: { main: 'indoor', sub: 'troffer' },
  36: { main: 'indoor', sub: 'led-tube' },
  32: { main: 'indoor', sub: 'strip' },
  35: { main: 'indoor', sub: 'vapor-tight' },
  51: { main: 'indoor', sub: 'downlight' },
  53: { main: 'indoor', sub: 'canopy' },
  48: { main: 'indoor', sub: 'exit' },
  26: { main: 'outdoor', sub: 'area-light' },
  27: { main: 'outdoor', sub: 'wall-pack' },
  28: { main: 'outdoor', sub: 'flood' },
  45: { main: 'outdoor', sub: 'bollard' },
  46: { main: 'outdoor', sub: 'post-top' },
  55: { main: 'outdoor', sub: 'barn' },
  59: { main: 'solar', sub: 'solar-area' },
  47: { main: 'solar', sub: 'solar-wall' },
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const products = await getAllProducts()
  const product = products.find((p) => p.slug === slug)

  if (!product) notFound()

  const related = await getRelatedProducts(product, 4)
  const primaryImage = product.images.find((img) => img.isPrimary)?.url || product.images[0]?.url
  const inStock = product.availability === 'available' || product.inventoryLevel > 0
  const seo = generateProductSEO({
    id: product.id,
    name: product.name,
    sku: product.sku,
    price: product.price,
    description: product.description,
    categories: product.categories,
    slug: product.slug,
    imageUrl: primaryImage,
    inStock,
    inventory: product.inventoryLevel,
  })

  const specs = parseSpecs(product.description)
  const plainDescription = stripHtml(product.description)

  // Find primary category for breadcrumb
  const primaryCatId = product.categories.find(
    (c) => catNames[c] && ![23, 25, 63, 64, 65].includes(c)
  )
  const primaryCatName = primaryCatId ? catNames[primaryCatId] : 'Products'
  const catLink = primaryCatId && catToSubcategory[primaryCatId]
    ? `/products/${catToSubcategory[primaryCatId].main}/${catToSubcategory[primaryCatId].sub}`
    : '/products'

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLdProduct) }}
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
              { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://www.auvolar.com/products' },
              { '@type': 'ListItem', position: 3, name: primaryCatName, item: `https://www.auvolar.com${catLink}` },
              { '@type': 'ListItem', position: 4, name: product.name, item: `https://www.auvolar.com/p/${slug}` },
            ],
          }),
        }}
      />

      {/* Breadcrumb Nav */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span className="text-gray-300">›</span>
            <Link href="/products" className="hover:text-gray-700">Products</Link>
            <span className="text-gray-300">›</span>
            <Link href={catLink} className="hover:text-gray-700">{primaryCatName}</Link>
            <span className="text-gray-300">›</span>
            <span className="text-gray-900 font-medium truncate max-w-[300px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail — client component for interactivity */}
      <ProductDetailClient
        product={{
          id: product.id,
          name: product.name,
          sku: product.sku,
          price: product.price,
          salePrice: product.salePrice,
          retailPrice: product.retailPrice,
          description: product.description,
          plainDescription,
          images: product.images,
          variants: product.variants,
          inventoryLevel: product.inventoryLevel,
          inStock,
          weight: product.weight,
          condition: product.condition,
          customFields: product.customFields,
          specs,
          slug: product.slug,
        }}
      />

      {/* SEO Content Section — server rendered, keyword rich */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* Product Description (server rendered for SEO) */}
        <div className="bg-white rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Details</h2>

          {(product.slug.includes('ot-series') || product.slug.includes('aera-lighting-shoebox-ot') || product.slug.includes('area-light')) ? (
            <div className="prose prose-gray max-w-none">
              <h3 className="text-lg font-semibold mt-0 mb-2">A Proven Benchmark in Commercial Parking Lot Lighting</h3>
              <p>Selected by leading U.S. brands — this parking lot lighting system has been deployed nationwide, serving <strong>CarMax</strong>, <strong>The Home Depot</strong>, <strong>Ontario International Airport (CA)</strong>, and numerous branded automotive dealerships. Its adoption by high-visibility commercial facilities demonstrates its capability to meet strict illumination, reliability, and aesthetic standards.</p>

              <h3 className="text-lg font-semibold mt-6 mb-2">10+ Years of Field Validation</h3>
              <p>Designed for demanding outdoor environments, this product has accumulated over a decade of continuous real-world operation. It delivers:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>High lumen output with uniform light distribution</li>
                <li>Low glare performance for enhanced visual comfort</li>
                <li>Stable thermal management for long lifespan</li>
                <li>Reliable operation in diverse climate conditions</li>
              </ul>
              <p>Engineered for commercial-grade durability and long-term ROI.</p>

              <h3 className="text-lg font-semibold mt-6 mb-2">Complete Integrated Parking Lot Lighting System</h3>
              <p>This is not just a fixture — it is a fully engineered lighting platform, including:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Glare shields for dealership-grade visual control</li>
                <li>Motion/occupancy sensors for energy optimization</li>
                <li>Electrical adapters and mounting brackets</li>
                <li>Dedicated light poles</li>
                <li>Intelligent control systems</li>
              </ul>
              <p>Every component is designed for seamless compatibility, simplifying installation while maximizing long-term system performance.</p>
            </div>
          ) : (
            <div
              className="prose prose-gray max-w-none [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:text-gray-600"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          )}
        </div>

        {/* Specifications Table */}
        {specs.length > 0 && (
          <div className="bg-white rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody>
                  {specs.map((spec, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-3 font-medium text-gray-900 w-1/3">{spec.key}</td>
                      <td className="px-4 py-3 text-gray-600">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Custom Fields */}
        {product.customFields.length > 0 && (
          <div className="bg-white rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.customFields.map((cf, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900 min-w-[120px]">{cf.name}:</span>
                  <span className="text-gray-600">{cf.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Why Choose Section — SEO content */}
        <div className="bg-white rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Auvolar {primaryCatName}?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 mx-auto mb-3 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="font-semibold text-gray-900">DLC Certified</h3>
              <p className="text-sm text-gray-600 mt-1">Qualify for utility rebates of $20-$150+ per fixture</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="font-semibold text-gray-900">Wholesale Pricing</h3>
              <p className="text-sm text-gray-600 mt-1">Contractor and distributor volume discounts available</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="font-semibold text-gray-900">Energy Efficient</h3>
              <p className="text-sm text-gray-600 mt-1">Up to 150+ lumens per watt, save 50-70% on energy</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="font-semibold text-gray-900">5-Year Warranty</h3>
              <p className="text-sm text-gray-600 mt-1">100,000-hour rated life with comprehensive warranty</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((rp) => {
                const rpImage = rp.images.find((img) => img.isPrimary)?.url || rp.images[0]?.url
                return (
                  <Link
                    key={rp.id}
                    href={`/p/${rp.slug}`}
                    className="group bg-white rounded-xl border hover:shadow-lg transition-all overflow-hidden"
                  >
                    <div className="aspect-square bg-gray-100">
                      {rpImage ? (
                        <img src={rpImage} alt={rp.name} className="w-full h-full object-contain p-4" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 group-hover:text-yellow-600 transition-colors line-clamp-2 text-sm">
                        {rp.name}
                      </h3>
                      <p className="mt-2 text-lg font-bold">${rp.price.toFixed(2)}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* FAQ Section — unique per product type for SEO */}
        <div className="bg-white rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group border rounded-lg">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-medium text-gray-900">
                What is the warranty on {product.name}?
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-4 pb-4 text-gray-600">
                All Auvolar LED fixtures come with a standard 5-year warranty covering manufacturing defects. Our LED drivers are rated for 100,000+ hours of operation. Contact our support team for warranty claims.
              </div>
            </details>
            <details className="group border rounded-lg">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-medium text-gray-900">
                Does this product qualify for utility rebates?
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-4 pb-4 text-gray-600">
                Many Auvolar products are DLC certified, which qualifies them for utility rebates ranging from $20 to $150+ per fixture depending on your local utility program. Check our <Link href="/tools/rebate-finder" className="text-yellow-600 hover:underline">Rebate Finder</Link> tool or contact us for assistance with your specific utility.
              </div>
            </details>
            <details className="group border rounded-lg">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-medium text-gray-900">
                Do you offer volume pricing for contractors?
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-4 pb-4 text-gray-600">
                Yes! We offer competitive wholesale pricing for contractors, electricians, and distributors. Contact our sales team at <a href="mailto:sales@auvolar.com" className="text-yellow-600 hover:underline">sales@auvolar.com</a> or call for a custom quote on bulk orders.
              </div>
            </details>
            <details className="group border rounded-lg">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-medium text-gray-900">
                What is the shipping time?
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-4 pb-4 text-gray-600">
                In-stock items ship within 1-2 business days from our City of Industry, CA warehouse. Standard shipping takes 3-7 business days depending on your location. Expedited shipping options are available at checkout.
              </div>
            </details>
          </div>

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
                    name: `What is the warranty on ${product.name}?`,
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'All Auvolar LED fixtures come with a standard 5-year warranty covering manufacturing defects. Our LED drivers are rated for 100,000+ hours of operation.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Does this product qualify for utility rebates?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Many Auvolar products are DLC certified, which qualifies them for utility rebates ranging from $20 to $150+ per fixture depending on your local utility program.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Do you offer volume pricing for contractors?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes! We offer competitive wholesale pricing for contractors, electricians, and distributors. Contact sales@auvolar.com for a custom quote.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'What is the shipping time?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'In-stock items ship within 1-2 business days from our City of Industry, CA warehouse. Standard shipping takes 3-7 business days.',
                    },
                  },
                ],
              }),
            }}
          />
        </div>
      </section>

      <Footer />
    </div>
  )
}
