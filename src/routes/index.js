import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "../components/user/SignUp";
import Login from "../components/user/Login";
import Home from "../components/home";

const RoutesFile = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<PrivateRoutes />}> */}
        {/* <Route
            path="/"
            element={<Navigate to="/finance-form" replace={true} />}
          />
          <Route exact path="/finance-form" element={<Add />} />
          <Route path="/finance-form/:id" element={<Add />} />
          <Route exact path="/transactions" element={<Show />} />
          <Route path="/transactions/:id" element={<ShowInfo />} /> */}
        {/* </Route> */}
        {/* <Route element={<CheckLoginAuth />}> */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<Navigate to="/register" replace={true} />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesFile;
