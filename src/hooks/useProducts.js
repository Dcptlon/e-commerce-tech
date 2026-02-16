import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../services/productService.js'
import { getProductBySlug } from '../services/productService.js'

export function useProducts(filters = {}, options = {}) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filters),
    ...options
  })
}

export function useProductBySlug(slug) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
  })
}