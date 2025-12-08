import React from "react";
import Hero from "./components/hero/Hero";
import GetKnowAboutUs from "./components/getKnowAboutUs/GetKnowAboutUs";
import WorkWithUs from "../../features/workWithUs/WorkWithUs";
import ReviewsSection from "../../features/reviews/ReviewsSection";

const AboutUs = () => {
    return (
        <div>
            <Hero />
            <GetKnowAboutUs />
            <WorkWithUs />
            <ReviewsSection />
        </div>
    )
}

export default AboutUs;