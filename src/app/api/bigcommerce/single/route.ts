import { NextRequest, NextResponse } from 'next/server'

const BC_STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH!
const BC_ACCESS_TOKEN = process.env.BIGCOMMERCE_ACCESS_TOKEN!

// GET /api/bigcommerce/single?id=123 - Get single product
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get('id')
  
  if (!productId) {
    return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 })
  }
  
  try {
    const url = `https://api.bigcommerce.com/stores/${BC_STORE_HASH}/v3/catalog/products/${productId}?include=images,variants`
    const response = await fetch(url, {
      headers: {
        'X-Auth-Token': BC_ACCESS_TOKEN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      cache: 'no-store',
    })
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Product not found', status: response.status }, { status: 404 })
    }
    
    const data = await response.json()
    const p = data.data
    
    return NextResponse.json({
      product: {
        id: p.id,
        name: p.name,
        sku: p.sku,
        price: p.price,
        salePrice: p.sale_price || 0,
        msrp: p.retail_price || p.price * 1.4,
        description: p.description || '',
        inventory: p.inventory_level || 0,
        inStock: p.availability === 'available' || (p.inventory_level || 0) > 0,
        weight: p.weight,
        categories: p.categories || [],
        images: (p.images || []).map((img: any) => ({
          url: img.url_standard || img.url_thumbnail,
          thumbnail: img.url_thumbnail,
          zoom: img.url_zoom || img.url_standard,
          isPrimary: img.is_thumbnail,
        })),
        variants: (p.variants || []).map((v: any) => ({
          id: v.id,
          sku: v.sku,
          price: v.price,
          inventory: v.inventory_level,
          options: v.option_values?.map((opt: any) => ({
            name: opt.option_display_name,
            value: opt.label,
          })) || [],
        })),
      },
    })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
