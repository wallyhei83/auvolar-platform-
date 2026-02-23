// BigCommerce API Client for Auvolar
// Headless commerce integration

const STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH || process.env.BC_STORE_HASH
const ACCESS_TOKEN = process.env.BIGCOMMERCE_ACCESS_TOKEN || process.env.BC_ACCESS_TOKEN

const API_BASE = `https://api.bigcommerce.com/stores/${STORE_HASH}`

// API request helper
async function bcFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}${endpoint}`
  
  const response = await fetch(url, {
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
    console.error(`BigCommerce API error: ${response.status}`, error)
    throw new Error(`BigCommerce API error: ${response.status} - ${error}`)
  }

  return response.json()
}

// ==================== PRODUCTS ====================

export interface BCProduct {
  id: number
  name: string
  sku: string
  price: number
  sale_price?: number
  retail_price?: number
  cost_price?: number
  description: string
  type?: 'physical' | 'digital'
  availability?: string
  inventory_level?: number
  inventory_tracking?: 'none' | 'product' | 'variant'
  categories?: number[]
  brand_id?: number
  weight?: number
  width?: number
  height?: number
  depth?: number
  is_visible?: boolean
  sort_order?: number
  custom_fields?: { id?: number; name: string; value: string }[]
  custom_url?: { url: string; is_customized: boolean }
  variants?: BCVariant[]
  images?: BCImage[]
}

export interface BCVariant {
  id: number
  product_id: number
  sku: string
  price?: number
  sale_price?: number
  retail_price?: number
  weight?: number
  width?: number
  height?: number
  depth?: number
  inventory_level: number
  option_values: { id: number; label: string; option_display_name: string }[]
}

export interface BCImage {
  id: number
  product_id: number
  url_standard: string
  url_thumbnail: string
  url_zoom: string
  is_thumbnail: boolean
  sort_order: number
}

export interface BCCategory {
  id: number
  parent_id: number
  name: string
  description: string
  views: number
  sort_order: number
  page_title: string
  meta_keywords: string[]
  meta_description: string
  layout_file: string
  is_visible: boolean
  search_keywords: string
  default_product_sort: string
  image_url: string
  custom_url: { url: string; is_customized: boolean }
}

export interface BCCustomer {
  id: number
  email: string
  first_name: string
  last_name: string
  company: string
  phone: string
  customer_group_id: number
  addresses: BCAddress[]
}

export interface BCAddress {
  id: number
  customer_id: number
  first_name: string
  last_name: string
  company: string
  address1: string
  address2: string
  city: string
  state_or_province: string
  postal_code: string
  country: string
  country_code: string
  phone: string
  address_type: string
}

export interface BCCart {
  id: string
  customer_id: number
  email: string
  currency: { code: string }
  base_amount: number
  discount_amount: number
  cart_amount: number
  line_items: {
    physical_items: BCLineItem[]
    digital_items: BCLineItem[]
    custom_items: BCLineItem[]
  }
}

export interface BCLineItem {
  id: string
  product_id: number
  variant_id: number
  quantity: number
  list_price: number
  sale_price: number
  name: string
  sku: string
  image_url: string
}

// ==================== API FUNCTIONS ====================

// Test connection
export async function testConnection(): Promise<{ success: boolean; store?: any; error?: string }> {
  try {
    const data = await bcFetch<{ data: any }>('/v2/store')
    return { success: true, store: data }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

// Get store info
export async function getStoreInfo() {
  return bcFetch<any>('/v2/store')
}

// ==================== PRODUCTS ====================

// List all products
export async function getProducts(params?: {
  page?: number
  limit?: number
  include?: string
  'sku:in'?: string
  'categories:in'?: string
  is_visible?: boolean
  sort?: string
  direction?: string
}): Promise<{ data: BCProduct[]; meta: { pagination: any } }> {
  const searchParams = new URLSearchParams()
  if (params?.page) searchParams.set('page', String(params.page))
  if (params?.limit) searchParams.set('limit', String(params.limit))
  if (params?.include) searchParams.set('include', params.include)
  if (params?.['sku:in']) searchParams.set('sku:in', params['sku:in'])
  if (params?.['categories:in']) searchParams.set('categories:in', params['categories:in'])
  if (params?.is_visible !== undefined) searchParams.set('is_visible', String(params.is_visible))
  if (params?.sort) searchParams.set('sort', params.sort)
  if (params?.direction) searchParams.set('direction', params.direction)
  
  const query = searchParams.toString()
  return bcFetch(`/v3/catalog/products${query ? `?${query}` : ''}`)
}

// Get single product
export async function getProduct(productId: number, include?: string): Promise<{ data: BCProduct }> {
  const query = include ? `?include=${include}` : ''
  return bcFetch(`/v3/catalog/products/${productId}${query}`)
}

// Get product by SKU
export async function getProductBySku(sku: string): Promise<BCProduct | null> {
  const result = await getProducts({ 'sku:in': sku, include: 'variants,images,custom_fields' })
  return result.data[0] || null
}

// Create product
export async function createProduct(product: Partial<BCProduct>): Promise<{ data: BCProduct }> {
  return bcFetch('/v3/catalog/products', {
    method: 'POST',
    body: JSON.stringify(product),
  })
}

// Update product
export async function updateProduct(productId: number, product: Partial<BCProduct>): Promise<{ data: BCProduct }> {
  return bcFetch(`/v3/catalog/products/${productId}`, {
    method: 'PUT',
    body: JSON.stringify(product),
  })
}

// Delete product
export async function deleteProduct(productId: number): Promise<void> {
  await bcFetch(`/v3/catalog/products/${productId}`, { method: 'DELETE' })
}

// ==================== CATEGORIES ====================

// List categories
export async function getCategories(params?: {
  page?: number
  limit?: number
  parent_id?: number
  is_visible?: boolean
}): Promise<{ data: BCCategory[]; meta: { pagination: any } }> {
  const searchParams = new URLSearchParams()
  if (params?.page) searchParams.set('page', String(params.page))
  if (params?.limit) searchParams.set('limit', String(params.limit))
  if (params?.parent_id !== undefined) searchParams.set('parent_id', String(params.parent_id))
  if (params?.is_visible !== undefined) searchParams.set('is_visible', String(params.is_visible))
  
  const query = searchParams.toString()
  return bcFetch(`/v3/catalog/categories${query ? `?${query}` : ''}`)
}

// Create category
export async function createCategory(category: Partial<BCCategory>): Promise<{ data: BCCategory }> {
  return bcFetch('/v3/catalog/categories', {
    method: 'POST',
    body: JSON.stringify(category),
  })
}

// ==================== CUSTOMERS ====================

// List customers
export async function getCustomers(params?: {
  page?: number
  limit?: number
  'email:in'?: string
  'company:in'?: string
}): Promise<{ data: BCCustomer[]; meta: { pagination: any } }> {
  const searchParams = new URLSearchParams()
  if (params?.page) searchParams.set('page', String(params.page))
  if (params?.limit) searchParams.set('limit', String(params.limit))
  if (params?.['email:in']) searchParams.set('email:in', params['email:in'])
  if (params?.['company:in']) searchParams.set('company:in', params['company:in'])
  
  const query = searchParams.toString()
  return bcFetch(`/v3/customers${query ? `?${query}` : ''}`)
}

// Create customer
export async function createCustomer(customer: Partial<BCCustomer>): Promise<{ data: BCCustomer[] }> {
  return bcFetch('/v3/customers', {
    method: 'POST',
    body: JSON.stringify([customer]),
  })
}

// ==================== CARTS ====================

// Create cart
export async function createCart(items: {
  product_id: number
  quantity: number
  variant_id?: number
  option_selections?: { option_id: number; option_value: number }[]
}[], customerId?: number): Promise<{ data: BCCart }> {
  const body: any = {
    line_items: items.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity,
      ...(item.variant_id && { variant_id: item.variant_id }),
      ...(item.option_selections && { option_selections: item.option_selections }),
    })),
  }
  if (customerId) body.customer_id = customerId
  
  return bcFetch('/v3/carts', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

// Get cart
export async function getCart(cartId: string): Promise<{ data: BCCart }> {
  return bcFetch(`/v3/carts/${cartId}`)
}

// Add item to cart
export async function addToCart(cartId: string, items: {
  product_id: number
  quantity: number
  variant_id?: number
}[]): Promise<{ data: BCCart }> {
  return bcFetch(`/v3/carts/${cartId}/items`, {
    method: 'POST',
    body: JSON.stringify({
      line_items: items,
    }),
  })
}

// Update cart item
export async function updateCartItem(cartId: string, itemId: string, quantity: number): Promise<{ data: BCCart }> {
  return bcFetch(`/v3/carts/${cartId}/items/${itemId}`, {
    method: 'PUT',
    body: JSON.stringify({
      line_item: { quantity },
    }),
  })
}

// Delete cart item
export async function deleteCartItem(cartId: string, itemId: string): Promise<{ data: BCCart }> {
  return bcFetch(`/v3/carts/${cartId}/items/${itemId}`, {
    method: 'DELETE',
  })
}

// ==================== CHECKOUT ====================

// Create checkout redirect URL (for hosted checkout)
export async function createCheckoutUrl(cartId: string): Promise<{ data: { checkout_url: string; cart_url?: string } }> {
  return bcFetch(`/v3/carts/${cartId}/redirect_urls`, {
    method: 'POST',
  })
}

// ==================== ORDERS ====================

export interface BCOrder {
  id: number
  customer_id: number
  date_created: string
  date_modified: string
  status_id: number
  status: string
  subtotal_ex_tax: string
  subtotal_inc_tax: string
  total_ex_tax: string
  total_inc_tax: string
  items_total: number
  items_shipped: number
  payment_method: string
  billing_address: BCAddress
  shipping_addresses: BCAddress[]
  products: BCOrderProduct[]
}

export interface BCOrderProduct {
  id: number
  order_id: number
  product_id: number
  name: string
  sku: string
  quantity: number
  price_ex_tax: string
  price_inc_tax: string
  total_ex_tax: string
  total_inc_tax: string
}

// List orders
export async function getOrders(params?: {
  page?: number
  limit?: number
  customer_id?: number
  status_id?: number
  min_date_created?: string
  max_date_created?: string
}): Promise<BCOrder[]> {
  const searchParams = new URLSearchParams()
  if (params?.page) searchParams.set('page', String(params.page))
  if (params?.limit) searchParams.set('limit', String(params.limit))
  if (params?.customer_id) searchParams.set('customer_id', String(params.customer_id))
  if (params?.status_id) searchParams.set('status_id', String(params.status_id))
  if (params?.min_date_created) searchParams.set('min_date_created', params.min_date_created)
  if (params?.max_date_created) searchParams.set('max_date_created', params.max_date_created)
  
  const query = searchParams.toString()
  return bcFetch(`/v2/orders${query ? `?${query}` : ''}`)
}

// Get single order
export async function getOrder(orderId: number): Promise<BCOrder> {
  return bcFetch(`/v2/orders/${orderId}`)
}

// Get order products
export async function getOrderProducts(orderId: number): Promise<BCOrderProduct[]> {
  return bcFetch(`/v2/orders/${orderId}/products`)
}

// ==================== PRICE LISTS (for B2B tier pricing) ====================

export interface BCPriceList {
  id: number
  name: string
  active: boolean
}

export interface BCPriceListRecord {
  product_id: number
  variant_id?: number
  currency: string
  price: number
  sale_price?: number
  retail_price?: number
}

// List price lists
export async function getPriceLists(): Promise<{ data: BCPriceList[]; meta: any }> {
  return bcFetch('/v3/pricelists')
}

// Create price list
export async function createPriceList(name: string): Promise<{ data: BCPriceList }> {
  return bcFetch('/v3/pricelists', {
    method: 'POST',
    body: JSON.stringify({ name, active: true }),
  })
}

// Set price list records
export async function setPriceListRecords(priceListId: number, records: BCPriceListRecord[]): Promise<{ data: any }> {
  return bcFetch(`/v3/pricelists/${priceListId}/records`, {
    method: 'PUT',
    body: JSON.stringify(records),
  })
}

// ==================== CUSTOMER GROUPS (for B2B tiers) ====================

export interface BCCustomerGroup {
  id: number
  name: string
  is_default: boolean
  category_access: { type: string; categories: number[] }
  discount_rules: any[]
}

// List customer groups
export async function getCustomerGroups(): Promise<BCCustomerGroup[]> {
  return bcFetch('/v2/customer_groups')
}

// Create customer group
export async function createCustomerGroup(name: string, discountRules?: any[]): Promise<BCCustomerGroup> {
  return bcFetch('/v2/customer_groups', {
    method: 'POST',
    body: JSON.stringify({
      name,
      discount_rules: discountRules || [],
    }),
  })
}

// ==================== INVENTORY ====================

// Get inventory for a product
export async function getInventory(productId: number): Promise<{ data: { inventory_level: number } }> {
  const product = await getProduct(productId)
  return { data: { inventory_level: product.data.inventory_level ?? 0 } }
}

// Update inventory
export async function updateInventory(productId: number, inventoryLevel: number): Promise<{ data: BCProduct }> {
  return updateProduct(productId, { inventory_level: inventoryLevel })
}

// ==================== WEBHOOKS ====================

export interface BCWebhook {
  id: number
  client_id: string
  store_hash: string
  scope: string
  destination: string
  is_active: boolean
  created_at: string
  updated_at: string
}

// List webhooks
export async function getWebhooks(): Promise<{ data: BCWebhook[] }> {
  return bcFetch('/v3/hooks')
}

// Create webhook
export async function createWebhook(scope: string, destination: string): Promise<{ data: BCWebhook }> {
  return bcFetch('/v3/hooks', {
    method: 'POST',
    body: JSON.stringify({
      scope,
      destination,
      is_active: true,
    }),
  })
}

// Delete webhook
export async function deleteWebhook(webhookId: number): Promise<void> {
  await bcFetch(`/v3/hooks/${webhookId}`, { method: 'DELETE' })
}

// ==================== SYNC HELPER ====================

// Sync our product data to BigCommerce
export async function syncProductToBigCommerce(localProduct: {
  sku: string
  name: string
  price: number
  description: string
  categories?: number[]
  weight?: number
  inventory_level?: number
  custom_fields?: { name: string; value: string }[]
}): Promise<BCProduct> {
  // Check if product exists
  const existing = await getProductBySku(localProduct.sku)
  
  const productData = {
    name: localProduct.name,
    sku: localProduct.sku,
    price: localProduct.price,
    description: localProduct.description,
    type: 'physical' as const,
    weight: localProduct.weight || 1,
    categories: localProduct.categories || [],
    inventory_level: localProduct.inventory_level || 0,
    inventory_tracking: 'product' as const,
    is_visible: true,
    custom_fields: localProduct.custom_fields || [],
  }
  
  if (existing) {
    const result = await updateProduct(existing.id, productData)
    return result.data
  } else {
    const result = await createProduct(productData)
    return result.data
  }
}

export default {
  testConnection,
  getStoreInfo,
  getProducts,
  getProduct,
  getProductBySku,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  createCategory,
  getCustomers,
  createCustomer,
  createCart,
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  createCheckoutUrl,
  getOrders,
  getOrder,
  getOrderProducts,
  getPriceLists,
  createPriceList,
  setPriceListRecords,
  getCustomerGroups,
  createCustomerGroup,
  getInventory,
  updateInventory,
  getWebhooks,
  createWebhook,
  deleteWebhook,
  syncProductToBigCommerce,
}
