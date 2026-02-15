import { NextResponse } from 'next/server'
import { testConnection, getStoreInfo, getProducts, getCategories, getCustomerGroups } from '@/lib/bigcommerce'

export async function GET() {
  try {
    // Test basic connection
    const connectionTest = await testConnection()
    
    if (!connectionTest.success) {
      return NextResponse.json({
        success: false,
        error: connectionTest.error,
      }, { status: 500 })
    }

    // Get store info
    const storeInfo = await getStoreInfo()
    
    // Get product count
    const products = await getProducts({ limit: 1 })
    
    // Get categories
    const categories = await getCategories({ limit: 50 })
    
    // Get customer groups (for B2B pricing tiers)
    let customerGroups: any[] = []
    try {
      customerGroups = await getCustomerGroups()
    } catch (e) {
      // Customer groups might not be available on all plans
    }

    return NextResponse.json({
      success: true,
      store: {
        name: storeInfo.name,
        domain: storeInfo.domain,
        secure_url: storeInfo.secure_url,
        status: storeInfo.status,
        currency: storeInfo.currency,
        plan_name: storeInfo.plan_name,
      },
      stats: {
        total_products: products.meta?.pagination?.total || 0,
        total_categories: categories.meta?.pagination?.total || 0,
        customer_groups: customerGroups.length,
      },
      categories: categories.data.map(c => ({
        id: c.id,
        name: c.name,
        parent_id: c.parent_id,
      })),
      customer_groups: customerGroups.map(g => ({
        id: g.id,
        name: g.name,
      })),
    })
  } catch (error) {
    console.error('BigCommerce test error:', error)
    return NextResponse.json({
      success: false,
      error: String(error),
    }, { status: 500 })
  }
}
