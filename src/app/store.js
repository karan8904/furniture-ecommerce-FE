import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'
import contactReducer from '../slices/contactSlice'
import orderReducer from '../slices/orderSlice'
import snackbarReducer from '../slices/snackbarSlice'
import categoryReducer from '../slices/categorySlice'
import produceReducer from '../slices/productSlice'
import cartReducer from '../slices/cartSlice'
import addressReducer from '../slices/addressSlice'
import chargesReducer from '../slices/chargesSlice'
import wishlistReducer from '../slices/wishlistSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    contact: contactReducer,
    order: orderReducer,
    snackbar: snackbarReducer,
    category: categoryReducer,
    product: produceReducer,
    cart: cartReducer,
    address: addressReducer,
    charge: chargesReducer,
    wishlist: wishlistReducer
  },
})