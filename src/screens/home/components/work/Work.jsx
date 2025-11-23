import React from "react";
import { Link } from 'react-router-dom';
import './style.css';
import bagImage from "../../../../assets/img/home/images/work_delivery.svg";

const Work = () => {
    return (
        <div className="work-container">
            <div className="img-container">
                <img src={bagImage} alt="Work Delivery" />
            </div>
            <div className="work-text">
                <h2>Work <span className="highlight">whenever</span> you want, <span className="highlight">wherever</span> you are</h2>
                <p>Work with us and accomodate your schedule as you like. 
                Our work rates have never been higher, this is because we 
                give our empoyees several benefits that they enjoy throughout their journey.</p>
                <Link to="/about" className="btn-join">Join Us</Link>
            </div>
        </div>
    )
}

export default Work;
