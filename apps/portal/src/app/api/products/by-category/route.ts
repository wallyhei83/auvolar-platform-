import { NextRequest, NextResponse } from 'next/server'
import { getBcCategoryIds, websiteCategories } from '@/lib/bc-categories'

const BC_STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH!
const BC_ACCESS_TOKEN = process.env.BIGCOMMERCE_ACCESS_TOKEN!

// GET /api/products/by-category?category=area-light
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const categorySlug = searchParams.get('category')
  const limit = parseInt(searchParams.get('limit') || '50')
  
  if (!categorySlug) {
    return NextResponse.json({ error: 'category parameter required' }, { status: 400 })
  }
  
  // Get BC category IDs for this website category
  const bcCategoryIds = getBcCategoryIds(categorySlug)
  
  if (bcCategoryIds.length === 0) {
    return NextResponse.json({ 
      products: [],
      category: categorySlug,
      message: 'No BigCommerce categories mapped to this category'
    })
  }
  
  try {
    // Fetch products from each BC category
    const allProducts: any[] = []
    const seenSkus = new Set<string>()
    
    for (const catId of bcCategoryIds) {
      const url = `https://api.bigcommerce.com/stores/${BC_STORE_HASH}/v3/catalog/products?categories:in=${catId}&include=images,variants&limit=${limit}`
      
      const response = await fetch(url, {
        headers: {
          'X-Auth-Token': BC_ACCESS_TOKEN,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        cache: 'no-store',
      })
      
      if (!response.ok) {
        console.error(`BC API error for category ${catId}:`, response.status)
        continue
      }
      
      const data = await response.json()
      
      // Add products, avoiding duplicates
      for (const product of data.data || []) {
        if (!seenSkus.has(product.sku)) {
          seenSkus.add(product.sku)
          allProducts.push(formatProduct(product))
        }
      }
    }
    
    // Get category info
    const categoryInfo = websiteCategories.find(c => c.slug === categorySlug)
    
    return NextResponse.json({
      category: categorySlug,
      categoryName: categoryInfo?.name || categorySlug,
      categoryDescription: categoryInfo?.description || '',
      total: allProducts.length,
      products: allProducts,
    })
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch products',
      details: String(error),
    }, { status: 500 })
  }
}

function formatProduct(product: any) {
  return {
    id: product.id,
    name: product.name,
    sku: product.sku,
    slug: product.custom_url?.url?.replace(/^\/|\/$/g, '') || product.sku.toLowerCase(),
    price: product.price,
    salePrice: product.sale_price || 0,
    msrp: product.retail_price || product.price * 1.4,
    description: stripHtml(product.description || ''),
    shortDescription: stripHtml(product.description || '').slice(0, 150) + '...',
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
    primaryImage: product.images?.find((img: any) => img.is_thumbnail)?.url_standard 
      || product.images?.[0]?.url_standard 
      || null,
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
  }
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&bull;/g, '•')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
}
