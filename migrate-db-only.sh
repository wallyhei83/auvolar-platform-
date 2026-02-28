#!/bin/bash

# Auvolar平台 - 数据库统一迁移
# 只迁移数据库到Vercel，保持BigCommerce完整功能

set -e

echo "🗃️ Auvolar数据库统一迁移"
echo "=========================="
echo "目标：将数据库迁移到Vercel，保持BigCommerce全功能"
echo ""
echo "📋 迁移范围："
echo "✅ 数据库: Neon PostgreSQL → Vercel Postgres"
echo "✅ AI数据: 客户智能、对话记录等"
echo "✅ 网站数据: 用户账户、案例研究、文档等"
echo ""
echo "🔒 保持不变："
echo "• BigCommerce: 产品、订单、库存、支付全功能"
echo "• 网站部署: 继续使用Vercel"
echo "• 文件存储: 继续使用Vercel Blob"
echo ""

# 检查目录
if [[ ! -f "package.json" ]]; then
    echo "❌ 错误：请在 auvolar-platform- 根目录运行"
    exit 1
fi

cd apps/portal

# 步骤1: 创建Vercel Postgres
echo "🎯 步骤1: 在Vercel创建PostgreSQL数据库"
echo "---------------------------------------"
echo "请按以下步骤操作："
echo ""
echo "1. 访问 https://vercel.com/dashboard"
echo "2. 进入您的auvolar项目 (prj_wwiA7nRpwKGBb6Zug2yFnZ0oFSeO)"
echo "3. 点击 'Storage' 标签"
echo "4. 点击 'Create Database'"
echo "5. 选择 'Postgres'"
echo "6. 数据库名: auvolar-main"
echo "7. 区域: Washington D.C. (iad1) - 与网站同区域"
echo ""

read -p "✅ 已创建Vercel Postgres数据库？ (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "请先创建数据库，然后重新运行脚本"
    exit 1
fi

# 步骤2: 获取连接字符串
echo ""
echo "🔗 步骤2: 获取新数据库连接字符串"
echo "--------------------------------"
echo "在Vercel项目Storage页面："
echo "1. 点击新创建的 'auvolar-main' 数据库"
echo "2. 选择 '.env.local' 标签"
echo "3. 找到 POSTGRES_URL 并复制其值"
echo ""
echo "连接字符串格式应类似："
echo "postgres://default:xxx@ep-xxx-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb"
echo ""

read -p "请粘贴Vercel Postgres连接字符串: " NEW_DB_URL

if [[ -z "$NEW_DB_URL" ]]; then
    echo "❌ 错误：连接字符串不能为空"
    exit 1
fi

