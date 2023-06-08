import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { delReq, getReq, patchReq, postReq } from "../../requests";

const initialState = {
  cartProductIDVal: [],
  cartIDVal: 0,
};

export const cartProductID = createAsyncThunk(
  "cart/cartProductID",
  async (args, { rejectWithValue }) => {
    try {
      const [response] = await getReq("/cart/data?id=true", true);
      return response && response?.products?.map((c) => c?.id);
    } catch (err) {
      rejectWithValue(err.response.data);
      console.log(err);
    }
  }
);

export const getCartID = createAsyncThunk(
  "cart/getCartID",
  async (args, { rejectWithValue }) => {
    try {
      const [response] = await getReq("/cart/id", true);
      return response?.id;
    } catch (err) {
      rejectWithValue(err.response.data);
      console.log(err);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (args, { rejectWithValue }) => {
    try {
      const response = await postReq("/cart/add", args, true);
      return response?.prod_id;
    } catch (err) {
      rejectWithValue(err.response.data);
      console.log(err);
    }
  }
);

export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (args, { rejectWithValue }) => {
    try {
      const response = await delReq("/cart/delete", args, true);
      return response && response?.prod_id;
    } catch (err) {
      rejectWithValue(err.response.data);
      console.log(err);
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async (args, { rejectWithValue }) => {
    try {
      const response = await patchReq(
        `/cart/quantity/${args.id}`,
        { quantity: args.quantity },
        true
      );
      return response && response?.prod_id;
    } catch (err) {
      rejectWithValue(err.response.data);
      console.log(err);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCartID.fulfilled, (state, action) => {
      return {
        ...state,
        cartIDVal: action.payload,
      };
    });

    builder.addCase(cartProductID.fulfilled, (state, action) => {
      return {
        ...state,
        cartProductIDVal: action.payload,
      };
    });

    builder.addCase(addToCart.fulfilled, (state, action) => {
      const updatedCart = [...current(state.cartProductIDVal), action.payload];
      return {
        ...state,
        cartProductIDVal: updatedCart,
      };
    });

    builder.addCase(deleteCart.fulfilled, (state, action) => {
      const updatedCartID = current(state.cartProductIDVal).filter(
        (id) => id !== parseInt(action.payload)
      );
      return {
        ...state,
        cartProductIDVal: updatedCartID,
      };
    });

    // builder.addCase(updateQuantity.fulfilled, (state, action) => {
    //   const updatedCartID = current(state.cartProductIDVal).filter(
    //     (id) => id !== parseInt(action.payload)
    //   );
    //   return {
    //     ...state,
    //     cartProductIDVal: updatedCartID,
    //   };
    // });
  },
});

export default cartSlice.reducer;
