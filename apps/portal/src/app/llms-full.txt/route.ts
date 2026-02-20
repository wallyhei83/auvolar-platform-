import { NextResponse } from 'next/server'

// Category ID → Name mapping
const categoryNames: Record<number, string> = {
  23: 'In Stock Ready to Ship',
  25: 'Outdoor Lighting',
  26: 'Area Light',
  27: 'Wall Pack',
  28: 'Flood Light',
  29: 'Solar Lighting',
  30: 'UFO High Bay',
  31: 'Linear High Bay',
  32: 'Strip Light',
  33: 'Panel Light',
  35: 'Vapor Tight',
  36: 'LED Tube',
  42: 'Commercial',
  43: 'Parking Lighting',
  45: 'Bollard Light',
  46: 'Post Top Light',
  47: 'Solar Wall Pack',
  48: 'Exit & Emergency',
  51: 'Downlight',
  52: 'Ceiling Light',
  53: 'Garage & Canopy',
  54: 'Vanity Light',
  55: 'Barn Light',
  56: 'Grow Light',
  57: 'Security Light',
  58: 'Low Bay',
  59: 'Solar Street Light',
  74: 'High Bay',
  75: 'Troffer & Panel',
  76: 'LED Tube',
  77: 'Strip Light',
  78: 'Vapor Tight',
  79: 'Downlight',
  80: 'Garage Light',
  81: 'Wrap Light',
  82: 'Area Light',
  83: 'Flood Light',
  84: 'Wall Pack',
  85: 'Canopy Light',
  88: 'Solar Street',
  89: 'Solar Flood',
  91: 'LED Bulbs',
  93: 'Corn Bulb',
  95: 'Accessories',
  96: 'Motion Sensor',
  97: 'Photocell',
}

interface BCProduct {
  id: number
  name: string
  sku: string
  price: number
  description: string
  categories: number[]
  is_visible: boolean
  availability: string
  weight: number
  width: number
  height: number
  depth: number
  warranty: string
  condition: string
  custom_url: { url: string }
}

export async function GET() {
  try {
    const token = process.env.BIGCOMMERCE_ACCESS_TOKEN
    const storeHash = process.env.BIGCOMMERCE_STORE_HASH || 'hhcdvxqxzq'

    let products: BCProduct[] = []

    if (token) {
      // Fetch all products from BigCommerce
      let page = 1
      let hasMore = true
      while (hasMore) {
        const res = await fetch(
          `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products?limit=250&page=${page}&include_fields=id,name,sku,price,description,categories,is_visible,availability,weight,width,height,depth,warranty,condition,custom_url`,
          {
            headers: {
              'X-Auth-Token': token,
              'Accept': 'application/json',
            },
            next: { revalidate: 3600 }, // cache 1 hour
          }
        )
        const data = await res.json()
        products = [...products, ...(data.data || [])]
        hasMore = data.data?.length === 250
        page++
      }
    }

    const visibleProducts = products.filter(p => p.is_visible)
    const baseUrl = 'https://www.auvolar.com'

    let output = `# Auvolar - Complete Product Catalog\n\n`
    output += `> Full product data for Auvolar commercial LED lighting. ${visibleProducts.length} products available.\n`
    output += `> Last updated: ${new Date().toISOString().split('T')[0]}\n`
    output += `> Website: ${baseUrl}\n\n`

    output += `## Company Information\n\n`
    output += `- **Name**: Auvolar\n`
    output += `- **Type**: B2B LED Lighting Manufacturer & Distributor\n`
    output += `- **Location**: City of Industry, California, USA\n`
    output += `- **Market**: Commercial, Industrial, Municipal LED Lighting\n`
    output += `- **Customers**: Contractors, Electricians, Facility Managers, Distributors\n`
    output += `- **Certifications**: DLC, UL, ETL, FCC, Energy Star (select)\n`
    output += `- **Warranty**: 5-10 years standard\n`
    output += `- **Contact**: ${baseUrl}/contact\n\n`

    // Group by primary category
    const grouped: Record<string, BCProduct[]> = {}
    for (const p of visibleProducts) {
      const primaryCatId = p.categories[0]
      const catName = categoryNames[primaryCatId] || `Category ${primaryCatId}`
      if (!grouped[catName]) grouped[catName] = []
      grouped[catName].push(p)
    }

    output += `## Products\n\n`

    for (const [category, prods] of Object.entries(grouped).sort()) {
      output += `### ${category}\n\n`
      for (const p of prods.sort((a, b) => a.price - b.price)) {
        // Strip HTML from description, truncate
        const desc = p.description
          ?.replace(/<[^>]*>/g, '')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 300)

        output += `#### ${p.name}\n`
        output += `- **Price**: $${p.price}\n`
        if (p.sku) output += `- **SKU**: ${p.sku}\n`
        output += `- **Categories**: ${p.categories.map(c => categoryNames[c] || c).join(', ')}\n`
        if (desc) output += `- **Description**: ${desc}\n`
        output += `- **URL**: ${baseUrl}/products/${p.id}\n`
        output += `\n`
      }
    }

    output += `## Pricing & Ordering\n\n`
    output += `- All prices are wholesale/contractor pricing in USD\n`
    output += `- Volume discounts available for bulk orders\n`
    output += `- Request a quote at ${baseUrl}/contact for project pricing\n`
    output += `- Most products ship from California warehouse within 1-2 business days\n\n`

    output += `## Rebates & Incentives\n\n`
    output += `- Many Auvolar products are DLC-listed and qualify for utility rebates\n`
    output += `- Rebates range from $20-$150+ per fixture depending on state and utility\n`
    output += `- Use our Rebate Finder tool: ${baseUrl}/rebate-finder\n`
    output += `- Common rebate states: CA, NY, TX, FL, IL, WA, OR, MA, NJ, CT, CO, MD, PA, OH, MI, GA\n`

    return new NextResponse(output, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    return new NextResponse('# Auvolar Product Catalog\n\nTemporarily unavailable. Visit https://www.auvolar.com/products for our full catalog.', {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }
}
