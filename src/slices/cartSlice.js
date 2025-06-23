import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

const initialState = {
    addToCart: {
        product: {},
        error: null,
        loading: false
    }
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {}
})