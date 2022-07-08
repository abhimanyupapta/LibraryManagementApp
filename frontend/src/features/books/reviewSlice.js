import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  newReview: "",
  isLoading: true,
  error: null,
};

export const submitReview = createAsyncThunk(
  "review/submitReview",
  async (input, thunkAPI) => {
    try {
    

      const config = {
        headers: {
          "Content-Type": "application/json",
        
        },
      };
      const resp = await axios.post("/api/v1/books/review", input[0] , config);
      return resp.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(submitReview.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newReview = action.payload.review;
        state.error = null;
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice;
