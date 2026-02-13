import styles from './FilterSidebar.module.css'

function FilterSidebar({ filters, onFilterChange, categories, brands }) {
  return (
    <aside className={styles.sidebar}>

      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Categorías</h3>
        {categories.map(cat => (
          <label key={cat.id} className={styles.filterLabel}>
            <input
              type="checkbox"
              checked={filters.category === cat.id}
              onChange={() => onFilterChange('category', 
                filters.category === cat.id ? undefined : cat.id
              )}
            />
            {cat.name}
          </label>
        ))}
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Precio</h3>
        <input
          type="number"
          placeholder="Mínimo"
          value={filters.minPrice || ''}
          onChange={e => onFilterChange('minPrice', e.target.value || undefined)}
          className={styles.priceInput}
        />
        <input
          type="number"
          placeholder="Máximo"
          value={filters.maxPrice || ''}
          onChange={e => onFilterChange('maxPrice', e.target.value || undefined)}
          className={styles.priceInput}
        />
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Marca</h3>
        {brands.map(brand => (
          <label key={brand} className={styles.filterLabel}>
            <input
              type="checkbox"
              checked={filters.brand === brand}
              onChange={() => onFilterChange('brand',
                filters.brand === brand ? undefined : brand
              )}
            />
            {brand}
          </label>
        ))}
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>
          <input
            type="checkbox"
            checked={filters.inStock === 'true'}
            onChange={e => onFilterChange('inStock', 
              e.target.checked ? 'true' : undefined
            )}
          />
          Solo en stock
        </label>
      </div>

    </aside>
  )
}

export default FilterSidebar