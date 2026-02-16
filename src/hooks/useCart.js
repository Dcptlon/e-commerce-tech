import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCart, addToCart, removeFromCart, updateQuantity, clearCart } from '../services/cartService'

const CART_KEY = ['cart']

export function useGetCart() {
  return useQuery({
    queryKey: CART_KEY,
    queryFn: getCart,
  })
}

export function useAddToCart() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ productId, quantity }) => addToCart(productId, quantity),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CART_KEY }),
    onError: (error) => console.error('Error agregando al carrito:', error)
  })
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (productId) => removeFromCart(productId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CART_KEY }),
    onError: (error) => console.error('Error eliminando del carrito:', error)
  })
}

export function useUpdateQuantity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ productId, quantity }) => updateQuantity(productId, quantity),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CART_KEY }),
    onError: (error) => console.error('Error actualizando cantidad:', error)
  })
}

export function useClearCart() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: clearCart,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CART_KEY }),
    onError: (error) => console.error('Error vaciando carrito:', error)
  })
}