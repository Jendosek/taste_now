import PopularCategories from "../../features/popularCategories/PopularCategories";
import Hero from "./components/hero/Hero";
import FavouriteFood from "./components/favouriteFood/FavouriteFood";
import DeliverySection from "./components/delivery/Delivery";
import Work from "./components/work/Work";
import PageTitle from '../../components/pageTitle/PageTitle';

const Home = () => {
    return (
        <div>
            <PageTitle />
            <Hero />
            <PopularCategories />
            <FavouriteFood />
            <DeliverySection />
            <Work />
        </div>
    )
}

export default Home;