import React from "react";
import Hero from "./components/hero/Hero";
import GetKnowAboutUs from "./components/getKnowAboutUs/GetKnowAboutUs";
import WorkWithUs from "../../features/workWithUs/WorkWithUs";

const AboutUs = () => {
    return (
        <div>
            <Hero />
            <GetKnowAboutUs />
            <WorkWithUs />
        </div>
    )
}

export default AboutUs;