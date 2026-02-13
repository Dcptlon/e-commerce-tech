import styles from './ProductCard.module.css'
import { Link } from 'react-router'

function ProductCard({ product }) {
  const hasDiscount = product.discount > 0
  const discountPrice = hasDiscount
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price

  return (
    <article className={styles.productCard}>
      <Link to={`/product/${product.slug}`}>
        <h2 className={styles.name}>{product.name}</h2>
      </Link>

      {hasDiscount &&
        <span className={styles.srOnly}>Descuento: {product.discount}%</span>
      }

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

      <div className={styles.contImg}>
        <Link to={`/product/${product.slug}`}>
          <img src={product.image} alt={product.name} />
        </Link>
        {hasDiscount &&
          <span className={styles.discountBadge} aria-hidden="true">
            -{product.discount}%
          </span>
        }
      </div>
    </article>
  )
}

export default ProductCard