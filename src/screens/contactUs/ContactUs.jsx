import React from "react";
import Hero from "./components/hero/Hero";
import ContactCards from "./components/сontactCards/ContactCards";
import ContactForm from "../../features/contactForm/ContactForm";
import WorkWithUs from "../../features/workWithUs/WorkWithUs";

const ContactUs = () => {
    return (
        <div>
            <Hero />
            <ContactCards />
            <ContactForm />
            <WorkWithUs />
        </div>
    )
}

export default ContactUs;