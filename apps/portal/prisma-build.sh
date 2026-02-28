#!/bin/bash
# Safe Prisma build script for Vercel

echo "🔧 Safe Prisma build for Vercel..."

# Check if DATABASE_URL is available and valid
if [[ -z "$DATABASE_URL" ]] || [[ "$DATABASE_URL" == *"placeholder"* ]]; then
    echo "⚠️ No valid DATABASE_URL found, using build-safe configuration"
    export DATABASE_URL="postgresql://build:build@localhost:5432/build?sslmode=prefer"
fi

# Check if OPENAI_API_KEY is available
if [[ -z "$OPENAI_API_KEY" ]] || [[ "$OPENAI_API_KEY" == *"placeholder"* ]]; then
    echo "⚠️ No valid OPENAI_API_KEY found, using build-safe placeholder"
    export OPENAI_API_KEY="sk-build-placeholder"
fi

# Generate Prisma client
echo "📦 Generating Prisma client..."
npx prisma generate

echo "✅ Prisma client generated successfully"
echo "ℹ️ Note: Runtime configuration will use actual environment variables"