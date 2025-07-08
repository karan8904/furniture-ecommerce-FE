import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

const initialState = {
    postReview: {
        error: null,
        loading: false
    },
    getReviews: {
        reviews: [],
        error: null,
        loading: false
    }
}

export const postReview = createAsyncThunk(
    "reviews/postReview",
    async(data, thunkApi) => {
        try {
            const response = await axios.post("/reviews/post", data)
            return response.data
        } catch (error) {
            const message = error.response.data.message
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const getReviews = createAsyncThunk(
    "reviews/getReviews", 
    async(productID, thunkApi) => {
        try {
            const response = await axios.get(`/reviews/get/${productID}`)
            return response.data
        } catch (error) {
            const message = error.response.data.message
            return thunkApi.rejectWithValue(message)         
        }
    }
)

const reviewSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        //POST REVIEW
        .addCase(postReview.pending, (state) => {
            state.postReview.loading = true
        })
        .addCase(postReview.fulfilled, (state, action) => {
            state.postReview.loading = false
            state.getReviews.reviews.push(action.payload.review)
        })
        .addCase(postReview.rejected, (state, action) => {
            state.postReview.loading = false
            state.postReview.error = action.payload
        })

        //GET REVIEWS
        .addCase(getReviews.pending, (state) => {
            state.getReviews.loading = true
        })
        .addCase(getReviews.fulfilled, (state, action) => {
            state.getReviews.loading = false
            state.getReviews.reviews = action.payload.reviews
        })
        .addCase(getReviews.rejected, (state, action) => {
            state.getReviews.loading = false
            state.getReviews.error = action.payload
        })
    }
})

export default reviewSlice.reducer