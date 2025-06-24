import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "../api/axios";

const initialState = {
  addToCart: {
    productDetails: {},
    userID: null,
    error: null,
    loading: false,
  },
  getCartProducts: {
    products: [],
    loading: false,
    error: null,
  },
  increaseQuantity: {
    loading: false,
    error: null,
  },
  decreaseQuantity: {
    loading: false,
    error: null,
  },
  checkoutData: {
    data: {},
    loading: false,
    error: null,
  },
  removeFromCart: {
    loading: false,
    error: null
  }
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (data, thunkApi) => {
    try {
      const response = await axios.post("/cart/add", data);
      return response.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getCartProducts = createAsyncThunk(
  "cart/getCartProducts",
  async (id, thunkApi) => {
    try {
      const response = await axios.get(`/cart/get/${id}`);
      return response.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const increaseQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async (data, thunkApi) => {
    try {
      const response = await axios.put("/cart/increaseQty", data);
      return response.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const decreaseQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async (data, thunkApi) => {
    try {
      const response = await axios.put("/cart/decreaseQty", data);
      return response.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async(id, thunkApi) => {
        try {
           const response = axios.delete(`/cart/remove/${id}`)
           return response.data 
        } catch (error) {
            const message = error.response.data.message
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCheckoutData: (state, action) => {
      state.checkoutData.data = action.payload;
    },
    resetCart: (state) => {
        state.getCartProducts.products = []
    }
  },
  extraReducers: (builder) => {
    builder
      //ADD TO CART
      .addCase(addToCart.pending, (state) => {
        state.addToCart.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.addToCart.loading = false;
        state.getCartProducts.products.push(action.payload.product)
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.addToCart.loading = false;
        state.addToCart.error = action.payload;
      })

      //GET CART PRODUCTS
      .addCase(getCartProducts.pending, (state) => {
        state.getCartProducts.loading = true;
      })
      .addCase(getCartProducts.fulfilled, (state, action) => {
        state.getCartProducts.loading = false;
        state.getCartProducts.products = action.payload;
      })
      .addCase(getCartProducts.rejected, (state, action) => {
        state.getCartProducts.loading = false;
        state.getCartProducts.error = action.payload;
      })

      //INCREASE QUANTITY
      .addCase(increaseQuantity.pending, (state) => {
        state.increaseQuantity.loading = true;
      })
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        let productID = action.payload.productID;
        let products = state.getCartProducts.products
        for(let i in products){
            if(products[i].productID._id === productID){
                products[i].quantity += 1
            }
        }
        state.getCartProducts.products = products
        state.increaseQuantity.loading = false;
      })
      .addCase(increaseQuantity.rejected, (state, action) => {
        state.increaseQuantity.loading = false;
        state.increaseQuantity.error = action.payload;
      })

      //DECREASE QUANTITY
      .addCase(decreaseQuantity.pending, (state) => {
        state.decreaseQuantity.loading = true;
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        let productID = action.payload.productID;
        let products = state.getCartProducts.products
        for(let i in products){
            if(products[i].productID._id === productID){
                products[i].quantity -= 1
            }
        }
        state.getCartProducts.products = products
        state.increaseQuantity.loading = false;
      })
      .addCase(decreaseQuantity.rejected, (state, action) => {
        state.decreaseQuantity.loading = false;
        state.decreaseQuantity.error = action.payload;
      })

      //REMOVE FROM CART
      .addCase(removeFromCart.pending, (state) => {
        state.removeFromCart.loading = true
      })
      .addCase(removeFromCart.fulfilled, (state) => {
        state.removeFromCart.loading = false
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.removeFromCart.loading = false
        state.removeFromCart.error = action.payload
      })
  },
});

export const { getCheckoutData, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
