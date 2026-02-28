/**
 * Prisma客户端 - 安全的数据库连接管理
 */

import { PrismaClient } from '@prisma/client'
import SmartConfig, { hasDatabase } from './smart-config'

declare global {
  var __prisma: PrismaClient | null | undefined
}

// 创建安全的Prisma客户端
function createPrismaClient() {
  const smartConfig = SmartConfig.getFullConfig()
  
  if (!hasDatabase()) {
    // 如果没有有效数据库连接，返回一个mock客户端
    console.warn('⚠️ Database not configured, using mock client')
    return null
  }

  return new PrismaClient({
    datasources: {
      db: {
        url: smartConfig.database.url
      }
    },
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
  })
}

// 单例模式的Prisma客户端
const prisma = globalThis.__prisma ?? createPrismaClient()

if (process.env.NODE_ENV === 'development') {
  globalThis.__prisma = prisma
}

export { prisma }

// 导出安全的数据库操作函数
export async function safeDbOperation<T>(
  operation: (prisma: PrismaClient) => Promise<T>,
  fallback?: T
): Promise<T | null> {
  if (!prisma || !hasDatabase()) {
    console.warn('⚠️ Database operation skipped - no valid connection')
    return fallback || null
  }

  try {
    return await operation(prisma)
  } catch (error) {
    console.error('❌ Database operation failed:', error)
    return fallback || null
  }
}

export default prisma