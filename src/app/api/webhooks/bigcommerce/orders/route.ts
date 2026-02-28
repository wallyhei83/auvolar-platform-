import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { processOrderAttribution } from '@/lib/commission'
import crypto from 'crypto'

// Verify BigCommerce webhook signature
function verifyWebhook(payload: string, signature: string | null): boolean {
  const secret = process.env.BC_WEBHOOK_SECRET
  if (!secret) return true // Skip verification if no secret configured
  if (!signature) return false
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('base64')
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
}

// POST - BigCommerce order webhook
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get('x-bc-webhook-hmac')

    if (!verifyWebhook(rawBody, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const body = JSON.parse(rawBody)
    const { scope, data } = body

    // We handle orders/created and orders/statusUpdated
    if (!scope?.startsWith('store/order')) {
      return NextResponse.json({ ok: true })
    }

    const orderId = String(data?.id)
    if (!orderId) {
      return NextResponse.json({ error: 'No order ID' }, { status: 400 })
    }

    // Fetch full order from BC API
    const bcOrder = await fetchBCOrder(orderId)
    if (!bcOrder) {
      console.error(`Failed to fetch BC order ${orderId}`)
      return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 })
    }

    // Handle order cancellation/refund
    if (['Cancelled', 'Refunded', 'Declined'].includes(bcOrder.status)) {
      await prisma.partnerAttribution.updateMany({
        where: { bcOrderId: orderId, status: { not: 'PAID' } },
        data: { status: 'CANCELLED' },
      })
      return NextResponse.json({ ok: true, action: 'cancelled' })
    }

    // Only process new orders (avoid re-processing)
    if (scope !== 'store/order/created') {
      return NextResponse.json({ ok: true })
    }

    // Check for referral: look at customer email → recent referral visits
    const customerEmail = bcOrder.billing_address?.email
    const orderTotal = parseFloat(bcOrder.total_inc_tax || bcOrder.total_ex_tax || '0')

    if (!customerEmail || orderTotal <= 0) {
      return NextResponse.json({ ok: true, action: 'skipped' })
    }

    // Find referral: check if this customer had a referral cookie
    // Strategy: look for recent ReferralVisit that matches, or User with ref code
    const referralVisit = await prisma.referralVisit.findFirst({
      where: {
        convertedAt: null,
        createdAt: { gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) }, // 90 day window
      },
      orderBy: { createdAt: 'desc' },
    })

    // Also check if the user account has a referral code stored
    const user = await prisma.user.findUnique({
      where: { email: customerEmail },
      select: { id: true },
    })

    let referralCode: string | null = null

    // Priority: check order custom fields for ref code
    if (bcOrder.custom_fields) {
      const refField = bcOrder.custom_fields.find(
        (f: { name: string; value: string }) => f.name === 'referral_code' || f.name === 'ref'
      )
      if (refField) referralCode = refField.value
    }

    // Fallback: use most recent referral visit (this is approximate without cookie forwarding)
    if (!referralCode && referralVisit) {
      referralCode = referralVisit.referralCode
    }

    if (!referralCode) {
      return NextResponse.json({ ok: true, action: 'no_referral' })
    }

    // Find partner by referral code
    const partner = await prisma.partner.findUnique({
      where: { referralCode },
      select: { id: true, status: true },
    })

    if (!partner || partner.status !== 'APPROVED') {
      return NextResponse.json({ ok: true, action: 'invalid_partner' })
    }

    // Process attribution
    const result = await processOrderAttribution({
      partnerId: partner.id,
      bcOrderId: orderId,
      orderTotal,
      customerEmail,
      customerName: `${bcOrder.billing_address?.first_name || ''} ${bcOrder.billing_address?.last_name || ''}`.trim(),
    })

    // Mark referral visit as converted
    if (referralVisit) {
      await prisma.referralVisit.update({
        where: { id: referralVisit.id },
        data: { convertedAt: new Date(), bcOrderId: orderId },
      })
    }

    return NextResponse.json({
      ok: true,
      action: 'attributed',
      commission: result.commission,
      rate: result.rate,
      tier: result.tier,
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

async function fetchBCOrder(orderId: string) {
  const storeHash = process.env.BC_STORE_HASH || process.env.BIGCOMMERCE_STORE_HASH
  const token = process.env.BC_ACCESS_TOKEN || process.env.BIGCOMMERCE_ACCESS_TOKEN
  if (!storeHash || !token) return null

  const res = await fetch(
    `https://api.bigcommerce.com/stores/${storeHash}/v2/orders/${orderId}`,
    { headers: { 'X-Auth-Token': token, 'Accept': 'application/json' } }
  )
  if (!res.ok) return null
  return res.json()
}
