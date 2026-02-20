import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const doc = await prisma.productDocAsset.findUnique({ where: { id } })
  if (!doc) {
    return NextResponse.json({ message: 'Document not found' }, { status: 404 })
  }

  return NextResponse.json(doc)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })
  }

  const body = await request.json()
  const { bcProductId, sku, title, docType, version } = body

  const updated = await prisma.productDocAsset.update({
    where: { id },
    data: {
      ...(bcProductId && { bcProductId }),
      ...(sku && { sku }),
      ...(title && { title }),
      ...(docType && { docType }),
      ...(version !== undefined && { version }),
    },
  })

  return NextResponse.json(updated)
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })
  }

  await prisma.productDocAsset.delete({ where: { id } })

  return NextResponse.json({ message: 'Deleted' })
}
