import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

function isAdmin(session: any) {
  return session?.user?.role === 'ADMIN' || session?.user?.role === 'SUPER_ADMIN'
}

// GET - List all commission rules
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const rules = await prisma.commissionRule.findMany({
    orderBy: [{ isActive: 'desc' }, { createdAt: 'desc' }],
  })
  return NextResponse.json(rules)
}

// POST - Create a commission rule
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const body = await request.json()
  const { tier, bcProductId, bcCategoryId, partnerId, rate, description } = body

  if (rate === undefined || rate < 0 || rate > 100) {
    return NextResponse.json({ error: 'Rate must be 0-100' }, { status: 400 })
  }

  const rule = await prisma.commissionRule.create({
    data: {
      tier: tier || null,
      bcProductId: bcProductId || null,
      bcCategoryId: bcCategoryId || null,
      partnerId: partnerId || null,
      rate,
      description: description || null,
    },
  })

  return NextResponse.json(rule, { status: 201 })
}

// PATCH - Update a rule
export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const body = await request.json()
  const { id, ...data } = body

  if (!id) return NextResponse.json({ error: 'Missing rule ID' }, { status: 400 })

  const rule = await prisma.commissionRule.update({
    where: { id },
    data,
  })
  return NextResponse.json(rule)
}

// DELETE - Delete a rule
export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 })

  await prisma.commissionRule.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
