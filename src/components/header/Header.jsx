import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as Logo } from '../../assets/img/header/icons/logo.svg'
import { ReactComponent as Cart } from '../../assets/img/header/icons/cart.svg'
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../auth/authSlice";
import { clearCart } from "../../features/cartSlice";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import './style.css'

const Header = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const totalQuantity = useSelector((state) => state.cart.totalQuantity);

    const handleLogout = () => {
        dispatch(clearCart());
        dispatch(logout());
        // Можна перекинути на логін, або лишитись тут
    };

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
                {isAuthenticated ? (
                    <div className="user-info">
                        <div className="user-details">
                            <FaUser size={30} color="#F72D57" />
                            <span className="user-name">{user.username}</span>
                        </div>
                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                            title="Logout">
                            <FaSignOutAlt size={28} />
                        </button>
                    </div>
                ) : (
                    <Link to="/signup" className="btn-signup">Sign up / in</Link>
                )}
            </div>
        </header>
    )
}

export default Header;