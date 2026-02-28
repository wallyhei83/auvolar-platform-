import { NextRequest, NextResponse } from 'next/server'

// DISABLED: Setup endpoint is no longer needed. SUPER_ADMIN already exists.
export async function POST(_request: NextRequest) {
  return NextResponse.json({ message: 'Setup endpoint has been disabled.' }, { status: 410 })
}
