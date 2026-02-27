import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET - Search approved contractor/installer partners
// Public API — only returns approved partners with limited info
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') // INSTALLER, REP, DISTRIBUTOR
  const page = parseInt(searchParams.get('page') || '1')
  const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50)

  const where: Record<string, unknown> = {
    status: 'APPROVED',
  }

  if (type) {
    where.partnerType = type
  }

  const [partners, total] = await Promise.all([
    prisma.partner.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { approvedAt: 'desc' },
    }),
    prisma.partner.count({ where }),
  ])

  // Get user info (only public fields)
  const userIds = partners.map(p => p.userId)
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, name: true, companyName: true, phone: true },
  })
  const userMap = new Map(users.map(u => [u.id, u]))

  const results = partners.map(p => ({
    id: p.id,
    companyName: p.companyName,
    partnerType: p.partnerType,
    referralCode: p.referralCode,
    contactName: userMap.get(p.userId)?.name || '',
    phone: userMap.get(p.userId)?.phone || '',
    approvedSince: p.approvedAt,
  }))

  return NextResponse.json({
    partners: results,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  })
}
