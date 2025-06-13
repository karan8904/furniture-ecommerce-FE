import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    users: []
}

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        createUser: (state, action) => {
            state.users.push(action.payload)
            alert("User Registration Successful..")
            console.log(current(state))
        }
    }
})

export const { createUser } = userSlice.actions

export default userSlice.reducer