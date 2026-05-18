import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase';
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    writeBatch,
} from 'firebase/firestore';
import seedProducts from '../assets/data/home/products.json';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const snap = await getDocs(collection(db, 'products'));
            const list = [];
            snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
            return list;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (data, { rejectWithValue }) => {
        try {
            const ref = await addDoc(collection(db, 'products'), data);
            return { id: ref.id, ...data };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            await updateDoc(doc(db, 'products', id), data);
            return { id, data };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id, { rejectWithValue }) => {
        try {
            await deleteDoc(doc(db, 'products', id));
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const seedProductsFromCatalog = createAsyncThunk(
    'products/seedProductsFromCatalog',
    async (_, { rejectWithValue }) => {
        try {
            const batch = writeBatch(db);
            const created = [];
            seedProducts.forEach((p) => {
                const { id: _legacyId, ...rest } = p;
                const ref = doc(collection(db, 'products'));
                batch.set(ref, rest);
                created.push({ id: ref.id, ...rest });
            });
            await batch.commit();
            return created;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        list: [],
        isLoading: false,
        loaded: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.loaded = true;
                state.list = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const { id, data } = action.payload;
                const idx = state.list.findIndex((p) => p.id === id);
                if (idx !== -1) state.list[idx] = { ...state.list[idx], ...data };
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.list = state.list.filter((p) => p.id !== action.payload);
            })
            .addCase(seedProductsFromCatalog.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loaded = true;
            });
    },
});

export default productsSlice.reducer;
