import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as Logo } from '../../assets/img/header/icons/logo.svg'
import { ReactComponent as Cart } from '../../assets/img/header/icons/cart.svg'
import { useSelector } from "react-redux";
import './style.css'

const Header = () => {
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);

    return (
        <header className="header-container">
            <div className="logo-container">
                <Link to="/">
                    <Logo />
                </Link>
            </div>
            <nav className="nav-container">
                <NavLink to="/" className="nav-link">Home</NavLink>
                <NavLink to="/about" className="nav-link">About us</NavLink>
                <NavLink to="/blog" className="nav-link">Blog</NavLink>
                <NavLink to="/contact" className="nav-link">Contact us</NavLink>
            </nav>
            <div className="right-container">
                <Link to="/cart" className="btn-cart">
                    <Cart />
                    {totalQuantity > 0 && (
                        <span className="cart-badge">{totalQuantity}</span>
                    )}
                </Link>
                <Link to="/signup" className="btn-signup">Sign up</Link>
            </div>
        </header>
    )
}

export default Header;