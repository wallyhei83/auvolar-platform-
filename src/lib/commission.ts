import { prisma } from '@/lib/db'
import { DistributorTier } from '@prisma/client'

// Default commission rates by tier (used when no CommissionRule exists)
const DEFAULT_TIER_RATES: Record<string, number> = {
  BASIC: 5,
  ADVANCED: 8,
  PARTNER: 12,
  STRATEGIC: 15,
}

// Tier thresholds (total sales in USD)
const TIER_THRESHOLDS: { tier: DistributorTier; minSales: number }[] = [
  { tier: 'STRATEGIC', minSales: 200000 },
  { tier: 'PARTNER', minSales: 50000 },
  { tier: 'ADVANCED', minSales: 10000 },
  { tier: 'BASIC', minSales: 0 },
]

/**
 * Get the effective commission rate for a partner + product combination.
 * Priority: partner-specific > product-specific > category-specific > tier default > global default
 */
export async function getCommissionRate(
  partnerId: string,
  tier: DistributorTier,
  bcProductId?: string,
  bcCategoryId?: string
): Promise<number> {
  // Check partner-specific override on Partner model first
  const partner = await prisma.partner.findUnique({
    where: { id: partnerId },
    select: { commissionRate: true },
  })
  if (partner?.commissionRate !== null && partner?.commissionRate !== undefined) {
    return Number(partner.commissionRate)
  }

  // Check CommissionRule table (most specific first)
  const rules = await prisma.commissionRule.findMany({
    where: {
      isActive: true,
      OR: [
        { partnerId },
        { bcProductId: bcProductId || undefined },
        { bcCategoryId: bcCategoryId || undefined },
        { tier, bcProductId: null, bcCategoryId: null, partnerId: null },
        { tier: null, bcProductId: null, bcCategoryId: null, partnerId: null },
      ],
    },
    orderBy: { createdAt: 'desc' },
  })

  // Priority resolution
  const partnerRule = rules.find(r => r.partnerId === partnerId)
  if (partnerRule) return Number(partnerRule.rate)

  const productRule = rules.find(r => r.bcProductId === bcProductId && !r.partnerId)
  if (productRule) return Number(productRule.rate)

  const categoryRule = rules.find(r => r.bcCategoryId === bcCategoryId && !r.partnerId && !r.bcProductId)
  if (categoryRule) return Number(categoryRule.rate)

  const tierRule = rules.find(r => r.tier === tier && !r.partnerId && !r.bcProductId && !r.bcCategoryId)
  if (tierRule) return Number(tierRule.rate)

  // Fallback to hardcoded defaults
  return DEFAULT_TIER_RATES[tier] || 5
}

/**
 * Recalculate and update partner tier based on total sales
 */
export async function recalculateTier(partnerId: string): Promise<DistributorTier> {
  const partner = await prisma.partner.findUnique({
    where: { id: partnerId },
    select: { totalSales: true, tier: true },
  })
  if (!partner) throw new Error('Partner not found')

  const sales = Number(partner.totalSales)
  const newTier = TIER_THRESHOLDS.find(t => sales >= t.minSales)?.tier || 'BASIC'

  if (newTier !== partner.tier) {
    await prisma.partner.update({
      where: { id: partnerId },
      data: {
        tier: newTier,
        equityEligible: newTier === 'STRATEGIC',
      },
    })
  }

  return newTier
}

/**
 * Process an order: create attribution, update partner totals, recalculate tier
 */
export async function processOrderAttribution(params: {
  partnerId: string
  bcOrderId: string
  orderTotal: number
  customerEmail?: string
  customerName?: string
  bcProductId?: string
  bcCategoryId?: string
}): Promise<{ commission: number; rate: number; tier: DistributorTier }> {
  const { partnerId, bcOrderId, orderTotal, customerEmail, customerName, bcProductId, bcCategoryId } = params

  // Prevent duplicate attribution
  const existing = await prisma.partnerAttribution.findUnique({
    where: { bcOrderId },
  })
  if (existing) {
    throw new Error(`Order ${bcOrderId} already attributed`)
  }

  // Get partner info
  const partner = await prisma.partner.findUnique({
    where: { id: partnerId },
    select: { tier: true, userId: true },
  })
  if (!partner) throw new Error('Partner not found')

  // Anti-fraud: check if customer email matches partner's own email
  if (customerEmail) {
    const partnerUser = await prisma.user.findUnique({
      where: { id: partner.userId },
      select: { email: true },
    })
    if (partnerUser?.email === customerEmail) {
      // Self-purchase: create rejected attribution
      await prisma.partnerAttribution.create({
        data: {
          partnerId,
          bcOrderId,
          orderTotal,
          commissionRate: 0,
          commission: 0,
          status: 'REJECTED',
          customerEmail,
          customerName,
        },
      })
      return { commission: 0, rate: 0, tier: partner.tier }
    }
  }

  // Calculate commission
  const rate = await getCommissionRate(partnerId, partner.tier, bcProductId, bcCategoryId)
  const commission = Math.round(orderTotal * rate) / 100 // rate is percentage

  // Create attribution + update partner totals in transaction
  await prisma.$transaction([
    prisma.partnerAttribution.create({
      data: {
        partnerId,
        bcOrderId,
        orderTotal,
        commissionRate: rate,
        commission,
        status: 'PENDING',
        customerEmail,
        customerName,
      },
    }),
    prisma.partner.update({
      where: { id: partnerId },
      data: {
        totalSales: { increment: orderTotal },
        totalCommission: { increment: commission },
        pendingPayout: { increment: commission },
      },
    }),
  ])

  // Recalculate tier
  const newTier = await recalculateTier(partnerId)

  return { commission, rate, tier: newTier }
}
