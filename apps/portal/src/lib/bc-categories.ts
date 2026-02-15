// BigCommerce to Website Category Mapping
// Maps BC category IDs to our website structure

export type WebsiteCategory = {
  id: string
  name: string
  slug: string
  description: string
  bcCategoryIds: number[] // BC category IDs that map to this
  parentSlug?: string
}

// BC Category IDs (from BigCommerce):
// 26 = Area Light (parent: 25 Outdoor)
// 27 = Wall Pack Light (parent: 25 Outdoor)
// 28 = Flood Light (parent: 25 Outdoor)
// 29 = Solar Lighting
// 30 = UFO High Bay Light (parent: 61 Industrial)
// 31 = Linear High Bay (parent: 61 Industrial)
// 32 = Strip Light (parent: 60 Commercial)
// 33 = Panel Light (parent: 60 Commercial)
// 35 = Tri-proof Light (parent: 61 Industrial)
// 36 = LED Tube (parent: 60 Commercial)
// 43 = Parking Lighting (Application)
// 45 = Bollard Light (parent: 62 Landscape)
// 46 = Post Top Light (parent: 62 Landscape)
// 47 = Solar Wall Pack (parent: 29 Solar)
// 48 = Exit Light (parent: 60 Commercial)
// 51 = Down Light (parent: 37 Home & Decorative)
// 52 = Ceiling Light (parent: 37 Home & Decorative)
// 53 = Garage & Canopy Light (parent: 60 Commercial)
// 55 = Barn Light (parent: 61 Industrial)
// 56 = Grow Light (parent: 61 Industrial)
// 57 = Security Light (parent: 60 Commercial)
// 58 = Low Bay Light (parent: 61 Industrial)
// 59 = Solar Area Light (parent: 29 Solar)

