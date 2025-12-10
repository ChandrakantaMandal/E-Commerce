import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  addressList: [],
  isLoding: false,
};

export const addNewAddress = createAsyncThunk(
  "/address/addnewaddress",
  async (formData) => {
    try {
      const result = await axios.post(
        "http://localhost:5000/api/shop/address/add",
        formData
      );
      return result?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const fetchAllAddresses = createAsyncThunk(
  "/address/fetchalladdresses",
  async (userId) => {
    try {
      const result = await axios.get(
        `http://localhost:5000/api/shop/address/get/${userId}`
      );
      return result?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "/address/deleteaddress",
  async ({ userId, addressId }) => {
    try {
      const result = await axios.delete(
        `http://localhost:5000/api/shop/address/delete/${userId}/${addressId}`
      );
      return result?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const editAddress = createAsyncThunk(
  "/address/editAddress",
  async ({ userId, addressId, formData }) => {
    try {
      const result = await axios.put(
        `http://localhost:5000/api/shop/address/update/${userId}/${addressId}`,
        formData
      );
      return result?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const AddressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoding = false;
        const data = action.payload?.data;
        if (Array.isArray(data)) {
          state.addressList = data;
        } else if (data && typeof data === "object") {
          // add single returned address to the list
          state.addressList = state.addressList || [];
          state.addressList.push(data);
        }
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoding = false;
        state.addressList = [];
      })
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoding = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoding = false;
        state.addressList = [];
      })
      .addCase(editAddress.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        state.isLoding = false;
        const data = action.payload?.data;
        if (Array.isArray(data)) {
          state.addressList = data;
        } else if (data && typeof data === "object") {
          // replace updated address in the list
          state.addressList = state.addressList || [];
          const idx = state.addressList.findIndex((a) => a._id === data._id);
          if (idx > -1) state.addressList[idx] = data;
          else state.addressList.push(data);
        }
      })
      .addCase(editAddress.rejected, (state) => {
        state.isLoding = false;
        state.addressList = [];
      })
      .addCase(deleteAddress.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoding = false;
        const data = action.payload?.data;
        if (Array.isArray(data)) {
          state.addressList = data;
        } else {
          // server may return only a message; keep existing list
          state.addressList = state.addressList || state.addressList;
        }
      })
      .addCase(deleteAddress.rejected, (state) => {
        state.isLoding = false;
        state.addressList = [];
      });
  },
});

export default AddressSlice.reducer;
