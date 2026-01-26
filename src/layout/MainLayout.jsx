import React from 'react'
import { Link, NavLink, Outlet } from 'react-router'

function MainLayout() {
  return (
    <div>
        <header>
            <img src="" alt="logo" />
            <input type="text" />
            <Link to="/cart">
                <img src="" alt="carrito" />
                <span></span>
            </Link>
            <Link to="/login">Iniciar Sesion</Link>
        </header>
        <nav>
            <NavLink></NavLink>
        </nav>
        <Outlet></Outlet>
    </div>
  )
}

export default MainLayout