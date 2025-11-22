import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem, removeItem, clearCart } from '../../features/cartSlice';

import './style.css';

const Cart = () => {
    // --- ЛОГІКА ---

    // Дістаємо масив товарів та загальну суму зі сховища
    const { items, totalPrice } = useSelector((state) => state.cart);

    // Отримуємо функцію для відправки команд
    const dispatch = useDispatch();

    // Функції-обгортки для кнопок + та -
    const handleAdd = (item) => {
        dispatch(addItem(item));
    };

    const handleRemove = (id) => {
        dispatch(removeItem(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    // --- ВІДОБРАЖЕННЯ (JSX) ---

    // Варіант 1: Якщо кошик порожній
    if (items.length === 0) {
        return (
            <div className="cart-empty">
                <h2>Your Cart is empty</h2>
                <p>Looks like you haven't added any delicious food yet.</p>
                <Link to="/" className="btn-back">
                    Go back to Menu
                </Link>
            </div>
        );
    }

    // Варіант 2: Якщо є товари
    return (
        <div className="cart-page">
            <div className="cart-header">
                <h1>My Cart</h1>
                <Link to="/" className="continue-shopping">
                    ← Continue shopping
                </Link>
            </div>

            <div className="cart-container">
                {/* ЛІВА ЧАСТИНА: Список товарів */}
                <div className="cart-items-list">
                    <div className="cart-labels">
                        <span>Product</span>
                        <span>Price</span>
                        <span>Qty</span>
                        <span>Total</span>
                    </div>

                    {items.map((item) => (
                        <div key={item.id} className="cart-item">
                            {/* Картинка і Опис */}
                            <div className="item-info">
                                <img src={item.imageUrl} alt={item.title} />
                                <div className="item-details">
                                    <h3>{item.title}</h3>
                                    <p>Category: {item.category}</p>
                                    <p>Description: {item.description}</p>
                                </div>
                            </div>

                            {/* Ціна за одиницю */}
                            <div className="item-price">
                                ${item.price}
                            </div>

                            {/* Керування кількістю */}
                            <div className="item-quantity">
                                <button onClick={() => handleRemove(item.id)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleAdd(item)}>+</button>
                            </div>

                            {/* Сума за цей рядок */}
                            <div className="item-total">
                                ${item.totalPrice.toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ПРАВА ЧАСТИНА (або нижня): Загальний підсумок */}
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

                    {/* Кнопка переходу на заглушку "Успіх" */}
                    <Link to="/success" className="btn-checkout">
                        Checkout
                    </Link>

                    <button className="btn-clear" onClick={handleClearCart}>
                        Clear Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;