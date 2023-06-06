import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "../components/user/SignUp";
import Login from "../components/user/Login";
import Home from "../components/home";
import Products from "../components/product/Products";
import Private from "./Private.route";

const RoutesFile = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Private />}>
          <Route path="/cart" element={<Home />} />
        </Route>
        <Route element={<Private reverse={true} />}>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesFile;
