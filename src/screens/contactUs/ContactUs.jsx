import Hero from "./components/hero/Hero";
import ContactCards from "./components/contactCards/ContactCards";
import ContactForm from "../../features/contactForm/ContactForm";
import WorkWithUs from "../../features/workWithUs/WorkWithUs";
import PageTitle from '../../components/pageTitle/PageTitle';

const ContactUs = () => {
    return (
        <div>
            <PageTitle title="Contact us" />
            <Hero />
            <ContactCards />
            <ContactForm />
            <WorkWithUs />
        </div>
    )
}

export default ContactUs;