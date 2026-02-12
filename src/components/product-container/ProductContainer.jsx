import React from 'react'
import ProductCard from '../product-card/ProductCard'
import styles from './ProductContainer.module.css'
function ProductContainer({productsCard, variant}) {
  let className = ''
  console.log(variant)
  switch (variant) {
    case 'V':
      className = styles.displayVertical
      break;
    case 'G':
      className = styles.displayGrid
      break;
    default:
      className = styles.displayHorizontal
      break;
  }
  
  return (
    <section className={className}>
        {productsCard.map( product => (
        <ProductCard key={product.id} product={product}/>
      ))}
    </section>
  )
}

export default ProductContainer