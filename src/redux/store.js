import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice';
import authReducer from '../auth/authSlice';
import orderReducer from '../auth/orderSlice';
import reviewReducer from '../features/reviewSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    orders: orderReducer,
    reviews: reviewReducer
  },
});