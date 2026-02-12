import { Link } from 'react-router'
function ProductCard({ product }) {
  const hasDiscount = product.discount > 0
  const discountPrice = hasDiscount ? Math.round(product.price * (1 - product.discount / 100)) : product.price

  return (
    <article className='product-card'>
      <Link to={`/product/${product.id}`}>
        <h2 className='name'>{product.name}</h2>
      </Link>

      {hasDiscount &&
        <span className='cont-discount'>
          <span className='discount-badge'>-{product.discount}%</span>
        </span>
      }

      <div className='cont-price'>
        {hasDiscount ? <>
          <span className='discount-price'>{discountPrice}</span>
          <span className='old-price'>{product.price}</span>
        </> : <span className='base-price'>{product.price}</span>
        }
      </div>
      <div className='cont-img'>
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt="" />
        </Link>
      </div>
    </article>

  )
}

export default ProductCard