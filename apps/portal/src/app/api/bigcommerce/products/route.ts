import { NextRequest, NextResponse } from 'next/server'
import { getProducts, getCategories, getProductBySku } from '@/lib/bigcommerce'

// GET /api/bigcommerce/products - List products from BigCommerce
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const category = searchParams.get('category')
    const sku = searchParams.get('sku')

    // If SKU is provided, get single product
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

    // Transform products for frontend
    const products = productsResult.data.map(p => ({
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
      images: p.images?.map(img => ({
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
