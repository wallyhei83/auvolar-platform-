import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { checkPermission } from '@/lib/permissions'

export async function GET() {
  const { authorized } = await checkPermission('documents.view')
  if (!authorized) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })
  }

  const documents = await prisma.productDocAsset.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ documents })
}
