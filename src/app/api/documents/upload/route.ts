import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { put } from '@vercel/blob'
import { checkPermission } from '@/lib/permissions'

// 兼容旧路径 - 与 /api/documents POST 功能一致
// 统一入口在 /api/documents/route.ts

const MAX_FILE_SIZE = 4.5 * 1024 * 1024

export async function POST(request: NextRequest) {
  const { authorized, reason } = await checkPermission('documents.upload')
  if (!authorized) {
    return NextResponse.json({ message: reason || 'Unauthorized' }, { status: 403 })
  }

  let formData: FormData
  try {
    formData = await request.formData()
  } catch (error) {
    console.error('FormData parse error:', error)
    return NextResponse.json({ message: 'Invalid form data' }, { status: 400 })
  }

  const file = formData.get('file') as File | null
  const bcProductId = formData.get('bcProductId') as string | null
  const sku = formData.get('sku') as string | null
  const title = formData.get('title') as string | null
  const docType = formData.get('docType') as string | null

  if (!file || !bcProductId || !sku || !title || !docType) {
    const missing = []
    if (!file) missing.push('file')
    if (!bcProductId) missing.push('bcProductId')
    if (!sku) missing.push('sku')
    if (!title) missing.push('title')
    if (!docType) missing.push('docType')
    return NextResponse.json(
      { message: `Missing required fields: ${missing.join(', ')}` },
      { status: 400 }
    )
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { message: `File "${file.name}" exceeds 4.5MB limit` },
      { status: 400 }
    )
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
    return NextResponse.json({ message: `Upload failed: ${message}` }, { status: 500 })
  }
}
