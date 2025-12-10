import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoding: true,
  user: null,
  token: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/logout",{},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const checkAuth = createAsyncThunk("auth/check-auth", async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/check-auth",
      {},
      {
        withCredentials: true,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Expires: "0",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoding = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoding = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoding = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoding = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoding = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoding = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoding = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoding = false;
        state.user = null;
        state.isAuthenticated = false;
      }) 
      ;
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;
