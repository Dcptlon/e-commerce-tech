import { useQuery } from '@tanstack/react-query'
import { getProductById } from '../services/productService'

export function useProductById(id) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  })
}