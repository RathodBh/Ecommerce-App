import React from "react";
import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";

const Wrapper = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default Wrapper;
