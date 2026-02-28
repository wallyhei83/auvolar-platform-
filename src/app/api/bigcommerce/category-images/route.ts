import { NextResponse } from 'next/server'
import { getProducts } from '@/lib/bigcommerce'

// GET /api/bigcommerce/category-images
// Returns the primary image for each BC category (first product's primary image)
// Used by homepage and category pages to always show real, up-to-date product images
export async function GET() {
  try {
    // Fetch all visible products with images
    const result = await getProducts({
      limit: 250,
      include: 'images',
      is_visible: true,
    })

    // Build category → image map (use first product's primary image per category)
    const categoryImages: Record<number, { url: string; productName: string; productId: number }> = {}

    for (const p of result.data || []) {
      for (const catId of p.categories || []) {
        if (!categoryImages[catId]) {
          const primaryImg = p.images?.find((img: any) => img.is_thumbnail) || p.images?.[0]
          if (primaryImg) {
            categoryImages[catId] = {
              url: primaryImg.url_standard || primaryImg.url_thumbnail || '',
              productName: p.name,
              productId: p.id,
            }
          }
        }
      }
    }

    return NextResponse.json({
      categoryImages,
      totalProducts: result.data?.length || 0,
      timestamp: new Date().toISOString(),
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    })
  } catch (error) {
    console.error('Category images API error:', error)
    return NextResponse.json({ error: 'Failed to fetch category images' }, { status: 500 })
  }
}
