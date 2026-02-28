import { NextRequest, NextResponse } from 'next/server'

const STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH || process.env.BC_STORE_HASH
const ACCESS_TOKEN = process.env.BIGCOMMERCE_ACCESS_TOKEN || process.env.BC_ACCESS_TOKEN
const API_BASE = `https://api.bigcommerce.com/stores/${STORE_HASH}`

async function bcFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'X-Auth-Token': ACCESS_TOKEN || '',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    },
  })
  if (!response.ok) {
    const error = await response.text()
    throw new Error(`BigCommerce API error: ${response.status} - ${error}`)
  }
  return response.json()
}

// Get product modifiers
async function getProductModifiers(productId: number) {
  try {
    const result = await bcFetch<{ data: any[] }>(`/v3/catalog/products/${productId}/modifiers`)
    return result.data || []
  } catch {
    return []
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ cartId: null, message: 'Cart is empty' })
    }

    // Process each item and add default modifiers if needed
    const processedItems = await Promise.all(
      items.map(async (item: any) => {
        const lineItem: any = {
          product_id: item.product_id,
          quantity: item.quantity,
        }

        if (item.variant_id) {
          lineItem.variant_id = item.variant_id
        }

        // Fetch modifiers for this product
        const modifiers = await getProductModifiers(item.product_id)
        
        // Find required modifiers and use default values
        const requiredModifiers = modifiers.filter((m: any) => m.required)
        if (requiredModifiers.length > 0) {
          lineItem.option_selections = requiredModifiers.map((modifier: any) => {
            // Find default option value, or use first one
            const defaultOption = modifier.option_values?.find((v: any) => v.is_default) 
              || modifier.option_values?.[0]
            return {
              option_id: modifier.id,
              option_value: defaultOption?.id,
            }
          }).filter((sel: any) => sel.option_value) // Filter out any without valid option_value
        }

        return lineItem
      })
    )

    // Create cart with processed items
    const cartResponse = await bcFetch<{ data: any }>('/v3/carts', {
      method: 'POST',
      body: JSON.stringify({ line_items: processedItems }),
    })

    return NextResponse.json({
      cartId: cartResponse.data.id,
      cart: {
        id: cartResponse.data.id,
        items: cartResponse.data.line_items?.physical_items || [],
        subtotal: cartResponse.data.cart_amount,
      },
      message: 'Cart created with smart defaults',
    })
  } catch (error) {
    console.error('Smart cart sync error:', error)
    return NextResponse.json({
      error: 'Failed to create cart',
      details: String(error),
    }, { status: 500 })
  }
}
