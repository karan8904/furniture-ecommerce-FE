import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "../api/axios";

const initialState = {
    createAddress: {
        error: null,
        loading: false
    },
    getAddresses: {
        addresses: [],
        error: null,
        loading: false
    }
}

export const createAddress = createAsyncThunk(
    "address/createAddress",
    async(data, thunkApi) => {
        try {
            // console.log(data.userID, data.addressData)
            const response = await axios.post("/address/create", data.addressData)
            return response.data
        } catch (error) {
            const message = error.response.data.message 
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const getAddresses = createAsyncThunk(
    "address/getAddresses",
    async(id, thunkApi) => {
        try {
            const response = await axios.get(`/address/get/${id}`)
            return response.data
        } catch (error) {
            const message = error.response.data.message
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        //CREATE ADDRESS
        .addCase(createAddress.pending, (state) => {
            state.createAddress.loading = true
        })
        .addCase(createAddress.fulfilled, (state, action) => {
            state.createAddress.loading = false
        })
        .addCase(createAddress.rejected, (state, action) => {
            state.createAddress.loading = false
            state.createAddress.error = action.payload
        })

        //GET ADDRESSES
        .addCase(getAddresses.pending, (state, action) => {
            state.getAddresses.loading = true
        })
        .addCase(getAddresses.fulfilled, (state, action) => {
            state.getAddresses.loading = false
            state.getAddresses.addresses = action.payload
        })
        .addCase(getAddresses.rejected, (state, action) => {
            state.getAddresses.loading = false
            state.getAddresses.error = action.payload
        })
    }
})

export default addressSlice.reducer