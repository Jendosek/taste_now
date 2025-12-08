import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase';
import { collection, addDoc, getDocs, orderBy, query } from 'firebase/firestore';

export const fetchReviews = createAsyncThunk(
    'reviews/fetchReviews',
    async (_, { rejectWithValue }) => {
        try {
            const reviewsRef = collection(db, 'reviews');
            const q = query(reviewsRef, orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            
            const reviews = [];
            querySnapshot.forEach((doc) => {
                reviews.push({ id: doc.id, ...doc.data() });
            });
            return reviews;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addReview = createAsyncThunk(
    'reviews/addReview',
    async ({ name, comment, rating }, { rejectWithValue }) => {
        try {
            const newReview = {
                name,
                comment,
                rating,
                createdAt: new Date().toISOString()
            };
            const docRef = await addDoc(collection(db, 'reviews'), newReview);
            return { id: docRef.id, ...newReview };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const reviewSlice = createSlice({
    name: 'reviews',
    initialState: {
        list: [],
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.list.unshift(action.payload);
            });
    }
});

export default reviewSlice.reducer;