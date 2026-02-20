import { NextRequest, NextResponse } from 'next/server'
import { getProducts, getCategories, getProductBySku } from '@/lib/bigcommerce'

const BC_STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH!
const BC_ACCESS_TOKEN = process.env.BIGCOMMERCE_ACCESS_TOKEN!

// GET /api/bigcommerce/products - List products from BigCommerce
// Supports: ?id=123 for single product, ?sku=ABC for by SKU, or list with ?category=26,43
// v2: Fixed single product fetch
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '100') // Increased default limit
    const category = searchParams.get('category')
    const sku = searchParams.get('sku')
    const productId = searchParams.get('id')

    console.log('BC Products API - params:', { productId, sku, category, page, limit })
    
    // If ID is provided, get single product by ID
    if (productId) {
      console.log('Fetching single product by ID:', productId)
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
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
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
          images: (p.images || [])
            .sort((a: any, b: any) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
            .map((img: any) => ({
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
    }

    // If SKU is provided, get single product by SKU
    if (sku) {
      const product = await getProductBySku(sku)
      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
      }
      return NextResponse.json({ product })
    }

    // Get products with optional category filter
    const [productsResult, categoriesResult] = await Promise.all([
      getProducts({
        page,
        limit,
        'categories:in': category || undefined,
        include: 'variants,images,custom_fields',
        is_visible: true,
      }),
      getCategories({ limit: 100 }),
    ])

    // Transform products for frontend, sort by sort_order (BC API doesn't support sort=sort_order)
    const products = productsResult.data
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      .map(p => ({
      id: p.id,
      name: p.name,
      sku: p.sku,
      price: p.price,
      salePrice: p.sale_price,
      msrp: p.retail_price,
      description: p.description,
      inventory: p.inventory_level || 0,
      inStock: (p.inventory_level || 0) > 0,
      categories: p.categories,
      weight: p.weight,
      sortOrder: p.sort_order ?? 0,
      images: p.images
        ?.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        .map(img => ({
          url: img.url_standard,
          thumbnail: img.url_thumbnail,
          zoom: img.url_zoom,
          isPrimary: img.is_thumbnail,
        })) || [],
      variants: p.variants?.map(v => ({
        id: v.id,
        sku: v.sku,
        price: v.price,
        inventory: v.inventory_level,
        options: v.option_values?.map(o => ({
          name: o.option_display_name,
          value: o.label,
        })) || [],
      })) || [],
      customFields: p.custom_fields?.reduce((acc, cf) => {
        acc[cf.name] = cf.value
        return acc
      }, {} as Record<string, string>) || {},
    }))

    // Build category tree
    const categoryMap = new Map(categoriesResult.data.map(c => [c.id, c]))
    const categoryTree = categoriesResult.data
      .filter(c => c.parent_id === 0)
      .map(parent => ({
        id: parent.id,
        name: parent.name,
        slug: parent.custom_url?.url || `/category/${parent.id}`,
        children: categoriesResult.data
          .filter(c => c.parent_id === parent.id)
          .map(child => ({
            id: child.id,
            name: child.name,
            slug: child.custom_url?.url || `/category/${child.id}`,
          })),
      }))

    return NextResponse.json({
      products,
      categories: categoryTree,
      pagination: {
        page,
        limit,
        total: productsResult.meta?.pagination?.total || 0,
        totalPages: Math.ceil((productsResult.meta?.pagination?.total || 0) / limit),
      },
    })
  } catch (error) {
    console.error('BigCommerce products API error:', error)
    return NextResponse.json({
      error: 'Failed to fetch products',
      details: String(error),
    }, { status: 500 })
  }
}
