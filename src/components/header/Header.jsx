import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as Logo } from '../../assets/img/header/icons/logo.svg'
import { ReactComponent as Cart } from '../../assets/img/header/icons/cart.svg'
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../auth/authSlice";
import { clearCart } from "../../features/cartSlice";
import { FaUser, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import useResponsive from "../../hooks/useResponsive";
import { useNavigate } from 'react-router-dom';
import './style.css'

const Header = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();

    const handleProfileClick = () => {
        if (isMobile) {
            navigate('/profile');
            setIsMenuOpen(false);
        } else {
            setIsProfileOpen(!isProfileOpen);
        }
    };

    const totalQuantity = useSelector((state) => state.cart.totalQuantity);

    const isMobile = useResponsive();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch(clearCart());
        dispatch(logout());
        setIsProfileOpen(false);
        setIsMenuOpen(false);
        // Можна перекинути на логін
    };

    const closeMenu = () => {
        setIsMenuOpen(false); 
        setIsProfileOpen(false); 
    };

    return (
        <header className="header-container">
            <div className="logo-container">
                <Link to="/" onClick={closeMenu}>
                    <Logo />
                </Link>
            </div>

            {!isMobile && (
                <nav className="nav-container">
                    <NavLink to="/" className="nav-link">Home</NavLink>
                    <NavLink to="/about" className="nav-link">About us</NavLink>
                    <NavLink to="/blog" className="nav-link">Blog</NavLink>
                    <NavLink to="/contact" className="nav-link">Contact us</NavLink>
                </nav>
            )}

            <div className="right-container">
                <Link to="/cart" className="btn-cart" onClick={closeMenu}>
                    <Cart />
                    {totalQuantity > 0 && (
                        <span className="cart-badge">{totalQuantity}</span>
                    )}
                </Link>

                {!isMobile && (
                    isAuthenticated ? (
                        <div className="user-dropdown-container" style={{ position: 'relative' }}>
                            <div 
                                className="user-info" 
                                onClick={handleProfileClick}
                                style={{ cursor: 'pointer' }}>
                                <div className="user-details">
                                    <FaUser size={20} color="#F72D57" />
                                    <span className="user-name">{user.username}</span>
                                </div>
                            </div>

                            {isProfileOpen && (
                                <div className="desktop-profile-dropdown">
                                    <Link to="/profile" onClick={() => setIsProfileOpen(false)}>
                                        My Profile
                                    </Link>
                                    <button onClick={handleLogout} className="btn-profile-logout">
                                        Logout <FaSignOutAlt />
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/signup" className="btn-signup">Sign up / in</Link>
                    )
                )}

                {isMobile && (
                    <button className="hamburger-btn" onClick={() => setIsMenuOpen(true)}>
                        <FaBars size={24} color="#333" />
                    </button>
                )}
            </div>

            {isMobile && (
                <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                    <div className="mobile-menu-header">
                        <Logo />
                        <button className="close-menu-btn" onClick={closeMenu}>
                            <FaTimes size={24} />
                        </button>
                    </div>

                    <nav className="mobile-nav-links">
                        <NavLink to="/" onClick={closeMenu}>Home</NavLink>
                        <NavLink to="/about" onClick={closeMenu}>About us</NavLink>
                        <NavLink to="/blog" onClick={closeMenu}>Blog</NavLink>
                        <NavLink to="/contact" onClick={closeMenu}>Contact us</NavLink>
                    </nav>

                    <div className="mobile-auth-section">
                        {isAuthenticated ? (
                            <>
                                <div 
                                    className="mobile-user-info" 
                                    onClick={handleProfileClick}
                                    style={{cursor: 'pointer'}}>
                                    <FaUser size={20} color="#F72D57" />
                                    <span>{user.username}</span>
                                </div>
                                <button className="btn-signup" onClick={handleLogout} style={{width: '100%', marginTop: '10px'}}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/signup" className="btn-signup" onClick={closeMenu} style={{display: 'block', textAlign: 'center'}}>
                                Sign up / in
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;