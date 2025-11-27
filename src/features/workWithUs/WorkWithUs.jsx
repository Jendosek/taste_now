import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import workData from '../../assets/data/aboutUs/work.json';
import 'swiper/css';
import 'swiper/css/pagination';
import './style.css';

const WorkWithUs = () => {
    const swiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="work-section">
            <div className="work-header">
                <h2>Work with us,</h2>
                <h2 className="highlight">make a difference</h2>
            </div>

            <div className="work-slider-container">
                <Swiper
                key={workData.length}
                    modules={[Navigation, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    // loop={true}
                    loop={false}
                    centeredSlides={true}
                    centerInsufficientSlides={true}
                    observer={true}
                    observeParents={true}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="work-swiper">
                    {workData.map((item) => (
                        <SwiperSlide key={item.id}>
                            <Link to={item.link} className="work-card">
                                <div className="work-image">
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div className="work-info">
                                    <p>{item.title}</p>
                                    <span className="card-arrow"></span>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="work-navigation">
                    <button 
                        className="nav-arrow prev" 
                        onClick={() => swiperRef.current?.slidePrev()}>
                    </button>
                    <div className="slider-pagination">
                        {workData.map((item, index) => (
                            <span
                                key={item.id}
                                className={`pagination-dot ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => swiperRef.current?.slideTo(index)}
                            ></span>
                        ))}
                    </div>
                    <button 
                        className="nav-arrow next" 
                        onClick={() => swiperRef.current?.slideNext()}>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default WorkWithUs;