import Hero from "./components/hero/Hero";
import GetKnowAboutUs from "./components/getKnowAboutUs/GetKnowAboutUs";
import WorkWithUs from "../../features/workWithUs/WorkWithUs";
import ReviewsSection from "../../features/reviews/ReviewsSection";
import PageTitle from '../../components/pageTitle/PageTitle';

const AboutUs = () => {
    return (
        <div>
            <PageTitle title="About us" />
            <Hero />
            <GetKnowAboutUs />
            <WorkWithUs />
            <ReviewsSection />
        </div>
    )
}

export default AboutUs;