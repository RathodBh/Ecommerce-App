import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { getReq, patchReq, postReq } from "../../requests";

const initialState = {
  addresses: [],
};

export const getAddresses = createAsyncThunk(
  "user/getAddresses",
  async (args, { rejectWithValue }) => {
    try {
      const response = await getReq("/user/address", true);
      return response;
    } catch (err) {
      rejectWithValue(err.response.data);
      console.log(err);
    }
  }
);

export const addAddresses = createAsyncThunk(
  "user/addAddresses",
  async (args, { rejectWithValue }) => {
    try {
      const response = await postReq("/user/address/add", args, true);
      return response;
    } catch (err) {
      rejectWithValue(err.response.data);
      console.log(err);
    }
  }
);

export const editAddresses = createAsyncThunk(
  "user/editAddresses",
  async (args, { rejectWithValue }) => {
    try {
      const { edit:id, ...data } = args;
      const response = await patchReq(`/user/address/edit/${id}`, data, true);
      return response;
    } catch (err) {
      rejectWithValue(err.response.data);
      console.log(err);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAddresses.fulfilled, (state, action) => {
      return {
        ...state,
        addresses: action.payload,
      };
    });

    // builder.addCase(addAddresses.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     addresses: [...current(state.addresses)],
    //   };
    // });

    // builder.addCase(editAddresses.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     addresses: [...current(state.addresses)],
    //   };
    // });
  },
});

export default userSlice.reducer;
