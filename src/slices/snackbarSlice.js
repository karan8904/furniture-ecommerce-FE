import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: false,
    severity: "",
    message: ""
}

export const snackbarSlice = createSlice({
    name: "snackbar",
    initialState,
    reducers: {
        showSnackbar: (state, action) => {
            state.open = true
            state.severity = action.payload.severity || "success"
            state.message = action.payload.message
        },
        hideSnackbar: (state) => {
            state.open = false
            state.severity = ""
            state.message = ""
        }
    }
})

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions

export default snackbarSlice.reducer