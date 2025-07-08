import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

const initialState = { 
    addToWishlist: {
        loadingIDs: [],
        error: null
    },
    getFromWishlist: {
        products: [],
        loading: false,
        error: null
    },
    removeFromWishlist: {
        loadingIDs: [],
        error: null
    }
}

export const addToWishlist = createAsyncThunk(
    "wishlist/addToWishlist",
    async(id, thunkApi) => {
        try {
            const response = await axios.post("/wishlist/add", {id: id})
            return response.data
        } catch (error) {
            const message = error.response.data.message
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const getFromWishlist = createAsyncThunk(
    "wishlist/getFromWishlist", 
    async(_, thunkApi) => {
        try {
            const response = await axios.get("/wishlist/get")
            return response.data
        } catch (error) {
            const message = error.response.data.message
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const removeFromWishlist = createAsyncThunk(
    "Wishlist/removeFromWishlist",
    async(id, thunkApi) => {
        try {
            const response = await axios.put(`/wishlist/remove/${id}`)
            return response.data
        } catch (error) {
            const message = error.response.data.message
            return thunkApi.rejectWithValue(message)
        }
    }
)

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

        //ADD TO WISHLIST
        .addCase(addToWishlist.pending, (state, action) => {
            state.addToWishlist.loadingIDs.push(action.meta.arg)
        })
        .addCase(addToWishlist.fulfilled, (state, action) => {
            state.getFromWishlist.products.push(action.payload.product)
            state.addToWishlist.loadingIDs = state.addToWishlist.loadingIDs.filter((i) => i !== action.payload.product._id)
        })
        .addCase(addToWishlist.rejected, (state, action) => {
            state.addToWishlist.error = action.payload
            state.addToWishlist.loadingIDs = state.addToWishlist.loadingIDs.filter((i) => i !== action.payload.product._id)
        })

        //GET FROM WISHLIST
        .addCase(getFromWishlist.pending, (state) => {
            state.getFromWishlist.loading = true
        })
        .addCase(getFromWishlist.fulfilled, (state, action) => {
            state.getFromWishlist.loading = false
            state.getFromWishlist.products = action.payload.products
        })
        .addCase(getFromWishlist.rejected, (state, action) => {
            state.getFromWishlist.loading = false
            state.getFromWishlist.error = action.payload
        })

        //REMOVE FROM WISHLIST
        .addCase(removeFromWishlist.pending, (state, action) => {
            state.removeFromWishlist.loadingIDs.push(action.meta.arg)
        })
        .addCase(removeFromWishlist.fulfilled, (state, action) => {
            state.getFromWishlist.products = state.getFromWishlist.products.filter((p) => p._id !== action.payload.id)
            state.removeFromWishlist.loadingIDs = state.removeFromWishlist.loadingIDs.filter((i) => i !== action.payload.id)
        })
        .addCase(removeFromWishlist.rejected, (state, action) => {
            state.removeFromWishlist.loading = false
            state.removeFromWishlist.loadingIDs = state.removeFromWishlist.loadingIDs.filter((i) => i !== action.meta.arg)
        })
    }
})

export default wishlistSlice.reducer 