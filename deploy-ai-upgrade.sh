#!/bin/bash

# Auvolar AI Sales System 2.0 - 部署脚本
# 一键启用超级AI销售代表

echo "🤖 Auvolar AI Sales System 2.0 部署开始..."
echo "========================================"

# 检查当前目录
if [[ ! -f "package.json" ]]; then
    echo "❌ 错误：请在 auvolar-platform- 根目录运行此脚本"
    exit 1
fi

echo "📍 当前目录: $(pwd)"

# 进入portal应用目录
cd apps/portal

echo "📦 1. 安装依赖..."
pnpm install

echo "🗃️  2. 更新数据库schema..."
npx prisma db push
if [ $? -eq 0 ]; then
    echo "✅ 数据库更新成功"
else
    echo "❌ 数据库更新失败，请检查DATABASE_URL配置"
    exit 1
fi

echo "🔧 3. 生成Prisma客户端..."
npx prisma generate
if [ $? -eq 0 ]; then
    echo "✅ Prisma客户端生成成功"
else
    echo "❌ Prisma客户端生成失败"
    exit 1
fi

# 检查环境变量
echo "🔍 4. 检查环境变量..."
if grep -q "OPENAI_API_KEY" .env; then
    echo "✅ OpenAI API key已配置"
else
    echo "⚠️  警告：未找到OPENAI_API_KEY，请在.env中添加"
fi

if grep -q "DATABASE_URL" .env; then
    echo "✅ 数据库连接已配置"
else
    echo "❌ 错误：未找到DATABASE_URL"
    exit 1
fi

# 构建应用
echo "🏗️  5. 构建应用..."
pnpm build
if [ $? -eq 0 ]; then
    echo "✅ 应用构建成功"
else
    echo "❌ 应用构建失败，请检查代码"
    exit 1
fi

# 备份原chat widget
echo "💾 6. 备份原始chat widget..."
if [[ -f "src/components/chat/chat-widget.tsx" ]]; then
    cp src/components/chat/chat-widget.tsx src/components/chat/chat-widget-v1-backup.tsx
    echo "✅ 原版chat widget已备份为 chat-widget-v1-backup.tsx"
else
    echo "⚠️  警告：未找到原始chat widget文件"
fi

# 创建切换脚本
echo "🔄 7. 创建版本切换脚本..."
cat > switch-chat-version.sh << 'EOF'
#!/bin/bash
# Chat Widget版本切换脚本

if [[ "$1" == "v1" ]]; then
    echo "切换到原版 Chat Widget..."
    if [[ -f "src/components/chat/chat-widget-v1-backup.tsx" ]]; then
        cp src/components/chat/chat-widget-v1-backup.tsx src/components/chat/chat-widget.tsx
        echo "✅ 已切换到 v1"
    else
        echo "❌ 未找到 v1 备份文件"
    fi
elif [[ "$1" == "v2" ]]; then
    echo "切换到AI 2.0 Chat Widget..."
    cp src/components/chat/chat-widget-v2.tsx src/components/chat/chat-widget.tsx
    echo "✅ 已切换到 v2 (AI 2.0)"
else
    echo "用法: $0 {v1|v2}"
    echo "当前chat widget版本:"
    head -n 5 src/components/chat/chat-widget.tsx | grep -o "ChatWidget.*"
fi
EOF

chmod +x switch-chat-version.sh
echo "✅ 版本切换脚本已创建：./switch-chat-version.sh"

# 初始种子数据
echo "🌱 8. 添加初始AI数据..."
cat > seed-ai-data.js << 'EOF'
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seedAIData() {
  console.log('🌱 添加AI系统初始数据...')
  
  // 添加公司情报样本
  await prisma.aICompanyIntelligence.upsert({
    where: { companyName: 'Sample Manufacturing Co' },
    update: {},
    create: {
      companyName: 'Sample Manufacturing Co',
      website: 'https://sample-mfg.com',
      industry: 'Manufacturing',
      size: 'SMB',
      description: 'Mid-size manufacturing facility',
      painPoints: ['High energy costs', 'Maintenance issues', 'Poor lighting uniformity'],
      budgetEstimate: 'medium',
      decisionMakers: ['Facilities Manager', 'Plant Manager', 'CFO'],
      competitors: ['Lithonia', 'Cree', 'Cooper'],
      timesAnalyzed: 1
    }
  })

  // 添加策略性能样本
  await prisma.aIStrategyPerformance.upsert({
    where: {
      strategy_industry_companySize_clientType: {
        strategy: 'Technical Deep-Dive',
        industry: 'Manufacturing',
        companySize: 'SMB',
        clientType: 'Engineer'
      }
    },
    update: {},
    create: {
      strategy: 'Technical Deep-Dive',
      industry: 'Manufacturing',
      companySize: 'SMB',
      clientType: 'Engineer',
      timesUsed: 5,
      avgEffectiveness: 0.85,
      conversionRate: 0.20,
      avgEngagement: 78.5,
      successFactors: { factors: ['Detailed specs', 'IES files', 'Technical comparisons'] },
      failureReasons: { reasons: ['Too technical for decision maker'] }
    }
  })

  console.log('✅ AI初始数据添加完成')
}

seedAIData()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
EOF

node seed-ai-data.js
rm seed-ai-data.js

echo ""
echo "🎉 AI Sales System 2.0 部署完成！"
echo "========================================"
echo ""
echo "📋 接下来的步骤："
echo "1. 选择启用方式："
echo "   - 立即启用：./switch-chat-version.sh v2"
echo "   - 保持原版：./switch-chat-version.sh v1"
echo ""
echo "2. 重新部署到Vercel："
echo "   - 自动部署：git push"
echo "   - 或手动部署：vercel --prod"
echo ""
echo "3. 访问管理界面："
echo "   - https://auvolar.com/admin/ai-analytics"
echo ""
echo "4. 测试新功能："
echo "   - 发送语音消息 🎙️"
echo "   - 上传图片分析 📷"
echo "   - 填写公司信息看智能分析 🧠"
echo ""
echo "⚙️  高级选项："
echo "- 版本切换：./switch-chat-version.sh {v1|v2}"
echo "- 查看AI性能：访问 /admin/ai-analytics"
echo "- 数据库管理：npx prisma studio"
echo ""
echo "🚀 超级AI销售代表已就绪！"

# 检查Vercel配置
if [[ -f "vercel.json" ]]; then
    echo ""
    echo "📦 Vercel配置检查:"
    if grep -q "prisma generate" vercel.json; then
        echo "✅ Vercel build配置正确"
    else
        echo "⚠️  建议在vercel.json中添加 prisma generate 到build命令"
    fi
fi

echo ""
echo "需要帮助？查看 AI-SALES-UPGRADE.md 详细文档"