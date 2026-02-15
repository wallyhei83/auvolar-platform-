// Product Category Structure with BigCommerce Integration
// Maps website categories to BigCommerce category IDs

export interface ProductCategory {
  id: string
  slug: string
  name: string
  description: string
  bcCategoryIds: number[]  // BigCommerce category IDs
  image?: string
}

export interface MainCategory {
  id: string
  slug: string
  name: string
  description: string
  subcategories: ProductCategory[]
}

// BigCommerce Category ID Reference:
// 26 = Area Light
// 27 = Wall Pack Light
// 28 = Flood Light
// 29 = Solar Lighting
// 30 = UFO High Bay Light
// 31 = Linear High Bay
// 32 = Strip Light
// 33 = Panel Light
// 35 = Tri-proof Light
// 36 = LED Tube
// 43 = Parking Lighting
// 45 = Bollard Light
// 46 = Post Top Light
// 47 = Solar Wall Pack
// 48 = Exit Light
// 51 = Down Light
// 53 = Garage & Canopy Light
// 55 = Barn Light
// 56 = Grow Light
// 57 = Security Light
// 58 = Low Bay Light
// 59 = Solar Area Light

export const productCategories: MainCategory[] = [
  {
    id: 'indoor',
    slug: 'indoor',
    name: 'Indoor Lighting',
    description: 'Commercial indoor LED lighting for warehouses, offices, retail, and more.',
    subcategories: [
      {
        id: 'high-bay',
        slug: 'high-bay',
        name: 'High Bay Lights',
        description: 'UFO and linear LED high bay lights for warehouses and industrial facilities with 20-45ft ceilings.',
        bcCategoryIds: [30, 31, 58], // UFO High Bay + Linear High Bay + Low Bay
      },
      {
        id: 'troffer',
        slug: 'troffer',
        name: 'Troffers & Panels',
        description: 'LED panel lights and troffers for office and commercial drop ceiling installations.',
        bcCategoryIds: [33], // Panel Light
      },
      {
        id: 'led-tube',
        slug: 'led-tube',
        name: 'LED Tubes',
        description: 'T8 and T5 LED replacement tubes for fluorescent fixture upgrades.',
        bcCategoryIds: [36], // LED Tube
      },
      {
        id: 'strip',
        slug: 'strip',
        name: 'Strip Lights',
        description: 'LED strip lights for commercial and industrial linear lighting applications.',
        bcCategoryIds: [32], // Strip Light
      },
      {
        id: 'vapor-tight',
        slug: 'vapor-tight',
        name: 'Vapor Tight',
        description: 'IP65+ rated LED fixtures for car washes, food processing, and harsh environments.',
        bcCategoryIds: [35], // Tri-proof Light
      },
      {
        id: 'downlight',
        slug: 'downlight',
        name: 'Downlights',
        description: 'Recessed LED downlights for commercial and residential applications.',
        bcCategoryIds: [51], // Down Light
      },
      {
        id: 'canopy',
        slug: 'canopy',
        name: 'Canopy & Garage',
        description: 'LED canopy lights for parking garages and covered areas.',
        bcCategoryIds: [53], // Garage & Canopy Light
      },
      {
        id: 'exit',
        slug: 'exit',
        name: 'Exit Signs',
        description: 'LED exit signs and emergency lighting fixtures.',
        bcCategoryIds: [48], // Exit Light
      },
    ],
  },
  {
    id: 'outdoor',
    slug: 'outdoor',
    name: 'Outdoor Lighting',
    description: 'Commercial outdoor LED lighting for parking lots, building perimeters, and landscapes.',
    subcategories: [
      {
        id: 'area-light',
        slug: 'area-light',
        name: 'Area Lights',
        description: 'LED area lights and shoebox fixtures for parking lots, streets, and outdoor commercial spaces.',
        bcCategoryIds: [26, 43], // Area Light + Parking Lighting (merged)
      },
      {
        id: 'wall-pack',
        slug: 'wall-pack',
        name: 'Wall Packs',
        description: 'LED wall pack lights for building perimeters, entrances, and security lighting.',
        bcCategoryIds: [27], // Wall Pack Light
      },
      {
        id: 'flood',
        slug: 'flood',
        name: 'Flood Lights',
        description: 'High-output LED flood lights for sports fields, billboards, and facade lighting.',
        bcCategoryIds: [28], // Flood Light
      },
      {
        id: 'bollard',
        slug: 'bollard',
        name: 'Bollard Lights',
        description: 'LED bollard lights for pathways, gardens, and landscape lighting.',
        bcCategoryIds: [45], // Bollard Light
      },
      {
        id: 'post-top',
        slug: 'post-top',
        name: 'Post Top Lights',
        description: 'Decorative LED post top lights for streets, parks, and commercial areas.',
        bcCategoryIds: [46], // Post Top Light
      },
      {
        id: 'barn',
        slug: 'barn',
        name: 'Barn Lights',
        description: 'LED barn lights and dusk-to-dawn security lights for agricultural and rural applications.',
        bcCategoryIds: [55, 57], // Barn Light + Security Light
      },
    ],
  },
  {
    id: 'solar',
    slug: 'solar',
    name: 'Solar Lighting',
    description: 'Off-grid solar LED lighting solutions for streets, pathways, and remote areas.',
    subcategories: [
      {
        id: 'solar-area',
        slug: 'solar-area',
        name: 'Solar Area Lights',
        description: 'All-in-one solar LED area lights for off-grid parking and street lighting.',
        bcCategoryIds: [59], // Solar Area Light
      },
      {
        id: 'solar-wall',
        slug: 'solar-wall',
        name: 'Solar Wall Packs',
        description: 'Solar-powered wall pack lights for building perimeters without electrical access.',
        bcCategoryIds: [47], // Solar Wall Pack
      },
    ],
  },
  {
    id: 'specialty',
    slug: 'specialty',
    name: 'Specialty Lighting',
    description: 'Grow lights, security lights, and specialty LED lighting applications.',
    subcategories: [
      {
        id: 'grow',
        slug: 'grow',
        name: 'Grow Lights',
        description: 'LED grow lights for indoor farming, greenhouses, and horticulture.',
        bcCategoryIds: [56], // Grow Light
      },
    ],
  },
]

// Helper functions
export function getMainCategory(slug: string): MainCategory | undefined {
  return productCategories.find(c => c.slug === slug)
}

export function getSubcategory(mainSlug: string, subSlug: string): ProductCategory | undefined {
  const main = getMainCategory(mainSlug)
  return main?.subcategories.find(s => s.slug === subSlug)
}

export function getBcCategoryIds(mainSlug: string, subSlug?: string): number[] {
  if (subSlug) {
    const sub = getSubcategory(mainSlug, subSlug)
    return sub?.bcCategoryIds || []
  }
  const main = getMainCategory(mainSlug)
  return main?.subcategories.flatMap(s => s.bcCategoryIds) || []
}

export function getAllSubcategories(): ProductCategory[] {
  return productCategories.flatMap(c => c.subcategories)
}

export function findCategoryByBcId(bcId: number): { main: MainCategory; sub: ProductCategory } | undefined {
  for (const main of productCategories) {
    for (const sub of main.subcategories) {
      if (sub.bcCategoryIds.includes(bcId)) {
        return { main, sub }
      }
    }
  }
  return undefined
}
