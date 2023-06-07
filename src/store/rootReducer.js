import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import categoryReducer from "./slices/categorySlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  category: categoryReducer,
  product: productReducer,
});
export default rootReducer;
