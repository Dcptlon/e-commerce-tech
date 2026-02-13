import { useSearchParams } from 'react-router'
import { useProducts } from '../hooks/useProducts'
import { categories } from '../data/categories'
import { productsCard } from '../data/productsCard'
import FilterSidebar from '../components/filters/FilterSidebar'
import ProductSection from '../components/product-section/ProductSection'
import styles from './ProductsPage.module.css'

// Marcas unicas del mock
const brands = [...new Set(productsCard.map(p => p.brand))]

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()

const filters = {
  category: searchParams.get('category') || undefined,
  brand: searchParams.get('brand') || undefined,
  minPrice: searchParams.get('minPrice') || undefined,
  maxPrice: searchParams.get('maxPrice') || undefined,
  inStock: searchParams.get('inStock') || undefined,
  search: searchParams.get('search') || undefined,
  featured: searchParams.get('featured') || undefined,
  bestSeller: searchParams.get('bestSeller') || undefined,
}

  const { data: products, isLoading, isError, error } = useProducts(filters)

  // Actualiza URL cuando cambia un filtro
  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams)
    if (value === undefined) {
      newParams.delete(key)
    } else {
      newParams.set(key, value)
    }
    setSearchParams(newParams)
  }
  if(isError) {console.log(error)}
  if (isError) return <p>Error al cargar productos</p>

  return (
    <div className={styles.productsPage}>
      <FilterSidebar
        filters={filters}
        onFilterChange={handleFilterChange}
        categories={categories}
        brands={brands}
      />

      <div className={styles.productsContent}>
        {filters.search && (
          <p className={styles.searchInfo}>
            Resultados para: <strong>"{filters.search}"</strong>
          </p>
        )}

        <ProductSection
          products={products || []}
          isLoading={isLoading}
          variant="G"
        />
      </div>
    </div>
  )
}

export default ProductsPage