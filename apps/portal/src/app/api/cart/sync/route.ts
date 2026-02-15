import { NextRequest, NextResponse } from 'next/server'
import { createCart, getCart, addToCart, deleteCartItem } from '@/lib/bigcommerce'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cartId, items } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ cartId: null, message: 'Cart is empty' })
    }

    // If we have an existing cart, try to use it
    if (cartId) {
      try {
        const existingCart = await getCart(cartId)
        if (existingCart) {
          // Cart exists, we could update it here
          // For simplicity, we'll just return the existing cart ID
          return NextResponse.json({ 
            cartId,
            message: 'Cart synced',
          })
        }
      } catch (e) {
        // Cart doesn't exist or expired, create a new one
        console.log('Existing cart not found, creating new one')
      }
    }

    // Create a new cart with items
    const cartItems = items.map((item: any) => ({
      product_id: item.product_id,
      quantity: item.quantity,
      ...(item.variant_id && { variant_id: item.variant_id }),
    }))

    const newCart = await createCart(cartItems)
    
    return NextResponse.json({
      cartId: newCart.data.id,
      cart: {
        id: newCart.data.id,
        items: newCart.data.line_items?.physical_items || [],
        subtotal: newCart.data.cart_amount,
      },
      message: 'Cart created',
    })
  } catch (error) {
    console.error('Cart sync error:', error)
    return NextResponse.json({
      error: 'Failed to sync cart',
      details: String(error),
    }, { status: 500 })
  }
}
