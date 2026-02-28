import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { checkPermission } from '@/lib/permissions'

// PATCH - Approve/reject/update partner
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { authorized, session } = await checkPermission('partners.manage')
  if (!authorized) return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })

  const body = await request.json()
  const { status, commissionRate } = body

  const partner = await prisma.partner.findUnique({ where: { id } })
  if (!partner) return NextResponse.json({ message: 'Partner not found' }, { status: 404 })

  const updateData: Record<string, unknown> = {}
  if (status) {
    updateData.status = status
    if (status === 'APPROVED') {
      updateData.approvedAt = new Date()
      updateData.approvedById = session.user.id
    }
  }
  if (commissionRate !== undefined) {
    updateData.commissionRate = commissionRate
  }

  const updated = await prisma.partner.update({ where: { id }, data: updateData })
  return NextResponse.json({ message: `Partner ${status ? status.toLowerCase() : 'updated'}`, partner: updated })
}
