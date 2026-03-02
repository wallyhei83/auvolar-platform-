import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { del } from '@vercel/blob'
import { checkPermission } from '@/lib/permissions'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { authorized } = await checkPermission('documents.view')
  if (!authorized) return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })

  const doc = await prisma.productDocAsset.findUnique({ where: { id } })
  if (!doc) return NextResponse.json({ message: 'Document not found' }, { status: 404 })
  return NextResponse.json(doc)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { authorized } = await checkPermission('documents.upload')
  if (!authorized) return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })

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
  const { authorized } = await checkPermission('documents.delete')
  if (!authorized) return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })

  // 先查找文档获取Blob URL
  const doc = await prisma.productDocAsset.findUnique({ where: { id } })
  if (!doc) return NextResponse.json({ message: 'Document not found' }, { status: 404 })

  // 从数据库删除
  await prisma.productDocAsset.delete({ where: { id } })

  // 从Vercel Blob删除文件（不阻塞响应）
  try {
    await del(doc.url)
  } catch (error) {
    console.error('Blob delete error (non-critical):', error)
    // 不影响数据库删除结果
  }

  return NextResponse.json({ message: 'Deleted' })
}
