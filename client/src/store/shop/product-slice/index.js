import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  isLoding: false,
  productDetails: null,
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "product/fetchallproducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      price: sortParams,
    });
    try {
      const result = await axios.get(
        `http://localhost:5000/api/shop/products/get?${query}`
      );
      return result?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const fetchProductsDetails = createAsyncThunk(
  "product/fetchproductsdetails ",
  async (id) => {
    try {
      const result = await axios.get(
        `http://localhost:5000/api/shop/products/get/${id}`
      );
      return result?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const ShoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoding = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isLoding = false;
        state.productList = [];
      })
      .addCase(fetchProductsDetails.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(fetchProductsDetails.fulfilled, (state, action) => {
        state.isLoding = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductsDetails.rejected, (state) => {
        state.isLoding = false;
        state.productDetails = null;
      });
  },
});

export const { setProductDetails } = ShoppingProductSlice.actions;

export default ShoppingProductSlice.reducer;
