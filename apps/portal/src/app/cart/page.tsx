'use client'

import Link from 'next/link'
import { 
  ShoppingCart, Trash2, Plus, Minus, ChevronRight, CreditCard, 
  Truck, Shield, ArrowLeft, Loader2 
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { useCart } from '@/lib/cart-context'

export default function CartPage() {
  const { items, itemCount, subtotal, loading, updateQuantity, removeItem, clearCart, checkout } = useCart()

  const handleCheckout = async () => {
    // Use BigCommerce hosted checkout
    const checkoutUrl = await checkout()
    if (checkoutUrl) {
      window.location.href = checkoutUrl
    } else {
      // Fallback if checkout creation fails
      alert('Unable to create checkout. Please try again or contact sales@auvolar.com')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium text-gray-900">Shopping Cart</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          🛒 Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl">
            <ShoppingCart className="w-20 h-20 mx-auto mb-6 text-gray-300" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">
              Looks like you haven't added any products yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-brand hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map(item => (
                <div key={item.id} className="bg-white rounded-xl p-6 flex gap-6">
                  {/* Image */}
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <ShoppingCart className="w-10 h-10 text-gray-300" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                      </div>
                      <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">Qty:</span>
                        <div className="flex items-center border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={loading}
                            className="p-2 hover:bg-gray-100 disabled:opacity-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={loading}
                            className="p-2 hover:bg-gray-100 disabled:opacity-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-sm text-gray-500">× ${item.price.toFixed(2)}</span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={loading}
                        className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart */}
              <div className="flex justify-between items-center pt-4">
                <Link href="/products" className="text-brand hover:underline flex items-center gap-1">
                  <ArrowLeft className="w-4 h-4" />
                  Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="text-gray-500 hover:text-red-500 text-sm"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 sticky top-[180px]">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-medium text-green-600">
                      {subtotal >= 500 ? 'FREE' : 'Calculated at checkout'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tax</span>
                    <span className="font-medium">Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t my-4"></div>

                <div className="flex justify-between text-lg font-semibold mb-6">
                  <span>Estimated Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loading || items.length === 0}
                  className="w-full bg-brand hover:bg-yellow-400 text-black font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Proceed to Checkout
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Secure checkout powered by BigCommerce
                </p>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Truck className="w-5 h-5 text-brand" />
                    <span>Free shipping on orders over $500</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Shield className="w-5 h-5 text-brand" />
                    <span>5-10 year warranty on all products</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
