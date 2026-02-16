import ProductSection from '../components/product-section/ProductSection'
import CTABanner from '../components/ctabanner/CTABanner'
import { useHome } from '../hooks/useHome.js'
function Home() {
  const { data, isLoading } = useHome()
  console.log(data)
  const sections = [
    { title: "Productos destacados", data: data?.featured ?? [] },
    { title: "Más vendidos", data: data?.bestSellers ?? [] },
    { title: "Descuentos", data: data?.discounts ?? [] },
  ]

  if(isLoading){
    return <p>cargando productos</p>
  }

  return (
    <div>
      {sections.map(section => (
        <ProductSection
          key={section.title}
          title={section.title}
          products={section.data}
        />
      ))}

      <CTABanner
        title="¿Eres un cliente nuevo?"
        description="Únete a nuestra comunidad y obtén descuentos exclusivos en tu primera compra"
        buttonText="Regístrate ahora"
        buttonLink="/register"
      />
    </div>
  )
}

export default Home