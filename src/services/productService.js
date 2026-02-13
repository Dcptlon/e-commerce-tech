import { productsCard } from '../data/productsCard.js'
import { productDetail } from '../data/productDetail.js'

function delay() {
  return new Promise(resolve => setTimeout(resolve, 800))
}

export async function getProducts(filters = {}) {
  await delay()
  console.log('running function')

  let result = [...productsCard]

  if (filters.category) {
    result = result.filter(p => p.category === filters.category)
  }
  if (filters.featured) {
    result = result.filter(p => p.featured === true)
  }
  if (filters.bestSeller) {
    result = result.filter(p => p.bestSeller === true)
  }
  if (filters.brand) {
    result = result.filter(p => p.brand === filters.brand)
  }
  if (filters.minPrice) {
    result = result.filter(p => p.price >= Number(filters.minPrice))
  }
  if (filters.maxPrice) {
    result = result.filter(p => p.price <= Number(filters.maxPrice))
  }
  if (filters.inStock) {
    result = result.filter(p => p.stock > 0)
  }
  if (filters.search) {
    const term = filters.search.toLowerCase()
    result = result.filter(p =>
      p.name.toLowerCase().includes(term) || 
      p.brand.toLowerCase().includes(term)
    )
  }

  return result
}

export async function getProductById(id) {
  await delay()

  const product = productDetail.find(p => p.id === Number(id))

  if (!product) throw new Error(`Producto ${id} no encontrado`)

  return product
}

export async function getHomeData() {
  await delay()

  const products = [...productsCard]

  const carousel = products
    .filter(p => p.featured === true)
    .slice(0, 5)

  const carouselIds = new Set(carousel.map(p => p.id))

  const featured = products
    .filter(p => p.featured === true && !carouselIds.has(p.id))
    .slice(0, 8)

  const bestSellers = products
    .filter(p => p.bestSeller === true)
    .slice(0, 8)

  const discounts = products
    .filter(p => (p.discount ?? 0) > 0)
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 8)


  return {
    carousel,
    featured,
    bestSellers,
    discounts
  }
}