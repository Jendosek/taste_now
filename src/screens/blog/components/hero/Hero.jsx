import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Hero = () => {
    return (
        <section className="hero-section-blog">
            <h1>
                Join our <span className="highlight">community</span> blogs and be a part of <span className="highlight">us</span>
            </h1>
            <p>
                Discover new blogs every week, and share your knowledge with the community.
                Be a part of our everyday blogs within the TasteNow community.
            </p>
            <Link to="/*" className='btn-blog'>
                Create a blog
            </Link>
        </section>
    );
};

export default Hero;