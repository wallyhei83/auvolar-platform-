#!/bin/bash

# Auvolar AI Sales System 2.0 - 快速启用脚本
# 用于在环境配置完成后一键启用AI系统

echo "🤖 Auvolar AI Sales System 2.0 启用"
echo "=================================="
echo ""

# 检查当前目录
if [[ ! -f "package.json" ]]; then
    echo "❌ 错误：请在 auvolar-platform- 根目录运行此脚本"
    exit 1
fi

cd apps/portal

# 检查关键环境变量
echo "🔍 检查环境配置..."
if [[ ! -f ".env" ]]; then
    echo "❌ 错误：.env 文件不存在"
    echo "请先创建 .env 文件并配置必要的环境变量"
    exit 1
fi

# 检查必要的环境变量
missing_vars=""

if ! grep -q "DATABASE_URL=.*postgresql://" .env; then
    missing_vars="$missing_vars DATABASE_URL"
fi

if ! grep -q "OPENAI_API_KEY=sk-" .env; then
    missing_vars="$missing_vars OPENAI_API_KEY"
fi

if [[ -n "$missing_vars" ]]; then
    echo "❌ 缺少必要的环境变量: $missing_vars"
    echo ""
    echo "请在 .env 文件中配置："
    echo "DATABASE_URL=\"postgresql://user:pass@host:5432/auvolar?sslmode=require\""
    echo "OPENAI_API_KEY=\"sk-your-openai-key\""
    echo ""
    exit 1
fi

echo "✅ 环境变量检查通过"

# 更新数据库schema
echo "🗃️ 更新数据库schema..."
npx prisma db push --skip-generate
if [ $? -eq 0 ]; then
    echo "✅ 数据库更新成功"
else
    echo "❌ 数据库更新失败"
    echo "请检查 DATABASE_URL 是否正确"
    exit 1
fi

# 生成Prisma客户端
echo "🔧 生成Prisma客户端..."
npx prisma generate
if [ $? -eq 0 ]; then
    echo "✅ Prisma客户端生成成功"
else
    echo "❌ Prisma客户端生成失败"
    exit 1
fi

# 备份当前chat widget（如果还没备份）
if [[ ! -f "src/components/chat/chat-widget-backup.tsx" ]]; then
    echo "💾 备份原始chat widget..."
    cp src/components/chat/chat-widget.tsx src/components/chat/chat-widget-backup.tsx
    echo "✅ 原版备份完成"
fi

# 启用AI 2.0 Chat Widget
echo "🚀 启用AI Sales System 2.0..."
cp src/components/chat/chat-widget-v2.tsx src/components/chat/chat-widget.tsx
echo "✅ AI Chat Widget 2.0 已启用"

# 添加种子数据
echo "🌱 添加AI初始数据..."
cat > temp-seed.js << 'EOF'
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // 添加示例公司情报
  await prisma.aICompanyIntelligence.upsert({
    where: { companyName: 'Sample Manufacturing Co' },
    update: {},
    create: {
      companyName: 'Sample Manufacturing Co',
      website: 'https://sample-mfg.com',
      industry: 'Manufacturing',
      size: 'SMB',
      description: 'Mid-size manufacturing company',
      painPoints: ['High energy costs', 'Poor lighting uniformity', 'Maintenance issues'],
      budgetEstimate: 'medium',
      decisionMakers: ['Facilities Manager', 'Plant Manager', 'CFO'],
      competitors: ['Lithonia', 'Cree', 'Cooper Lighting']
    }
  })

  // 添加示例策略性能数据
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
      avgEffectiveness: 0.85,
      timesUsed: 1,
      conversionRate: 0.20,
      avgEngagement: 78.5
    }
  })

  console.log('✅ AI初始数据添加完成')
}

main()
  .catch((e) => {
    console.error('❌ 种子数据添加失败:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
EOF

node temp-seed.js
rm temp-seed.js

echo ""
echo "🎉 AI Sales System 2.0 启用成功！"
echo "=================================="
echo ""
echo "🔥 新功能已激活："
echo "✅ 多模态交互 (语音/图片/文档)"  
echo "✅ 客户智能分析"
echo "✅ 自适应销售策略"
echo "✅ 完整产品知识库"
echo "✅ 合作伙伴建设导向"
echo ""
echo "📊 管理界面："
echo "- https://www.auvolar.com/admin/ai-analytics"
echo ""
echo "🎯 立即测试："
echo "1. 访问网站chat widget"
echo "2. 尝试语音输入 🎙️"
echo "3. 上传设施照片 📷" 
echo "4. 填写公司信息看智能分析 🧠"
echo ""
echo "🔄 版本切换："
echo "- 回到原版：cp src/components/chat/chat-widget-backup.tsx src/components/chat/chat-widget.tsx"
echo "- 启用AI 2.0：cp src/components/chat/chat-widget-v2.tsx src/components/chat/chat-widget.tsx"
echo ""
echo "🚀 准备部署到生产环境："
echo "git add . && git commit -m \"AI Sales System 2.0 enabled\" && git push"
echo ""
echo "恭喜！您的超级AI销售代表已经就绪！"