import React from "react";
import './style.css';
import getKnowImg1 from '../../../../assets/img/aboutUs/images/about_us1.png';
import getKnowImg2 from '../../../../assets/img/aboutUs/images/about_us2.png';
import getKnowImg3 from '../../../../assets/img/aboutUs/images/about_us3.png';

const GetKnowAboutUs = () => {
    return (
        <section className="getKnowAboutUs-section">
            <h2 className="getKnowAboutUs-title">Get to know <span className="highlight">us</span></h2>
            <div className="teamwork-container">
                <img src={getKnowImg1} alt="get to know us 1" />
                <div className="teamwork-container-text">
                    <h2><span className="highlight">Teamwork</span> is the key to our success</h2>
                    <p>At TasteNow we make sure that every 
                        decision is determined by a team of us. 
                        Everyone´s opinion matters, and as group, we are stronger. 
                        We firmly believe that teamwork makes the dream work.</p>
                </div>
            </div>
            <div className="enviroment-container" >
                <div className="enviroment-container-text">
                    <h2>We are all in for the <span className="highlight">environment</span></h2>
                    <p>TasteNow donates $1 penny for every purchase made 
                        from the app to an organization that takes care of our environment. 
                        We believe that with everyone´s help, we can make a better world. </p>
                </div>
                <img src={getKnowImg2} alt="get to know us 2" />
            </div>
            <div className="employees-container">
                <img src={getKnowImg3} alt="get to know us 3" />
                <div className="employees-container-text">
                    <h2>Our employees define who we are</h2>
                    <p>We are proud to have a team of professionals 
                        leading our every-day activities and tasks. 
                        Collaborative culture of inclusion, growth, 
                        and originality are only a few of our beliefs. 
                        Join us now, and take your career to the next step.</p>
                </div>
            </div>
        </section>
    )
}

export default GetKnowAboutUs;