import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

const initialState = {
  products: [],
  error: null,
  loading: false,
};

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async(productData, thunkApi) =>{
    try {
      console.log("ProductData:", productData)
    } catch (error) {
      const message = error.response.data.message
      return thunkApi.rejectWithValue(message)
    }
  }
)

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        //ADD PRODUCT
        .addCase(addProduct.pending, (state, action) => {
          state.loading = true
        })
        .addCase(addProduct.fulfilled, (state, action) => {
          state.loading = false
        })
        .addCase(addProduct.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload
        })
      }
})

export default productSlice.reducer