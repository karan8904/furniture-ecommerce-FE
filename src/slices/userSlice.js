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
            alert("User Registration Successful.")
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
            const response = await axios.get("/users/login", userData)
            
        } catch (error) {
            
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
            state.users.push(action.payload)
        })
    }
})

export default userSlice.reducer