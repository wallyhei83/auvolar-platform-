import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// GET - List all partners with user info
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })
  }

  const partners = await prisma.partner.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      attributions: {
        select: {
          id: true,
          bcOrderId: true,
          orderTotal: true,
          commission: true,
          paidAt: true,
          createdAt: true,
        },
      },
    },
  })

  // Get user info for each partner
  const userIds = partners.map(p => p.userId)
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, email: true, name: true, companyName: true, phone: true },
  })
  const userMap = new Map(users.map(u => [u.id, u]))

  const enriched = partners.map(p => ({
    ...p,
    user: userMap.get(p.userId) || null,
    totalCommission: p.attributions.reduce((sum, a) => sum + Number(a.commission), 0),
    totalOrders: p.attributions.length,
  }))

  return NextResponse.json(enriched)
}
