#!/bin/bash
# Safe Prisma build script for Vercel

echo "🔧 Safe Prisma build for Vercel..."

# Generate Prisma client without database connection
echo "📦 Generating Prisma client..."
npx prisma generate

echo "✅ Prisma client generated successfully"