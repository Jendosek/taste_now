import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { FaParachuteBox, FaRegCreditCard, FaUser } from "react-icons/fa";

const Help = () => {
    return (
        <div className="help-page">
            <div className="help-container">
                <h1 className="help-title">How can we <span className="highlight">help?</span></h1>
                <p className="help-subtitle">Find answers to frequently asked questions below.</p>

                <div className="help-content">
                    
                    <div className="faq-section">
                        <h2 className="section-title"><FaParachuteBox size={20}/> Orders & Delivery</h2>
                        
                        <div className="faq-item">
                            <h3>Where is my order?</h3>
                            <p>You can track your order in real-time by visiting the "Order History" section in your account. Alternatively, use the tracking link sent to your email.</p>
                        </div>

                        <div className="faq-item">
                            <h3>Can I change my delivery address?</h3>
                            <p>If the driver hasn't picked up your order yet, you can contact our support team to update the address. Once the order is on the way, the address cannot be changed.</p>
                        </div>

                        <div className="faq-item">
                            <h3>My order is late. What should I do?</h3>
                            <p>We are sorry for the delay! Please check the live tracking for updates. If the delay is significant, please contact our support.</p>
                        </div>
                    </div>

                    <div className="faq-section">
                        <h2 className="section-title"><FaRegCreditCard size={20}/> Payments & Refunds</h2>
                        
                        <div className="faq-item">
                            <h3>What payment methods do you accept?</h3>
                            <p>We accept all major credit/debit cards (Visa, MasterCard), PayPal, and Apple Pay.</p>
                        </div>

                        <div className="faq-item">
                            <h3>How do I get a refund?</h3>
                            <p>If items were missing or incorrect, please go to "Order History", select the order, and tap "Report an Issue". Refunds are processed within 3-5 business days.</p>
                        </div>
                    </div>

                    <div className="faq-section">
                        <h2 className="section-title"><FaUser size={20}/> Account & Settings</h2>
                        
                        <div className="faq-item">
                            <h3>I forgot my password.</h3>
                            <p>Click on "Log In" and select "Forgot Password". We will send you an email with instructions to reset it.</p>
                        </div>
                    </div>

                    <div className="contact-support-box">
                        <h3>Still need help?</h3>
                        <p>Our support team is available 24/7 to assist you.</p>
                        <Link to="/contact" className="btn-contact-support">Contact Support</Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Help;