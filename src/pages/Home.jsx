import { productsCard } from '../data/productsCard'
import ProductSection from '../components/product-section/ProductSection'
import CTABanner from '../components/ctabanner/CtaBanner'

function Home() {
  const featured = productsCard.filter( p => p.featured)
  const bestSellers = productsCard.filter( p => p.bestSeller)
  console.log(featured)
  return (
    <div>
      <ProductSection title="Productos destacados" products={featured} linkTo='/products?featured=true' ></ProductSection>
      <ProductSection title="Mas vendidos" products={bestSellers} linkTo='/products?bestsellers=true' ></ProductSection>
      <ProductSection title="Mas vendidos" products={bestSellers} linkTo='/products?bestsellers=true' variant='G' ></ProductSection>

      {/*aqui mas de esto basicamente, con tanta repeticion me pregunto si deberia pensar mejor esto */}

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