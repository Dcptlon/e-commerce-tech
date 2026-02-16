import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router'
import { useState, useEffect } from 'react'
import styles from './MainLayout.module.css'
import { useGetCart } from '../hooks/useCart'

function MainLayout() {
    const {data: cart, isLoading } = useGetCart()

    const totalCart = cart?.reduce((sum, p) => sum + p.quantity, 0) ?? 0
    console.log(totalCart)
    
    const navigate = useNavigate()
    const [search, setSearch] = useState('')

    const handleSearch = (e) => {
        if (e.key === 'Enter' && search.trim()) {
            navigate(`/products?search=${search.trim()}`)
            setSearch('')
        }
    }

    const { pathname } = useLocation()

    // Scroll al top cada vez que cambia la ruta
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [pathname])

    return (
        <div className={styles.mainLayout}>
            <header>
                <div className={styles.topBar}>
                    <div className={styles.left}>
                        <Link to="/" className={styles.logoLink}>
                            <img src="/logo.svg" alt="TechShop Logo" />
                            <h1>Tech Shop</h1>
                        </Link>
                    </div>

                    <div className={styles.center}>
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleSearch}
                            className={styles.searchBar}
                        />
                    </div>

                    <div className={styles.right}>
                        <Link to="/cart" className={styles.cartLink}>
                            <img src="/cart.svg" alt="Carrito" />
                            <span className={styles.cartBadge}>{totalCart}</span>
                        </Link>

                        <Link to="/login" className={styles.loginLink}>
                            Iniciar Sesión
                        </Link>
                    </div>
                </div>

                <nav className={styles.navBar}>
                    <NavLink to="/">Inicio</NavLink>
                    <NavLink to="/best-sellers">Lo Más Vendido</NavLink>
                    <NavLink to="/products?category=laptops">Laptops</NavLink>
                    <NavLink to="/products?category=peripherals">Periféricos</NavLink>
                    <NavLink to="/products?category=components">Componentes</NavLink>
                    <NavLink to="/products?category=monitors">Monitores</NavLink>
                    <NavLink to="/products">Todo</NavLink>
                </nav>
            </header>

            <main className={styles.mainContent}>
                <Outlet />
            </main>

            <footer className={styles.mainFooter}>
                <p>&copy; 2026 TechShop - Todos los derechos reservados</p>
            </footer>
        </div>
    )
}

export default MainLayout