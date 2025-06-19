import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

const initialState = {
  addProduct: {
    error: null,
    loading: false,
  },
  getProducts: {
    products: [],
    error: null,
    loading: false
  },
  deleteProduct: {
    error: null,
    loading: false
  },
  editProduct: {
    error: null,
    loading: false
  }
};

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (formData, thunkApi) => {
    try {
      const response = await axios.post("/products/add", formData, {
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

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/products/")
      return response.data
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
)

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async(id, thunkApi) => {
    try {
      const response = await axios.delete(`/products/delete/${id}`)
      return response.data
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
)

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async(data, thunkApi) => {
    try {
      const response = await axios.put(`/products/edit/${data.id}`, data.formData, {
        headers: {"Content-Type": "multipart/form-data"}
      })
      return response.data
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
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
      .addCase(addProduct.pending, (state) => {
        state.addProduct.loading = true;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.addProduct.loading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.addProduct.loading = false;
        state.addProduct.error = action.payload;
      })

      //GET PRODUCTS
      .addCase(getProducts.pending, (state) => {
        state.getProducts.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.getProducts.loading = false;
        state.getProducts.products = action.payload.products
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.getProducts.loading = false;
        state.getProducts.error = action.payload
      })

      //DELETE PRODUCT
      .addCase(deleteProduct.pending, (state) => {
        state.deleteProduct.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.deleteProduct.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteProduct.loading = false;
        state.deleteProduct.error = action.payload;
      })

      //EDIT PRODUCT
      .addCase(editProduct.pending, (state) => {
        state.editProduct.loading = true;
      })
      .addCase(editProduct.fulfilled, (state) => {
        state.editProduct.loading = false;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.editProduct.loading - false
        state.editProduct.error = action.payload;
      })
  },
});

export default productSlice.reducer;
