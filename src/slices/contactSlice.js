import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    contacts: []
}

export const contactSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        createContact: (state, action) => {
            state.contacts.push(action.payload)
            alert("Thank you for connecting with us. We will contact you soon.")
            console.log(current(state))
        }
    }
})

export const { createContact } = contactSlice.actions

export default contactSlice.reducer