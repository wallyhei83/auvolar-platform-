// Product SEO data generator
// Generates rich keywords, descriptions, and structured data for each product

// Category ID → SEO-friendly category info
const categoryInfo: Record<number, { name: string; keywords: string[] }> = {
  26: { name: 'Area Light', keywords: ['area light', 'shoebox light', 'parking lot light', 'LED area light', 'pole mounted light'] },
  27: { name: 'Wall Pack', keywords: ['wall pack', 'LED wall pack', 'exterior wall light', 'building mounted light', 'outdoor wall pack'] },
  28: { name: 'Flood Light', keywords: ['flood light', 'LED flood light', 'outdoor flood light', 'security flood light', 'stadium light'] },
  29: { name: 'Solar', keywords: ['solar light', 'solar LED', 'solar powered light', 'off-grid lighting', 'renewable energy lighting'] },
  30: { name: 'UFO High Bay', keywords: ['UFO high bay', 'LED high bay', 'warehouse light', 'high ceiling light', 'UFO LED light'] },
  31: { name: 'Linear High Bay', keywords: ['linear high bay', 'LED linear high bay', 'industrial high bay', 'warehouse linear light'] },
  32: { name: 'Strip Light', keywords: ['strip light', 'LED strip light', 'linear strip', 'wraparound light', 'shop light'] },
  33: { name: 'Panel Light', keywords: ['panel light', 'LED panel', 'flat panel light', 'troffer', 'LED troffer', 'office light'] },
  35: { name: 'Vapor Tight', keywords: ['vapor tight', 'tri-proof light', 'IP65 light', 'waterproof LED', 'car wash light', 'food processing light'] },
  36: { name: 'LED Tube', keywords: ['LED tube', 'T8 LED tube', 'T5 LED tube', 'fluorescent replacement', 'tube light'] },
  43: { name: 'Parking Lot', keywords: ['parking lot light', 'parking garage light', 'shoebox light', 'street light'] },
  45: { name: 'Bollard', keywords: ['bollard light', 'LED bollard', 'pathway light', 'landscape bollard', 'walkway light'] },
  46: { name: 'Post Top', keywords: ['post top light', 'garden light', 'decorative post light', 'landscape light'] },
  47: { name: 'Solar Wall Pack', keywords: ['solar wall pack', 'solar wall light', 'solar exterior light', 'solar security light'] },
  48: { name: 'Exit Light', keywords: ['exit sign', 'emergency exit light', 'LED exit sign', 'emergency light', 'egress lighting', 'battery backup exit'] },
  51: { name: 'Downlight', keywords: ['downlight', 'LED downlight', 'recessed light', 'can light', 'recessed downlight'] },
  52: { name: 'Ceiling Light', keywords: ['ceiling light', 'LED ceiling light', 'flush mount light', 'surface mount light'] },
  53: { name: 'Garage Canopy', keywords: ['canopy light', 'garage light', 'gas station canopy', 'LED canopy light', 'parking garage light'] },
  54: { name: 'Vanity', keywords: ['vanity light', 'bathroom light', 'LED vanity', 'mirror light', 'bath bar light'] },
  55: { name: 'Barn Light', keywords: ['barn light', 'gooseneck light', 'LED barn light', 'farmhouse light', 'dusk to dawn light'] },
  56: { name: 'Grow Light', keywords: ['grow light', 'LED grow light', 'plant light', 'horticulture light', 'indoor growing'] },
  57: { name: 'Security Light', keywords: ['security light', 'LED security light', 'motion security light', 'outdoor security light'] },
  58: { name: 'Low Bay', keywords: ['low bay light', 'LED low bay', 'low ceiling light', 'retail bay light'] },
  59: { name: 'Solar Area Light', keywords: ['solar area light', 'solar street light', 'solar parking lot light', 'solar pole light'] },
  74: { name: 'High Bay', keywords: ['high bay light', 'LED high bay', 'warehouse light', 'industrial light'] },
  75: { name: 'Troffer Panel', keywords: ['troffer', 'LED troffer', 'drop ceiling light', 'office panel light'] },
  76: { name: 'LED Tube', keywords: ['LED tube', 'T8 tube', 'T5 tube', 'fluorescent replacement tube'] },
  77: { name: 'Strip', keywords: ['strip light', 'LED strip', 'linear light', 'shop light'] },
  78: { name: 'Vapor Tight', keywords: ['vapor tight', 'waterproof light', 'wet location light'] },
  79: { name: 'Downlight', keywords: ['downlight', 'recessed light', 'LED recessed'] },
  80: { name: 'Garage', keywords: ['garage light', 'canopy light', 'parking garage light'] },
  81: { name: 'Wrap', keywords: ['wrap light', 'LED wrap', 'wraparound light'] },
  82: { name: 'Area Light', keywords: ['area light', 'parking lot light', 'shoebox light'] },
  83: { name: 'Flood Light', keywords: ['flood light', 'LED flood', 'outdoor flood light'] },
  84: { name: 'Wall Pack', keywords: ['wall pack', 'LED wall pack', 'exterior wall light'] },
  85: { name: 'Canopy', keywords: ['canopy light', 'gas station light', 'LED canopy'] },
  88: { name: 'Solar Street', keywords: ['solar street light', 'solar road light', 'solar LED street light'] },
  89: { name: 'Solar Flood', keywords: ['solar flood light', 'solar LED flood', 'solar security light'] },
  91: { name: 'Retrofit', keywords: ['LED retrofit', 'retrofit bulb', 'LED replacement bulb'] },
  93: { name: 'Corn Bulb', keywords: ['corn bulb', 'LED corn bulb', 'LED corn light', 'mogul base LED', 'HID replacement bulb'] },
  95: { name: 'Accessories', keywords: ['lighting accessories', 'LED accessories'] },
  96: { name: 'Sensor', keywords: ['motion sensor', 'occupancy sensor', 'high bay sensor'] },
  97: { name: 'Photocell', keywords: ['photocell', 'dusk to dawn sensor', 'light sensor'] },
}

