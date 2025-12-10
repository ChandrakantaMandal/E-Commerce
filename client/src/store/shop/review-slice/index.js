import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addReview = createAsyncThunk(
  "/order/addReview",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/shop/review/add`,
        formData
      );

      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const getReviews = createAsyncThunk(
  "/order/getReviews",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/shop/review/${id}`
      );

      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;
