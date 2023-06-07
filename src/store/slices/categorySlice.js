import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getReq } from "../../requests";

const initialState = {
  namesVal: [],
};

export const names = createAsyncThunk(
  "cart/names",
  async (args, { rejectWithValue }) => {
    try {
      const response = await getReq("/category/names");
      return response;
    } catch (err) {
      rejectWithValue(err.response.data);
      console.log(err);
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(names.fulfilled, (state, action) => {
      return {
        ...state,
        namesVal: action.payload,
      };
    });
  },
});

export default categorySlice.reducer;
