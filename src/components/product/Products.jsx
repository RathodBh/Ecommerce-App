import React, { useEffect, useState } from "react";
import Navigation from "../common/Navigation";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  cartData,
  cartProductID,
  getCartID,
} from "../../store/slices/cartSlice";
import { names } from "../../store/slices/categorySlice";
import { productsWithCategory } from "../../store/slices/productSlice";
import Card from "./Card";
import { getToken } from "../../utils/functions";

const Products = () => {
  const [prod, setProd] = useState([]);
  const [allCat, setAllCat] = useState([]);
  const [cat, setCat] = useState("");
  const [cart, setCart] = useState([]);

  const { cartProductIDVal, cartIDVal } = useSelector((state) => state.cart);
  const { productsWithCategoryVal } = useSelector((state) => state.product);
  const { namesVal } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setCat(event.target.value);
  };

  useEffect( () => {
    dispatch(productsWithCategory());
    dispatch(names());
    getToken() && dispatch(cartProductID());
    getToken() && dispatch(getCartID());
  }, []);

  useEffect(() => {
    getToken() && setCart(cartProductIDVal);
  }, [cartProductIDVal]);

  useEffect(() => {
    setAllCat(namesVal);
  }, [namesVal]);

  useEffect(() => {
    setProd(productsWithCategoryVal);
  }, [productsWithCategoryVal]);

  return (
    <>
      <div className="container my-5">
        <div className="my-2 d-flex justify-content-between row">
          <div className={cat ? "col-lg-11 col-sm-10 col-8" : "col-12"}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" size="small">
                Select Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={cat}
                label="Select Category"
                onChange={handleChange}
                size="small"
              >
                {allCat?.map((cur, i) => (
                  <MenuItem key={i} value={cur}>
                    {cur}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={`d-flex justify-content-end ${cat && "col-lg-1 col-sm-2 col-3"}`}>
            {cat && (
              <button className="btn btn-danger" onClick={() => setCat("")}>
                Remove
              </button>
            )}
          </div>
        </div>
        <div className="d-flex flex-wrap row">
          {prod?.length > 0 &&
            prod?.map((p) => {
              if (
                cat === "" ||
                p?.categories?.map((c) => c?.name).includes(cat)
              )
                return (
                  <Card
                    key={p?.id}
                    product={p}
                    cart={cart}
                    cartId={cartIDVal}
                  />
                );
            })}
        </div>
      </div>
    </>
  );
};

export default Products;
