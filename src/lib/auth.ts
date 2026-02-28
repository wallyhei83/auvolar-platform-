import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { db } from './db' // 确保你的Prisma客户端db已正确导入
import { UserRole } from '@prisma/client' // 导入UserRole枚举

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.passwordHash) {
          return null // 用户不存在或密码未设置
        }

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash)

        if (!isValid) {
          return null // 密码不匹配
        }

        // 如果登录成功，返回用户对象，包含自定义字段
        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined,
          role: user.role,
          permissions: user.permissions || [],
          companyName: user.companyName ?? undefined,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.permissions = (user as any).permissions || []
        token.companyName = user.companyName
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as UserRole
        session.user.permissions = (token.permissions as string[]) || []
        session.user.companyName = token.companyName as string | undefined
      }
      return session
    },
  },
  pages: {
    signIn: '/admin/login', // 将登录页指向管理员登录页
    error: '/admin/login', // 错误页也指向管理员登录页
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}

// Next-Auth 类型扩展：确保session和JWT包含自定义字段
// 确保这些类型定义与你schema.prisma中的User模型和UserRole枚举一致
declare module 'next-auth' {
  interface User {
    id: string
    email: string
    name?: string
    role: UserRole
    permissions?: string[]
    companyName?: string
  }
  interface Session {
    user: {
      id: string
      email: string
      name?: string
      role: UserRole
      permissions: string[]
      companyName?: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: UserRole
    permissions: string[]
    companyName?: string
  }
}
