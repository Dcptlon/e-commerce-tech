import { getProductByIdSmall } from './productService'

const CART_KEY = 'cart'

// Helpers de localStorage
const getCartIds = () => {
  const cart = localStorage.getItem(CART_KEY)
  return cart ? JSON.parse(cart) : []
}

const saveCartIds = (items) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}

// GET /cart
// Retorna productos completos con quantity
export const getCart = async () => {
  const cartIds = getCartIds()
  if (cartIds.length === 0) return []

  const products = await Promise.all(
    cartIds.map(item => getProductByIdSmall(item.productId))
  )

  return products.map((product, i) => ({
    ...product,
    quantity: cartIds[i].quantity
  }))
}

// POST /cart
export const addToCart = async (productId, quantity = 1) => {
  const cartIds = getCartIds()
  const existing = cartIds.find(item => item.productId === productId)

  if (existing) {
    existing.quantity += quantity
  } else {
    cartIds.push({ productId, quantity })
  }

  saveCartIds(cartIds)
}

// DELETE /cart/:productId
export const removeFromCart = async (productId) => {
  const cartIds = getCartIds().filter(item => item.productId !== productId)
  saveCartIds(cartIds)
}

export const clearCart = async () => {
  saveCartIds([])
}

// PATCH /cart/:productId
export const updateQuantity = async (productId, quantity) => {
  const cartIds = getCartIds()
  const item = cartIds.find(item => item.productId === productId)
  if (item) item.quantity = quantity
  saveCartIds(cartIds)
}