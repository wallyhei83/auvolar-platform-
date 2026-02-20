import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN' && session.user.role !== 'STAFF')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })
  }

  const documents = await prisma.productDocAsset.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ documents })
}
