import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

const BC_STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH!
const BC_ACCESS_TOKEN = process.env.BIGCOMMERCE_ACCESS_TOKEN!

// GET /api/admin/bc-stats - BigCommerce store statistics for admin dashboard
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user || !['ADMIN', 'STAFF', 'SUPER_ADMIN'].includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Fetch recent orders count from BC
    const [ordersRes, productsRes] = await Promise.all([
      fetch(`https://api.bigcommerce.com/stores/${BC_STORE_HASH}/v2/orders/count`, {
        headers: { 'X-Auth-Token': BC_ACCESS_TOKEN, 'Accept': 'application/json' },
        cache: 'no-store',
      }),
      fetch(`https://api.bigcommerce.com/stores/${BC_STORE_HASH}/v3/catalog/summary`, {
        headers: { 'X-Auth-Token': BC_ACCESS_TOKEN, 'Accept': 'application/json' },
        cache: 'no-store',
      }),
    ])

    const ordersCount = ordersRes.ok ? (await ordersRes.json()) : { count: 0 }
    const productsSummary = productsRes.ok ? (await productsRes.json()).data : {}

    // Recent 5 orders
    const recentOrdersRes = await fetch(
      `https://api.bigcommerce.com/stores/${BC_STORE_HASH}/v2/orders?limit=5&sort=date_created:desc`,
      { headers: { 'X-Auth-Token': BC_ACCESS_TOKEN, 'Accept': 'application/json' }, cache: 'no-store' }
    )
    const recentOrders = recentOrdersRes.ok ? await recentOrdersRes.json() : []

    return NextResponse.json({
      orders: {
        total: ordersCount.count || 0,
        recent: (Array.isArray(recentOrders) ? recentOrders : []).map((o: any) => ({
          id: o.id,
          status: o.status,
          total: parseFloat(o.total_inc_tax || '0'),
          customer: `${o.billing_address?.first_name || ''} ${o.billing_address?.last_name || ''}`.trim(),
          company: o.billing_address?.company || '',
          date: o.date_created,
        })),
      },
      products: {
        total: productsSummary.inventory_count || 0,
        variants: productsSummary.variant_count || 0,
        categories: productsSummary.primary_category_count || 0,
      },
    }, {
      headers: { 'Cache-Control': 'private, max-age=300' },
    })
  } catch (error) {
    console.error('BC stats error:', error)
    return NextResponse.json({ error: 'Failed to fetch BC stats' }, { status: 500 })
  }
}
