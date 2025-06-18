import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

const initialState = {
  addCategory: {
    error: null,
    loading: false,
  },
  getCategories: {
    categories: [],
    error: null,
    loading: false,
  },
  deleteCategory: {
    error: null,
    loading: false,
  },
  editCategory: {
    error: null,
    loading: false
  }
};

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (categoryData, thunkApi) => {
    try {
      console.log("CategoryData:", categoryData);
      const response = await axios.post("/categories/add", categoryData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/categories/");
      //   console.log(response.data);
      return response.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, thunkApi) => {
    try {
      const response = await axios.delete(`/categories/delete/${id}`);
      return response.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const editCatgory = createAsyncThunk(
  "categories/editCategory",
  async (data, thunkApi) => {
    try {
      const response = await axios.put(`/categories/edit/${data.id}`, data.categoryData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      return response.data
    } catch (error) {
      const message = error.response.data.message
      return thunkApi.rejectWithValue(message)
    }
  }
);

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //ADD CATEGORY
      .addCase(addCategory.pending, (state) => {
        state.addCategory.loading = true;
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.addCategory.loading = false;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.addCategory.loading = false;
        state.addCategory.error = action.payload;
      })

      //GET CATEGORIES
      .addCase(getCategories.pending, (state) => {
        state.getCategories.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.getCategories.loading = false;
        state.getCategories.categories = action.payload.categories;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.getCategories.loading = false;
        state.getCategories.error = action.payload;
      })

      //DELETE CATEGORIES
      .addCase(deleteCategory.pending, (state) => {
        state.deleteCategory.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.deleteCategory.loading = false;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.deleteCategory.loading = false;
        state.deleteCategory.error = action.payload;
      })

      //EDIT CATEGORIES
      .addCase(editCatgory.pending, (state) => {
        state.editCategory.loading = true;
      })
      .addCase(editCatgory.fulfilled, (state) => {
        state.editCategory.loading = false;
      })
      .addCase(editCatgory.rejected, (state, action) => {
        state.editCategory.loading = false;
        state.editCategory.error = action.payload
      })
  },
});

export default categorySlice.reducer;
