import './App.css'
import { Routes, Route } from 'react-router'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home'

function App() {
  
  return (
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/best-sellers" element={<BestSellersPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
  )
}

export default App
