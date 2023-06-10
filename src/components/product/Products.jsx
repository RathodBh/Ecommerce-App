import React, { useEffect, useState } from "react";
import Navigation from "../common/Navigation";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { cartProductID, getCartID } from "../../store/slices/cartSlice";
import { names } from "../../store/slices/categorySlice";
import { productsWithCategory } from "../../store/slices/productSlice";
import Card from "./Card";
import { getToken } from "../../utils/functions";
import { Link } from "react-router-dom";

const Products = () => {
  const [cat, setCat] = useState("");
  const [cart, setCart] = useState([]);

  const { cartProductIDVal, cartIDVal } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.product);
  const { namesVal } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const handleChange = (e, val) => {
    setCat(val ? val : "");
  };

  useEffect(() => {
    dispatch(productsWithCategory());
    dispatch(names());
    getToken() && dispatch(cartProductID());
    getToken() && dispatch(getCartID());
  }, []);

  useEffect(() => {
    getToken() && setCart(cartProductIDVal);
  }, [cartProductIDVal]);

  return (
    <>
      <div className="container my-5">
        <div className="my-2 d-flex justify-content-between row">
          <div className="col-12">
            <Autocomplete
              disablePortal
              id="combo-box"
              options={namesVal}
              fullWidth
              size="small"
              onChange={handleChange}
              renderInput={(params) => (
                <TextField {...params} label="Select category" />
              )}
            />
          </div>
        </div>
        <div className="d-flex flex-wrap row align-items-stretch">
          {products?.length > 0 &&
            products?.map((p) => {
              console.log("pppppppppppp",p)
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
