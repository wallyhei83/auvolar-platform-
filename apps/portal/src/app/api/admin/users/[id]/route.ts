import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

// PATCH - Update user (role, name, etc.)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })
  }

  const body = await request.json()
  const { name, companyName, phone, role, password } = body

  // Prevent non-SUPER_ADMIN from changing roles to ADMIN/SUPER_ADMIN
  if (role && session.user.role !== 'SUPER_ADMIN' && (role === 'ADMIN' || role === 'SUPER_ADMIN')) {
    return NextResponse.json({ message: 'Only SUPER_ADMIN can assign admin roles' }, { status: 403 })
  }

  // Prevent editing SUPER_ADMIN unless you are SUPER_ADMIN
  const target = await prisma.user.findUnique({ where: { id } })
  if (!target) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 })
  }
  if (target.role === 'SUPER_ADMIN' && session.user.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ message: 'Cannot modify SUPER_ADMIN' }, { status: 403 })
  }

  const updateData: Record<string, unknown> = {}
  if (name !== undefined) updateData.name = name
  if (companyName !== undefined) updateData.companyName = companyName
  if (phone !== undefined) updateData.phone = phone
  if (role !== undefined) updateData.role = role
  if (password) updateData.passwordHash = await bcrypt.hash(password, 12)

  const updated = await prisma.user.update({
    where: { id },
    data: updateData,
  })

  return NextResponse.json({
    message: 'User updated',
    user: { id: updated.id, email: updated.email, role: updated.role },
  })
}

// DELETE - Remove user
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })
  }

  const target = await prisma.user.findUnique({ where: { id } })
  if (!target) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 })
  }

  // Cannot delete yourself or SUPER_ADMIN
  if (target.id === session.user.id) {
    return NextResponse.json({ message: 'Cannot delete yourself' }, { status: 400 })
  }
  if (target.role === 'SUPER_ADMIN') {
    return NextResponse.json({ message: 'Cannot delete SUPER_ADMIN' }, { status: 403 })
  }

  await prisma.user.delete({ where: { id } })

  return NextResponse.json({ message: 'User deleted' })
}
