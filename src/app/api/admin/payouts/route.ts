import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

function isAdmin(session: any) {
  return session?.user?.role === 'ADMIN' || session?.user?.role === 'SUPER_ADMIN'
}

// GET - List all payouts
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const payouts = await prisma.partnerPayout.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      partner: { select: { companyName: true, referralCode: true, user: { select: { name: true, email: true } } } },
      attributions: { select: { id: true, bcOrderId: true, commission: true } },
    },
  })
  return NextResponse.json(payouts)
}

// POST - Create a payout (batch approved commissions for a partner)
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const { partnerId, method, notes } = await request.json()
  if (!partnerId) return NextResponse.json({ error: 'Missing partnerId' }, { status: 400 })

  // Find all approved unpaid commissions for this partner
  const pendingAttribs = await prisma.partnerAttribution.findMany({
    where: { partnerId, status: 'APPROVED', payoutId: null },
  })

  if (pendingAttribs.length === 0) {
    return NextResponse.json({ error: 'No approved commissions to pay out' }, { status: 400 })
  }

  const totalAmount = pendingAttribs.reduce((sum, a) => sum + Number(a.commission), 0)

  // Create payout + link attributions in transaction
  const payout = await prisma.$transaction(async (tx) => {
    const p = await tx.partnerPayout.create({
      data: {
        partnerId,
        amount: totalAmount,
        method: method || null,
        notes: notes || null,
        status: 'PENDING',
      },
    })

    await tx.partnerAttribution.updateMany({
      where: { id: { in: pendingAttribs.map(a => a.id) } },
      data: { payoutId: p.id },
    })

    return p
  })

  return NextResponse.json(payout, { status: 201 })
}

// PATCH - Update payout status (mark as completed/failed)
export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const { id, status, reference } = await request.json()
  if (!id) return NextResponse.json({ error: 'Missing payout ID' }, { status: 400 })

  const data: any = { status }
  if (reference) data.reference = reference
  if (status === 'COMPLETED') {
    data.processedAt = new Date()
    data.processedById = session!.user.id

    // Mark all linked attributions as PAID
    const payout = await prisma.partnerPayout.findUnique({
      where: { id },
      select: { partnerId: true, amount: true },
    })
    if (payout) {
      await prisma.partnerAttribution.updateMany({
        where: { payoutId: id },
        data: { status: 'PAID', paidAt: new Date() },
      })
      // Decrease pending payout
      await prisma.partner.update({
        where: { id: payout.partnerId },
        data: { pendingPayout: { decrement: Number(payout.amount) } },
      })
    }
  }

  const updated = await prisma.partnerPayout.update({ where: { id }, data })
  return NextResponse.json(updated)
}
