/**
 * BigCommerce API Client
 * Handles communication with BigCommerce Management & Storefront APIs
 */

const BC_STORE_HASH = process.env.BC_STORE_HASH
const BC_ACCESS_TOKEN = process.env.BC_ACCESS_TOKEN

const MANAGEMENT_API_URL = `https://api.bigcommerce.com/stores/${BC_STORE_HASH}/v3`
const MANAGEMENT_API_V2_URL = `https://api.bigcommerce.com/stores/${BC_STORE_HASH}/v2`

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
}

async function bcFetch<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body } = options

  if (!BC_STORE_HASH || !BC_ACCESS_TOKEN) {
    throw new Error('BigCommerce credentials not configured')
  }

  const response = await fetch(`${MANAGEMENT_API_URL}${endpoint}`, {
    method,
    headers: {
      'X-Auth-Token': BC_ACCESS_TOKEN,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`BigCommerce API error: ${response.status} - ${error}`)
  }

  const data = await response.json()
  return data.data ?? data
}

async function bcFetchV2<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body } = options

  if (!BC_STORE_HASH || !BC_ACCESS_TOKEN) {
    throw new Error('BigCommerce credentials not configured')
  }

  const response = await fetch(`${MANAGEMENT_API_V2_URL}${endpoint}`, {
    method,
    headers: {
      'X-Auth-Token': BC_ACCESS_TOKEN,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`BigCommerce API error: ${response.status} - ${error}`)
  }

  return response.json()
}

// ============================================
// PRODUCTS
// ============================================

export interface BCProduct {
  id: number
  name: string
  sku: string
  price: number
  sale_price?: number
  description: string
  categories: number[]
  inventory_level: number
  inventory_tracking: string
  is_visible: boolean
  custom_url: { url: string }
  images: BCProductImage[]
}

export interface BCProductImage {
  id: number
  product_id: number
  url_standard: string
  url_thumbnail: string
  is_thumbnail: boolean
}

export async function getProducts(params?: {
  page?: number
  limit?: number
  category?: number
  keyword?: string
}): Promise<{ data: BCProduct[]; meta: { pagination: { total: number } } }> {
  const searchParams = new URLSearchParams()
  if (params?.page) searchParams.set('page', params.page.toString())
  if (params?.limit) searchParams.set('limit', params.limit.toString())
  if (params?.category) searchParams.set('categories:in', params.category.toString())
  if (params?.keyword) searchParams.set('keyword', params.keyword)

  const query = searchParams.toString()
  return bcFetch(`/catalog/products${query ? `?${query}` : ''}`)
}

export async function getProduct(productId: number): Promise<BCProduct> {
  return bcFetch(`/catalog/products/${productId}?include=images,variants`)
}

export async function getProductBySku(sku: string): Promise<BCProduct | null> {
  const result = await bcFetch<BCProduct[]>(`/catalog/products?sku=${encodeURIComponent(sku)}`)
  return result[0] ?? null
}

// ============================================
// ORDERS
// ============================================

export interface BCOrder {
  id: number
  status_id: number
  status: string
  customer_id: number
  date_created: string
  date_modified: string
  subtotal_ex_tax: string
  subtotal_inc_tax: string
  shipping_cost_ex_tax: string
  total_ex_tax: string
  total_inc_tax: string
  items_total: number
  payment_method: string
  billing_address: BCAddress
  shipping_addresses: { url: string }
  products: { url: string }
}

export interface BCAddress {
  first_name: string
  last_name: string
  company: string
  street_1: string
  street_2: string
  city: string
  state: string
  zip: string
  country: string
  email: string
  phone: string
}

export async function getOrders(params?: {
  customer_id?: number
  status_id?: number
  min_date_created?: string
  max_date_created?: string
  page?: number
  limit?: number
}): Promise<BCOrder[]> {
  const searchParams = new URLSearchParams()
  if (params?.customer_id) searchParams.set('customer_id', params.customer_id.toString())
  if (params?.status_id) searchParams.set('status_id', params.status_id.toString())
  if (params?.min_date_created) searchParams.set('min_date_created', params.min_date_created)
  if (params?.max_date_created) searchParams.set('max_date_created', params.max_date_created)
  if (params?.page) searchParams.set('page', params.page.toString())
  if (params?.limit) searchParams.set('limit', params.limit.toString())

  const query = searchParams.toString()
  return bcFetchV2(`/orders${query ? `?${query}` : ''}`)
}

export async function getOrder(orderId: number): Promise<BCOrder> {
  return bcFetchV2(`/orders/${orderId}`)
}

export async function getOrderProducts(orderId: number): Promise<unknown[]> {
  return bcFetchV2(`/orders/${orderId}/products`)
}

export async function getOrderShipments(orderId: number): Promise<unknown[]> {
  return bcFetchV2(`/orders/${orderId}/shipments`)
}

// ============================================
// CUSTOMERS
// ============================================

export interface BCCustomer {
  id: number
  email: string
  first_name: string
  last_name: string
  company: string
  phone: string
  customer_group_id: number
  date_created: string
}

export async function getCustomer(customerId: number): Promise<BCCustomer> {
  const result = await bcFetch<BCCustomer[]>(`/customers?id:in=${customerId}`)
  if (!result[0]) throw new Error('Customer not found')
  return result[0]
}

export async function getCustomerByEmail(email: string): Promise<BCCustomer | null> {
  const result = await bcFetch<BCCustomer[]>(`/customers?email:in=${encodeURIComponent(email)}`)
  return result[0] ?? null
}

export async function createCustomer(data: {
  email: string
  first_name: string
  last_name: string
  company?: string
  phone?: string
}): Promise<BCCustomer> {
  const result = await bcFetch<BCCustomer[]>('/customers', {
    method: 'POST',
    body: [data],
  })
  return result[0]
}

// ============================================
// CATEGORIES
// ============================================

export interface BCCategory {
  id: number
  name: string
  description: string
  parent_id: number
  sort_order: number
  is_visible: boolean
  custom_url: { url: string }
}

export async function getCategories(): Promise<BCCategory[]> {
  return bcFetch('/catalog/categories?limit=100')
}

// ============================================
// INVENTORY
// ============================================

export async function updateInventory(productId: number, quantity: number): Promise<void> {
  await bcFetch(`/catalog/products/${productId}`, {
    method: 'PUT',
    body: { inventory_level: quantity },
  })
}

// ============================================
// PRICE LISTS (B2B)
// ============================================

export interface BCPriceList {
  id: number
  name: string
  active: boolean
}

export async function getPriceLists(): Promise<BCPriceList[]> {
  return bcFetch('/pricelists')
}

export async function getPriceListRecords(priceListId: number, productId?: number): Promise<unknown[]> {
  const params = productId ? `?product_id:in=${productId}` : ''
  return bcFetch(`/pricelists/${priceListId}/records${params}`)
}
