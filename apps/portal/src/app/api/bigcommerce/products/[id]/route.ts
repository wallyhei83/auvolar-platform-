import { NextRequest, NextResponse } from 'next/server'

const BC_STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH || 'hhcdvxqxzq'
const BC_ACCESS_TOKEN = process.env.BIGCOMMERCE_ACCESS_TOKEN || 'taw41x7qx3rqu1hjmt04s20b665pse6'

// GET /api/bigcommerce/products/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  try {
    const url = `https://api.bigcommerce.com/stores/${BC_STORE_HASH}/v3/catalog/products/${id}?include=images,variants`
    
    const response = await fetch(url, {
      headers: {
        'X-Auth-Token': BC_ACCESS_TOKEN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      cache: 'no-store',
    })
    
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
      }
      return NextResponse.json({ 
        error: 'Failed to fetch product',
        status: response.status,
      }, { status: response.status })
    }
    
    const data = await response.json()
    const product = data.data
    
    return NextResponse.json({
      product: {
        id: product.id,
        name: product.name,
        sku: product.sku,
        price: product.price,
        salePrice: product.sale_price || 0,
        msrp: product.retail_price || product.price * 1.4,
        description: product.description || '',
        inventory: product.inventory_level || 0,
        inStock: product.availability === 'available' || product.inventory_level > 0,
        weight: product.weight,
        categories: product.categories || [],
        images: (product.images || []).map((img: any) => ({
          url: img.url_standard || img.url_thumbnail,
          thumbnail: img.url_thumbnail,
          zoom: img.url_zoom || img.url_standard,
          isPrimary: img.is_thumbnail,
        })),
        variants: (product.variants || []).map((v: any) => ({
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
    console.error('Error fetching product:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch product',
      details: String(error),
    }, { status: 500 })
  }
}
