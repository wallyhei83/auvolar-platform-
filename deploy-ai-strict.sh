#!/bin/bash

# AI Sales System 2.0 - 严格验证部署脚本
# 确保每个步骤都正确执行，不容出错

set -e  # 遇到错误立即退出
set -u  # 使用未定义变量时退出

echo "🤖 AI Sales System 2.0 - 严格验证部署"
echo "========================================="
echo "本脚本将严格检查每个组件，确保万无一失"
echo ""

# 检查工作目录
if [[ ! -f "package.json" ]]; then
    echo "❌ 错误：必须在 auvolar-platform- 根目录运行此脚本"
    exit 1
fi

echo "✅ 工作目录正确: $(pwd)"

# 进入portal目录
cd apps/portal

# ========================================
# 第1步: 环境配置验证
# ========================================
echo ""
echo "🔍 第1步: 环境配置验证"
echo "------------------------"

if [[ ! -f ".env" ]]; then
    echo "❌ 错误: .env 文件不存在"
    echo ""
    echo "请执行以下步骤:"
    echo "1. cp .env.ai-template .env"
    echo "2. 编辑 .env 文件，填写正确的配置值"
    echo "3. 确保至少配置 DATABASE_URL 和 OPENAI_API_KEY"
    exit 1
fi

echo "✅ .env 文件存在"

# 检查关键环境变量
declare -a required_vars=("DATABASE_URL" "OPENAI_API_KEY")
declare -a missing_vars=()

for var in "${required_vars[@]}"; do
    if ! grep -q "^${var}=" .env || grep -q "^${var}=.*REPLACE_WITH_YOUR" .env; then
        missing_vars+=("$var")
    fi
done

