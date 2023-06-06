import React, { useEffect, useState } from "react";
import Navigation from "../common/Navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { axiosRes, getToken } from "../../utils/functions";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Products = () => {
  const [prod, setProd] = useState([]);
  const [allCat, setAllCat] = useState([]);
  const [cat, setCat] = useState("");
  const [cart, setCart] = useState([]);

  const handleChange = (event) => {
    setCat(event.target.value);
  };

  useEffect(() => {
    productsFun();
    categoriesFun();
    userCartFun();
  }, []);
  const productsFun = async () => {
    const allProducts = await axios
      .get(`${process.env.REACT_APP_BACK_URL}/product/with_category`)
      .catch((err) => {
        // toast.error(axiosRes(err));
        return;
      });

    allProducts?.status === 200 && setProd(allProducts?.data);
  };

  const categoriesFun = async () => {
    const allCategories = await axios
      .get(`${process.env.REACT_APP_BACK_URL}/category/names`)
      .catch((err) => {
        // toast.error(axiosRes(err));
        return;
      });

    allCategories?.status === 200 && setAllCat(allCategories?.data);
  };

  const userCartFun = async () => {
    const token = getToken();
    const cartData = await axios
      .get(`${process.env.REACT_APP_BACK_URL}/cart/data`, {
        headers: { "auth-token": `${token}` },
      })
      .catch((err) => {
        // toast.error(axiosRes(err));
        return;
      });

    cartData?.status === 200 &&
      setCart(cartData?.data[0]?.products?.map((p) => p?.id));
  };

  return (
    <>
      <Navigation />
      <div className="container my-5">
        <div className="my-2 d-flex gap-3">
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
              {allCat?.map((cur) => (
                <MenuItem value={cur}>{cur}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {cat && (
            <button className="btn btn-danger" onClick={() => setCat("")}>
              Remove
            </button>
          )}
        </div>
        <div className="d-flex flex-wrap gap-3">
          {prod?.length > 0 &&
            prod?.map((p) => {
              if (cat == "" || p?.categories?.map((c) => c?.name).includes(cat))
                return (
                  <div className="card" style={{ width: "270px" }}>
                    <img
                      src={p?.img_url}
                      className="card-img-top border"
                      alt="..."
                      style={{
                        width: "100%",
                        aspectRatio: "1/1",
                        objectFit: "cover",
                      }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {p?.name?.length > 19
                          ? p?.name.substr(0, 19) + "..."
                          : p?.name}
                      </h5>
                      <p className="card-text">
                        {p?.description?.length > 50
                          ? p?.description.substr(0, 50) + "..."
                          : p?.description}
                      </p>
                      <div className="d-flex gap-3 align-items-center">
                        <h6 className="mb-0">&#8377;{p?.price}</h6>
                        <span
                          className="text-secondary"
                          style={{ fontSize: "15px" }}
                        >
                          <s> &#8377; {p?.cross_price}</s>
                        </span>
                        <span
                          className="text-success"
                          style={{ fontSize: "12px" }}
                        >
                          <b>
                            {" "}
                            {((p?.price / p?.cross_price) * 100).toFixed(2)}%
                            off
                          </b>
                        </span>
                      </div>
                      {cart?.includes(p?.id) ? (
                        <button className="btn btn-warning">
                          Remove
                        </button>
                      ) : (
                        <button className="btn btn-primary">Add to cart</button>
                      )}
                    </div>
                  </div>
                );
            })}
        </div>
      </div>
    </>
  );
};

export default Products;
