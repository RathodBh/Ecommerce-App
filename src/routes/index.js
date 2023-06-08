import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "../components/user/SignUp";
import Login from "../components/user/Login";
import Home from "../components/home";
import Products from "../components/product/Products";
import Private from "./Private.route";
import Cart from "../components/cart/Cart";
import Wrapper from "../components/common/Wrapper";
import UserAddresses from "../components/user/UserAddresses";

const RoutesFile = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Wrapper />}>
          <Route element={<Private />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/user/address" element={<UserAddresses />} />
          </Route>
          <Route element={<Private reverse={true} />}>
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesFile;
