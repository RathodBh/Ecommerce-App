import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getReq, postReq } from "../../requests";

const initialState = {
  orderID: [],
  allOrdersVal:[]
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



export const allOrders = createAsyncThunk(
  "order/allOrders",
  async (args, { rejectWithValue }) => {
    try {
      const response = await getReq("/order/all_orders", true);
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
    
    builder.addCase(allOrders.fulfilled, (state, action) => {
      return {
        ...state,
        allOrdersVal: action.payload?.userOrder,
      };
    });
  },
});

export default orderSlice.reducer;
