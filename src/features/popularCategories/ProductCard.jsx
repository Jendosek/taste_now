import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../features/cartSlice';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedToppings, setSelectedToppings] = useState([]);

    const handleToppingChange = (topping) => {
        const isSelected = selectedToppings.find(t => t.name === topping.name);
        if (isSelected) {
            setSelectedToppings(selectedToppings.filter(t => t.name !== topping.name));
        } else {
            setSelectedToppings([...selectedToppings, topping]);
        }
    };

    const handleAddToCart = () => {
        const toppingsPrice = selectedToppings.reduce((sum, t) => sum + t.price, 0);
        const finalPrice = product.price + toppingsPrice;

        const productToAdd = {
            ...product,
            price: finalPrice,
            selectedToppings: selectedToppings
        };

        dispatch(addItem(productToAdd));
        setIsExpanded(false);
        setSelectedToppings([]);
    };

    return (
        <div className={`product-card ${isExpanded ? 'expanded' : ''}`}>
            <div 
                className="product-image" 
                onClick={() => setIsExpanded(!isExpanded)}
                style={{ cursor: 'pointer' }}>
                <img src={product.imageUrl} alt={product.title} />
                {product.rating && <span className="rating">★ {product.rating}</span>}
            </div>
            
            <h3 className="product-title">{product.title}</h3>
            <p className="product-desc">{product.description}</p>
            
            {isExpanded && product.availableToppings && (
                <div className="card-toppings">
                    <h4>Add Extra Toppings:</h4>
                    {product.availableToppings.map((topping, index) => (
                        <label key={index} className="topping-row">
                            <input 
                                type="checkbox" 
                                onChange={() => handleToppingChange(topping)}
                                checked={selectedToppings.some(t => t.name === topping.name)}/>
                            <span className="topping-name">{topping.name}</span>
                            <span className="topping-price">+${topping.price.toFixed(2)}</span>
                        </label>
                    ))}
                </div>
            )}

            <div className="product-footer">
                <span className="price">
                    ${(product.price + selectedToppings.reduce((sum, t) => sum + t.price, 0)).toFixed(2)}
                </span>
                <button 
                    className="add-btn"
                    onClick={handleAddToCart}>
                    Add to cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;