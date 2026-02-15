'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface CartItem {
  id: string
  productId: number
  variantId?: number
  name: string
  sku: string
  price: number
  quantity: number
  image?: string
}

interface CartContextType {
  items: CartItem[]
  cartId: string | null
  itemCount: number
  subtotal: number
  loading: boolean
  addToCart: (product: {
    productId: number
    variantId?: number
    name: string
    sku: string
    price: number
    quantity: number
    image?: string
  }) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  removeItem: (itemId: string) => Promise<void>
  clearCart: () => void
  checkout: () => Promise<string | null>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [cartId, setCartId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('lumilinkai_cart')
    const savedCartId = localStorage.getItem('lumilinkai_cart_id')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to load cart:', e)
      }
    }
    if (savedCartId) {
      setCartId(savedCartId)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('lumilinkai_cart', JSON.stringify(items))
  }, [items])

  useEffect(() => {
    if (cartId) {
      localStorage.setItem('lumilinkai_cart_id', cartId)
    }
  }, [cartId])

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const addToCart = async (product: {
    productId: number
    variantId?: number
    name: string
    sku: string
    price: number
    quantity: number
    image?: string
  }) => {
    setLoading(true)
    try {
      // Check if item already in cart
      const existingIndex = items.findIndex(
        item => item.productId === product.productId && item.variantId === product.variantId
      )

      if (existingIndex >= 0) {
        // Update quantity
        const newItems = [...items]
        newItems[existingIndex].quantity += product.quantity
        setItems(newItems)
      } else {
        // Add new item
        const newItem: CartItem = {
          id: `${product.productId}-${product.variantId || 'default'}-${Date.now()}`,
          ...product,
        }
        setItems([...items, newItem])
      }

      // Sync with BigCommerce cart
      await syncWithBigCommerce([...items, {
        id: `${product.productId}-${product.variantId || 'default'}-${Date.now()}`,
        ...product,
      }])
    } catch (error) {
      console.error('Failed to add to cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    setLoading(true)
    try {
      if (quantity <= 0) {
        await removeItem(itemId)
        return
      }
      const newItems = items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
      setItems(newItems)
      await syncWithBigCommerce(newItems)
    } finally {
      setLoading(false)
    }
  }

  const removeItem = async (itemId: string) => {
    setLoading(true)
    try {
      const newItems = items.filter(item => item.id !== itemId)
      setItems(newItems)
      await syncWithBigCommerce(newItems)
    } finally {
      setLoading(false)
    }
  }

  const clearCart = () => {
    setItems([])
    setCartId(null)
    localStorage.removeItem('lumilinkai_cart')
    localStorage.removeItem('lumilinkai_cart_id')
  }

  const syncWithBigCommerce = async (cartItems: CartItem[]) => {
    try {
      const response = await fetch('/api/cart/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartId,
          items: cartItems.map(item => ({
            product_id: item.productId,
            variant_id: item.variantId,
            quantity: item.quantity,
          })),
        }),
      })
      const data = await response.json()
      if (data.cartId) {
        setCartId(data.cartId)
      }
    } catch (error) {
      console.error('Failed to sync cart with BigCommerce:', error)
    }
  }

  const checkout = async (): Promise<string | null> => {
    if (!cartId && items.length === 0) return null
    
    setLoading(true)
    try {
      // Ensure cart is synced
      if (!cartId) {
        await syncWithBigCommerce(items)
      }

      // Get checkout URL
      const response = await fetch('/api/cart/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartId }),
      })
      const data = await response.json()
      
      if (data.checkoutUrl) {
        return data.checkoutUrl
      }
      return null
    } catch (error) {
      console.error('Failed to create checkout:', error)
      return null
    } finally {
      setLoading(false)
    }
  }

  return (
    <CartContext.Provider
      value={{
        items,
        cartId,
        itemCount,
        subtotal,
        loading,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
