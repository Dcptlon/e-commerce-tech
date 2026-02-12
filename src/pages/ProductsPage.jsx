import { productsCard } from '../data/productsCard'
import ProductContainer from '../components/product-container/ProductContainer'

function ProductsPage() {
  
  return (
    <div>
      <ProductContainer productsCard={productsCard} />  
    </div>
  )
}

export default ProductsPage