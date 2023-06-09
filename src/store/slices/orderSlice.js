import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getReq, postReq } from "../../requests";

const initialState = {
  orderID: [],
  lastOrderVal: [],
  lastOrderAdd: {},
};

export const addOrder = createAsyncThunk(
  "order/add",
  async (args, { rejectWithValue }) => {
    try {
      const response = await postReq("/order/add", args, true);
      return response;
    } catch (err) {
      rejectWithValue(err.response.data);
      console.log(err);
    }
  }
);

export const lastOrder = createAsyncThunk(
  "order/lastOrder",
  async (args, { rejectWithValue }) => {
    try {
      const response = await getReq("/order/last_order", true);
      return response;
    } catch (err) {
      rejectWithValue(err.response.data);
      console.log(err);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(lastOrder.fulfilled, (state, action) => {
      return {
        ...state,
        lastOrderVal: action.payload.products,
        lastOrderAdd: action.payload.address[0],
      };
    });
  },
});

export default orderSlice.reducer;
