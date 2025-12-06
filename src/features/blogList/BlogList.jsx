import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiFilter } from "react-icons/fi";
import blogData from '../../assets/data/blog/blog.json';
import './style.css';

const BlogList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const categories = ['All', 'Company', 'Lifestyle', 'News', 'Productivity'];

    const filteredBlogs = blogData.filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <section className="blog-list-section">

            <div className="search-bar-container">
                <div className="search-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search a Blog..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FiSearch className="search-icon" />
                </div>

                <div className="filter-wrapper">
                    <button
                        className={`filter-btn ${isFilterOpen ? 'active' : ''}`}
                        onClick={() => setIsFilterOpen(!isFilterOpen)}>
                        <FiFilter />
                    </button>

                    {isFilterOpen && (
                        <div className="filter-dropdown">
                            {categories.map(cat => (
                                <div
                                    key={cat}
                                    className={`filter-item ${selectedCategory === cat ? 'selected' : ''}`}
                                    onClick={() => {
                                        setSelectedCategory(cat);
                                        setIsFilterOpen(false);
                                    }}>
                                    {cat}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="blog-grid">
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog) => (
                        <div key={blog.id} className="blog-card">
                            <div className="blog-text">
                                <h3>{blog.title}</h3>
                                <p>{blog.description}</p>
                                <Link to="/not-found" className="read-btn">
                                    Read blog
                                </Link>
                            </div>
                            <div className="blog-image">
                                <img src={blog.image} alt={blog.title} />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-results">No blogs found</div>
                )}
            </div>
        </section>
    );
};

export default BlogList;