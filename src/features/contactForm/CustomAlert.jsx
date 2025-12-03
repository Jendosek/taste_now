import React from 'react';
import './style.css';

const CustomAlert = ({ message, onClose }) => {
    return (
        <div className="custom-alert-overlay">
            <div className="custom-alert-box">
                <h3>Success!</h3>
                <p>{message}</p>
                <button onClick={onClose} className="alert-close-btn">
                    Awesome!
                </button>
            </div>
        </div>
    );
};

export default CustomAlert;