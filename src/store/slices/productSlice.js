import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getReq } from "../../requests";

const initialState = {
  products: [],
  productOne: {},
};

export const productsWithCategory = createAsyncThunk(
  "product/productsWithCategory",
  async (args, { rejectWithValue }) => {
    try {
      const response = await getReq("/product/with_category");
      return response;
    } catch (err) {
      rejectWithValue(err.response.data);
      console.log(err);
    }
  }
);

export const singleProduct = createAsyncThunk(
  "product/singleProduct",
  async (args, { rejectWithValue }) => {
    try {
      const response = await getReq(`/product/${args}`);
      return response;
    } catch (err) {
      rejectWithValue(err.response.data);
      console.log(err);
    }
  }
);

export const productReducer = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(productsWithCategory.fulfilled, (state, action) => {
      return {
        ...state,
        products: action.payload,
      };
    });
    builder.addCase(singleProduct.fulfilled, (state, action) => {
      return {
        ...state,
        productOne: action.payload,
      };
    });
  },
});

export default productReducer.reducer;
