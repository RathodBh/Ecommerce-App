import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import categoryReducer from "./slices/categorySlice";
import userReducer from "./slices/userSlice";
import orderReducer from "./slices/orderSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  category: categoryReducer,
  product: productReducer,
  user: userReducer,
  order: orderReducer,
});
export default rootReducer;