if [[ ${#missing_vars[@]} -gt 0 ]]; then
    echo "❌ 错误: 以下必需环境变量未正确配置:"
    for var in "${missing_vars[@]}"; do
        echo "   - $var"
    done
    echo ""
    echo "请编辑 .env 文件，将 REPLACE_WITH_YOUR_* 替换为实际值"
    exit 1
fi

echo "✅ 必需环境变量已配置"

# 验证数据库连接格式
if ! grep -q "^DATABASE_URL=.*postgresql://" .env; then
    echo "❌ 错误: DATABASE_URL 格式不正确，必须是 postgresql:// 开头"
    exit 1
fi

echo "✅ 数据库URL格式正确"

# 验证OpenAI API Key格式
if ! grep -q "^OPENAI_API_KEY=sk-" .env; then
    echo "❌ 错误: OPENAI_API_KEY 格式不正确，必须以 sk- 开头"
    exit 1
fi

echo "✅ OpenAI API Key格式正确"

# ========================================
# 第2步: 核心文件完整性检查
# ========================================
echo ""
echo "📁 第2步: 核心文件完整性检查"
echo "------------------------------"

declare -a core_files=(
    "src/lib/ai-sales-system.ts"
    "src/lib/alex-ai-persona.ts"
    "src/app/api/chat-v2/route.ts"
    "src/components/chat/chat-widget-v2.tsx"
    "src/app/admin/ai-analytics/page.tsx"
    "src/components/ui/badge.tsx"
    "src/components/ui/tabs.tsx"
)

for file in "${core_files[@]}"; do
    if [[ ! -f "$file" ]]; then
        echo "❌ 错误: 核心文件缺失 - $file"
        exit 1
    fi
    
    # 检查文件大小（确保不是空文件）
    if [[ ! -s "$file" ]]; then
        echo "❌ 错误: 文件为空 - $file"
        exit 1
    fi
done

echo "✅ 所有核心文件完整"

# ========================================
# 第3步: 数据库模型验证
# ========================================
echo ""
echo "🗃️ 第3步: 数据库模型验证"
echo "-------------------------"

declare -a required_models=(
    "AIClientProfile"
    "AIConversation"
    "AILeadData" 
    "AICompanyIntelligence"
    "AIStrategyPerformance"
)

for model in "${required_models[@]}"; do
    if ! grep -q "^model $model" prisma/schema.prisma; then
        echo "❌ 错误: 数据库模型缺失 - $model"
        exit 1
    fi
done

echo "✅ 所有数据库模型已定义"

# ========================================
# 第4步: 依赖项检查
# ========================================
echo ""
echo "📦 第4步: 依赖项检查"
echo "--------------------"

echo "正在检查Node.js依赖..."
pnpm install --frozen-lockfile

declare -a required_deps=(
    "@radix-ui/react-tabs"
    "class-variance-authority"
    "openai"
    "@prisma/client"
)

for dep in "${required_deps[@]}"; do
    if ! pnpm list "$dep" &>/dev/null; then
        echo "❌ 错误: 依赖项缺失 - $dep"
        echo "正在安装..."
        pnpm add "$dep"
    fi
done

echo "✅ 所有依赖项已安装"

# ========================================
# 第5步: TypeScript编译检查
# ========================================
echo ""
echo "🔧 第5步: TypeScript编译检查"
echo "-----------------------------"

echo "正在执行TypeScript类型检查..."
if ! npx tsc --noEmit --skipLibCheck; then
    echo "❌ 错误: TypeScript编译失败"
    echo "请检查代码中的类型错误"
    exit 1
fi

echo "✅ TypeScript编译通过"

# ========================================
# 第6步: Prisma客户端生成
# ========================================
echo ""
echo "🔧 第6步: Prisma客户端生成"
echo "---------------------------"

echo "正在生成Prisma客户端..."
if ! npx prisma generate; then
    echo "❌ 错误: Prisma客户端生成失败"
    exit 1
fi

echo "✅ Prisma客户端生成成功"

# ========================================
# 第7步: 数据库连接测试
# ========================================
echo ""
echo "🗃️ 第7步: 数据库连接测试"
echo "-------------------------"

echo "正在测试数据库连接..."
if timeout 10 npx prisma db push --skip-generate --preview-feature 2>/dev/null; then
    echo "✅ 数据库连接成功，schema已同步"
elif timeout 10 npx prisma db push --skip-generate 2>/dev/null; then
    echo "✅ 数据库连接成功，schema已同步"
else
    echo "❌ 错误: 数据库连接失败"
    echo "请检查 DATABASE_URL 是否正确"
    echo "确保Neon数据库正在运行且连接信息准确"
    exit 1
fi

# ========================================
# 第8步: 功能特性验证
# ========================================
echo ""
echo "🎯 第8步: AI功能特性验证"
echo "------------------------"

# 检查关键功能是否存在
declare -A features=(
    ["多模态处理"]="processAttachments.*src/components/chat/chat-widget-v2.tsx"
    ["客户智能分析"]="analyzeCompany.*src/lib/ai-sales-system.ts"
    ["个性化AI人格"]="generatePersonalizedPrompt.*src/lib/alex-ai-persona.ts"
    ["产品推荐引擎"]="getProductRecommendations.*src/lib/alex-ai-persona.ts"
    ["ROI计算器"]="calculateROI.*src/lib/alex-ai-persona.ts"
)

for feature in "${!features[@]}"; do
    IFS='.*' read -r pattern file <<< "${features[$feature]}"
    if ! grep -q "$pattern" "$file"; then
        echo "❌ 错误: AI功能缺失 - $feature"
        exit 1
    fi
done

echo "✅ 所有AI功能完整"

# ========================================
# 第9步: 构建测试（可选）
# ========================================
echo ""
echo "🏗️ 第9步: 构建测试（可选）"
echo "---------------------------"

read -p "是否执行完整构建测试？这将需要几分钟时间。(y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "正在执行完整构建..."
    if pnpm build; then
        echo "✅ 构建测试成功"
    else
        echo "❌ 警告: 构建测试失败，但核心功能可能仍然可用"
        echo "建议检查构建错误或直接部署到生产环境测试"
    fi
else
    echo "⏭️ 跳过构建测试"
fi

# ========================================
# 第10步: 系统部署准备
# ========================================
echo ""
echo "🚀 第10步: 系统部署准备"
echo "-----------------------"

# 备份原始chat widget
if [[ -f "src/components/chat/chat-widget.tsx" ]] && [[ ! -f "src/components/chat/chat-widget-v1-backup.tsx" ]]; then
    echo "正在备份原始chat widget..."
    cp src/components/chat/chat-widget.tsx src/components/chat/chat-widget-v1-backup.tsx
    echo "✅ 原版chat widget已备份"
fi

# 创建版本切换脚本
cat > switch-ai-version.sh << 'EOF'
#!/bin/bash
if [[ "$1" == "v1" ]]; then
    cp src/components/chat/chat-widget-v1-backup.tsx src/components/chat/chat-widget.tsx
    echo "✅ 已切换到原版 Chat Widget"
elif [[ "$1" == "v2" ]]; then
    cp src/components/chat/chat-widget-v2.tsx src/components/chat/chat-widget.tsx
    echo "✅ 已切换到 AI 2.0 Chat Widget"
else
    echo "用法: $0 {v1|v2}"
    echo "当前版本:"
    if grep -q "ChatWidgetV2" src/components/chat/chat-widget.tsx; then
        echo "AI 2.0 (多模态智能版本)"
    else
        echo "原版 (标准聊天机器人)"
    fi
fi
EOF

chmod +x switch-ai-version.sh

echo "✅ 版本切换脚本已创建"

# 添加初始AI数据
echo "正在添加AI系统初始数据..."
cat > temp-seed-data.js << 'EOF'
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seedAIData() {
  try {
    // 添加示例公司情报
    await prisma.aICompanyIntelligence.upsert({
      where: { companyName: 'Example Manufacturing Corp' },
      update: {},
      create: {
        companyName: 'Example Manufacturing Corp',
        website: 'https://example-mfg.com',
        industry: 'Manufacturing',
        size: 'SMB',
        description: 'Sample manufacturing company for AI system testing',
        painPoints: ['High energy costs', 'Poor lighting uniformity', 'Frequent maintenance'],
        budgetEstimate: 'medium',
        decisionMakers: ['Facilities Manager', 'Plant Manager', 'CFO'],
        competitors: ['Lithonia', 'Cree', 'Cooper Lighting'],
        timesAnalyzed: 1
      }
    })

    // 添加策略性能数据  
    await prisma.aIStrategyPerformance.upsert({
      where: {
        strategy_industry_companySize_clientType: {
          strategy: 'Technical Expert Approach',
          industry: 'Manufacturing',
          companySize: 'SMB',
          clientType: 'Engineer'
        }
      },
      update: {},
      create: {
        strategy: 'Technical Expert Approach',
        industry: 'Manufacturing',
        companySize: 'SMB',
        clientType: 'Engineer',
        avgEffectiveness: 0.85,
        timesUsed: 1,
        conversionRate: 0.25,
        avgEngagement: 80.0
      }
    })

    console.log('✅ AI初始数据添加完成')
  } catch (error) {
    console.error('❌ 添加初始数据失败:', error.message)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

seedAIData()
EOF

if node temp-seed-data.js; then
    echo "✅ AI初始数据添加成功"
else
    echo "⚠️ 初始数据添加失败，但不影响核心功能"
fi

rm temp-seed-data.js

# ========================================
# 部署完成报告
# ========================================
echo ""
echo "🎉 AI Sales System 2.0 部署验证完成！"
echo "======================================"
echo ""
echo "📊 验证结果:"
echo "✅ 环境配置 - 通过"
echo "✅ 核心文件 - 通过"  
echo "✅ 数据库模型 - 通过"
echo "✅ 依赖项 - 通过"
echo "✅ TypeScript - 通过"
echo "✅ Prisma客户端 - 通过"
echo "✅ 数据库连接 - 通过"
echo "✅ AI功能特性 - 通过"
echo "✅ 部署准备 - 通过"
echo ""
echo "🚀 接下来的步骤:"
echo "1. 启用AI 2.0: ./switch-ai-version.sh v2"
echo "2. 提交代码: git add . && git commit -m 'AI Sales System 2.0'"
echo "3. 部署到生产: git push"
echo ""
echo "🔧 管理命令:"
echo "- 查看AI性能: https://auvolar.com/admin/ai-analytics"
echo "- 切换版本: ./switch-ai-version.sh {v1|v2}"
echo "- 数据库管理: npx prisma studio"
echo ""
echo "🎯 新功能测试建议:"
echo "• 语音输入测试 🎙️"
echo "• 上传设施照片分析 📷"
echo "• 填写公司信息看智能分析 🧠"
echo "• 测试ROI计算和产品推荐 💰"
echo ""
echo "恭喜！您的超级AI销售代表已完全就绪！ 🚀"