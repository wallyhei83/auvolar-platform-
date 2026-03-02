import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { put } from '@vercel/blob'
import { checkPermission } from '@/lib/permissions'

// 文件大小限制: 4.5MB (Vercel Blob限制)
const MAX_FILE_SIZE = 4.5 * 1024 * 1024

// 允许的文件类型
const ALLOWED_EXTENSIONS = new Set([
  // 文档
  'pdf', 'doc', 'docx',
  // IES
  'ies',
  // 图片
  'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg',
  // CAD
  'dwg', 'step', 'stp', 'iges', 'sat',
  // 其他
  'csv', 'xlsx', 'xls', 'zip', 'txt',
])

function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || ''
}

function validateFile(file: File): string | null {
  if (!file.size || file.size === 0) {
    return `File "${file.name}" is empty (0 bytes)`
  }
  if (file.size > MAX_FILE_SIZE) {
    return `File "${file.name}" exceeds 4.5MB limit (${(file.size / 1024 / 1024).toFixed(1)}MB)`
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

  // 参数验证
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

  // 文件验证
  const validationError = validateFile(file)
  if (validationError) {
    return NextResponse.json({ message: validationError }, { status: 400 })
  }

  try {
    // 上传到Vercel Blob
    const blob = await put(`products/${sku}/${docType}/${file.name}`, file, {
      access: 'public',
    })

    // 保存到数据库
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
    
    // 区分Blob错误和数据库错误
    if (message.includes('BlobAccessError') || message.includes('token')) {
      return NextResponse.json(
        { message: 'Storage configuration error. Please check BLOB_READ_WRITE_TOKEN.' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ message: `Upload failed: ${message}` }, { status: 500 })
  }
}
