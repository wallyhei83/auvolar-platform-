import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.auvolar.com'
  
  // Main pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]

  // LED Product Categories
  const productCategories = [
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
    'industrial-lighting',
    'warehouse-lighting',
    'retail-lighting',
  ].map(category => ({
    url: `${baseUrl}/products/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Applications/Industries
  const applications = [
    'warehouse',
    'retail',
    'industrial',
    'parking-lot',
    'commercial',
    'manufacturing',
    'logistics',
    'automotive',
    'food-processing',
    'cold-storage',
  ].map(app => ({
    url: `${baseUrl}/applications/${app}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Geographic pages for California
  const locations = [
    'california',
    'los-angeles',
    'san-francisco',
    'san-diego',
    'sacramento',
    'orange-county',
    'silicon-valley',
    'bay-area',
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
  ].map(resource => ({
    url: `${baseUrl}/resources/${resource}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    ...mainPages,
    ...productCategories,
    ...applications,
    ...locations,
    ...resources,
  ]
}
