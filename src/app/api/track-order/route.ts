import { NextRequest, NextResponse } from 'next/server'

const BC_STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH!
const BC_ACCESS_TOKEN = process.env.BIGCOMMERCE_ACCESS_TOKEN!

// GET /api/track-order?orderId=123&email=x@y.com
// Public endpoint - validates by order ID + email match
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('orderId')
    const email = searchParams.get('email')?.toLowerCase()

    if (!orderId || !email) {
      return NextResponse.json({ error: 'Order ID and email are required' }, { status: 400 })
    }

    // Fetch order from BC V2
    const res = await fetch(
      `https://api.bigcommerce.com/stores/${BC_STORE_HASH}/v2/orders/${orderId}`,
      { headers: { 'X-Auth-Token': BC_ACCESS_TOKEN, 'Accept': 'application/json' }, cache: 'no-store' }
    )

    if (!res.ok) return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    const order = await res.json()

    // Verify email matches billing address
    if (order.billing_address?.email?.toLowerCase() !== email) {
      return NextResponse.json({ error: 'Email does not match this order' }, { status: 403 })
    }

    // Fetch order products
    const productsRes = await fetch(
      `https://api.bigcommerce.com/stores/${BC_STORE_HASH}/v2/orders/${orderId}/products`,
      { headers: { 'X-Auth-Token': BC_ACCESS_TOKEN, 'Accept': 'application/json' }, cache: 'no-store' }
    )
    const products = productsRes.ok ? await productsRes.json() : []

    // Fetch shipments for tracking
    const shipmentsRes = await fetch(
      `https://api.bigcommerce.com/stores/${BC_STORE_HASH}/v2/orders/${orderId}/shipments`,
      { headers: { 'X-Auth-Token': BC_ACCESS_TOKEN, 'Accept': 'application/json' }, cache: 'no-store' }
    )
    const shipments = shipmentsRes.ok ? await shipmentsRes.json() : []

    return NextResponse.json({
      order: {
        id: order.id,
        status: order.status,
        statusId: order.status_id,
        dateCreated: order.date_created,
        dateShipped: order.date_shipped,
        total: parseFloat(order.total_inc_tax || '0'),
        subtotal: parseFloat(order.subtotal_ex_tax || '0'),
        shippingCost: parseFloat(order.shipping_cost_ex_tax || '0'),
        paymentMethod: order.payment_method,
        billingAddress: order.billing_address ? {
          name: `${order.billing_address.first_name} ${order.billing_address.last_name}`,
          company: order.billing_address.company,
          street: `${order.billing_address.street_1}${order.billing_address.street_2 ? ', ' + order.billing_address.street_2 : ''}`,
          city: order.billing_address.city,
          state: order.billing_address.state,
          zip: order.billing_address.zip,
          country: order.billing_address.country,
        } : null,
        items: (products || []).map((p: any) => ({
          name: p.name,
          sku: p.sku,
          quantity: p.quantity,
          price: parseFloat(p.base_price || '0'),
          total: parseFloat(p.base_total || '0'),
        })),
        shipments: (shipments || []).map((s: any) => ({
          id: s.id,
          trackingNumber: s.tracking_number,
          trackingLink: s.tracking_link,
          carrier: s.shipping_method,
          dateCreated: s.date_created,
          items: s.items?.map((i: any) => ({ name: i.name, quantity: i.quantity })) || [],
        })),
      },
    })
  } catch (error) {
    console.error('Track order error:', error)
    return NextResponse.json({ error: 'Failed to track order' }, { status: 500 })
  }
}
