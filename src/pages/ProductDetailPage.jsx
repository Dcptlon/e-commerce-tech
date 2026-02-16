import { useState } from 'react'
import { useParams, Link } from "react-router"
import { useProductBySlug, useProducts } from '../hooks/useProducts'
import { useGetCart, useAddToCart, useRemoveFromCart } from '../hooks/useCart'
import ImageCarousel from "../components/image-carousel/ImageCarousel"
import ProductSection from "../components/product-section/ProductSection"
import styles from './ProductDetailPage.module.css'

function ProductDetailPage() {
  const { slug } = useParams()
  const [localQuantity, setLocalQuantity] = useState(1)

  const { data: product, isLoading, isError } = useProductBySlug(slug)


  const { data: related } = useProducts(
    { category: product?.category },
    { enabled: !!product } // fetch relacionados solo cuando ya tenemos el producto
  )

  const { data: cart } = useGetCart()
  const { mutate: addToCart } = useAddToCart()
  const { mutate: removeFromCart } = useRemoveFromCart()

  if (isLoading) return <div>Cargando...</div>
  if (isError || !product) return <div>Producto no encontrado</div>

  const hasDiscount = product.discount > 0
  const discountPrice = hasDiscount
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price

  const cartItem = cart?.find(item => item.id === product.id)
  const isInCart = !!cartItem

  const quantity = isInCart ? cartItem.quantity : localQuantity

  const relatedProducts = related
    ?.filter(p => p.id !== product.id)
    .slice(0, 4) ?? []

  const handleQuantity = (value) => {
    const next = quantity + value
    if (next < 1 || next > product.stock) return

    if (isInCart) {
      updateQuantity({ productId: product.id, quantity: next })
    } else {
      setLocalQuantity(next)
    }
  }

  const handleCartAction = () => {
    if (isInCart) {
      removeFromCart(product.id)
      setLocalQuantity(1)
    } else {
      addToCart({ productId: product.id, quantity })
    }
  }

  let cartButtonText
  if (product.stock === 0) {
    cartButtonText = 'Sin stock'
  } else if (isInCart) {
    cartButtonText = 'Quitar del carrito'
  } else {
    cartButtonText = 'Agregar al carrito'
  }

  return (
    <main className={styles.main}>
      <div className={styles.productContainer}>
        <div className={styles.carouselWrapper}>
          <ImageCarousel images={product.images} />
        </div>

        <div className={styles.productInfo}>
          <h1 className={styles.productName}>{product.name}</h1>

          <div className={styles.contPrice}>
            {hasDiscount ? (
              <>
                <span className={styles.discountPrice}>
                  Gs. {discountPrice.toLocaleString('es-PY')}
                </span>
                <span className={styles.oldPrice}>
                  Gs. {product.price.toLocaleString('es-PY')}
                </span>
              </>
            ) : (
              <span className={styles.basePrice}>
                Gs. {product.price.toLocaleString('es-PY')}
              </span>
            )}
          </div>

          <ul className={styles.productSpecs}>
            {Object.entries(product.specs || {}).map(([key, value]) => (
              <li key={key} className={styles.specItem}>
                <strong className={styles.specKey}>{key}:</strong>
                <span className={styles.specValue}>{value}</span>
              </li>
            ))}
          </ul>

          <p className={styles.stock}>
            {product.stock > 0
              ? `${product.stock} unidades disponibles`
              : 'Sin stock'}
          </p>

          <div className={styles.buttonGroup}>
            {!isInCart && (
                <div className={styles.quantitySelector}>
                  <button
                    className={styles.quantityBtn}
                    onClick={() => handleQuantity(-1)}
                    disabled={quantity <= 1}
                  >-</button>
                  <span className={styles.quantityValue}>{quantity}</span>
                  <button
                    className={styles.quantityBtn}
                    onClick={() => handleQuantity(1)}
                    disabled={quantity >= product.stock}
                  >+</button>
                </div>
            )}

            <div className={styles.actionButtons}>
              {!isInCart ? (
                <button className={styles.btnAdd} onClick={handleCartAction} disabled={product.stock === 0}>
                  {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
                </button>
              ) : (
                <Link to="/cart" className={styles.btnGoToCart}>
                  <img src="/cart.svg" alt="" />
                  Ver en el carrito
                </Link>
              )}

              <button className={styles.btnWishlist}>Guardar</button>
            </div>

          </div>
        </div>
      </div>

      <div className={styles.productDescription}>
        <h2 className={styles.descriptionTitle}>Descripción</h2>
        <p>{product.description}</p>
      </div>

      {relatedProducts.length > 0 && (
        <ProductSection
          title="También podría interesarte"
          products={relatedProducts}
          variant="H"
        />
      )}
    </main>
  )
}

export default ProductDetailPage