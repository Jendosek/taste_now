import React, { useState } from 'react';
import { FaUser, FaPhoneAlt, FaEnvelope, FaCommentDots } from 'react-icons/fa';
import CustomAlert from './CustomAlert';
import './style.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.email.includes('@')) {
            newErrors.email = 'Email must contain "@"';
        }

        const phoneDigits = formData.phone.replace(/\D/g, '');
        if (phoneDigits.length < 8) {
            newErrors.phone = 'Phone number must have at least 8 digits';
        }

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setShowAlert(true);
            setFormData({ name: '', phone: '', email: '', message: '' });
        }
    };

    return (
        <section className="contact-form-section">
            {showAlert && (
                <CustomAlert
                    message="Your message has been sent successfully!"
                    onClose={() => setShowAlert(false)}
                />
            )}

            <div className="form-container">
                <h2 className="form-title">Contact us</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-grid">

                        <div className="input-group">
                            <div className="input-wrapper">
                                <FaUser className="input-icon" />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={errors.name ? 'error' : ''}
                                />
                            </div>
                            {errors.name && <span className="error-text">{errors.name}</span>}
                        </div>

                        <div className="input-group">
                            <div className="input-wrapper">
                                <FaPhoneAlt className="input-icon" />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={errors.phone ? 'error' : ''}
                                />
                            </div>
                            {errors.phone && <span className="error-text">{errors.phone}</span>}
                        </div>

                        <div className="input-group">
                            <div className="input-wrapper">
                                <FaEnvelope className="input-icon" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Mail"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={errors.email ? 'error' : ''}
                                />
                            </div>
                            {errors.email && <span className="error-text">{errors.email}</span>}
                        </div>

                    </div>

                    <div className="input-group full-width">
                        <div className="input-wrapper textarea-wrapper">
                            <FaCommentDots className="input-icon textarea-icon" />
                            <textarea
                                name="message"
                                placeholder="Your message"
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>

                    <button type="submit" className="btn-send">Send</button>
                </form>
            </div>
        </section>
    );
};

export default ContactForm;