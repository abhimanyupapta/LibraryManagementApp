import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  cart: {},
  cartError: null,
};

export const postCart = createAsyncThunk(
  "cart/postCart",
  async (input, thunkAPI) => {
    try {
      const { bookId, csrfToken } = input;

      const config = {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
      };
      const resp = await axios.post("/api/v1/cart/add", { bookId }, config);
      return resp.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getCart = createAsyncThunk("cart/getCart", async (_, thunkAPI) => {
  try {
    const resp = await axios.get("/api/v1/cart/get");
    return resp.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }

    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const delCart = createAsyncThunk(
  "cart/delCart",
  async (input, thunkAPI) => {
    try {
      const { id, csrfToken } = input;
      console.log(id);
      const config = {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
      };
      const resp = await axios.delete(`/api/v1/cart/del/${id}`, config);
      return resp.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,

  extraReducers(builder) {
    builder
      .addCase(postCart.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(postCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartError = null;
      })
      .addCase(postCart.rejected, (state, action) => {
        state.isLoading = false;
        state.cartError = action.payload.message;
      })
      .addCase(getCart.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.cart;
        state.cartError = null;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.cartError = action.payload.message;
      })
      .addCase(delCart.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(delCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.cart;
        state.cartError = null;
      })
      .addCase(delCart.rejected, (state, action) => {
        state.isLoading = false;
        state.cartError = action.payload.message;
      });
  },
});

export default cartSlice;
