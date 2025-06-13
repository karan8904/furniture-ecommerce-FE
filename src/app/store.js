import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'
import contactReducer from '../slices/contactSlice'
import orderReducer from '../slices/orderSlice'


export const store = configureStore({
  reducer: {
    user: userReducer,
    contact: contactReducer,
    order: orderReducer
  },
})