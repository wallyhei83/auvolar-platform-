#!/bin/bash

# AI Sales System 2.0 - 快速检查脚本
# 验证所有组件是否正确创建

echo "🔍 AI Sales System 2.0 - 组件检查"
echo "================================="
echo ""

cd apps/portal

# 检查核心文件
files=(
    "src/lib/ai-sales-system.ts"
    "src/lib/alex-ai-persona.ts" 
    "src/app/api/chat-v2/route.ts"
    "src/components/chat/chat-widget-v2.tsx"
    "src/app/admin/ai-analytics/page.tsx"
    "src/components/ui/badge.tsx"
    "src/components/ui/tabs.tsx"
)

echo "📁 核心文件检查："
for file in "${files[@]}"; do
    if [[ -f "$file" ]]; then
        size=$(wc -c < "$file")
        echo "✅ $file (${size} bytes)"
    else
        echo "❌ $file - 缺失"
    fi
done

echo ""
echo "🔧 数据库模型检查："
if grep -q "model AIClientProfile" prisma/schema.prisma; then
    echo "✅ AIClientProfile 模型已定义"
else
    echo "❌ AIClientProfile 模型缺失"
fi

if grep -q "model AIConversation" prisma/schema.prisma; then
    echo "✅ AIConversation 模型已定义"
else
    echo "❌ AIConversation 模型缺失"
fi

if grep -q "model AILeadData" prisma/schema.prisma; then
    echo "✅ AILeadData 模型已定义"
else
    echo "❌ AILeadData 模型缺失"
fi

if grep -q "model AICompanyIntelligence" prisma/schema.prisma; then
    echo "✅ AICompanyIntelligence 模型已定义"
else
    echo "❌ AICompanyIntelligence 模型缺失"
fi

if grep -q "model AIStrategyPerformance" prisma/schema.prisma; then
    echo "✅ AIStrategyPerformance 模型已定义"
else
    echo "❌ AIStrategyPerformance 模型缺失"
fi

echo ""
echo "📦 依赖检查："
if npm list @radix-ui/react-tabs &>/dev/null; then
    echo "✅ @radix-ui/react-tabs 已安装"
else
    echo "❌ @radix-ui/react-tabs 缺失"
fi

if npm list class-variance-authority &>/dev/null; then
    echo "✅ class-variance-authority 已安装"
else
    echo "❌ class-variance-authority 缺失"
fi

echo ""
echo "🎯 功能特性检查："

# 检查多模态功能
if grep -q "processAttachments" src/components/chat/chat-widget-v2.tsx; then
    echo "✅ 多模态处理功能"
else
    echo "❌ 多模态处理功能缺失"
fi

if grep -q "MultiModalProcessor" src/lib/ai-sales-system.ts; then
    echo "✅ 多模态处理器"
else
    echo "❌ 多模态处理器缺失"
fi

# 检查客户智能功能
if grep -q "analyzeCompany" src/lib/ai-sales-system.ts; then
    echo "✅ 公司智能分析"
else
    echo "❌ 公司智能分析缺失"
fi

if grep -q "analyzeJobRole" src/lib/ai-sales-system.ts; then
    echo "✅ 职位角色分析"
else
    echo "❌ 职位角色分析缺失"
fi

# 检查Alex AI人格
if grep -q "generatePersonalizedPrompt" src/lib/alex-ai-persona.ts; then
    echo "✅ 个性化AI人格"
else
    echo "❌ 个性化AI人格缺失"
fi

if grep -q "getProductRecommendations" src/lib/alex-ai-persona.ts; then
    echo "✅ 产品推荐引擎"
else
    echo "❌ 产品推荐引擎缺失"
fi

# 检查ROI计算
if grep -q "calculateROI" src/lib/alex-ai-persona.ts; then
    echo "✅ ROI计算器"
else
    echo "❌ ROI计算器缺失"
fi

echo ""
echo "🔧 TypeScript检查："
if npx tsc --noEmit --skipLibCheck 2>/dev/null; then
    echo "✅ TypeScript编译通过"
else
    echo "❌ TypeScript编译错误"
fi

echo ""
echo "📋 部署就绪状态："

# 检查环境文件
if [[ -f ".env" ]]; then
    echo "✅ 环境配置文件存在"
    if grep -q "DATABASE_URL" .env; then
        echo "   - DATABASE_URL 已配置"
    else
        echo "   ⚠️ DATABASE_URL 需要配置"
    fi
    if grep -q "OPENAI_API_KEY" .env; then
        echo "   - OPENAI_API_KEY 已配置"
    else
        echo "   ⚠️ OPENAI_API_KEY 需要配置"
    fi
else
    echo "❌ .env 文件不存在"
fi

# 检查部署脚本
if [[ -x "../enable-ai-system.sh" ]]; then
    echo "✅ 部署脚本就绪"
else
    echo "❌ 部署脚本不可执行"
fi

echo ""
echo "🎉 组件检查完成！"
echo ""

# 统计
total_files=${#files[@]}
existing_files=0
for file in "${files[@]}"; do
    if [[ -f "$file" ]]; then
        ((existing_files++))
    fi
done

percentage=$((existing_files * 100 / total_files))
echo "📊 完成度: ${existing_files}/${total_files} (${percentage}%)"

if [[ $existing_files -eq $total_files ]]; then
    echo "🚀 AI Sales System 2.0 已完全就绪！"
    echo ""
    echo "下一步："
    echo "1. 配置 .env 文件中的 DATABASE_URL 和 OPENAI_API_KEY"
    echo "2. 运行: ../enable-ai-system.sh"
    echo "3. 部署到生产环境"
else
    echo "⚠️ 部分组件缺失，需要重新创建"
fi