import { Link } from 'react-router-dom';
import cardsData from '../../../../assets/data/contactUs/contactCards.json';
import './style.css';

const FORM_ANCHOR = '#contact-form';

const scrollToForm = (e) => {
    e.preventDefault();
    document.querySelector(FORM_ANCHOR)?.scrollIntoView({ behavior: 'smooth' });
};

const CardLink = ({ to, className, children }) =>
    to.startsWith('#') ? (
        <a href={to} className={className} onClick={scrollToForm}>
            {children}
        </a>
    ) : (
        <Link to={to} className={className}>
            {children}
        </Link>
    );

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
                            <CardLink to={card.buttonLink} className="btn-contact">
                                {card.buttonText}
                            </CardLink>

                            {card.extraText && (
                                <CardLink to={FORM_ANCHOR} className="extra-link">
                                    {card.extraText}
                                </CardLink>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ContactCards;
