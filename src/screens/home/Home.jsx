import React from "react";
import PopularCategories from "../../features/popularCategories/PopularCategories";
import Hero from "./components/hero/Hero";
import FavouriteFood from "./components/favouriteFood/FavouriteFood";
import DeliverySection from "./components/delivery/Delivery";
import Work from "./components/work/Work";

const Home = () => {
    return (
        <div>
            <Hero />
            <PopularCategories />
            <FavouriteFood />
            <DeliverySection />
            <Work />
        </div>
    )
}

export default Home;