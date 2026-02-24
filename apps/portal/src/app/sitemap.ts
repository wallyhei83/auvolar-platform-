import { MetadataRoute } from 'next'
import { getAllBlogPosts } from '@/lib/blog-posts'
import { getAllProducts } from '@/lib/bc-products-server'
import { getAllApplicationSlugs } from '@/lib/applications-data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.auvolar.com'
  
  // Main pages
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/rebate-finder`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tailor-purchasing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // AI-readable content
    {
      url: `${baseUrl}/llms.txt`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/llms-full.txt`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
  ]

  // LED Product Categories — comprehensive coverage
  const productCategories = [
    // Indoor
    'indoor/high-bay',
    'indoor/linear-high-bay',
    'indoor/troffer',
    'indoor/panel',
    'indoor/led-tube',
    'indoor/strip',
    'indoor/wrap',
    'indoor/vapor-tight',
    'indoor/downlight',
    'indoor/canopy',
    'indoor/garage',
    'indoor/exit',
    'indoor/low-bay',
    'indoor/ceiling',
    // Outdoor
    'outdoor/area-light',
    'outdoor/wall-pack',
    'outdoor/flood',
    'outdoor/bollard',
    'outdoor/post-top',
    'outdoor/barn',
    'outdoor/security-light',
    // Solar
    'solar/solar-area',
    'solar/solar-wall',
    'solar/solar-flood',
    // Specialty
    'specialty/corn-bulb',
    'specialty/vanity',
    'specialty/grow-light',
    // By use-case keyword URLs
    'high-bay-lights',
    'wall-pack-lights',
    'area-lights',
    'shoebox-lights',
    'flood-lights',
    'canopy-lights',
    'linear-high-bay',
    'ufo-high-bay',
    'parking-lot-lights',
    'street-lights',
    'security-lights',
    'led-tubes',
    'strip-lights',
    'troffer-lights',
    'panel-lights',
    'downlights',
    'vapor-tight-lights',
    'exit-signs',
    'bollard-lights',
    'post-top-lights',
    'barn-lights',
    'solar-lights',
    'industrial-lighting',
    'warehouse-lighting',
    'retail-lighting',
    'commercial-lighting',
  ].map(category => ({
    url: `${baseUrl}/products/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Applications/Industries — from data file
  const applicationPages = getAllApplicationSlugs().map(slug => ({
    url: `${baseUrl}/applications/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Geographic pages
  const locations = [
    'california',
    'los-angeles',
    'san-francisco',
    'san-diego',
    'sacramento',
    'orange-county',
    'silicon-valley',
    'bay-area',
    'new-york',
    'texas',
    'florida',
    'illinois',
    'washington',
    'oregon',
    'colorado',
    'arizona',
    'nevada',
  ].map(location => ({
    url: `${baseUrl}/locations/${location}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Resource pages
  const resources = [
    'installation-guides',
    'cut-sheets',
    'ies-files',
    'rebates',
    'energy-savings-calculator',
    'dlc-certificates',
    'warranty-info',
    'technical-support',
    'lighting-design',
    'photometric-layouts',
  ].map(resource => ({
    url: `${baseUrl}/resources/${resource}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Blog posts
  const blogPostEntries = getAllBlogPosts().map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const blogIndex = [{
    url: `${baseUrl}/blog`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }]

  // Individual product pages from BigCommerce
  let productPages: MetadataRoute.Sitemap = []
  try {
    const products = await getAllProducts()
    productPages = products.map(p => ({
      url: `${baseUrl}/p/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch (e) {
    console.error('Sitemap: failed to fetch products for /p/ pages', e)
  }

  return [
    ...mainPages,
    ...blogIndex,
    ...blogPostEntries,
    ...productPages,
    ...productCategories,
    ...applicationPages,
    ...locations,
    ...resources,
  ]
}
