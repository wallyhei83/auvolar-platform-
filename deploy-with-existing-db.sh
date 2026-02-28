#!/bin/bash

# AI Sales System 2.0 - 使用现有数据库直接部署
# 如果已有数据库连接字符串，直接启用AI系统

set -e

echo "🤖 AI Sales System 2.0 - 快速部署"
echo "=================================="
echo "使用现有数据库连接，直接启用AI系统"
echo ""

# 检查目录
if [[ ! -f "package.json" ]]; then
    echo "❌ 错误：请在 auvolar-platform- 根目录运行"
    exit 1
fi

cd apps/portal

echo "🔍 检查当前数据库连接..."
if [[ -f ".env" ]] && grep -q "DATABASE_URL=" .env; then
    CURRENT_DB=$(grep "^DATABASE_URL=" .env | cut -d'=' -f2- | tr -d '"')
    echo "发现现有数据库连接: ${CURRENT_DB:0:50}..."
    
    read -p "是否使用现有数据库连接？ (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "✅ 使用现有数据库连接"
        
        # 验证连接
        echo "🔗 验证数据库连接..."
        if timeout 10 npx prisma db push --skip-generate 2>/dev/null; then
            echo "✅ 数据库连接正常"
        else
            echo "❌ 数据库连接失败，请检查连接字符串"
            read -p "是否继续部署？(y/n): " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                exit 1
            fi
        fi
    else
        echo "请提供新的数据库连接字符串"
        read -p "数据库连接字符串: " NEW_DB_URL
        
        # 更新.env文件
        sed -i.bak "s|^DATABASE_URL=.*|DATABASE_URL=\"$NEW_DB_URL\"|" .env
        echo "✅ 数据库连接已更新"
    fi
else
    echo "❌ 未找到数据库配置"
    read -p "请输入数据库连接字符串: " DB_URL
    
    if [[ -z "$DB_URL" ]]; then
        echo "❌ 数据库连接字符串不能为空"
        exit 1
    fi
    
    # 创建或更新.env文件
    if [[ -f ".env" ]]; then
        if grep -q "^DATABASE_URL=" .env; then
            sed -i.bak "s|^DATABASE_URL=.*|DATABASE_URL=\"$DB_URL\"|" .env
        else
            echo "DATABASE_URL=\"$DB_URL\"" >> .env
        fi
    else
        cat > .env << EOF
DATABASE_URL="$DB_URL"
OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
NEXTAUTH_SECRET="auvolar-secret-$(date +%s)"
NEXTAUTH_URL="https://www.auvolar.com"
BC_STORE_HASH="hhcdvxqxzq"
EMAIL_FROM="sales@auvolar.com"
NEXT_PUBLIC_APP_URL="https://www.auvolar.com"
EOF
    fi
    echo "✅ 数据库配置已添加"
fi

echo ""
echo "🔧 检查必需的环境变量..."

# 检查OpenAI API Key
if ! grep -q "^OPENAI_API_KEY=sk-" .env; then
    echo "⚠️ 需要配置OpenAI API Key"
    read -p "请输入OpenAI API Key (sk-...): " OPENAI_KEY
    
    if [[ -n "$OPENAI_KEY" ]] && [[ "$OPENAI_KEY" =~ ^sk- ]]; then
        if grep -q "^OPENAI_API_KEY=" .env; then
            sed -i.bak "s|^OPENAI_API_KEY=.*|OPENAI_API_KEY=\"$OPENAI_KEY\"|" .env
        else
            echo "OPENAI_API_KEY=\"$OPENAI_KEY\"" >> .env
        fi
        echo "✅ OpenAI API Key已配置"
    else
        echo "❌ OpenAI API Key格式不正确"
        exit 1
    fi
else
    echo "✅ OpenAI API Key已配置"
fi

echo ""
echo "📦 安装依赖..."
pnpm install

echo ""
echo "🗃️ 同步数据库Schema..."
npx prisma generate
if npx prisma db push --skip-generate; then
    echo "✅ 数据库Schema同步成功"
else
    echo "❌ 数据库Schema同步失败"
    exit 1
fi

