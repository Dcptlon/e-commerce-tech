import { Link } from 'react-router'
import ProductContainer from '../product-container/ProductContainer'
import styles from './ProductSection.module.css'

function ProductSection({ title, products, linkTo, linkText = 'Ver todos', variant}) {
  let className = styles.productSection
  if(variant == 'V' || variant == 'G'){
    className += ' ' + styles.verticalSection
  }

  return (
    <section className={className}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {linkTo && (
          <Link to={linkTo} className={styles.sectionLink}>
            {linkText}
          </Link>
        )}
      </header>

      {products && products.length > 0 ? (
        <ProductContainer productsCard={products} variant={variant}/>
      ) : (
        <p className={styles.noProducts}>No hay productos disponibles</p>
      )}
    </section>
  )
}

export default ProductSection