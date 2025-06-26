import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "../api/axios";

const initialState = {
    placeOrder: {
        order: {},
        error: null,
        loading: false
    },
    getOrders: {
        orders: [],
        error: null,
        loading: false
    },
    changeStatus: {
        error: null,
        loading: false
    }
}

export const placeOrder = createAsyncThunk(
    "orders/placeOrder",
    async(data, thunkApi) => {
        try {
            // console.log(data)
            const response = await axios.post("/orders/create", data)
            return response.data
        } catch (error) {
            const message = error.response.data.message
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const getOrders = createAsyncThunk(
    "orders/getOrders",
    async(_, thunkApi) => {
        try {
            const response = await axios.get("/orders/get")
            return response.data
        } catch (error) {
            const message = error.response.data.message
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const changeOrderStatus = createAsyncThunk(
    "orders/changeOrderStatus",
    async(data, thunkApi) => {
        try {
            const response = await axios.put("/orders/changeStatus", data)
            return response.data
        } catch (error) {
            const message = error.response.data.message
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        //PLACE ORDER
        .addCase(placeOrder.pending, (state) => {
            state.placeOrder.loading = true
        })
        .addCase(placeOrder.fulfilled, (state) => {
            state.placeOrder.loading = false
        })
        .addCase(placeOrder.rejected, (state, action) => {
            state.placeOrder.loading = false
            state.placeOrder.error = action.payload
        })

        //GET ORDERS
        .addCase(getOrders.pending, (state) => {
            state.getOrders.loading = true
        })
        .addCase(getOrders.fulfilled, (state, action) => {
            state.getOrders.loading = false
            state.getOrders.orders = action.payload.orders
        })
        .addCase(getOrders.rejected, (state, action) => {
            state.getOrders.loading = false
            state.getOrders.error = action.payload
        })

        //CHANGE STATUS
        .addCase(changeOrderStatus.pending, (state) => {
            state.changeStatus.loading = true
        })
        .addCase(changeOrderStatus.fulfilled, (state, action) => {
            state.getOrders.orders.map((order) => {
                if(order._id === action.payload.order._id)
                    order.orderStatus = action.payload.order.orderStatus
            })
            state.changeStatus.loading = false
        })
        .addCase(changeOrderStatus.rejected, (state, action) => {
            state.changeStatus.loading = false
            state.changeStatus.error = action.payload
        })
    }
})


export default orderSlice.reducer