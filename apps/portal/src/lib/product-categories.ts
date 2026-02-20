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
        image: 'https://cdn11.bigcommerce.com/s-hhcdvxqxzq/products/156/images/452/Highbay_Light_OH60W-240W__96466.1770882596.386.513.jpg?c=1', // BC: UFO High Bay
      },
      {
        id: 'troffer',
        slug: 'troffer',
        name: 'Troffers & Panels',
        description: 'LED panel lights and troffers for office and commercial drop ceiling installations.',
        bcCategoryIds: [33], // Panel Light
        image: 'https://cdn11.bigcommerce.com/s-hhcdvxqxzq/products/178/images/484/image__12842.1770886820.386.513.png?c=1', // BC: Panel Light
      },
      {
        id: 'led-tube',
        slug: 'led-tube',
        name: 'LED Tubes',
        description: 'T8 and T5 LED replacement tubes for fluorescent fixture upgrades.',
        bcCategoryIds: [36], // LED Tube
        image: 'https://cdn11.bigcommerce.com/s-hhcdvxqxzq/products/138/images/421/WPS20260212144030__14594.1770879720.386.513.png?c=1', // BC: LED Tube
      },
      {
        id: 'strip',
        slug: 'strip',
        name: 'Strip Lights',
        description: 'LED strip lights for commercial and industrial linear lighting applications.',
        bcCategoryIds: [32], // Strip Light
        image: 'https://cdn11.bigcommerce.com/s-hhcdvxqxzq/products/131/images/569/Linear_strip_AN-WR4FT40W_-5K_Application_reference__27998.1771055058.386.513.jpg?c=1',
      },
      {
        id: 'vapor-tight',
        slug: 'vapor-tight',
        name: 'Vapor Tight',
        description: 'IP65+ rated LED fixtures for car washes, food processing, and harsh environments.',
        bcCategoryIds: [35], // Tri-proof Light
        image: 'https://cdn11.bigcommerce.com/s-hhcdvxqxzq/products/125/images/568/Vapor_Tight_AN-VF4FT-NV40W_-5K_Application_reference__73869.1771054854.386.513.jpg?c=1',
      },
      {
        id: 'downlight',
        slug: 'downlight',
        name: 'Downlights',
        description: 'Recessed LED downlights for commercial and residential applications.',
        bcCategoryIds: [51], // Down Light
        image: 'https://cdn11.bigcommerce.com/s-hhcdvxqxzq/products/148/images/438/46_INSD_DOWN__29025.1770976562.386.513.png?c=1', // BC: Downlight
      },
      {
        id: 'canopy',
        slug: 'canopy',
        name: 'Canopy & Garage',
        description: 'LED canopy lights for parking garages and covered areas.',
        bcCategoryIds: [53], // Garage & Canopy Light
        image: 'https://cdn11.bigcommerce.com/s-hhcdvxqxzq/products/126/images/393/MUM_1953__85455.1770876682.386.513.png?c=1',
      },
      {
        id: 'exit',
        slug: 'exit',
        name: 'Exit Signs',
        description: 'LED exit signs and emergency lighting fixtures.',
        bcCategoryIds: [48], // Exit Light
        image: 'https://cdn11.bigcommerce.com/s-hhcdvxqxzq/products/122/images/388/exit_01__21417.1770876268.386.513.jpg?c=1',
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
        image: 'https://cdn11.bigcommerce.com/s-hhcdvxqxzq/products/113/images/413/Area_Light_OT75W-420W_Silver__68409.1770976359.386.513.jpg?c=1',
      },
      {
        id: 'wall-pack',
        slug: 'wall-pack',
        name: 'Wall Packs',
        description: 'LED wall pack lights for building perimeters, entrances, and security lighting.',
        bcCategoryIds: [27], // Wall Pack Light
        image: 'https://cdn11.bigcommerce.com/s-hhcdvxqxzq/products/130/images/405/QQ20260212-142924__81406.1770878366.386.513.png?c=1',
      },
      {
        id: 'flood',
        slug: 'flood',
        name: 'Flood Lights',
        description: 'High-output LED flood lights for sports fields, billboards, and facade lighting.',
        bcCategoryIds: [28], // Flood Light
        image: 'https://cdn11.bigcommerce.com/s-hhcdvxqxzq/products/124/images/390/01__25331.1770875986.386.513.jpg?c=1',
      },
      {
        id: 'bollard',
        slug: 'bollard',
        name: 'Bollard Lights',
        description: 'LED bollard lights for pathways, gardens, and landscape lighting.',
        bcCategoryIds: [45], // Bollard Light
        image: 'https://cdn11.bigcommerce.com/s-hhcdvxqxzq/products/196/images/559/Garden_Light_A-B10-18-25W_-345K-BZ__32542.1771050772.386.513.jpg?c=1', // BC: Bollard
      },
      {
        id: 'post-top',
        slug: 'post-top',
        name: 'Post Top Lights',
        description: 'Decorative LED post top lights for streets, parks, and commercial areas.',
        bcCategoryIds: [46], // Post Top Light
        image: 'https://cdn11.bigcommerce.com/s-hhcdvxqxzq/products/116/images/380/WPS2026021210250920__75892.1770874772.386.513.png?c=1',
      },
      {
        id: 'barn',
        slug: 'barn',
        name: 'Barn Lights',
        description: 'LED barn lights and dusk-to-dawn security lights for agricultural and rural applications.',
        bcCategoryIds: [55, 57], // Barn Light + Security Light
        image: 'https://cdn11.bigcommerce.com/s-hhcdvxqxzq/products/175/images/481/WPS20260212165051__97966.1770886364.386.513.png?c=1', // BC: Barn Light
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
        image: 'https://cdn11.bigcommerce.com/s-hhcdvxqxzq/products/197/images/535/04BB1E37-4E58-4b31-8B76-2EFFD4AE7AE6__86041.1770891195.386.513.png?c=1', // BC: Solar Area
      },
      {
        id: 'solar-wall',
        slug: 'solar-wall',
        name: 'Solar Wall Packs',
        description: 'Solar-powered wall pack lights for building perimeters without electrical access.',
        bcCategoryIds: [47], // Solar Wall Pack
        image: 'https://cdn11.bigcommerce.com/s-hhcdvxqxzq/products/119/images/562/Solar_Wallpack_Light_AN-SBR6W_-6K-WH__87869.1771053883.386.513.jpg?c=1',
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
        image: 'https://cdn11.bigcommerce.com/s-hhcdvxqxzq/products/179/images/485/WPS20260212165738__33477.1770886942.386.513.png?c=1', // BC: Grow Light
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
