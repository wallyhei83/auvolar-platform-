import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { syncContactToHubSpot } from '@/lib/hubspot'
import { rateLimit, getClientIP } from '@/lib/rate-limit'

// Bot detection: check if name/company looks like random garbage
function looksLikeGarbage(str: string): boolean {
  if (!str || str.length < 2) return false
  // Random case mixing: more than 60% of chars alternate case
  const hasExcessiveCaseMixing = str.length > 8 && 
    (str.split('').filter((c, i) => i > 0 && 
      ((c === c.toUpperCase() && str[i-1] === str[i-1].toLowerCase()) ||
       (c === c.toLowerCase() && str[i-1] === str[i-1].toUpperCase()))
    ).length / str.length) > 0.5
  // No spaces in a long string (real company names have spaces)
  const noSpacesLong = str.length > 15 && !str.includes(' ')
  // All consonants or mostly random chars
  const vowelRatio = (str.match(/[aeiouAEIOU]/g)?.length || 0) / str.length
  const tooFewVowels = str.length > 10 && vowelRatio < 0.15
  
  return hasExcessiveCaseMixing || noSpacesLong || tooFewVowels
}

// Check for disposable/suspicious email patterns
function isSuspiciousEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase() || ''
  // Common disposable email patterns
  const disposablePatterns = [
    'tempmail', 'guerrilla', 'throwaway', 'mailinator', 'yopmail',
    'sharklasers', 'grr.la', 'guerrillamail', 'dispostable', 'maildrop',
  ]
  if (disposablePatterns.some(p => domain.includes(p))) return true
  // Email local part looks like random garbage
  const localPart = email.split('@')[0]
  if (localPart.length > 20 && !localPart.includes('.') && !localPart.includes('_')) return true
  return false
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 3 registration attempts per IP per 15 minutes (stricter)
    const ip = getClientIP(request)
    const limiter = rateLimit(`register:${ip}`, { maxRequests: 3, windowMs: 15 * 60 * 1000 })
    if (!limiter.success) {
      return NextResponse.json(
        { message: 'Too many registration attempts. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { email, password, name, companyName, phone, website, _gotcha, _ts } = body

    // ===== ANTI-BOT LAYER 1: Honeypot field =====
    // If "website" (hidden field) or "_gotcha" is filled, it's a bot
    if (website || _gotcha) {
      // Pretend success to not alert the bot
      return NextResponse.json({
        message: 'Account created successfully',
        user: { id: 'ok', email, name, companyName },
      })
    }

    // ===== ANTI-BOT LAYER 2: Timing check =====
    // If form was submitted in less than 3 seconds, likely a bot
    if (_ts) {
      const elapsed = Date.now() - parseInt(_ts)
      if (elapsed < 3000) {
        // Too fast — bot
        return NextResponse.json({
          message: 'Account created successfully',
          user: { id: 'ok', email, name, companyName },
        })
      }
    }

    // ===== ANTI-BOT LAYER 3: Content validation =====
    if (looksLikeGarbage(name) || looksLikeGarbage(companyName)) {
      return NextResponse.json(
        { message: 'Please provide a valid name and company name.' },
        { status: 400 }
      )
    }

    if (isSuspiciousEmail(email)) {
      return NextResponse.json(
        { message: 'Please use a valid business email address.' },
        { status: 400 }
      )
    }

    // Validate required fields
    if (!email || !password || !name || !companyName) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Password strength
    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'An account with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Create user
    const user = await db.user.create({
      data: {
        email,
        passwordHash,
        name,
        companyName,
        phone,
        role: 'CUSTOMER',
      },
    })

    // Sync new user to HubSpot CRM (non-blocking)
    syncContactToHubSpot({
      email,
      firstname: name,
      phone: phone || undefined,
      company: companyName,
      lead_source: 'registration',
    }).catch(err => {
      console.error('HubSpot sync error on registration:', err)
    })

    return NextResponse.json({
      message: 'Account created successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        companyName: user.companyName,
      },
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'An error occurred during registration' },
      { status: 500 }
    )
  }
}
