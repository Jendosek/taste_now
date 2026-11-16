import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addItem, removeItem, clearCart } from '../../store/slices/cartSlice';
import { createOrder } from '../../store/slices/orderSlice';

import './style.css';
import PageTitle from '../../components/pageTitle/PageTitle';

const Cart = () => {
    const { items, totalPrice } = useSelector((state) => state.cart);

    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [checkoutError, setCheckoutError] = useState(null);

    const handleAdd = (item) => {
        dispatch(addItem(item));
    };

    const handleRemove = (id) => {
        dispatch(removeItem(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleCheckout = async () => {
        if (!user) {
            navigate('/login', {
                state: { from: '/cart', message: 'Please log in to place your order.' },
            });
            return;
        }

        setIsSubmitting(true);
        setCheckoutError(null);

        try {
            await dispatch(createOrder({
                userId: user.uid,
                items: items,
                totalAmount: totalPrice
            })).unwrap();

            dispatch(clearCart());
            navigate('/success');
        } catch {
            setCheckoutError('Could not place your order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="cart-empty">
                <PageTitle title="Cart" />
                <h2>Your Cart is empty</h2>
                <p>Looks like you haven't added any delicious food yet.</p>
                <Link to="/" className="btn-back">
                    Go back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <PageTitle title="Cart" />
            <div className="cart-header">
                <h1>My Cart</h1>
                <Link to="/" className="continue-shopping">
                    ← Continue shopping
                </Link>
            </div>

            <div className="cart-container">
                <div className="cart-items-list">
                    <div className="cart-labels">
                        <span>Product</span>
                        <span>Price</span>
                        <span>Qty</span>
                        <span>Total</span>
                    </div>

                    {items.map((item) => (
                        <div key={item.cartId} className="cart-item">
                            <div className="item-info">
                                <img src={item.imageUrl} alt={item.title} />
                                <div className="item-details">
                                    <h3>{item.title}</h3>
                                    <p>Category: {item.category}</p>
                                    <p>Description: {item.description}</p>
                                    {item.selectedToppings && item.selectedToppings.length > 0 && (
                                        <div className="item-toppings">
                                            {item.selectedToppings.map((topping, index) => (
                                                <span key={index} className="topping-tag">
                                                    + {topping.name}⠀
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="item-price">
                                ${item.price.toFixed(2)}
                            </div>

                            <div className="item-quantity">
                                <button onClick={() => handleRemove(item.cartId)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleAdd(item)}>+</button>
                            </div>

                            <div className="item-total">
                                ${item.totalPrice.toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h3>Order Summary</h3>
                    <div className="summary-row">
                        <span>Subtotal:</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping:</span>
                        <span>Free</span>
                    </div>
                    <div className="summary-total">
                        <span>Total:</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>

                    <button
                        onClick={handleCheckout}
                        className="btn-checkout"
                        disabled={isSubmitting}>
                        {isSubmitting ? 'Placing order...' : 'Checkout'}
                    </button>

                    {checkoutError && (
                        <p className="checkout-error">{checkoutError}</p>
                    )}


                    <button className="btn-clear" onClick={handleClearCart}>
                        Clear Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;