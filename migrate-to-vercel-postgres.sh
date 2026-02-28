#!/bin/bash

# Auvolar平台 - 迁移到Vercel Postgres统一管理
# 将数据库从Neon迁移到Vercel，实现一站式管理

set -e

echo "🚀 Auvolar平台统一架构迁移"
echo "================================"
echo "目标：将所有服务统一到Vercel平台"
echo ""

# 检查当前目录
if [[ ! -f "package.json" ]]; then
    echo "❌ 错误：请在 auvolar-platform- 根目录运行"
    exit 1
fi

cd apps/portal

echo "📋 迁移计划："
echo "1. 在Vercel创建新的PostgreSQL数据库"
echo "2. 导出Neon数据库数据"
echo "3. 导入到Vercel Postgres"
echo "4. 更新环境变量"
echo "5. 验证迁移结果"
echo ""

# 步骤1: 创建Vercel Postgres数据库
echo "🗃️ 步骤1: 创建Vercel Postgres数据库"
echo "-----------------------------------"
echo "请按以下步骤操作："
echo ""
echo "1. 访问 Vercel Dashboard: https://vercel.com/dashboard"
echo "2. 进入您的auvolar项目"
echo "3. 点击 'Storage' 标签页"
echo "4. 点击 'Create Database'"
echo "5. 选择 'Postgres'"
echo "6. 数据库名称: auvolar-production"
echo "7. 选择区域: us-east-1 (与网站同区域)"
echo ""

read -p "✅ 已在Vercel创建Postgres数据库？ (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "请先完成Vercel Postgres数据库创建，然后重新运行此脚本"
    exit 1
fi

# 步骤2: 获取新的连接字符串
echo ""
echo "🔗 步骤2: 获取Vercel Postgres连接字符串"
echo "----------------------------------------"
echo "请在Vercel项目的Storage页面："
echo "1. 点击新创建的数据库"
echo "2. 选择 '.env.local' 标签页"
echo "3. 复制 POSTGRES_URL 的值"
echo ""

read -p "请粘贴Vercel Postgres连接字符串: " VERCEL_DB_URL

if [[ -z "$VERCEL_DB_URL" ]]; then
    echo "❌ 错误：连接字符串不能为空"
    exit 1
fi

if [[ ! "$VERCEL_DB_URL" =~ ^postgres:// ]]; then
    echo "❌ 错误：连接字符串格式不正确，应以 postgres:// 开头"
    exit 1
fi

echo "✅ Vercel Postgres连接字符串已获取"

# 步骤3: 数据迁移准备
echo ""
echo "📦 步骤3: 数据迁移准备"
echo "----------------------"

# 备份当前.env文件
cp .env .env.backup.$(date +%Y%m%d_%H%M%S)
echo "✅ 已备份当前.env文件"

# 检查是否有现有数据需要迁移
if grep -q "postgresql://" .env; then
    OLD_DB_URL=$(grep "^DATABASE_URL=" .env | cut -d'=' -f2- | tr -d '"')
    echo "发现现有数据库连接：$OLD_DB_URL"
    
    read -p "是否需要迁移现有数据？ (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "数据迁移选项："
        echo "1. 使用pg_dump/pg_restore (推荐)"
        echo "2. 使用Prisma migrate"
        echo "3. 手动导出/导入"
        echo ""
        
        read -p "选择迁移方式 (1-3): " -n 1 -r
        echo
        
        case $REPLY in
            1)
                echo "📋 pg_dump迁移步骤："
                echo "1. 导出现有数据："
                echo "   pg_dump \"$OLD_DB_URL\" --no-owner --no-privileges > backup.sql"
                echo ""
                echo "2. 导入到Vercel Postgres："
                echo "   psql \"$VERCEL_DB_URL\" < backup.sql"
                echo ""
                echo "3. 清理备份文件："
                echo "   rm backup.sql"
                echo ""
                read -p "请手动执行以上命令，完成后按回车继续..."
                ;;
            2)
                echo "📋 Prisma迁移步骤："
                echo "1. 更新DATABASE_URL到新数据库"
                echo "2. 运行: npx prisma db push"
                echo "3. 手动迁移重要数据"
                ;;
            3)
                echo "📋 手动迁移提示："
                echo "请确保将重要的业务数据从旧数据库导出并导入新数据库"
                ;;
        esac
    else
        echo "⚠️ 跳过数据迁移，将创建全新数据库"
    fi
