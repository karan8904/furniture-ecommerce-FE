import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "../api/axios";

const initialState = {
    getSubscrption: {
        error: null,
        loading: false
    },
    confirmSubscription: {
        error: null,
        loading: false
    },
    getSubscriptionDetails: {
        details: {},
        error: null,
        loading: false
    },
    cancelSubscription: {
        error: null,
        loading: false
    }
}

export const getSubscription = createAsyncThunk(
    "subscriptions/getSubscription",
    async(id, thunkApi) => {
        try {
            const response = await axios.post("/payment/getSubscription", { priceID: id })
            return response.data
        } catch (error) {
            const message = error.response.data.message
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const confirmSubscription = createAsyncThunk(
    "subscriptions/confirmSubscription",
    async(id, thunkApi) => {
        try {
            const response = await axios.get(`/subscription/confirm/${id}`)
            return response.data
        } catch (error) {
            const message = error.response.data.message
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const getSubscriptionDetails = createAsyncThunk(
    "subscription/getSubscriptionDetails",
    async(priceId, thunkApi) => {
        try {
           const response = await axios.get(`/subscription/getDetails/${priceId}`)
           return response.data 
        } catch (error) {
            const message = error.response.data.message
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const cancelSubscription = createAsyncThunk(
    "subscription/cancelSubcription",
    async(priceID, thunkApi) => {
        try {
            const response = await axios.put(`/subscription/cancelSubscription/${priceID}`)
            return response.data
        } catch (error) {
            const message = error.response.data.message
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const subscriptionSlice = createSlice({
    name: "subscriptions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

        //GET SUBSCRIPTION
        .addCase(getSubscription.pending, (state) => {
            state.getSubscrption.loading = true
        })
        .addCase(getSubscription.fulfilled, (state) => {
            state.getSubscrption.loading = false
        })
        .addCase(getSubscription.rejected, (state, action) => {
            state.getSubscrption.loading = false
            state.getSubscrption.error = action.payload
        })

        //CONFIRM SUBSCRIPTION
        .addCase(confirmSubscription.pending, (state) => {
            state.confirmSubscription.loading = true
        })
        .addCase(confirmSubscription.fulfilled, (state) => {
            state.confirmSubscription.loading = false
        })
        .addCase(confirmSubscription.rejected, (state, action) => {
            state.confirmSubscription.loading = false
            state.confirmSubscription.error = action.payload
        })

        //GET SUBSCRIPTION DETAILS
        .addCase(getSubscriptionDetails.pending, (state) => {
            state.getSubscriptionDetails.loading = true
        })
        .addCase(getSubscriptionDetails.fulfilled, (state, action) => {
            state.getSubscriptionDetails.loading = false
            state.getSubscriptionDetails.details = action.payload.subscription

        })
        .addCase(getSubscriptionDetails.rejected, (state, action) => {
            state.getSubscriptionDetails.loading = false
            state.getSubscriptionDetails.error = action.payload
        })

        //CANCEL SUBSCRIPTION
        .addCase(cancelSubscription.pending, (state) => {
            state.cancelSubscription.loading = true
        }) 
        .addCase(cancelSubscription.fulfilled, (state, action) => {
            state.getSubscriptionDetails = action.payload.subscription
            state.cancelSubscription.loading = false
        }) 
        .addCase(cancelSubscription.rejected, (state, action) => {
            state.cancelSubscription.loading = false
            state.cancelSubscription.error = action.payload
        }) 
    }
})

export default subscriptionSlice.reducer