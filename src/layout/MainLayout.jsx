import React from 'react'
import { Link, NavLink, Outlet } from 'react-router'

function MainLayout() {
    return (
        <div className="main-layout">
            <header>
                {/* Top bar */}
                <div className="top-bar">
                    <Link to="/">
                        <img src="/logo.png" alt="TechShop Logo" />
                    </Link>

                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        disabled
                    />

                    <Link to="/cart" className="cart-link">
                        🛒
                        <span className="cart-badge">0</span>
                    </Link>

                    <Link to="/login" className="login-link">
                        👤 Iniciar Sesión
                    </Link>
                </div>

                {/* Navigation bar */}
                <nav className="main-nav">
                    <NavLink to="/">Inicio</NavLink>
                    <NavLink to="/best-sellers">Lo Más Vendido</NavLink>
                    <NavLink to="/products?category=laptops">Laptops</NavLink>
                    <NavLink to="/products?category=peripherals">Periféricos</NavLink>
                    <NavLink to="/products?category=components">Componentes</NavLink>
                    <NavLink to="/products?category=monitors">Monitores</NavLink>
                    <NavLink to="/products">Todo</NavLink>
                </nav>
            </header>

            <main className="main-content">
                <Outlet />
            </main>

            <footer className="main-footer">
                <p>&copy; 2026 TechShop - Todos los derechos reservados</p>
            </footer>
        </div>
    )
}

export default MainLayout