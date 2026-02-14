import { NextRequest, NextResponse } from 'next/server'
import { getProducts, getCategories } from '@/lib/bigcommerce'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    const keyword = searchParams.get('keyword')

    const [productsResult, categories] = await Promise.all([
      getProducts({
        page,
        limit,
        category: category ? parseInt(category) : undefined,
        keyword: keyword || undefined,
      }),
      getCategories(),
    ])

    return NextResponse.json({
      products: productsResult.data || [],
      categories: categories || [],
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