export const websiteCategories: WebsiteCategory[] = [
  // Outdoor Lighting
  {
    id: 'area-light',
    name: 'Area Lights / Parking Lot Lights',
    slug: 'area-light',
    description: 'LED area lights for parking lots, streets, and outdoor commercial spaces. Includes shoebox-style and traditional area light fixtures.',
    bcCategoryIds: [26, 43], // Area Light + Parking Lighting
    parentSlug: 'outdoor',
  },
  {
    id: 'wall-pack',
    name: 'Wall Packs',
    slug: 'wall-pack',
    description: 'LED wall pack lights for building perimeters, entrances, and security lighting.',
    bcCategoryIds: [27],
    parentSlug: 'outdoor',
  },
  {
    id: 'flood-light',
    name: 'Flood Lights',
    slug: 'flood-light',
    description: 'High-output LED flood lights for sports fields, billboards, and facade lighting.',
    bcCategoryIds: [28],
    parentSlug: 'outdoor',
  },
  {
    id: 'bollard',
    name: 'Bollard Lights',
    slug: 'bollard',
    description: 'LED bollard lights for pathways, gardens, and landscape lighting.',
    bcCategoryIds: [45],
    parentSlug: 'outdoor',
  },
  {
    id: 'post-top',
    name: 'Post Top Lights',
    slug: 'post-top',
    description: 'Decorative LED post top lights for streets and parks.',
    bcCategoryIds: [46],
    parentSlug: 'outdoor',
  },
  
  // Indoor Lighting - Industrial
  {
    id: 'high-bay',
    name: 'High Bay Lights',
    slug: 'high-bay',
    description: 'UFO and linear LED high bay lights for warehouses, factories, and industrial facilities.',
    bcCategoryIds: [30, 31, 58], // UFO High Bay + Linear High Bay + Low Bay
    parentSlug: 'indoor',
  },
  {
    id: 'strip-light',
    name: 'Strip Lights',
    slug: 'strip-light',
    description: 'LED strip lights for commercial and industrial applications.',
    bcCategoryIds: [32],
    parentSlug: 'indoor',
  },
  {
    id: 'panel-light',
    name: 'Panel Lights / Troffers',
    slug: 'panel-light',
    description: 'LED panel lights and troffers for office and commercial ceiling installations.',
    bcCategoryIds: [33],
    parentSlug: 'indoor',
  },
  {
    id: 'vapor-tight',
    name: 'Vapor Tight / Tri-proof',
    slug: 'vapor-tight',
    description: 'IP65+ rated LED fixtures for car washes, food processing, and harsh environments.',
    bcCategoryIds: [35],
    parentSlug: 'indoor',
  },
  {
    id: 'led-tube',
    name: 'LED Tubes',
    slug: 'led-tube',
    description: 'T8 and T5 LED replacement tubes for fluorescent fixture upgrades.',
    bcCategoryIds: [36],
    parentSlug: 'indoor',
  },
  {
    id: 'canopy',
    name: 'Canopy & Garage Lights',
    slug: 'canopy',
    description: 'LED canopy lights for gas stations, parking garages, and covered areas.',
    bcCategoryIds: [53],
    parentSlug: 'indoor',
  },
  {
    id: 'downlight',
    name: 'Downlights',
    slug: 'downlight',
    description: 'Recessed LED downlights for commercial and residential applications.',
    bcCategoryIds: [51],
    parentSlug: 'indoor',
  },
  
  // Solar Lighting
  {
    id: 'solar-area',
    name: 'Solar Area Lights',
    slug: 'solar-area',
    description: 'All-in-one solar LED area lights for off-grid parking and street lighting.',
    bcCategoryIds: [59],
    parentSlug: 'solar',
  },
  {
    id: 'solar-wall',
    name: 'Solar Wall Packs',
    slug: 'solar-wall',
    description: 'Solar-powered wall pack lights for building perimeters.',
    bcCategoryIds: [47],
    parentSlug: 'solar',
  },
  
  // Specialty
  {
    id: 'grow-light',
    name: 'Grow Lights',
    slug: 'grow-light',
    description: 'LED grow lights for indoor farming and horticulture.',
    bcCategoryIds: [56],
    parentSlug: 'specialty',
  },
  {
    id: 'barn-light',
    name: 'Barn Lights',
    slug: 'barn-light',
    description: 'LED barn lights for agricultural and rural applications.',
    bcCategoryIds: [55],
    parentSlug: 'specialty',
  },
  {
    id: 'security-light',
    name: 'Security Lights',
    slug: 'security-light',
    description: 'Motion-activated LED security lights.',
    bcCategoryIds: [57],
    parentSlug: 'specialty',
  },
  {
    id: 'exit-light',
    name: 'Exit Signs',
    slug: 'exit-light',
    description: 'LED exit signs and emergency lighting.',
    bcCategoryIds: [48],
    parentSlug: 'specialty',
  },
]

// Get BC category IDs for a website category slug
export function getBcCategoryIds(slug: string): number[] {
  const cat = websiteCategories.find(c => c.slug === slug)
  return cat?.bcCategoryIds || []
}

// Get website category by BC category ID
export function getWebsiteCategoryByBcId(bcId: number): WebsiteCategory | undefined {
  return websiteCategories.find(c => c.bcCategoryIds.includes(bcId))
}

// Get all website categories for a parent
export function getCategoriesByParent(parentSlug: string): WebsiteCategory[] {
  return websiteCategories.filter(c => c.parentSlug === parentSlug)
}

// Main category groupings for navigation
export const mainCategories = [
  {
    slug: 'outdoor',
    name: 'Outdoor Lighting',
    description: 'Commercial outdoor LED lighting for parking lots, building perimeters, and landscapes.',
  },
  {
    slug: 'indoor',
    name: 'Indoor Lighting',
    description: 'Commercial indoor LED lighting for warehouses, offices, retail, and more.',
  },
  {
    slug: 'solar',
    name: 'Solar Lighting',
    description: 'Off-grid solar LED lighting solutions.',
  },
  {
    slug: 'specialty',
    name: 'Specialty Lighting',
    description: 'Grow lights, security lights, and specialty applications.',
  },
]
