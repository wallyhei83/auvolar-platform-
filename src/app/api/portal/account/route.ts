import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// Tier thresholds and benefits
const TIERS = {
  BRONZE:   { min: 0,      max: 5000,   discount: 0,   rewardRate: 0.01, label: 'Bronze',   color: '#CD7F32', nextTier: 'SILVER' },
  SILVER:   { min: 5000,   max: 25000,  discount: 5,   rewardRate: 0.015, label: 'Silver',   color: '#C0C0C0', nextTier: 'GOLD' },
  GOLD:     { min: 25000,  max: 100000, discount: 10,  rewardRate: 0.02, label: 'Gold',     color: '#FFD700', nextTier: 'PLATINUM' },
  PLATINUM: { min: 100000, max: Infinity, discount: 15, rewardRate: 0.025, label: 'Platinum', color: '#E5E4E2', nextTier: null },
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        rewards: {
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const tier = TIERS[user.customerTier as keyof typeof TIERS] || TIERS.BRONZE
    const totalSpent = Number(user.totalSpent)
    const rewardBalance = Number(user.rewardBalance)
    
    // Progress to next tier
    const nextTier = tier.nextTier ? TIERS[tier.nextTier as keyof typeof TIERS] : null
    const progress = nextTier 
      ? Math.min(100, ((totalSpent - tier.min) / (nextTier.min - tier.min)) * 100)
      : 100
    const amountToNext = nextTier ? Math.max(0, nextTier.min - totalSpent) : 0

    return NextResponse.json({
      tier: {
        current: user.customerTier,
        label: tier.label,
        color: tier.color,
        discount: tier.discount,
        rewardRate: tier.rewardRate,
      },
      progress: {
        percent: Math.round(progress),
        totalSpent,
        amountToNext,
        nextTier: nextTier?.label || null,
      },
      rewards: {
        balance: rewardBalance,
        history: user.rewards.map(r => ({
          id: r.id,
          type: r.type,
          amount: Number(r.amount),
          description: r.description,
          orderId: r.orderId,
          date: r.createdAt,
        })),
      },
      benefits: {
        discount: `${tier.discount}% off all orders`,
        rewardRate: `${tier.rewardRate * 100}% cashback rewards`,
        freeShipping: totalSpent >= 25000 ? 'Free shipping on all orders' : 'Free shipping on orders over $500',
        prioritySupport: user.customerTier === 'GOLD' || user.customerTier === 'PLATINUM',
        dedicatedRep: user.customerTier === 'PLATINUM',
        netTerms: user.customerTier === 'PLATINUM' ? 'Net 60' : user.customerTier === 'GOLD' ? 'Net 30' : null,
      },
    })
  } catch (error) {
    console.error('Account API error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
