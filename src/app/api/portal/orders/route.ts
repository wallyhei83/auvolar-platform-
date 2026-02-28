import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

const BC_STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH!
const BC_ACCESS_TOKEN = process.env.BIGCOMMERCE_ACCESS_TOKEN!

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user?.bcCustomerId) {
      return NextResponse.json({ orders: [], message: 'No BigCommerce account linked' })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    // Fetch orders from BigCommerce V2 API
    let url = `https://api.bigcommerce.com/stores/${BC_STORE_HASH}/v2/orders?customer_id=${user.bcCustomerId}&limit=${limit}&page=${page}&sort=date_created:desc`
    if (status && status !== 'all') {
      const statusMap: Record<string, number> = {
        pending: 1, shipped: 2, partially_shipped: 3, refunded: 4,
        cancelled: 5, declined: 6, awaiting_payment: 7, awaiting_pickup: 8,
        awaiting_shipment: 9, completed: 10, awaiting_fulfillment: 11,
        manual_verification: 12, disputed: 13,
      }
      if (statusMap[status]) url += `&status_id=${statusMap[status]}`
    }

    const res = await fetch(url, {
      headers: {
        'X-Auth-Token': BC_ACCESS_TOKEN,
        'Accept': 'application/json',
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      // V2 returns 204 for no content
      if (res.status === 204) return NextResponse.json({ orders: [], total: 0 })
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
    }

    const orders = await res.json()

    const formatted = (Array.isArray(orders) ? orders : []).map((o: any) => ({
      id: o.id,
      orderNumber: `#${o.id}`,
      status: o.status,
      statusId: o.status_id,
      dateCreated: o.date_created,
      dateShipped: o.date_shipped,
      subtotal: parseFloat(o.subtotal_ex_tax || '0'),
      total: parseFloat(o.total_inc_tax || '0'),
      itemCount: o.items_total || 0,
      paymentMethod: o.payment_method,
      shippingMethod: o.shipping_cost_ex_tax ? `$${o.shipping_cost_ex_tax} shipping` : 'Free shipping',
      currency: o.currency_code || 'USD',
      billingAddress: o.billing_address ? {
        name: `${o.billing_address.first_name} ${o.billing_address.last_name}`,
        company: o.billing_address.company,
        city: o.billing_address.city,
        state: o.billing_address.state,
      } : null,
    }))

    return NextResponse.json({ orders: formatted, total: formatted.length })
  } catch (error) {
    console.error('Portal orders error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
