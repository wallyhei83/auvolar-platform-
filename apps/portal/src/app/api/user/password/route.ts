import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { currentPassword, newPassword } = body

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ message: 'Both passwords required' }, { status: 400 })
  }

  if (newPassword.length < 8) {
    return NextResponse.json({ message: 'Password must be at least 8 characters' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user || !user.passwordHash) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 })
  }

  const isValid = await bcrypt.compare(currentPassword, user.passwordHash)
  if (!isValid) {
    return NextResponse.json({ message: 'Current password is incorrect' }, { status: 400 })
  }

  const newHash = await bcrypt.hash(newPassword, 12)
  await prisma.user.update({
    where: { id: session.user.id },
    data: { passwordHash: newHash },
  })

  return NextResponse.json({ message: 'Password changed' })
}
