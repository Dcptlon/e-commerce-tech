import React from 'react'
import { useParams } from "react-router"
import { productDetail } from '../data/productDetail'
import { productsCard } from '../data/productsCard'
import ImageCarousel from "../components/image-carousel/ImageCarousel"
import ProductSection from "../components/product-section/ProductSection"
import styles from './ProductDetailPage.module.css'

function ProductDetailPage() {
  const { slug } = useParams()

  const product = productDetail.find(
    p => p.slug === slug
  )

  if (!product) return <div>Producto no encontrado</div>
  console.log(product)
  const hasDiscount = product.discount > 0
  const discountPrice = hasDiscount
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price

  const relatedProducts = productsCard
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <main className={styles.main}>
      <div className={styles.productContainer}>
        <div className={styles.carouselWrapper}>
          <ImageCarousel images={product.images} />
        </div>

        <div className={styles.productInfo}>
          <h1>{product.name}</h1>

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
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>

          <div className={styles.buttonGroup}>
            <button>Agregar al carrito</button>
            <button>Guardar</button>
          </div>
        </div>
      </div>

      <div className={styles.productDescription}>
        <p>{product.description}</p>
      </div>

      {relatedProducts.length > 0 && (
        <section>
          <ProductSection title="Productos relacionados" products={relatedProducts} />
        </section>
      )}
    </main>

  )
}

export default ProductDetailPage