fi

# 步骤4: 更新环境变量
echo ""
echo "🔧 步骤4: 更新环境配置"
echo "----------------------"

# 创建新的.env文件
cat > .env.new << EOF
# Vercel统一架构配置
# 生成时间: $(date)

# ========================================
# 数据库 - Vercel Postgres (统一平台)
# ========================================
DATABASE_URL="$VERCEL_DB_URL"

# ========================================
# AI功能 (OpenAI)
# ========================================
OPENAI_API_KEY="$(grep "^OPENAI_API_KEY=" .env | cut -d'=' -f2- || echo 'YOUR_OPENAI_API_KEY')"

# ========================================
# NextAuth配置
# ========================================
NEXTAUTH_SECRET="$(grep "^NEXTAUTH_SECRET=" .env | cut -d'=' -f2- || echo 'auvolar-2026-secure-secret-key')"
NEXTAUTH_URL="https://www.auvolar.com"

# ========================================
# BigCommerce API
# ========================================
BC_STORE_HASH="hhcdvxqxzq"
BC_ACCESS_TOKEN="$(grep "^BC_ACCESS_TOKEN=" .env | cut -d'=' -f2- || echo 'YOUR_BC_ACCESS_TOKEN')"
BC_CLIENT_ID="$(grep "^BC_CLIENT_ID=" .env | cut -d'=' -f2- || echo 'YOUR_BC_CLIENT_ID')"
BC_CLIENT_SECRET="$(grep "^BC_CLIENT_SECRET=" .env | cut -d'=' -f2- || echo 'YOUR_BC_CLIENT_SECRET')"
BC_STOREFRONT_TOKEN="$(grep "^BC_STOREFRONT_TOKEN=" .env | cut -d'=' -f2- || echo 'YOUR_BC_STOREFRONT_TOKEN')"

# ========================================
# 邮件服务
# ========================================
SENDGRID_API_KEY="$(grep "^SENDGRID_API_KEY=" .env | cut -d'=' -f2- || echo 'YOUR_SENDGRID_API_KEY')"
EMAIL_FROM="sales@auvolar.com"

# ========================================
# Vercel集成服务
# ========================================
# Vercel Blob存储 (文档上传)
BLOB_READ_WRITE_TOKEN="$(grep "^BLOB_READ_WRITE_TOKEN=" .env | cut -d'=' -f2- || echo 'YOUR_VERCEL_BLOB_TOKEN')"

# 分析工具
NEXT_PUBLIC_GA_MEASUREMENT_ID="$(grep "^NEXT_PUBLIC_GA_MEASUREMENT_ID=" .env | cut -d'=' -f2- || echo 'G-XXXXXXXXXX')"

# 应用URL
NEXT_PUBLIC_APP_URL="https://www.auvolar.com"
NEXT_PUBLIC_BC_STOREFRONT_URL="https://auvolar.mybigcommerce.com"

# ========================================
# 可选AI增强功能
# ========================================
# ElevenLabs高质量语音合成
# ELEVENLABS_API_KEY="YOUR_ELEVENLABS_API_KEY"
EOF

mv .env.new .env
echo "✅ 环境配置已更新为Vercel统一架构"

# 步骤5: 初始化新数据库
echo ""
echo "🗃️ 步骤5: 初始化Vercel Postgres数据库"
echo "-----------------------------------"

