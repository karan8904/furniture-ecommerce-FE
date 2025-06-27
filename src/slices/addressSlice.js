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
    },
    getSingleAddress: {
        address: {},
        error: null,
        loading: false
    },
    editAddress: {
        error: null, 
        loading: false
    },
    deleteAddress: {
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

export const getSingleAddress = createAsyncThunk(
    "address/getSingleAddress",
    async(id, thunkApi) => {
        try {
            const response = await axios.get(`/address/getSingle/${id}`)
            return response.data
        } catch (error) {
            const message = error.response.data.message
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const editAddress = createAsyncThunk(
    "address/editAddress",
    async(data, thunkApi) => {
        try {
            const response = await axios.put(`/address/edit/${data.id}`, data)
            return response.data
        } catch (error) {
            const message = error.response.data.message
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const deleteAddress = createAsyncThunk(
    "address/deleteAddress",
    async(id, thunkApi) => {
        try {
            const response = await axios.delete(`/address/delete/${id}`)
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

        //GET SINGLE ADDRESS
        .addCase(getSingleAddress.pending, (state) => {
            state.getSingleAddress.loading = true
        })
        .addCase(getSingleAddress.fulfilled, (state, action) => {
            state.getSingleAddress.address = action.payload.address
            state.getSingleAddress.loading = false
        })
        .addCase(getSingleAddress.rejected, (state, action) => {
            state.getSingleAddress.loading = false
            state.getSingleAddress.error = action.payload
        })
        
        //EDIT ADDRESS
        .addCase(editAddress.pending, (state) => {
            state.editAddress.loading = true
        })
        .addCase(editAddress.fulfilled, (state) => {
            state.editAddress.loading = false
        })
        .addCase(editAddress.rejected, (state, action) => {
            state.editAddress.loading = false
            state.editAddress.error = action.payload
        })

        //DELETE ADDRESS
        .addCase(deleteAddress.pending, (state) => {
            state.deleteAddress.loading = true
        })
        .addCase(deleteAddress.fulfilled, (state, action) => {
            state.deleteAddress.loading = false
        })
        .addCase(deleteAddress.rejected, (state, action) => {
            state.deleteAddress.loading = false
            state.deleteAddress.error = action.payload
        })
    }
})

export default addressSlice.reducer