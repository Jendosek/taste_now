import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from '../../assets/img/footer/icons/logo.svg';
import './style.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-logo">
                <Link to="/">
                    <Logo />
                </Link>
            </div>
            <div className="footer-content">
                <div className="first-column">
                    <Link to="/privacy-policy" className="footer-link">Privacy policy</Link>
                    <Link to="/terms-of-service" className="footer-link">Terms of service</Link>
                </div>
                <div className="second-column">
                    <Link to="/blog" className="footer-link">Blog</Link>
                    <Link to="/about" className="footer-link">About us</Link>
                </div>
                <div className="third-column">
                    <Link to="/help" className="footer-link">Help</Link>
                    <Link to="/contact" className="footer-link">Contact us</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;