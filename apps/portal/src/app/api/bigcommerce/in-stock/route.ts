import { NextRequest, NextResponse } from 'next/server'

const BC_STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH || 'hhcdvxqxzq'
const BC_ACCESS_TOKEN = process.env.BIGCOMMERCE_ACCESS_TOKEN || 'taw41x7qx3rqu1hjmt04s20b665pse6'

// GET /api/bigcommerce/in-stock - Get products with inventory > 0
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '12')
  
  try {
    // Fetch products with images, sorted by inventory
    const url = `https://api.bigcommerce.com/stores/${BC_STORE_HASH}/v3/catalog/products?include=images&is_visible=true&inventory_level:min=1&limit=50&sort=inventory_level&direction=desc`
    
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
    
    // Filter products with actual inventory and format response
    const inStockProducts = data.data
      .filter((p: any) => p.inventory_level > 0)
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
          url: `/bc-products/${p.id}`,
          categories: p.categories || [],
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
