import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

const initialState = {
  addProduct: {
    error: null,
    loading: false,
  },
};

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (formData, thunkApi) => {
    try {
      const response = await axios.post("/product/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error)
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //ADD PRODUCT
      .addCase(addProduct.pending, (state) => {
        state.addProduct.loading = true;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.addProduct.loading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.addProduct.loading = false;
        state.addProduct.error = action.payload;
      });
  },
});

export default productSlice.reducer;
