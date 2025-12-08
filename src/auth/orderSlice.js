import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';

export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async ({ userId, items, totalAmount }, { rejectWithValue }) => {
        try {
            const newOrder = {
                userId,
                items,
                totalAmount, 
                date: new Date().toISOString(),
                status: 'Successful'
            };
            
            const docRef = await addDoc(collection(db, 'orders'), newOrder);
            
            return { id: docRef.id, ...newOrder }; 
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async (userId, { rejectWithValue }) => {
        try {
            const ordersRef = collection(db, 'orders');
            const q = query(ordersRef, where("userId", "==", userId));
            
            const querySnapshot = await getDocs(q);
            const orders = [];
            querySnapshot.forEach((doc) => {
                orders.push({ id: doc.id, ...doc.data() });
            });
            
            return orders.sort((a, b) => new Date(b.date) - new Date(a.date));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        list: [],
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.fulfilled, (state, action) => {
                state.list.unshift(action.payload);
            })
            .addCase(fetchOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export default orderSlice.reducer;