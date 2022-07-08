import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,

  issueError: null,
};

export const postIssue = createAsyncThunk(
  "issue/postIssue",
  async (input, thunkAPI) => {
    try {
      const { books, issuedTill} = input;
      const config = {
        headers: {
          "Content-Type": "application/json",
        
        },
      };
      const resp = await axios.post(
        "/api/v1/issue/new",
        { books, issuedTill },
        config
      );
      return resp.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const issueSlice = createSlice({
  name: "issue",
  initialState,

  extraReducers(builder) {
    builder
      .addCase(postIssue.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(postIssue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartError = null;
      })
      .addCase(postIssue.rejected, (state, action) => {
        state.isLoading = false;
        state.cartError = action.payload.message;
      });
  },
});

export default issueSlice;
