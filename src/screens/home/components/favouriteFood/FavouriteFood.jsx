import React from 'react';
import './style.css';
import burgerImage from "../../../../assets/img/home/images/burger_recommendation.png";

const FavouriteFood = () => {
    return (
        <section className="favourite-section">
            <div className="favourite-container">
                
                <div className="favourite-image">
                    <img src={burgerImage} alt="Delicious Burger" />
                </div>

                <div className="favourite-text">
                    <h2>
                        Don’t miss out on your
                        favourite food
                    </h2>
                    <p>
                        Sign up now to enjoy your favourite food anywhere, anytime. 
                        It is quick, easy and accessible to anyone of any age. 
                        Free of charge, taste now is the solution to your every day foods.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FavouriteFood;