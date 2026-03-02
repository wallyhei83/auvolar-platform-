import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { put } from '@vercel/blob'
import { checkPermission } from '@/lib/permissions'

// 文件大小限制: 4MB (走API route直传) / 50MB (走客户端直传)
const MAX_API_FILE_SIZE = 4 * 1024 * 1024

// 允许的文件类型
const ALLOWED_EXTENSIONS = new Set([
  'pdf', 'doc', 'docx',
  'ies',
  'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg',
  'dwg', 'step', 'stp', 'iges', 'sat',
  'csv', 'xlsx', 'xls', 'zip', 'txt',
])

function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || ''
}

function validateFile(file: File): string | null {
  if (!file.size || file.size === 0) {
    return `File "${file.name}" is empty (0 bytes)`
  }
  if (file.size > MAX_API_FILE_SIZE) {
    return `File "${file.name}" exceeds 4MB API limit (${(file.size / 1024 / 1024).toFixed(1)}MB). Use client upload for large files.`
  }
  const ext = getFileExtension(file.name)
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return `File type ".${ext}" is not supported`
  }
  return null
}

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

  const contentType = request.headers.get('content-type') || ''

  // 模式1: JSON请求 — 客户端直传后保存元数据到数据库
  if (contentType.includes('application/json')) {
    try {
      const body = await request.json()
      const { bcProductId, sku, title, docType, url, fileSize, mimeType } = body

      if (!bcProductId || !sku || !title || !docType || !url) {
        return NextResponse.json(
          { message: 'Missing required fields for metadata save' },
          { status: 400 }
        )
      }

      const doc = await prisma.productDocAsset.create({
        data: {
          bcProductId,
          sku,
          title,
          docType: docType as any,
          url,
          fileSize: fileSize || 0,
          mimeType: mimeType || undefined,
        },
      })

      return NextResponse.json({ message: 'Saved', document: doc }, { status: 201 })
    } catch (error: unknown) {
      console.error('Metadata save error:', error)
      const message = error instanceof Error ? error.message : 'Save failed'
      return NextResponse.json({ message: `Save failed: ${message}` }, { status: 500 })
    }
  }

  // 模式2: FormData请求 — 小文件通过API route上传
  let formData: FormData
  try {
    formData = await request.formData()
  } catch (error) {
    console.error('FormData parse error:', error)
    return NextResponse.json({ message: 'Invalid form data. File may be too large for API upload (max 4MB). Try refreshing the page.' }, { status: 400 })
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

  const validationError = validateFile(file)
  if (validationError) {
    return NextResponse.json({ message: validationError }, { status: 400 })
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
    
    if (message.includes('BlobAccessError') || message.includes('token')) {
      return NextResponse.json(
        { message: 'Storage configuration error. Please check BLOB_READ_WRITE_TOKEN.' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ message: `Upload failed: ${message}` }, { status: 500 })
  }
}
