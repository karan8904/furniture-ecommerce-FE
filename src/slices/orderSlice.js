import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    orders: []
}

export const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        placeOrder: (state, action) => {
            state.orders.push(action.payload)
            alert("Order Placed Successfully.")
            console.log(current(state.orders))
        }
    }
})

export const { placeOrder } = orderSlice.actions

export default orderSlice.reducer