echo ""
echo "🌱 初始化AI系统数据..."
cat > temp-seed.js << 'EOF'
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seedAI() {
  console.log('🤖 初始化AI系统...')
  
  try {
    await prisma.aICompanyIntelligence.upsert({
      where: { companyName: 'Demo Corporation' },
      update: {},
      create: {
        companyName: 'Demo Corporation',
        website: 'https://demo.com',
        industry: 'Manufacturing',
        size: 'SMB',
        description: 'Demo company for AI system',
        painPoints: ['Energy costs', 'Maintenance', 'Lighting quality'],
        budgetEstimate: 'medium',
        decisionMakers: ['Manager', 'Engineer', 'CFO'],
        competitors: ['Lithonia', 'Cree']
      }
    })

    await prisma.aIStrategyPerformance.upsert({
      where: {
        strategy_industry_companySize_clientType: {
          strategy: 'Consultative',
          industry: 'Manufacturing',
          companySize: 'SMB',
          clientType: 'Manager'
        }
      },
      update: {},
      create: {
        strategy: 'Consultative',
        industry: 'Manufacturing',
        companySize: 'SMB',
        clientType: 'Manager',
        avgEffectiveness: 0.80,
        timesUsed: 1
      }
    })

    console.log('✅ AI数据初始化完成')
  } catch (error) {
    console.error('初始化错误:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

seedAI()
EOF

node temp-seed.js
rm temp-seed.js
echo "✅ AI系统数据初始化完成"

echo ""
echo "🚀 启用AI Sales System 2.0..."

# 备份原版chat widget
if [[ -f "src/components/chat/chat-widget.tsx" ]] && [[ ! -f "src/components/chat/chat-widget-v1-backup.tsx" ]]; then
    cp src/components/chat/chat-widget.tsx src/components/chat/chat-widget-v1-backup.tsx
    echo "✅ 原版chat widget已备份"
fi

# 启用AI 2.0
if [[ -f "src/components/chat/chat-widget-v2.tsx" ]]; then
    cp src/components/chat/chat-widget-v2.tsx src/components/chat/chat-widget.tsx
    echo "✅ AI Chat Widget 2.0已启用"
else
    echo "❌ 错误: AI Chat Widget v2文件不存在"
    exit 1
fi

# 创建版本切换脚本
cat > switch-ai-version.sh << 'EOF'
#!/bin/bash
if [[ "$1" == "v1" ]]; then
    if [[ -f "src/components/chat/chat-widget-v1-backup.tsx" ]]; then
        cp src/components/chat/chat-widget-v1-backup.tsx src/components/chat/chat-widget.tsx
        echo "✅ 已切换到原版 Chat Widget"
    else
        echo "❌ 原版备份文件不存在"
    fi
elif [[ "$1" == "v2" ]]; then
    if [[ -f "src/components/chat/chat-widget-v2.tsx" ]]; then
        cp src/components/chat/chat-widget-v2.tsx src/components/chat/chat-widget.tsx
        echo "✅ 已切换到 AI 2.0 Chat Widget"
    else
        echo "❌ AI 2.0文件不存在"
    fi
else
    echo "用法: $0 {v1|v2}"
    echo "当前版本检测:"
    if grep -q "ChatWidgetV2\|多模态\|multimodal" src/components/chat/chat-widget.tsx 2>/dev/null; then
        echo "🤖 AI 2.0 (超级智能版本)"
    else
        echo "📝 原版 (标准聊天版本)"
    fi
fi
EOF

chmod +x switch-ai-version.sh

echo ""
echo "🎉 AI Sales System 2.0 部署完成！"
echo "================================="
echo ""
echo "🚀 新功能已激活："
echo "✅ 多模态交互 (语音/图片/文档)"
echo "✅ 客户智能分析系统"
echo "✅ 自适应销售策略"
echo "✅ 完整产品知识库"
echo "✅ 合作伙伴建设导向"
echo ""
echo "📊 管理界面："
echo "• AI Analytics: https://www.auvolar.com/admin/ai-analytics"
echo ""
echo "🎯 测试建议："
echo "1. 访问网站测试AI Chat Widget"
echo "2. 尝试语音输入功能 🎙️"
echo "3. 上传照片测试图片分析 📷"
echo "4. 填写公司信息测试智能分析 🧠"
echo ""
echo "🔧 版本管理："
echo "• 切换到原版: ./switch-ai-version.sh v1"
echo "• 切换到AI 2.0: ./switch-ai-version.sh v2"
echo ""
echo "📋 下一步："
echo "1. 测试所有功能正常"
echo "2. 提交代码: git add . && git commit -m 'AI 2.0' && git push"
echo "3. 在Vercel控制台确认环境变量正确"
echo ""
echo "🎊 恭喜！您的超级AI销售代表现已上线工作！"
EOF