echo "正在同步数据库schema..."
if npx prisma db push --skip-generate; then
    echo "✅ 数据库schema同步成功"
else
    echo "❌ 数据库schema同步失败"
    echo "请检查连接字符串是否正确"
    exit 1
fi

echo "正在生成Prisma客户端..."
npx prisma generate
echo "✅ Prisma客户端已更新"

# 添加初始AI数据
echo "正在添加AI系统初始数据..."
cat > temp-init.js << 'EOF'
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function initDatabase() {
  console.log('🌱 初始化AI系统数据...')
  
  try {
    // 添加示例公司情报
    await prisma.aICompanyIntelligence.upsert({
      where: { companyName: 'Example Manufacturing Inc' },
      update: {},
      create: {
        companyName: 'Example Manufacturing Inc',
        website: 'https://example-manufacturing.com',
        industry: 'Manufacturing',
        size: 'SMB',
        description: 'Sample manufacturing company for AI system',
        painPoints: ['High energy costs', 'Poor lighting quality', 'Maintenance issues'],
        budgetEstimate: 'medium',
        decisionMakers: ['Facilities Manager', 'Plant Manager', 'CFO'],
        competitors: ['Lithonia', 'Cree', 'Cooper Lighting']
      }
    })

    // 添加策略性能数据
    await prisma.aIStrategyPerformance.upsert({
      where: {
        strategy_industry_companySize_clientType: {
          strategy: 'Technical Expert',
          industry: 'Manufacturing',
          companySize: 'SMB',
          clientType: 'Engineer'
        }
      },
      update: {},
      create: {
        strategy: 'Technical Expert',
        industry: 'Manufacturing',
        companySize: 'SMB',
        clientType: 'Engineer',
        avgEffectiveness: 0.85,
        timesUsed: 1,
        conversionRate: 0.22,
        avgEngagement: 82.0
      }
    })

    console.log('✅ AI系统初始数据添加完成')
  } catch (error) {
    console.error('❌ 初始化失败:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

initDatabase()
EOF

node temp-init.js
rm temp-init.js

# 步骤6: 更新Vercel环境变量
echo ""
echo "☁️ 步骤6: 更新Vercel环境变量"
echo "----------------------------"
echo "请在Vercel控制台更新环境变量："
echo "1. 访问: https://vercel.com/dashboard"
echo "2. 进入auvolar项目"
echo "3. Settings → Environment Variables"
echo "4. 更新以下变量:"
echo "   - DATABASE_URL = $VERCEL_DB_URL"
echo "   - 其他环境变量保持不变"
echo "5. 重新部署项目"
echo ""

read -p "✅ 已在Vercel更新环境变量？ (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "⚠️ 请记得更新Vercel环境变量"
fi

# 完成报告
echo ""
echo "🎉 Vercel统一架构迁移完成！"
echo "============================"
echo ""
echo "📊 新架构概览:"
echo "✅ 网站部署: Vercel"
echo "✅ 数据库: Vercel Postgres"
echo "✅ 文件存储: Vercel Blob"
echo "✅ AI功能: OpenAI集成"
echo "✅ 电商: BigCommerce集成"
echo ""
echo "🚀 统一管理优势:"
echo "• 一个控制台管理所有服务"
echo "• 统一账单和成本控制"
echo "• 更好的性能(同区域部署)"
echo "• 简化的运维和监控"
echo ""
echo "🔗 管理入口:"
echo "• Vercel控制台: https://vercel.com/dashboard"
echo "• 数据库管理: Vercel Storage页面"
echo "• AI性能监控: https://auvolar.com/admin/ai-analytics"
echo ""
echo "📋 后续步骤:"
echo "1. 测试网站功能正常"
echo "2. 验证AI系统工作正常"
echo "3. (可选) 删除旧的Neon数据库"
echo "4. 更新文档中的数据库信息"
echo ""
echo "恭喜！您现在拥有完全统一的Vercel架构！ 🚀"
EOF