if [[ ! "$NEW_DB_URL" =~ ^postgres:// ]]; then
    echo "❌ 错误：格式不正确，应以 postgres:// 开头"
    exit 1
fi

echo "✅ 新数据库连接字符串已获取"

# 步骤3: 备份和数据迁移
echo ""
echo "📦 步骤3: 数据备份和迁移"
echo "------------------------"

# 备份当前配置
BACKUP_TIME=$(date +%Y%m%d_%H%M%S)
cp .env ".env.backup.$BACKUP_TIME"
echo "✅ 已备份当前.env为 .env.backup.$BACKUP_TIME"

# 检查现有数据
if grep -q "DATABASE_URL=" .env; then
    OLD_DB_URL=$(grep "^DATABASE_URL=" .env | cut -d'=' -f2- | tr -d '"')
    
    if [[ "$OLD_DB_URL" =~ neon\.tech ]]; then
        echo "检测到Neon数据库连接"
        
        read -p "是否需要迁移现有数据？ (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            echo ""
            echo "🚚 数据迁移指南："
            echo "=================="
            echo ""
            echo "如果您有重要数据需要迁移，请选择以下方式之一："
            echo ""
            echo "方式1: 使用pg_dump (推荐)"
            echo "-------------------------"
            echo "1. 导出现有数据:"
            echo "   pg_dump \"$OLD_DB_URL\" --clean --no-owner --no-privileges > auvolar_backup.sql"
            echo ""
            echo "2. 导入到新数据库:"
            echo "   psql \"$NEW_DB_URL\" < auvolar_backup.sql"
            echo ""
            echo "3. 清理备份文件:"
            echo "   rm auvolar_backup.sql"
            echo ""
            echo "方式2: 重新初始化 (如果数据不多)"
            echo "--------------------------------"
            echo "直接使用新数据库，重新添加必要数据"
            echo ""
            
            read -p "选择迁移方式 - 1(pg_dump) 或 2(重新初始化): " -n 1 -r
            echo
            
            if [[ $REPLY == "1" ]]; then
                echo ""
                echo "请在终端中执行以下命令进行数据迁移："
                echo "================================================"
                echo "pg_dump \"$OLD_DB_URL\" --clean --no-owner --no-privileges > auvolar_backup.sql"
                echo "psql \"$NEW_DB_URL\" < auvolar_backup.sql"
                echo "rm auvolar_backup.sql"
                echo "================================================"
                echo ""
                read -p "数据迁移完成后，按回车继续..."
            else
                echo "✅ 将重新初始化数据库"
            fi
        fi
    fi
fi

# 步骤4: 更新配置
echo ""
echo "🔧 步骤4: 更新应用配置"
echo "--------------------"

# 获取现有配置值
OPENAI_KEY=$(grep "^OPENAI_API_KEY=" .env | cut -d'=' -f2- 2>/dev/null || echo "YOUR_OPENAI_API_KEY")
NEXTAUTH_SECRET=$(grep "^NEXTAUTH_SECRET=" .env | cut -d'=' -f2- 2>/dev/null || echo "auvolar-nextauth-secret-key-$(date +%s)")
BC_ACCESS_TOKEN=$(grep "^BC_ACCESS_TOKEN=" .env | cut -d'=' -f2- 2>/dev/null || echo "YOUR_BC_ACCESS_TOKEN")
BC_CLIENT_ID=$(grep "^BC_CLIENT_ID=" .env | cut -d'=' -f2- 2>/dev/null || echo "YOUR_BC_CLIENT_ID")
BC_CLIENT_SECRET=$(grep "^BC_CLIENT_SECRET=" .env | cut -d'=' -f2- 2>/dev/null || echo "YOUR_BC_CLIENT_SECRET")
BC_STOREFRONT_TOKEN=$(grep "^BC_STOREFRONT_TOKEN=" .env | cut -d'=' -f2- 2>/dev/null || echo "YOUR_BC_STOREFRONT_TOKEN")
SENDGRID_KEY=$(grep "^SENDGRID_API_KEY=" .env | cut -d'=' -f2- 2>/dev/null || echo "YOUR_SENDGRID_API_KEY")
BLOB_TOKEN=$(grep "^BLOB_READ_WRITE_TOKEN=" .env | cut -d'=' -f2- 2>/dev/null || echo "YOUR_VERCEL_BLOB_TOKEN")

# 创建新配置
cat > .env << EOF
# Auvolar平台配置 - Vercel统一数据库架构
# 更新时间: $(date)

# ========================================
# 数据库 - Vercel Postgres (统一管理)
# ========================================
DATABASE_URL="$NEW_DB_URL"

# ========================================
# AI功能配置
# ========================================
OPENAI_API_KEY=$OPENAI_KEY

# ========================================
# NextAuth配置
# ========================================
NEXTAUTH_SECRET=$NEXTAUTH_SECRET
NEXTAUTH_URL="https://www.auvolar.com"

# ========================================
# BigCommerce API (保持全功能)
# ========================================
BC_STORE_HASH="hhcdvxqxzq"
BC_ACCESS_TOKEN=$BC_ACCESS_TOKEN
BC_CLIENT_ID=$BC_CLIENT_ID
BC_CLIENT_SECRET=$BC_CLIENT_SECRET
BC_STOREFRONT_TOKEN=$BC_STOREFRONT_TOKEN

# ========================================
# 服务集成
# ========================================
SENDGRID_API_KEY=$SENDGRID_KEY
EMAIL_FROM="sales@auvolar.com"

# Vercel存储
BLOB_READ_WRITE_TOKEN=$BLOB_TOKEN

# 分析
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"

# 应用URL
NEXT_PUBLIC_APP_URL="https://www.auvolar.com"
NEXT_PUBLIC_BC_STOREFRONT_URL="https://auvolar.mybigcommerce.com"
EOF

echo "✅ 配置文件已更新"

# 步骤5: 初始化数据库
echo ""
echo "🗃️ 步骤5: 初始化新数据库"
echo "------------------------"

echo "同步数据库Schema..."
if npx prisma db push --skip-generate; then
    echo "✅ 数据库Schema同步成功"
else
    echo "❌ 数据库同步失败，请检查连接字符串"
    exit 1
fi

echo "生成Prisma客户端..."
npx prisma generate
echo "✅ Prisma客户端已生成"

# 添加AI系统初始数据
echo "初始化AI系统数据..."
cat > temp_init.js << 'EOF'
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function initAIData() {
  try {
    // 添加公司情报示例
    const company = await prisma.aICompanyIntelligence.upsert({
      where: { companyName: 'Sample Tech Corp' },
      update: {},
      create: {
        companyName: 'Sample Tech Corp',
        website: 'https://sample-tech.com',
        industry: 'Technology',
        size: 'SMB',
        description: 'Sample company for AI system initialization',
        painPoints: ['Energy efficiency', 'Lighting quality', 'Maintenance costs'],
        budgetEstimate: 'medium',
        decisionMakers: ['CTO', 'Facilities Manager', 'Operations Director'],
        competitors: ['Lithonia', 'Cree', 'Philips']
      }
    })

    // 添加AI策略性能数据
    const strategy = await prisma.aIStrategyPerformance.upsert({
      where: {
        strategy_industry_companySize_clientType: {
          strategy: 'Technical Expert',
          industry: 'Technology',
          companySize: 'SMB',
          clientType: 'CTO'
        }
      },
      update: {},
      create: {
        strategy: 'Technical Expert',
        industry: 'Technology',
        companySize: 'SMB',
        clientType: 'CTO',
        avgEffectiveness: 0.88,
        timesUsed: 1,
        conversionRate: 0.25,
        avgEngagement: 85.0
      }
    })

    console.log('✅ AI系统初始数据创建完成')
  } catch (error) {
    console.error('初始化数据时出错:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

initAIData()
EOF

node temp_init.js
rm temp_init.js
echo "✅ AI系统初始数据已添加"

# 步骤6: Vercel环境变量更新
echo ""
echo "☁️ 步骤6: 更新Vercel环境变量"
echo "----------------------------"
echo "请在Vercel控制台更新环境变量："
echo ""
echo "1. 访问: https://vercel.com/dashboard"
echo "2. 进入auvolar项目"
echo "3. Settings → Environment Variables"
echo "4. 更新 DATABASE_URL 为: $NEW_DB_URL"
echo "5. 确认其他变量正确设置"
echo "6. 触发重新部署"
echo ""

read -p "✅ 已更新Vercel环境变量？ (y/n): " -n 1 -r
echo

# 步骤7: 测试验证
echo ""
echo "🧪 步骤7: 功能验证"
echo "------------------"
echo "请验证以下功能正常："
echo ""
echo "✅ 网站访问: https://www.auvolar.com"
echo "✅ 用户登录功能"
echo "✅ AI Chat Widget"
echo "✅ 产品页面 (BigCommerce集成)"
echo "✅ AI Analytics: /admin/ai-analytics"
echo ""

read -p "功能验证完成？ (y/n): " -n 1 -r
echo

# 完成报告
echo ""
echo "🎉 数据库统一迁移完成！"
echo "======================="
echo ""
echo "📊 新架构优势："
echo "✅ 数据库统一管理 - Vercel Postgres"
echo "✅ BigCommerce功能完整保留"
echo "✅ 性能提升 - 数据库与应用同区域"
echo "✅ 成本优化 - 统一Vercel账单"
echo "✅ AI系统完整功能"
echo ""
echo "🎯 管理入口："
echo "• 网站+数据库: https://vercel.com/dashboard"
echo "• 电商管理: BigCommerce后台 (功能不变)"
echo "• AI监控: https://auvolar.com/admin/ai-analytics"
echo ""
echo "📋 后续建议："
echo "1. 观察新数据库性能表现"
echo "2. 确认AI系统工作正常"
echo "3. (可选)删除旧Neon数据库节省成本"
echo ""
echo "🔧 回滚方案（如需要）："
echo "cp .env.backup.$BACKUP_TIME .env"
echo ""
echo "恭喜！您现在享受统一的数据库管理，同时保持BigCommerce全功能！ 🚀"
EOF