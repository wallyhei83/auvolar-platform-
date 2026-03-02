import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { put } from '@vercel/blob'
import { checkPermission } from '@/lib/permissions'

export async function GET(request: NextRequest) {
  const { authorized } = await checkPermission('documents.view')
  if (!authorized) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const productId = searchParams.get('productId')

  const documents = await prisma.productDocAsset.findMany({
    where: productId ? { bcProductId: productId } : undefined,
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ documents })
}

export async function POST(request: NextRequest) {
  const { authorized, reason } = await checkPermission('documents.upload')
  if (!authorized) {
    return NextResponse.json({ message: reason || 'Unauthorized' }, { status: 403 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File
  const bcProductId = formData.get('bcProductId') as string
  const sku = formData.get('sku') as string
  const title = formData.get('title') as string
  const docType = formData.get('docType') as string

  if (!file || !bcProductId || !sku || !title || !docType) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
  }

  try {
    const blob = await put(`products/${sku}/${docType}/${file.name}`, file, {
      access: 'public',
    })

    const doc = await prisma.productDocAsset.create({
      data: {
        bcProductId,
        sku,
        title,
        docType: docType as any,
        url: blob.url,
        fileSize: file.size,
        mimeType: file.type || undefined,
      },
    })

    return NextResponse.json({ message: 'Uploaded', document: doc }, { status: 201 })
  } catch (error: unknown) {
    console.error('Upload error:', error)
    const message = error instanceof Error ? error.message : 'Upload failed'
    return NextResponse.json({ message }, { status: 500 })
  }
}
