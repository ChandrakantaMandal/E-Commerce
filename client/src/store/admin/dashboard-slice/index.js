import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

export const getDashboardStats = createAsyncThunk(
  "/admin/getDashboardStats",
  async () => {
    const result = await axios.get(
      "http://localhost:5000/api/admin/dashboard/stats",
      {
        withCredentials: true,
      }
    );

    return result?.data;
  }
);

const adminDashboardSlice = createSlice({
  name: "adminDashboardSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboardData = action.payload.data;
      })
      .addCase(getDashboardStats.rejected, (state) => {
        state.isLoading = false;
        state.dashboardData = null;
      });
  },
});

export default adminDashboardSlice.reducer;
