import { useQuery } from '@tanstack/react-query'
import { getHomeData } from '../services/productService'

export function useHome() {
  console.log('running')
  return useQuery({
    queryKey: ['home'],
    queryFn: () => getHomeData(),
  })
}