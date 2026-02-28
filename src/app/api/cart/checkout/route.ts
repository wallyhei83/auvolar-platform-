import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutUrl, createCart } from '@/lib/bigcommerce'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    let { cartId, items } = body

    // If no cartId but have items, create a cart first
    if (!cartId && items && items.length > 0) {
      const cartItems = items.map((item: any) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        ...(item.variant_id && { variant_id: item.variant_id }),
      }))
      const newCart = await createCart(cartItems)
      cartId = newCart.data.id
    }

    if (!cartId) {
      return NextResponse.json({
        error: 'No cart ID provided and no items to create cart',
      }, { status: 400 })
    }

    // Create checkout redirect URL
    const checkoutResult = await createCheckoutUrl(cartId)
    
    // BigCommerce generates checkout URLs using the site's primary domain (auvolar.com),
    // but checkout is hosted on BigCommerce's servers, not our Vercel frontend.
    // Replace with the BigCommerce-hosted domain for checkout to work.
    const BC_CHECKOUT_DOMAIN = 'https://checkout.auvolar.com'
    const checkoutUrl = checkoutResult.data.checkout_url.replace(
      'https://auvolar.com',
      BC_CHECKOUT_DOMAIN
    )
    const cartUrl = checkoutResult.data.cart_url?.replace(
      'https://auvolar.com',
      BC_CHECKOUT_DOMAIN
    )
    
    return NextResponse.json({
      checkoutUrl,
      cartUrl,
      cartId,
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({
      error: 'Failed to create checkout',
      details: String(error),
    }, { status: 500 })
  }
}
