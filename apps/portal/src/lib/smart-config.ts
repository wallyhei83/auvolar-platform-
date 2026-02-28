/**
 * 智能配置系统 - 老板专用零配置方案
 * 自动检测环境，优雅降级，智能启用功能
 */

// 生产环境智能检测
const isProduction = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

// 智能环境配置检测
export class SmartConfig {
  static getDatabaseConfig() {
    const dbUrl = process.env.DATABASE_URL
    
    // 检测是否有有效的数据库连接
    if (dbUrl && dbUrl.includes('postgresql://') && !dbUrl.includes('placeholder')) {
      return {
        url: dbUrl,
        isValid: true,
        source: 'environment'
      }
    }
    
    // 生产环境使用智能默认值
    if (isProduction) {
      return {
        url: 'postgresql://auto-config:config@localhost:5432/auto?sslmode=prefer',
        isValid: false,
        source: 'auto-fallback',
        message: 'Database will be configured automatically when environment variables are set'
      }
    }
    
    return {
      url: 'postgresql://dev:dev@localhost:5432/dev',
      isValid: false,
      source: 'development'
    }
  }
  
  static getOpenAIConfig() {
    const apiKey = process.env.OPENAI_API_KEY
    
    // 检测有效的OpenAI API密钥
    if (apiKey && apiKey.startsWith('sk-') && apiKey.length > 20 && !apiKey.includes('placeholder')) {
      return {
        apiKey,
        isValid: true,
        source: 'environment'
      }
    }
    
    return {
      apiKey: 'sk-auto-fallback',
      isValid: false,
      source: 'fallback',
      message: 'AI features will be enabled when API key is configured'
    }
  }
  
  static getNextAuthConfig() {
    return {
      secret: process.env.NEXTAUTH_SECRET || 'auto-generated-secret-for-' + Date.now(),
      url: process.env.NEXTAUTH_URL || 'https://www.auvolar.com',
      isValid: true
    }
  }
  
  static getBigCommerceConfig() {
    return {
      storeHash: process.env.BC_STORE_HASH || 'hhcdvxqxzq',
      accessToken: process.env.BC_ACCESS_TOKEN || '',
      isValid: !!process.env.BC_ACCESS_TOKEN
    }
  }
  
  static getFullConfig() {
    const database = this.getDatabaseConfig()
    const openai = this.getOpenAIConfig()
    const nextauth = this.getNextAuthConfig()
    const bigcommerce = this.getBigCommerceConfig()
    
    return {
      database,
      openai,
      nextauth,
      bigcommerce,
      status: {
        fullyConfigured: database.isValid && openai.isValid,
        partiallyConfigured: database.isValid || openai.isValid,
        canFallback: true
      }
    }
  }
  
  static getStatusMessage() {
    const config = this.getFullConfig()
    
    if (config.status.fullyConfigured) {
      return {
        level: 'success',
        message: '🚀 AI Sales System 2.0 fully operational!'
      }
    }
    
    if (config.status.partiallyConfigured) {
      return {
        level: 'warning', 
        message: '⚡ AI Sales System partially active. Some features available.'
      }
    }
    
    return {
      level: 'info',
      message: '🤖 AI Sales System ready for configuration. Basic features available.'
    }
  }
}

// 导出便捷的检查函数
export const hasDatabase = () => SmartConfig.getDatabaseConfig().isValid
export const hasOpenAI = () => SmartConfig.getOpenAIConfig().isValid
export const isFullyConfigured = () => SmartConfig.getFullConfig().status.fullyConfigured

export default SmartConfig