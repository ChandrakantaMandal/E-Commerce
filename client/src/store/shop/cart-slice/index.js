import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  // cartItems will hold the cart document returned from the server: { _id, userId, items: [...] }
  cartItems: { items: [] },
  isLoding: false,
};

export const addToCart = createAsyncThunk(
  "cart/addtocart",
  async ({ userId, productId, quantity }) => {
    try {
      const result = await axios.post(
        "http://localhost:5000/api/shop/cart/add",
        {
          userId,
          productId,
          quantity,
        }
      );
      return result?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchcartitems",
  async (userId) => {
    try {
      const result = await axios.get(
        `http://localhost:5000/api/shop/cart/get/${userId}`
      );
      return result?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deletecartitem",
  async ({ userId, productId }) => {
    try {
      const result = await axios.delete(
        `http://localhost:5000/api/shop/cart/${userId}/${productId}`
      );
      return result?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updateCartItemQty = createAsyncThunk(
  "cart/updatecartitemqty",
  async ({ userId, productId, quantity }) => {
    try {
      const result = await axios.put(
        "http://localhost:5000/api/shop/cart/update-cart",
        {
          userId,
          productId,
          quantity,
        }
      );
      return result?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const ShoppingCartSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoding = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoding = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoding = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoding = false;
        state.cartItems = [];
      })
      .addCase(updateCartItemQty.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(updateCartItemQty.fulfilled, (state, action) => {
        state.isLoding = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartItemQty.rejected, (state) => {
        state.isLoding = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoding = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoding = false;
        state.cartItems = [];
      });
  },
});

export default ShoppingCartSlice.reducer;
