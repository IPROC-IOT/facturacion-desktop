import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/Header.css'
import BtnDarkMode from '../components/BtnDarkMode'

const Header = () => {
    return (
        <header>
            <div className="logo-header">SYNHO</div>
            <div>
                <BtnDarkMode/>
            </div>
            <nav className="container-nav-header">
                <Link to="/ventas">Ventas</Link>
                <Link to="/compras">Compras</Link>
            </nav>
        </header>
    )
}

export default Header