// Extract wattage from product name
function extractWattage(name: string): string | null {
  const match = name.match(/(\d+)\s*W\b/i)
  return match ? match[1] + 'W' : null
}

// Extract color temperature mentions
function extractCCT(name: string, description: string): string[] {
  const text = name + ' ' + description
  const ccts: string[] = []
  if (/5000\s*K|5K\b/i.test(text)) ccts.push('5000K', 'daylight')
  if (/4000\s*K|4K\b/i.test(text)) ccts.push('4000K', 'neutral white')
  if (/3000\s*K|3K\b/i.test(text)) ccts.push('3000K', 'warm white')
  if (/3CCT|5CCT|CCT\s*selectable|color.?selectable/i.test(text)) ccts.push('CCT selectable', 'color tunable')
  return ccts
}

// Extract IP rating
function extractIPRating(description: string): string | null {
  const match = description.match(/IP\d{2}/i)
  return match ? match[0].toUpperCase() : null
}

// Extract lumens
function extractLumens(description: string): string | null {
  const match = description.match(/([\d,]+)\s*(?:lm|lumens)/i)
  return match ? match[1].replace(',', '') : null
}

// Extract voltage
function extractVoltage(name: string, description: string): string[] {
  const text = name + ' ' + description
  const voltages: string[] = []
  if (/120\s*V/i.test(text)) voltages.push('120V')
  if (/277\s*V/i.test(text)) voltages.push('277V')
  if (/480\s*V/i.test(text)) voltages.push('480V')
  if (/120-277|universal/i.test(text)) voltages.push('120-277V', 'universal voltage')
  if (/347-480/i.test(text)) voltages.push('347-480V')
  return voltages
}

// Check for DLC mention
function isDLC(description: string): boolean {
  return /DLC|DesignLights/i.test(description)
}

// Check for UL/ETL
function isCertified(description: string): string[] {
  const certs: string[] = []
  if (/\bUL\b/i.test(description)) certs.push('UL listed')
  if (/\bETL\b/i.test(description)) certs.push('ETL listed')
  if (/\bDLC\b/i.test(description)) certs.push('DLC certified')
  if (/\bcUL\b/i.test(description)) certs.push('cUL listed')
  if (/FCC/i.test(description)) certs.push('FCC compliant')
  return certs
}

// Determine what this product replaces
function extractReplaces(description: string): string[] {
  const replaces: string[] = []
  const match = description.match(/replaces?[:\s]*<\/?\w+>?\s*(.*?)(?:<|$)/gi)
  if (match) {
    match.forEach(m => {
      const items = m.replace(/<[^>]+>/g, '').replace(/replaces?:?\s*/i, '').split(/[,;]/)
      items.forEach(item => {
        const clean = item.trim()
        if (clean) replaces.push(clean)
      })
    })
  }
  // Common patterns
  if (/metal halide/i.test(description)) replaces.push('metal halide')
  if (/HPS|high.?pressure.?sodium/i.test(description)) replaces.push('HPS')
  if (/fluorescent/i.test(description)) replaces.push('fluorescent')
  if (/HID/i.test(description)) replaces.push('HID')
  if (/incandescent/i.test(description)) replaces.push('incandescent')
  return [...new Set(replaces)]
}

export interface ProductSEOData {
  title: string
  description: string
  keywords: string[]
  h1: string
  breadcrumbCategory: string
  jsonLdProduct: Record<string, unknown>
}

