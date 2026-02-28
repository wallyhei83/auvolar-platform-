import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// GET - Partner's own dashboard data
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const partner = await prisma.partner.findUnique({
    where: { userId: session.user.id },
    include: {
      attributions: {
        orderBy: { createdAt: 'desc' },
        take: 50,
        select: {
          id: true,
          bcOrderId: true,
          orderTotal: true,
          commissionRate: true,
          commission: true,
          status: true,
          customerName: true,
          createdAt: true,
          paidAt: true,
        },
      },
      payouts: {
        orderBy: { createdAt: 'desc' },
        take: 20,
      },
    },
  })

  if (!partner) {
    return NextResponse.json({ error: 'Not a partner' }, { status: 404 })
  }

  // Get referral visit stats
  const visitCount = await prisma.referralVisit.count({
    where: { referralCode: partner.referralCode },
  })
  const conversionCount = await prisma.referralVisit.count({
    where: { referralCode: partner.referralCode, convertedAt: { not: null } },
  })

  // Monthly stats (last 12 months)
  const twelveMonthsAgo = new Date()
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12)
  
  const monthlyAttribs = await prisma.partnerAttribution.findMany({
    where: { partnerId: partner.id, createdAt: { gte: twelveMonthsAgo } },
    select: { orderTotal: true, commission: true, createdAt: true },
  })

  const monthlyStats: Record<string, { sales: number; commission: number; orders: number }> = {}
  monthlyAttribs.forEach(a => {
    const key = `${a.createdAt.getFullYear()}-${String(a.createdAt.getMonth() + 1).padStart(2, '0')}`
    if (!monthlyStats[key]) monthlyStats[key] = { sales: 0, commission: 0, orders: 0 }
    monthlyStats[key].sales += Number(a.orderTotal)
    monthlyStats[key].commission += Number(a.commission)
    monthlyStats[key].orders += 1
  })

  // Tier thresholds for progress display
  const tierThresholds = [
    { tier: 'BASIC', minSales: 0, rate: 5 },
    { tier: 'ADVANCED', minSales: 10000, rate: 8 },
    { tier: 'PARTNER', minSales: 50000, rate: 12 },
    { tier: 'STRATEGIC', minSales: 200000, rate: 15 },
  ]

  const nextTier = tierThresholds.find(t => Number(partner.totalSales) < t.minSales)

  return NextResponse.json({
    partner: {
      id: partner.id,
      referralCode: partner.referralCode,
      referralLink: `https://www.auvolar.com/?ref=${partner.referralCode}`,
      tier: partner.tier,
      commissionRate: partner.commissionRate ? Number(partner.commissionRate) : null,
      totalSales: Number(partner.totalSales),
      totalCommission: Number(partner.totalCommission),
      pendingPayout: Number(partner.pendingPayout),
      equityEligible: partner.equityEligible,
      equityShares: partner.equityShares ? Number(partner.equityShares) : null,
      status: partner.status,
      createdAt: partner.createdAt,
    },
    stats: {
      totalVisits: visitCount,
      conversions: conversionCount,
      conversionRate: visitCount > 0 ? ((conversionCount / visitCount) * 100).toFixed(1) : '0',
    },
    tierProgress: {
      current: partner.tier,
      next: nextTier || null,
      thresholds: tierThresholds,
    },
    attributions: partner.attributions,
    payouts: partner.payouts,
    monthlyStats,
  })
}
