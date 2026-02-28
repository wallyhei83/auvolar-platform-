/**
 * 应用配置管理 - 安全的环境变量处理
 * 支持构建时和运行时的不同配置
 */

// 构建时安全的默认配置
const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'
const isBuild = process.env.NEXT_PHASE === 'phase-production-build'

// 安全的数据库URL检查
const getDatabaseUrl = () => {
  const dbUrl = process.env.DATABASE_URL
  
  // 如果是构建时且没有真实数据库URL，使用占位符
  if (isBuild && (!dbUrl || dbUrl.includes('placeholder'))) {
    return 'postgresql://placeholder:placeholder@localhost:5432/placeholder'
  }
  
  return dbUrl || 'postgresql://placeholder:placeholder@localhost:5432/placeholder'
}

// 安全的OpenAI API Key检查
const getOpenAIKey = () => {
  const apiKey = process.env.OPENAI_API_KEY
  
  // 如果是构建时且没有真实API Key，返回占位符
  if (isBuild && (!apiKey || apiKey.includes('placeholder') || apiKey === 'your-openai-api-key-here')) {
    return 'sk-placeholder-build-only'
  }
  
  return apiKey || 'sk-placeholder-build-only'
}

export const config = {
  // 环境检查
  isDevelopment,
  isProduction,
  isBuild,
  
  // 数据库配置
  database: {
    url: getDatabaseUrl(),
    isPlaceholder: getDatabaseUrl().includes('placeholder')
  },
  
  // AI配置
  openai: {
    apiKey: getOpenAIKey(),
    isPlaceholder: getOpenAIKey().includes('placeholder')
  },
  
  // NextAuth配置
  nextAuth: {
    secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-build',
    url: process.env.NEXTAUTH_URL || 'https://www.auvolar.com'
  },
  
  // BigCommerce配置
  bigCommerce: {
    storeHash: process.env.BC_STORE_HASH || 'hhcdvxqxzq',
    accessToken: process.env.BC_ACCESS_TOKEN || '',
    clientId: process.env.BC_CLIENT_ID || '',
    clientSecret: process.env.BC_CLIENT_SECRET || '',
    storefrontToken: process.env.BC_STOREFRONT_TOKEN || ''
  },
  
  // 应用URL
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://www.auvolar.com',
    storefrontUrl: process.env.NEXT_PUBLIC_BC_STOREFRONT_URL || 'https://auvolar.mybigcommerce.com'
  }
}

// 导出类型安全的配置检查函数
export const hasValidDatabase = () => !config.database.isPlaceholder
export const hasValidOpenAI = () => !config.openai.isPlaceholder
export const isFullyConfigured = () => hasValidDatabase() && hasValidOpenAI()

export default config