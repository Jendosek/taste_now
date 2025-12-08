import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../../auth/orderSlice';
import { logout } from '../../auth/authSlice';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const { list: orders, isLoading } = useSelector((state) => state.orders);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.uid) {
            dispatch(fetchOrders(user.uid));
        }
    }, [dispatch, user]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
        // navigate('/login');
    };

    if (!user) return <div className="profile-container">Please log in</div>;

    return (
        <div className="profile-page">
            <div className="profile-sidebar">
                <div className="avatar-circle">
                    {user.username.charAt(0).toUpperCase()}
                </div>
                <h2 className="profile-content-name">{user.username}</h2>
                <p className="profile-content-email">{user.email}</p>
                <button onClick={handleLogout} className="btn-logout-profile">Logout</button>
            </div>

            <div className="profile-content">
                <h3 className='profile-content-title'>Order History</h3>

                {isLoading ? <p>Loading orders...</p> : (
                    <div className="orders-list">
                        {orders.length === 0 ? <p>No orders yet.</p> : orders.map(order => (
                            <div key={order.id} className="order-card">
                                <div className="order-header">
                                    <span className="order-date">{new Date(order.date).toLocaleDateString()}</span>
                                    <span className="order-status">Successful</span>
                                </div>
                                <div className="order-items">
                                    {order.items.map(item => (
                                        <div key={item.cartId} className="mini-item">
                                            <div>
                                                <span>{item.quantity}x {item.title}</span>
                                                {item.selectedToppings && item.selectedToppings.length > 0 && (
                                                    <div>
                                                        {item.selectedToppings.map((topping, index) => (
                                                            <span key={index}>
                                                                 + {topping.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <span>${item.price}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="order-total">
                                    <span>Total:</span>
                                    <span>${order.totalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;