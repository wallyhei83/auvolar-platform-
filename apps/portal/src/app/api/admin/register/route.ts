import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { UserRole } from '@prisma/client'

export async function POST(req: Request) {
  try {
    // SECURITY: Only SUPER_ADMIN can create admin accounts
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ message: 'Unauthorized. Only SUPER_ADMIN can register admin accounts.' }, { status: 403 })
    }

    const body = await req.json()
    const { email, password, name, companyName, phone } = body

    // 1. 验证输入
    if (!email || !password) {
      return new NextResponse('Email and password are required', { status: 400 })
    }
    if (password.length < 8) {
      return new NextResponse('Password must be at least 8 characters long', { status: 400 })
    }

    // 2. 检查用户是否已存在
    const existingUser = await db.user.findUnique({ where: { email } })
    if (existingUser) {
      return new NextResponse('User with this email already exists', { status: 409 })
    }

    // 3. 哈希密码
    const hashedPassword = await bcrypt.hash(password, 12)

    // 4. 创建新用户 (默认角色为 ADMIN)
    const newUser = await db.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        name: name || '',
        companyName: companyName || '',
        phone: phone || '',
        role: UserRole.ADMIN,
      },
    })

    // 5. 返回成功响应
    return NextResponse.json({ message: 'Admin user registered successfully', user: { id: newUser.id, email: newUser.email, role: newUser.role } }, { status: 201 })

  } catch (error) {
    console.error('Admin registration API error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
