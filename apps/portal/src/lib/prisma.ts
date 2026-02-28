/**
 * Prisma客户端 - 安全的数据库连接管理
 */

import { PrismaClient } from '@prisma/client'
import { config, hasValidDatabase } from './config'

declare global {
  var __prisma: PrismaClient | undefined
}

// 创建安全的Prisma客户端
function createPrismaClient() {
  if (!hasValidDatabase()) {
    // 如果没有有效数据库连接，返回一个mock客户端
    console.warn('⚠️ Database not configured, using mock client')
    return null
  }

  return new PrismaClient({
    datasources: {
      db: {
        url: config.database.url
      }
    },
    log: config.isDevelopment ? ['query', 'error', 'warn'] : ['error']
  })
}

// 单例模式的Prisma客户端
const prisma = globalThis.__prisma ?? createPrismaClient()

if (config.isDevelopment) {
  globalThis.__prisma = prisma
}

export { prisma }

// 导出安全的数据库操作函数
export async function safeDbOperation<T>(
  operation: (prisma: PrismaClient) => Promise<T>,
  fallback?: T
): Promise<T | null> {
  if (!prisma || !hasValidDatabase()) {
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