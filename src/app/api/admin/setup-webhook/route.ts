import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// POST - One-time setup: register BC order webhook
// Protected: SUPER_ADMIN only
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const storeHash = process.env.BC_STORE_HASH || process.env.BIGCOMMERCE_STORE_HASH
  const token = process.env.BC_ACCESS_TOKEN || process.env.BIGCOMMERCE_ACCESS_TOKEN

  if (!storeHash || !token) {
    return NextResponse.json({ error: 'BC credentials not configured' }, { status: 500 })
  }

  const webhookUrl = 'https://www.auvolar.com/api/webhooks/bigcommerce/orders'

  // Check existing webhooks first
  const listRes = await fetch(
    `https://api.bigcommerce.com/stores/${storeHash}/v3/hooks`,
    { headers: { 'X-Auth-Token': token, 'Accept': 'application/json' } }
  )
  
  if (listRes.ok) {
    const existing = await listRes.json()
    const alreadyExists = existing.data?.find(
      (h: any) => h.destination === webhookUrl && h.scope === 'store/order/created'
    )
    if (alreadyExists) {
      return NextResponse.json({ 
        message: 'Webhook already exists',
        webhook: alreadyExists 
      })
    }
  }

  // Create order/created webhook
  const createRes = await fetch(
    `https://api.bigcommerce.com/stores/${storeHash}/v3/hooks`,
    {
      method: 'POST',
      headers: {
        'X-Auth-Token': token,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        scope: 'store/order/created',
        destination: webhookUrl,
        is_active: true,
        headers: {},
      }),
    }
  )

  if (!createRes.ok) {
    const err = await createRes.text()
    return NextResponse.json({ error: 'Failed to create webhook', details: err }, { status: 500 })
  }

  const created = await createRes.json()

  // Also create order status update webhook
  const statusRes = await fetch(
    `https://api.bigcommerce.com/stores/${storeHash}/v3/hooks`,
    {
      method: 'POST',
      headers: {
        'X-Auth-Token': token,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        scope: 'store/order/statusUpdated',
        destination: webhookUrl,
        is_active: true,
        headers: {},
      }),
    }
  )

  const statusCreated = statusRes.ok ? await statusRes.json() : null

  return NextResponse.json({
    message: 'Webhooks created successfully',
    orderCreated: created.data,
    orderStatusUpdated: statusCreated?.data || null,
  })
}

// GET - List existing webhooks
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const storeHash = process.env.BC_STORE_HASH || process.env.BIGCOMMERCE_STORE_HASH
  const token = process.env.BC_ACCESS_TOKEN || process.env.BIGCOMMERCE_ACCESS_TOKEN

  if (!storeHash || !token) {
    return NextResponse.json({ error: 'BC credentials not configured' }, { status: 500 })
  }

  const res = await fetch(
    `https://api.bigcommerce.com/stores/${storeHash}/v3/hooks`,
    { headers: { 'X-Auth-Token': token, 'Accept': 'application/json' } }
  )

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch webhooks' }, { status: 500 })
  }

  const data = await res.json()
  return NextResponse.json(data)
}
