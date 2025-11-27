import React from 'react';
import './style.css';
import heroImage from '../../../../assets/img/aboutUs/images/hero_image.png';

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="hero-text">
                <h1>
                    We deliver for you to <span className="highlight">enjoy</span>
                </h1>
                <p>
                    We deliver the food of your choice wherever, whenever. 
                    Select your food from only the top restaurants in the area, 
                    and get it in a flash. Download the app now to discover more.
                </p>
            </div>

            <div className="hero-image">
                <img src={heroImage} alt="Fresh Salad" />
            </div>
        </section>
    );
};

export default Hero;