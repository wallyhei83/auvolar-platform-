'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ChevronRight, Trash2, Plus, Minus, ShoppingCart, Truck, Shield,
  Tag, AlertCircle, ArrowRight, Package, Zap, Info
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

interface CartItem {
  id: string
  name: string
  sku: string
  price: number
  quantity: number
  stock: string
  stockQty: number
  image?: string
}

// Mock cart data
const initialCart: CartItem[] = [
  { id: '1', name: 'UFO High Bay 150W 5000K', sku: 'HB-UFO-150W-5K', price: 89, quantity: 10, stock: 'In Stock', stockQty: 245 },
  { id: '2', name: 'Wall Pack 80W 5000K', sku: 'WP-80W-5K', price: 79, quantity: 5, stock: 'In Stock', stockQty: 210 },
  { id: '3', name: 'Motion Sensor PIR', sku: 'MS-PIR-HB', price: 29, quantity: 10, stock: 'In Stock', stockQty: 150 },
]

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(initialCart)
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const updateQuantity = (id: string, newQty: number) => {
    if (newQty < 1) return
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQty } : item
    ))
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const applyPromo = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true)
    }
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = promoApplied ? subtotal * 0.1 : 0
  const shipping = subtotal > 500 ? 0 : 49.99
  const total = subtotal - discount + shipping

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <ShoppingCart className="h-12 w-12 text-gray-400" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">Your cart is empty</h1>
          <p className="mt-2 text-gray-600">
            Looks like you haven't added any items yet.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-semibold text-black hover:bg-brand-dark"
          >
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-gray-900">Shopping Cart</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="mt-1 text-gray-600">{items.length} items in your cart</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
              {/* Header */}
              <div className="hidden border-b border-gray-200 px-6 py-4 sm:grid sm:grid-cols-12 sm:gap-4">
                <div className="col-span-6 text-sm font-medium text-gray-500">Product</div>
                <div className="col-span-2 text-center text-sm font-medium text-gray-500">Price</div>
                <div className="col-span-2 text-center text-sm font-medium text-gray-500">Quantity</div>
                <div className="col-span-2 text-right text-sm font-medium text-gray-500">Total</div>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="sm:grid sm:grid-cols-12 sm:gap-4">
                      {/* Product Info */}
                      <div className="col-span-6 flex gap-4">
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          <div className="flex h-full items-center justify-center">
                            <Zap className="h-8 w-8 text-gray-300" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                          <p className={`mt-1 text-xs ${item.stock === 'In Stock' ? 'text-green-600' : 'text-amber-600'}`}>
                            {item.stock}
                          </p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="mt-2 flex items-center gap-1 text-xs text-red-600 hover:text-red-700 sm:hidden"
                          >
                            <Trash2 className="h-3 w-3" />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-2 mt-4 flex items-center justify-between sm:mt-0 sm:justify-center">
                        <span className="text-sm text-gray-500 sm:hidden">Price:</span>
                        <span className="font-medium text-gray-900">${item.price}</span>
                      </div>

                      {/* Quantity */}
                      <div className="col-span-2 mt-4 flex items-center justify-between sm:mt-0 sm:justify-center">
                        <span className="text-sm text-gray-500 sm:hidden">Qty:</span>
                        <div className="flex items-center rounded-lg border border-gray-300">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-2 hover:bg-gray-50"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-10 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-2 hover:bg-gray-50"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="col-span-2 mt-4 flex items-center justify-between sm:mt-0 sm:justify-end">
                        <span className="text-sm text-gray-500 sm:hidden">Total:</span>
                        <div className="flex items-center gap-4">
                          <span className="font-semibold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="hidden text-gray-400 hover:text-red-500 sm:block"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-6 flex justify-between">
              <Link
                href="/products"
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand"
              >
                ← Continue Shopping
              </Link>
              <Link
                href="/tools/quick-order"
                className="flex items-center gap-2 text-sm font-medium text-brand hover:underline"
              >
                <Package className="h-4 w-4" />
                Quick Order More Items
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-[160px] rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
              </div>

              <div className="p-6">
                {/* Promo Code */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-700">Promo Code</label>
                  <div className="mt-1 flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
                    />
                    <button
                      onClick={applyPromo}
                      className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:border-brand hover:text-brand"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="mt-2 flex items-center gap-1 text-xs text-green-600">
                      <Tag className="h-3 w-3" />
                      10% discount applied!
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-400">Try "SAVE10" for demo</p>
                </div>

                {/* Totals */}
                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {promoApplied && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount (10%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-500">Calculated at checkout</span>
                  </div>
                </div>

                <div className="my-4 border-t border-gray-200" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Estimated Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {/* Free Shipping Notice */}
                {subtotal < 500 && (
                  <div className="mt-4 rounded-lg bg-blue-50 p-3">
                    <p className="text-xs text-blue-700">
                      Add ${(500 - subtotal).toFixed(2)} more for <strong>FREE shipping</strong>
                    </p>
                    <div className="mt-2 h-1.5 rounded-full bg-blue-200">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: `${Math.min(100, (subtotal / 500) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Checkout Button */}
                <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-3 font-semibold text-black hover:bg-brand-dark">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </button>

                {/* Alternative */}
                <button className="mt-3 w-full rounded-lg border border-gray-300 py-3 font-medium text-gray-700 hover:border-brand hover:text-brand">
                  Request Quote
                </button>

                {/* Trust */}
                <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    Secure Checkout
                  </span>
                  <span className="flex items-center gap-1">
                    <Truck className="h-4 w-4" />
                    Fast Shipping
                  </span>
                </div>
              </div>
            </div>

            {/* Login Prompt */}
            <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 text-blue-600" />
                <div className="text-sm text-blue-800">
                  <Link href="/login" className="font-medium underline">Log in</Link> for:
                  <ul className="mt-1 list-inside list-disc text-blue-700">
                    <li>Contractor pricing (up to 30% off)</li>
                    <li>Net 30 payment terms</li>
                    <li>Saved addresses & reorder</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
