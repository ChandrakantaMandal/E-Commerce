import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  isLoding: false,
};

export const addNewProduct = createAsyncThunk(
  "product/addnewproducts",
  async (fromData) => {
    try {
      const result = await axios.post(
        "http://localhost:5000/api/admin/products/add",
        fromData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return result?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const uploadImage = createAsyncThunk(
  "product/uploadImage",
  async (fromData) => {
    try {
      const result = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        fromData
      );
      return result?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const fetchAllProducts = createAsyncThunk(
  "product/fetchallproducts",
  async () => {
    try {
      const result = await axios.get(
        "http://localhost:5000/api/admin/products/get"
      );
      return result?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const editProduct = createAsyncThunk(
  "product/editproduct",
  async ({ formData, id }) => {
    try {
      const result = await axios.post(
        `http://localhost:5000/api/admin/products/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return result?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "product/deleteproduct",
  async (id) => {
    try {
      const result = await axios.delete(
        `http://localhost:5000/api/admin/products/delete/${id}`
      );
      return result?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const AdminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoding = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoding = false;
        state.productList = [];
      });
  },
});

export default AdminProductSlice.reducer;
