import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

const initialState = {
  users: [],
  error: null,
  loading: false,
  getCurrentUser: {
    user: {},
    error: null,
    loading: false,
  },
  editUser: {
    error: null,
    loading: false,
  },
  getAllUsers: {
    users: [],
    error: null,
    loading: false,
  },
  changeUserStatus: {
    error: null,
    loadingIDs: [],
  },
  saveEmailPreference: {
    orderStatus: false,
    newProducts: false,
    offers: false,
    error: null,
    loading: false,
  },
  getEmailPreference: {
    preference: {
      orderStatus: false,
      newProducts: false,
      offers: false,
    },
    error: null,
    loading: false,
  },
  setEmailSubscription: {
    error: null,
    loading: false
  }
};

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData, thunkApi) => {
    try {
      const response = await axios.post("/users/register", userData);
      return response.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (userData, thunkApi) => {
    try {
      const response = await axios.post("/users/login", userData);
      return response.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "users/forgotPassword",
  async (userData, thunkApi) => {
    try {
      const response = await axios.post("/password/forgot-password", userData);
      return response.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "users/resetPassword",
  async (userData, thunkApi) => {
    try {
      const response = await axios.post("/password/reset-password", userData);
      console.log(userData);
      return response.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "users/getCurrentUser",
  async (token, thunkApi) => {
    try {
      const response = await axios.get("/users/getUser");
      return response.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async (data, thunkApi) => {
    try {
      const response = await axios.put("/users/editUser", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return response.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/users/getAll");
      return response.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const changeUserStatus = createAsyncThunk(
  "users/changeUserStatus",
  async (data, thunkApi) => {
    try {
      const response = await axios.put("/users/changeStatus", data);
      return response.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const saveEmailPreference = createAsyncThunk(
  "users/saveEmailPreference",
  async (data, thunkApi) => {
    try {
      const response = await axios.post("/email/setPreference", data);
      return response.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getEmailPreference = createAsyncThunk(
  "users/getEmailPreference",
  async (data, thunkApi) => {
    try {
      const response = await axios.get("/email/getPreference");
      return response.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const searchUsers = createAsyncThunk(
  "users/searchUsers",
  async(query, thunkApi) => {
    try {
      const response = await axios.get(`/users/search/${query}`);
      return response.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
)

export const setEmailSubscription = createAsyncThunk(
  "users/setEmailSubscription",
  async(email, thunkApi) => {
    try {
      const response = await axios.post("/email/setSubscription", email)
      return response.data
    } catch (error) {
      const message = error.response.data.message
      return thunkApi.rejectWithValue(message)
    }
  }
)

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("token");
      state.getCurrentUser.user = {};
    },
  },
  extraReducers: (buidler) => {
    buidler
      //USER REGISTRATION
      .addCase(createUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload;
        localStorage.setItem("token", data.token);
        state.getCurrentUser.user = data.user;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //USER LOGIN
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload;
        localStorage.setItem("token", data.token);
        state.getCurrentUser.user = data.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //FORGOT PASSWORD
      .addCase(forgotPassword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //RESET PASSWORD
      .addCase(resetPassword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //GET CURRENT USER
      .addCase(getCurrentUser.pending, (state) => {
        state.getCurrentUser.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.getCurrentUser.loading = false;
        state.getCurrentUser.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.getCurrentUser.loading = false;
        state.getCurrentUser.error = action.payload;
      })

      //EDIT USER
      .addCase(editUser.pending, (state) => {
        state.editUser.loading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.editUser.loading = false;
        state.getCurrentUser.user = action.payload;
      })
      .addCase(editUser.rejected, (state) => {
        state.editUser.loading = false;
        state.editUser.error = action.payload;
      })

      //GET ALL USERS
      .addCase(getAllUsers.pending, (state) => {
        state.getAllUsers.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.getAllUsers.loading = false;
        state.getAllUsers.users = action.payload.users;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.getAllUsers.loading = false;
        state.getAllUsers.error = action.payload;
      })

      //CHANGE USER STATUS
      .addCase(changeUserStatus.pending, (state, action) => {
        state.changeUserStatus.loadingIDs.push(action.meta.arg.id);
      })
      .addCase(changeUserStatus.fulfilled, (state, action) => {
        const user = action.payload.user;
        state.getAllUsers.users.map((i) => {
          if (i._id === user._id) i.isUserEnabled = user.isUserEnabled;
        });
        state.changeUserStatus.loadingIDs = state.changeUserStatus.loadingIDs.filter((i) => i._id === user._id);
      })
      .addCase(changeUserStatus.rejected, (state, action) => {
        state.changeUserStatus.loadingIDs = [];
        state.changeUserStatus.error = action.payload;
      })

      //SAVE EMAIL PREFERENCE
      .addCase(saveEmailPreference.pending, (state) => {
        state.saveEmailPreference.loading = true;
      })
      .addCase(saveEmailPreference.fulfilled, (state) => {
        state.saveEmailPreference.loading = false;
      })
      .addCase(saveEmailPreference.rejected, (state, action) => {
        state.saveEmailPreference.loading = false;
        state.saveEmailPreference.error = action.payload;
      })

      //GET EMAIL PREFERENCE
      .addCase(getEmailPreference.pending, (state) => {
        state.getEmailPreference.loading = true;
      })
      .addCase(getEmailPreference.fulfilled, (state, action) => {
        const data = action.payload;
        state.getEmailPreference.loading = false;
        state.getEmailPreference.preference.newProducts = data.newProducts;
        state.getEmailPreference.preference.orderStatus = data.orderStatus;
        state.getEmailPreference.preference.offers = data.offers;
      })
      .addCase(getEmailPreference.rejected, (state, action) => {
        state.getEmailPreference.loading = false;
        state.getEmailPreference.error = action.payload;
      })

      //SEARCH USERS
      .addCase(searchUsers.pending, (state) => {
        state.getAllUsers.loading = true
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        if(action.payload.length === 0)
          state.getAllUsers.users = []
        state.getAllUsers.users = action.payload
        state.getAllUsers.loading = false
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.getAllUsers.loading = false
        state.getAllUsers.error = action.payload
      })

      //SET EMAIL SUBSCRIPTION
      .addCase(setEmailSubscription.pending, (state) => {
        state.setEmailSubscription.loading = true
      })
      .addCase(setEmailSubscription.fulfilled, (state) => {
        state.setEmailSubscription.loading = false
      })
      .addCase(setEmailSubscription.rejected, (state, action) => {
        state.setEmailSubscription.loading = false
        state.setEmailSubscription.error = action.payload
      })
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
