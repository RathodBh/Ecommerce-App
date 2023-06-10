import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  productsWithCategory,
  singleProduct,
} from "../../store/slices/productSlice";
import {
  addToCart,
  cartProductID,
  deleteCart,
  getCartID,
} from "../../store/slices/cartSlice";
import { getToken } from "../../utils/functions";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const { productOne } = useSelector((state) => state.product);
  const { cartProductIDVal, cartIDVal } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(singleProduct(id));
    dispatch(getCartID());
    dispatch(cartProductID());
  }, []);

  const handleAddCart = async () => {
    const token = getToken();
    if (!token) {
      toast.error("Login required");
      return;
    }
    const prod_id = productOne?.id;
    dispatch(addToCart({ prod_id, cart_id: cartIDVal }));
    dispatch(cartProductID());
  };

  const handleDelCart = async () => {
    const token = getToken();
    if (!token) {
      toast.error("Login required");
      return;
    }
    const prod_id = productOne?.id;
    dispatch(deleteCart({ prod_id, cart_id: cartIDVal }));
    dispatch(cartProductID());
  };
  return (
    <>
      <div className="container mt-4    ">
        <div className="row d-flex justify-content-between">
          <div className="col-lg-5 col-12 bg-light border rounded-4">
            <img
              src={productOne?.img_url}
              alt=""
              className=""
              style={{
                width: "100%",
                aspectRatio: "1/1",
                objectFit: "contain",
              }}
            />
          </div>
          <div className="col-lg-6 col-12 ">
            <h3>
              {productOne?.name}{" "}
              <span
                style={{ fontSize: "12px",background:"gainsboro" }}
                className="px-2 rounded-pill border p-1"
              >
                {productOne?.brand_name}
              </span>
            </h3>

            <h6>{productOne?.description}</h6>
            <div className="d-flex gap-3 mt-4 ">
              <h5>&#8377; {productOne?.price?.toLocaleString("en-IN")}</h5>
              <h6 className="text-secondary text-decoration-line-through">
                &#8377; {productOne?.cross_price?.toLocaleString("en-IN")}
              </h6>
            </div>
            <div className="div">
              <h6
                style={{ fontSize: "14px" }}
                className="text-light d-inline-block p-1 px-2 rounded-pill lh-base bg-danger"
              >
                {" "}
                {(
                  ((productOne?.cross_price - productOne?.price) /
                    productOne?.cross_price) *
                  100
                ).toFixed(2)}
                % off
              </h6>
            </div>

            <div className="mt-5">
              {cartProductIDVal &&
              cartProductIDVal?.includes(productOne?.id) ? (
                <>
                  <button className="btn btn-warning" onClick={handleDelCart}>
                    Remove
                  </button>
                  <Link to="/cart" className="btn btn-outline-info mx-2">
                    View cart
                  </Link>
                </>
              ) : (
                <button className="btn btn-primary" onClick={handleAddCart}>
                  Add to cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
