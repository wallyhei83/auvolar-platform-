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
    echo ""
    echo "当前版本检测:"
    if grep -q "ChatWidgetV2\|多模态\|multimodal\|Multi-Modal" src/components/chat/chat-widget.tsx 2>/dev/null; then
        echo "🤖 AI 2.0 (超级智能多模态版本)"
    else
        echo "📝 原版 (标准聊天版本)"
    fi
fi
