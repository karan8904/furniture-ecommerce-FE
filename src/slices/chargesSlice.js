import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "../api/axios";

const initialState = {
    addCharge: {
        charge: {},
        error: null,
        loading: false
    },
    getCharges: {
        charges: [],
        error: null,
        loading: false
    },
    editCharge: {
        error: null,
        loading: false
    },
    deleteCharge: {
        error: null,
        loading: false
    }
}

export const addCharge = createAsyncThunk(
    "charges/addCharge",
    async(data, thunkApi) => {
        try {
            const response = await axios.post("/charges/create", data)
            return response.data
        } catch (error) {
            const message = error.response.data.message
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const getCharges = createAsyncThunk(
    "charges/getCharges",
    async(_, thunkApi) => {
        try {
            const response = await axios.get("/charges/get")
            return response.data
        } catch (error) {
            const message = error.response.data.message
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const editCharge = createAsyncThunk(
    "charges/editCharges",
    async(data, thunkApi) => {
        try {
            const response = await axios.put("/charges/edit", data)
            return response.data
        } catch (error) {
            const message = error.response.data.message
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const deleteCharge = createAsyncThunk(
    "charges/deleteCharge",
    async(id, thunkApi) => {
        try {
            const response = await axios.delete(`/charges/delete/${id}`)
            return response.data
        } catch (error) {
            const message = error.response.data.message
            return thunkApi.rejectWithValue(message)
        }
    }
)

const chargesSlice = createSlice({
    name: "charges",
    initialState,
    reduces: {},
    extraReducers: (builder) => {
        builder
        //ADD CHARGE
        .addCase(addCharge.pending, (state) => {
            state.addCharge.loading = true
        })
        .addCase(addCharge.fulfilled, (state, action) => {
            state.addCharge.loading = false
            state.getCharges.charges.push(action.payload.charge)
        })
        .addCase(addCharge.rejected, (state, action) => {
            state.addCharge.loading = false
            state.addCharge.error = action.payload
        })

        //GET CHARGES
        .addCase(getCharges.pending, (state) => {
            state.getCharges.loading = true
        })
        .addCase(getCharges.fulfilled, (state, action) => {
            state.getCharges.loading = false
            state.getCharges.charges = action.payload
        })
        .addCase(getCharges.rejected, (state, action) => {
            state.getCharges.loading = false
            state.getCharges.error = action.payload
        })

        //EDIT CHARGE
        .addCase(editCharge.pending, (state) => {
            state.editCharge.loading = true
        })
        .addCase(editCharge.fulfilled, (state, action) => {
            const charge = action.payload.charge
            state.getCharges.charges.map((c) => {
                if(c._id === charge._id){
                    c.name = charge.name
                    c.chargePercent = charge.chargePercent
                }
            })
            state.editCharge.loading = false
        })
        .addCase(editCharge.rejected, (state, action) => {
            state.editCharge.loading = false
            state.editCharge.error = action.payload
        })

        //DELETE CHARGE
        .addCase(deleteCharge.pending, (state) => {
            state.deleteCharge.loading = true
        })
        .addCase(deleteCharge.fulfilled, (state, action) => {
            const chargeId = action.payload.id
            state.getCharges.charges = state.getCharges.charges.filter((c) => c._id !== chargeId)
            state.deleteCharge.loading = false
        })
        .addCase(deleteCharge.rejected, (state, action) => {
            state.deleteCharge.loading = false
            state.deleteCharge.error = action.payload
        })
    }
})

export default chargesSlice.reducer