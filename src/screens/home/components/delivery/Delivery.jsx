import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import bagImage from "../../../../assets/img/home/images/food_delivery.png";

const DeliverySection = () => {
    return (
        <div className="delivery-container">
            <div className="delivery-text">
                <h2>
                    Food <span className="highlight">delivery</span> within 45 minutes
                </h2>
                <p>
                    If your food takes more than 45 minutes, it's on us. We are proud to say
                    we take delivery very seriously, so that you don’t have to worry about how
                    or when the food gets to you.
                </p>
                <Link to="/cart" className='btn-order'>
                    Order now
                </Link>
            </div>

            <div className="delivery-image">
                <img src={bagImage} alt="Taste Now Delivery Bag" />
            </div>

        </div>
    );
};

export default DeliverySection;