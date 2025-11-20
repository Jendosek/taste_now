import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../features/cartSlice';
import productsData from '../../assets/data/home/products.json';
import { Pagination, Navigation } from 'swiper/modules';
import { FaPizzaSlice, FaHamburger, FaUtensils } from "react-icons/fa";
import { PiBowlFood } from "react-icons/pi";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/css';
import './style.css';

const PopularCategories = () => {
    const dispatch = useDispatch();
    const [activeCategory, setActiveCategory] = useState('pizzas');

    const categories = [
        { id: 'pizzas', label: 'Pizzas', icon: <FaPizzaSlice size={30} /> },
        { id: 'burgers', label: 'Burgers', icon: <FaHamburger size={30} /> },
        { id: 'salads', label: 'Salads', icon: <PiBowlFood size={30} /> },
        { id: 'combos', label: 'Combos', icon: <FaUtensils size={30} /> },
    ];

    const handleNext = () => {
        const currentIndex = categories.findIndex(cat => cat.id === activeCategory);
        const nextIndex = currentIndex + 1;

        if (nextIndex >= categories.length) {
            setActiveCategory(categories[0].id);
        } else {
            setActiveCategory(categories[nextIndex].id);
        }
    };

    const handlePrev = () => {
        const currentIndex = categories.findIndex(cat => cat.id === activeCategory);
        const prevIndex = currentIndex - 1;

        if (prevIndex < 0) {
            setActiveCategory(categories[categories.length - 1].id);
        } else {
            setActiveCategory(categories[prevIndex].id);
        }
    };

    const currentProducts = productsData.filter(item => item.category === activeCategory);

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
    };

    return (
        <div className="popular-categories-section">
            <h2 className="section-title">Our Popular <span>Categories</span></h2>

            <div className="categories-tabs">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                        onClick={() => setActiveCategory(category.id)}>
                        <span className="category-icon">{category.icon}</span>
                        <span className="category-label">{category.label}</span>
                    </button>
                ))}
            </div>

            <div className="products-slider-container">
                <Swiper
                    modules={[Navigation, Pagination]}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    key={activeCategory}
                    spaceBetween={20}
                    slidesPerView={1}

                    breakpoints={{
                        576: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1200: { slidesPerView: 4 },
                    }}>
                    {currentProducts.map((product) => (
                        <SwiperSlide key={product.id}>
                            <div className="product-card">
                                <div className="product-image">
                                    <img src={product.imageUrl} alt={product.title} />
                                    {product.rating && <span className="rating">★ {product.rating}</span>}
                                </div>

                                <h3 className="product-title">{product.title}</h3>
                                <p className="product-desc">{product.description}</p>

                                <div className="product-footer">
                                    <span className="price">${product.price}</span>
                                    <button
                                        className="add-btn"
                                        onClick={() => handleAddToCart(product)}>
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="category-navigation">
                    <button onClick={handlePrev} className="nav-arrow prev">
                    </button>

                    <div className="slider-pagination">
                        {categories.map((category) => (
                            <span
                                key={category.id}
                                className={`pagination-dot ${activeCategory === category.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category.id)}
                            ></span>
                        ))}
                    </div>

                    <button onClick={handleNext} className="nav-arrow next">
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopularCategories;