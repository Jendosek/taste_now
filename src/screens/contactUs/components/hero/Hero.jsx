import React from 'react';
import './style.css';
import heroImage from '../../../../assets/img/contactUs/images/contactUs_hero.png';

const Hero = () => {
    return (
        <section className="hero-section-contact">
            <div className="hero-text">
                <h1>
                    How can we <span className="highlight">help</span>
                </h1>
                <p>
                    We deliver the food of your choice wherever, whenever. 
                    Select your food from only the top restaurants in the area, 
                    and get it in a flash. Download the app now to discover more.
                </p>
            </div>

            <div className="hero-image-contact">
                <img src={heroImage} alt="Contact Us Hero" />
            </div>
        </section>
    );
};

export default Hero;