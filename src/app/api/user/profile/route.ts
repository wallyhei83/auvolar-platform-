import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { name, companyName, phone } = body

  const updateData: Record<string, string> = {}
  if (name !== undefined) updateData.name = name
  if (companyName !== undefined) updateData.companyName = companyName
  if (phone !== undefined) updateData.phone = phone

  await prisma.user.update({
    where: { id: session.user.id },
    data: updateData,
  })

  return NextResponse.json({ message: 'Profile updated' })
}
