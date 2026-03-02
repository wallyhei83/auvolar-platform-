import { NextRequest, NextResponse } from 'next/server'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { checkPermission } from '@/lib/permissions'

// Vercel Blob 客户端直传 token 生成端点
// 文件从浏览器直接上传到Blob存储，不经过serverless函数
// 支持最大500MB文件

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // 验证用户权限
        const { authorized } = await checkPermission('documents.upload')
        if (!authorized) {
          throw new Error('Unauthorized')
        }

        return {
          allowedContentTypes: [
            // 文档
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            // 图片
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'image/svg+xml',
            // IES (通用二进制)
            'application/octet-stream',
            'text/plain',
            // CAD
            'application/acad',
            // 表格
            'text/csv',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            // 压缩
            'application/zip',
          ],
          maximumSizeInBytes: 50 * 1024 * 1024, // 50MB 最大
        }
      },
      onUploadCompleted: async ({ blob }) => {
        // 上传完成后的回调（可选）
        console.log('Client upload completed:', blob.url)
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload token generation failed'
    return NextResponse.json({ error: message }, { status: error instanceof Error && error.message === 'Unauthorized' ? 403 : 500 })
  }
}
