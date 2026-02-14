import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number | string, currency = 'USD'): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(num)
}

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    ...options,
  }).format(d)
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(d)
}

// Generate case/quote numbers
export function generateCaseNumber(): string {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0')
  return `CS-${year}-${random}`
}

export function generateQuoteNumber(): string {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0')
  return `QT-${year}-${random}`
}

// SLA calculation (business days)
export function calculateSLA(caseType: string): Date {
  const now = new Date()
  const slaDays: Record<string, number> = {
    RFQ: 1,
    BOM: 1,
    RMA: 2,
    SHIPPING_DAMAGE: 2,
    PHOTOMETRIC: 3,
    REBATE: 5,
    NET_TERMS: 2,
    SUPPORT: 1,
  }
  
  const days = slaDays[caseType] || 1
  let businessDays = 0
  const result = new Date(now)
  
  while (businessDays < days) {
    result.setDate(result.getDate() + 1)
    const dayOfWeek = result.getDay()
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      businessDays++
    }
  }
  
  // Set to end of business day (5 PM ET)
  result.setHours(17, 0, 0, 0)
  
  return result
}
