import { NextRequest, NextResponse } from 'next/server'

const BC_STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH || 'hhcdvxqxzq'
const BC_ACCESS_TOKEN = process.env.BIGCOMMERCE_ACCESS_TOKEN || 'taw41x7qx3rqu1hjmt04s20b665pse6'

// Map BC category ID to website product URL
const bcCategoryToUrl: Record<number, string> = {
  // Outdoor
  26: '/products/outdoor/area-light',      // Area Light
  27: '/products/outdoor/wall-pack',       // Wall Pack
  28: '/products/outdoor/flood',           // Flood Light
  43: '/products/outdoor/area-light',      // Parking (maps to Area Light)
  45: '/products/outdoor/bollard',         // Bollard
  46: '/products/outdoor/post-top',        // Post Top
  55: '/products/outdoor/barn',            // Barn Light
  57: '/products/outdoor/barn',            // Security Light (maps to Barn)
  
  // Indoor
  30: '/products/indoor/high-bay',         // UFO High Bay
  31: '/products/indoor/high-bay',         // Linear High Bay
  32: '/products/indoor/strip',            // Strip Light
  33: '/products/indoor/troffer',          // Panel Light
  35: '/products/indoor/vapor-tight',      // Tri-proof / Vapor Tight
  36: '/products/indoor/led-tube',         // LED Tube
  48: '/products/indoor/exit',             // Exit Light
  51: '/products/indoor/downlight',        // Down Light
  52: '/products/indoor/downlight',        // Ceiling Light
  53: '/products/indoor/canopy',           // Garage & Canopy
  58: '/products/indoor/high-bay',         // Low Bay
  
  // Solar
  29: '/products/solar',                   // Solar Lighting
  47: '/products/solar/solar-wall',        // Solar Wall Pack
  59: '/products/solar/solar-area',        // Solar Area Light
  
  // Specialty
  56: '/products/specialty/grow',          // Grow Light
}

function getProductUrl(categories: number[], productId: number): string {
  // Find the first matching category URL
  for (const catId of categories) {
    if (bcCategoryToUrl[catId]) {
      return bcCategoryToUrl[catId]
    }
  }
  // Fallback to bc-products if no category match
  return `/bc-products/${productId}`
}

// GET /api/bigcommerce/in-stock - Get products with inventory > 0
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '12')
  
  try {
    // Fetch products with images (BC API doesn't support inventory_level filter, so we filter manually)
    const url = `https://api.bigcommerce.com/stores/${BC_STORE_HASH}/v3/catalog/products?include=images&is_visible=true&limit=100`
    
    const response = await fetch(url, {
      headers: {
        'X-Auth-Token': BC_ACCESS_TOKEN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      cache: 'no-store',
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json({ error: 'Failed to fetch products', details: errorText }, { status: response.status })
    }
    
    const data = await response.json()
    
    // Filter products with actual inventory, sort by inventory descending
    const inStockProducts = data.data
      .filter((p: any) => p.inventory_level > 0)
      .sort((a: any, b: any) => b.inventory_level - a.inventory_level)
      .slice(0, limit)
      .map((p: any) => {
        const primaryImage = p.images?.find((img: any) => img.is_thumbnail) || p.images?.[0]
        
        // Determine shipping status based on inventory
        let shippingStatus = 'In Stock'
        let shippingDays = 0
        if (p.inventory_level >= 50) {
          shippingStatus = 'In Stock'
        } else if (p.inventory_level >= 10) {
          shippingStatus = 'Ships in 2-3 days'
          shippingDays = 3
        } else {
          shippingStatus = 'Ships in 3-5 days'
          shippingDays = 5
        }
        
        const categories = p.categories || []
        
        return {
          id: p.id,
          name: p.name,
          sku: p.sku,
          price: p.price,
          salePrice: p.sale_price || 0,
          inventory: p.inventory_level,
          image: primaryImage?.url_standard || primaryImage?.url_thumbnail || null,
          thumbnail: primaryImage?.url_thumbnail || null,
          shippingStatus,
          shippingDays,
          url: getProductUrl(categories, p.id),
          categories,
        }
      })
    
    return NextResponse.json({
      products: inStockProducts,
      total: inStockProducts.length,
    })
  } catch (error) {
    console.error('Error fetching in-stock products:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