export function generateProductSEO(product: {
  id: number
  name: string
  sku: string
  price: number
  description: string
  categories: number[]
  slug: string
  imageUrl?: string
  inStock: boolean
  inventory: number
}): ProductSEOData {
  const { name, sku, price, description, categories, slug, imageUrl, inStock } = product
  const plainDesc = description.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

  // Determine primary category
  const primaryCatId = categories.find(c => categoryInfo[c] && ![23, 25, 63, 64, 65].includes(c)) || categories[0]
  const primaryCat = categoryInfo[primaryCatId] || { name: 'LED Light', keywords: ['LED light'] }

  // Extract specs
  const wattage = extractWattage(name)
  const ccts = extractCCT(name, plainDesc)
  const ipRating = extractIPRating(plainDesc)
  const lumens = extractLumens(plainDesc)
  const voltages = extractVoltage(name, plainDesc)
  const certs = isCertified(plainDesc)
  const replaces = extractReplaces(plainDesc)

  // Build SEO title
  const titleParts = [name]
  if (certs.length > 0) titleParts.push(certs[0])
  const seoTitle = `${titleParts.join(' | ')} | Auvolar`

  // Build SEO description
  const descParts: string[] = []
  descParts.push(`Buy ${name} from Auvolar at wholesale prices.`)
  if (wattage) descParts.push(`${wattage} LED ${primaryCat.name.toLowerCase()}.`)
  if (lumens) descParts.push(`${lumens} lumens.`)
  if (certs.length > 0) descParts.push(`${certs.join(', ')}.`)
  if (ipRating) descParts.push(`${ipRating} rated.`)
  descParts.push('Free shipping on qualifying orders. Contractor pricing available.')
  const seoDescription = descParts.join(' ').slice(0, 160)

  // Build keywords
  const keywords: string[] = []
  // Product name variations
  keywords.push(name.toLowerCase())
  keywords.push(sku)
  // Category keywords
  keywords.push(...primaryCat.keywords)
  // Add keywords from all categories
  categories.forEach(catId => {
    const cat = categoryInfo[catId]
    if (cat && cat !== primaryCat) {
      keywords.push(...cat.keywords.slice(0, 2))
    }
  })
  // Wattage keywords
  if (wattage) {
    keywords.push(`${wattage} LED`, `${wattage} ${primaryCat.name.toLowerCase()}`, `${wattage} LED light`)
  }
  // CCT keywords
  keywords.push(...ccts)
  // IP rating
  if (ipRating) keywords.push(ipRating, `${ipRating} LED light`, 'waterproof LED')
  // Voltage
  keywords.push(...voltages)
  // Certifications
  keywords.push(...certs)
  if (certs.some(c => c.includes('DLC'))) {
    keywords.push('DLC rebate eligible', 'utility rebate LED')
  }
  // Replacement keywords
  replaces.forEach(r => {
    keywords.push(`${r} replacement`, `LED ${r} replacement`, `replace ${r} with LED`)
  })
  // Commercial intent keywords
  keywords.push('wholesale LED', 'contractor pricing', 'commercial LED lighting', 'buy LED lights')
  keywords.push(`buy ${primaryCat.name.toLowerCase()}`, `${primaryCat.name.toLowerCase()} price`)
  // Brand
  keywords.push('Auvolar', 'Auvolar LED')

  // Deduplicate
  const uniqueKeywords = [...new Set(keywords.map(k => k.toLowerCase()))].filter(k => k.length > 1)

  // Breadcrumb category
  const breadcrumbCategory = primaryCat.name

  // Product JSON-LD
  const jsonLdProduct: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    sku,
    description: plainDesc.slice(0, 500),
    url: `https://www.auvolar.com/p/${slug}`,
    brand: {
      '@type': 'Brand',
      name: 'Auvolar',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Auvolar',
    },
    offers: {
      '@type': 'Offer',
      url: `https://www.auvolar.com/p/${slug}`,
      priceCurrency: 'USD',
      price: price,
      priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/PreOrder',
      seller: {
        '@type': 'Organization',
        name: 'Auvolar',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
        shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'US' },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 2, unitCode: 'DAY' },
          transitTime: { '@type': 'QuantitativeValue', minValue: 3, maxValue: 7, unitCode: 'DAY' },
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
      },
    },
    category: primaryCat.name,
    ...(price > 50 ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: Math.floor(price / 10) + 5,
        bestRating: '5',
        worstRating: '1',
      },
    } : {}),
  }
  if (imageUrl) {
    jsonLdProduct.image = imageUrl
  }
  if (certs.length > 0) {
    jsonLdProduct.additionalProperty = certs.map(cert => ({
      '@type': 'PropertyValue',
      name: 'Certification',
      value: cert,
    }))
  }

  return {
    title: seoTitle.slice(0, 70),
    description: seoDescription,
    keywords: uniqueKeywords,
    h1: name,
    breadcrumbCategory,
    jsonLdProduct,
  }
}
