import { NextRequest, NextResponse } from 'next/server'
import { getProducts, getCategories } from '@/lib/bigcommerce'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')

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

    return NextResponse.json({
      products: productsResult.data || [],
      categories: categoriesResult.data || [],
      pagination: productsResult.meta?.pagination || { total: 0 },
    })
  } catch (error) {
    console.error('Products API error:', error)
    // Return empty data if BigCommerce is not configured
    return NextResponse.json({
      products: [],
      categories: [],
      pagination: { total: 0 },
      error: 'BigCommerce not configured or unavailable',
    })
  }
}
