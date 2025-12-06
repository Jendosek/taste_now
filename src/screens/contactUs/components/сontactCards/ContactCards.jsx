import React from 'react';
import { Link } from 'react-router-dom';
import cardsData from '../../../../assets/data/contactUs/contactCards.json'; // Перевір правильність шляху
import './style.css';

const ContactCards = () => {
    return (
        <section className="contact-cards-section">
            <div className="contact-cards-grid">
                {cardsData.map((card) => (
                    <div key={card.id} className="contact-card">
                        
                        <div className="card-content">
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                        </div>

                        <div className="card-actions">
                            <Link to="/*" className="btn-contact">
                                {card.buttonText}
                            </Link>
                            
                            {card.extraText && (
                                <Link to="/*" className="extra-link">
                                    {card.extraText}
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ContactCards;