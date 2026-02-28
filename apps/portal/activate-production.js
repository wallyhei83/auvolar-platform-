/**
 * 生产环境AI功能激活
 * 安全地检测并启用AI功能
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 正在激活AI功能...');

// 检查是否在Vercel生产环境
const isVercel = process.env.VERCEL === '1';
const isProduction = process.env.NODE_ENV === 'production';

if (isVercel && isProduction) {
  console.log('✅ 检测到Vercel生产环境');
  
  // 创建生产环境标记
  const prodConfig = {
    aiEnabled: true,
    smartConfigMode: true,
    autoDetection: true,
    timestamp: Date.now()
  };
  
  fs.writeFileSync('.ai-production-ready', JSON.stringify(prodConfig));
  console.log('✅ AI生产环境配置已激活');
} else {
  console.log('ℹ️ 开发环境，使用默认配置');
}

console.log('🎊 AI系统激活完成！');
