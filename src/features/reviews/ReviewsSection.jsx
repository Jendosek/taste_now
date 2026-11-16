import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, addReview } from '../../store/slices/reviewSlice';
import { FaStar } from 'react-icons/fa';
import './style.css';

const StarRating = ({ value, onChange }) => (
    <div className="star-rating-input">
        {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
                <label key={index}>
                    <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        checked={value === ratingValue}
                        onChange={() => onChange(ratingValue)}
                    />
                    <FaStar
                        className="star"
                        color={ratingValue <= value ? "#ffc107" : "#e4e5e9"}
                        size={25}
                    />
                </label>
            );
        })}
    </div>
);

const ReviewsSection = () => {
    const dispatch = useDispatch();
    const { list: reviews, isLoading } = useSelector((state) => state.reviews);

    const [formData, setFormData] = useState({
        name: '',
        comment: '',
        rating: 5
    });

    useEffect(() => {
        dispatch(fetchReviews());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name.trim() && formData.comment.trim()) {
            dispatch(addReview(formData));
            setFormData({ name: '', comment: '', rating: 5 });
        }
    };

    return (
        <section className="reviews-section">
            <h2 className="reviews-title">What our customers <span className="highlight">say</span></h2>

            <div className="review-form-card">
                <h3>Leave a Review</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <input 
                            type="text" 
                            placeholder="Your Name"
                            maxLength={50}
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                        />
                        <div className="rating-wrapper">
                            <span>Rating:</span>
                            <StarRating
                                value={formData.rating}
                                onChange={(rating) => setFormData({ ...formData, rating })}
                            />
                        </div>
                    </div>
                    <textarea 
                        placeholder="Share your experience..."
                        maxLength={1000}
                        value={formData.comment}
                        onChange={(e) => setFormData({...formData, comment: e.target.value})}
                        required
                        className='textarea-style'
                    ></textarea>
                    <button type="submit" className="btn-submit-review">Post Review</button>
                </form>
            </div>

            <div className="reviews-list">
                {isLoading ? <p>Loading reviews...</p> : (
                    reviews.map((review) => (
                        <div key={review.id} className="review-card">
                            <div className="review-header">
                                <div className="reviewer-avatar">
                                    {review.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="reviewer-info">
                                    <h4>{review.name}</h4>
                                    <div className="stars">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} color={i < review.rating ? "#ffc107" : "#e4e5e9"} size={14} />
                                        ))}
                                    </div>
                                </div>
                                <span className="review-date">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="review-text">{review.comment}</p>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default ReviewsSection;