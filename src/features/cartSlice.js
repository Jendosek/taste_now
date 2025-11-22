import { createSlice } from '@reduxjs/toolkit';

const savedCart = localStorage.getItem('cart');

const initialState = savedCart ? JSON.parse(savedCart) : {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload; 
      
      const existingItem = state.items.find((item) => item.id === newItem.id);

      state.totalQuantity++;
      state.totalPrice += newItem.price;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          imageUrl: newItem.imageUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          description: newItem.description,
          category: newItem.category,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },

    removeItem(state, action) {
      const id = action.payload; 
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity--; 
        state.totalPrice -= existingItem.price; 

        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
        }
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;