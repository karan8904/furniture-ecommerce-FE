import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

const initialState = {
    users: []
}

export const createUser = createAsyncThunk(
    'users/createUser',
    async (userData, thunkApi) => {
        try {
            const response = await axios.post("/users/register", userData)
            return response.data
        } catch (error) {
            const message = error.response.data.message
            alert(message)
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const loginUser = createAsyncThunk(
    'users/loginUser',
    async(userData, thunkApi) => {
        try {
            const response = await axios.post("/users/login", userData)
            return response.data
        } catch (error) {
            const message = error.response.data.message
            // alert(message)
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const forgotPassword = createAsyncThunk(
    'users/forgotPassword',
    async(userData, thunkApi) => {
        try {
            const response = await axios.post('/password/forgot-password', userData)
            return response.data
        } catch (error) {
            const message = error.response.data.message
            alert(message)
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const resetPassword = createAsyncThunk(
    'users/resetPassword',
    async(userData, thunkApi) => {
        try {
            const response  = await axios.post('/password/reset-password', userData)
            console.log(userData)
            return response.data
        } catch (error) {
            const message = error.response.data.message
            alert(message)
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (buidler) => {
        buidler
        .addCase(createUser.fulfilled, (state, action) => {
            alert("User Registration Successful.")
            state.users.push(action.payload)
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            const data = action.payload
            // localStorage.setItem("token", data.token)
            alert("Logged in successfully.")
        } )
        .addCase(forgotPassword.fulfilled, (state, action) => {
            alert("Email sent for password reseting...Check it out!")
        })
        .addCase(resetPassword.fulfilled, (state, action) => {
            alert("Password Updated Successfully")
        })
    }
})

export default userSlice.reducer