import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

const initialState = {
    users: [],
    error: null,
    loading: false,
    getCurrentUser: {
        user: {},
        error: null,
        loading: false
    },
    editUser: {
        error: null,
        loading: false
    }
}

export const createUser = createAsyncThunk(
    'users/createUser',
    async (userData, thunkApi) => {
        try {
            const response = await axios.post("/users/register", userData)
            return response.data
        } catch (error) {
            const message = error.response.data.message
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
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const getCurrentUser = createAsyncThunk(
    'users/getCurrentUser',
    async(token, thunkApi) => {
        try {
            const response = await axios.post("/users/getUser")
            return response.data
        } catch (error) {
            const message = error.response.data.message
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const editUser = createAsyncThunk(
    'users/editUser',
    async(data, thunkApi) => {
        try {
            const response = await axios.put("/users/editUser", data)
            return response.data
        } catch (error) {
            const message = error.response.data.message
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        logoutUser: (state) => {
            localStorage.removeItem("token")
            state.getCurrentUser.user = {}
        }
    },
    extraReducers: (buidler) => {
        buidler
        //USER REGISTRATION
        .addCase(createUser.pending, (state, action) => {
            state.loading = true
        })
        .addCase(createUser.fulfilled, (state, action) => {
            state.loading = false
            state.users.push(action.payload)
        })
        .addCase(createUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        //USER LOGIN
        .addCase(loginUser.pending, (state, action) => {
            state.loading = true
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false
            const data = action.payload
            localStorage.setItem("token", data.token)
            state.getCurrentUser.user = data.user
        } )
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        //FORGOT PASSWORD
        .addCase(forgotPassword.pending, (state, action) => {
            state.loading = true
        })
        .addCase(forgotPassword.fulfilled, (state, action) => {
            state.loading = false
        })
        .addCase(forgotPassword.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        //RESET PASSWORD
        .addCase(resetPassword.pending, (state, action) => {
            state.loading = true
        })
        .addCase(resetPassword.fulfilled, (state, action) => {
            state.loading = false
        })
        .addCase(resetPassword.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        //GET CURRENT USER
        .addCase(getCurrentUser.pending, (state) => {
            state.getCurrentUser.loading = true;
        })
        .addCase(getCurrentUser.fulfilled, (state, action) => {
            state.getCurrentUser.loading = false
            state.getCurrentUser.user = action.payload
        })
        .addCase(getCurrentUser.rejected, (state, action) => {
            state.getCurrentUser.loading = false
            state.getCurrentUser.error = action.payload
        })

        //EDIT USER
        .addCase(editUser.pending, (state) => {
            state.editUser.loading = true
        })
        .addCase(editUser.fulfilled, (state, action) => {
            state.editUser.loading = false
            state.getCurrentUser.user = action.payload.user
        })
        .addCase(editUser.rejected, (state) => {
            state.editUser.loading = false
            state.editUser.error = action.payload
        })
    }
})

export const { logoutUser } = userSlice.actions

export default userSlice.reducer