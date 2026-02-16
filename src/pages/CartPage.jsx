import { Link } from 'react-router'
import { useGetCart, useRemoveFromCart, useUpdateQuantity, useClearCart } from '../hooks/useCart'
import { useProducts } from '../hooks/useProducts'
import ProductSection from '../components/product-section/ProductSection'
import styles from './CartPage.module.css'

function CartPage() {
  const { data: cart, isLoading } = useGetCart()
  const { mutate: removeFromCart } = useRemoveFromCart()
  const { mutate: updateQuantity } = useUpdateQuantity()
  const { data: featured } = useProducts({ featured: true })
  const { mutate: clearCart } = useClearCart()

  if (isLoading) return <div>Cargando...</div>

  const isEmpty = !cart || cart.length === 0

  const total = cart?.reduce((acc, item) => acc + (item.price * item.quantity), 0) ?? 0

  const handleQuantity = (item, value) => { //posible refactorizacion?
    const next = item.quantity + value
    if (next < 1) {
      removeFromCart(item.id)
      return
    }
    if (next > item.stock) return
    updateQuantity({ productId: item.id, quantity: next })
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Carrito de compras</h1>

      {isEmpty ? (
        <div className={styles.emptyCart}>
          <p>Tu carrito está vacío</p>
          <Link to='/products' className={styles.continueShopping}>
            Ver productos
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.cartContainer}>
            {/* Tabla */}
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => {
                    const subtotal = item.price * item.quantity
                    return (
                      <tr key={item.id} className={styles.tableRow}>
                        {/* Imagen + Nombre */}
                        <td>
                          <div className={styles.productCell}>
                            <img src={item.image} alt={item.name} className={styles.productImage} />
                            <Link to={`/product/${item.slug}`} className={styles.productName}>
                              {item.name}
                            </Link>
                          </div>
                        </td>

                        {/* Cantidad */}
                        <td>
                          <div className={styles.quantityCell}>
                            <div className={styles.quantitySelector}>
                              <button className={styles.quantityBtn} onClick={() => handleQuantity(item, -1)}>-</button>
                              <span className={styles.quantityValue}>{item.quantity}</span>
                              <button className={styles.quantityBtn} onClick={() => handleQuantity(item, 1)} disabled={item.quantity >= item.stock}>+</button>
                            </div>
                            <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>Eliminar</button>
                          </div>
                        </td>

                        {/* Subtotal */}
                        <td className={styles.subtotalCell}>
                          Gs. {subtotal.toLocaleString('es-PY')}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer de tabla */}
            <div className={styles.cartFooter}>
              <button
                className={styles.clearBtn}
                onClick={clearCart}
              >
                Vaciar carrito
              </button>

              <div className={styles.totalSection}>
                <span className={styles.totalLabel}>Total:</span>
                <span className={styles.totalPrice}>
                  Gs. {total.toLocaleString('es-PY')}
                </span>
                <Link to='/checkout' className={styles.checkoutBtn}>
                  Proceder al pago
                </Link>
              </div>
            </div>
          </div>

          {/* También podría interesarte */}
          {featured && featured.length > 0 && (
            <ProductSection
              title="También podría interesarte"
              products={featured}
              variant="H"
            />
          )}
        </>
      )}
    </main>
  )
}

export default CartPage