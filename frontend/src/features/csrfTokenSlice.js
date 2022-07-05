import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  csrfToken: "",
  isLoading: true,
};

export const getCsrfToken = createAsyncThunk(
  "csrfToken/getCsrfToken",
  async () => {
    try {
      const resp = await axios("/api/v1/getCSRFToken");

      return resp.data;
    } catch (error) {
      return error.message;
    }
  }
);

const csfrTokenSlice = createSlice({
  name: "csrfToken",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getCsrfToken.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCsrfToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.csrfToken = action.payload.csrfToken;
      })
      .addCase(getCsrfToken.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default csfrTokenSlice;
