import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { put } from '@vercel/blob'

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })
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
    // Upload to Vercel Blob
    const blob = await put(`products/${sku}/${docType}/${file.name}`, file, {
      access: 'public',
    })

    // Save to database
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
