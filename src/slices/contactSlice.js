import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

const initialState = {
    createContact: {
        loading: false,
        error: null
    }
}

export const createContact = createAsyncThunk(
    "contacts/createContact",
    async(data, thunkApi) => {
        try {
            const response = await axios.post("/contacts/create", data)
            return response.data
        } catch (error) {
            const message = error.response.data.message
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const contactSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        //CREATE CONTACT
        .addCase(createContact.pending, (state) => {
            state.createContact.loading = true
        })
        .addCase(createContact.fulfilled, (state) => {
            state.createContact.loading = false
        })
        .addCase(createContact.rejected, (state, action) => {
            state.createContact.loading = false
            state.createContact.error = action.payload
        })
    }
})

export default contactSlice.reducer