import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../services/productService.js'

export function useProducts(filters = {}) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filters),
  })
}