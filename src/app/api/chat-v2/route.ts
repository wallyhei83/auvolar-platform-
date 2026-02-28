// Chat V2 - redirects to the main chat API for consistency
// Kept for backward compatibility
import { NextRequest } from 'next/server'
import { POST as chatHandler } from '../chat/route'

export async function POST(request: NextRequest) {
  return chatHandler(request)
}
