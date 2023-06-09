import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cartProductID,
  delAllCart,
  deleteCart,
  getCartID,
  updateQuantity,
} from "../../store/slices/cartSlice";
import { productsWithCategory } from "../../store/slices/productSlice";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import Confirm from "../common/Confirm";
import Address from "../common/Address";
import { addOrder } from "../../store/slices/orderSlice";
import { toast } from "react-toastify";

const Cart = () => {
  const [orderStatus, setOrderStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(0);

  const { cartProductIDVal, cartIDVal } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(cartProductID());
    dispatch(getCartID());
    dispatch(productsWithCategory());
  }, []);

  useEffect(() => {
    if (add !== 0) {
      //place order
      placeOrder();
      toast.success("order placed successfully...")
      navigate("/order")
    }
  }, [add]);

  const removeItem = (id) => {
    dispatch(deleteCart({ prod_id: id, cart_id: cartIDVal }));
  };

  const addQuantity = ({ id, quantity }) => {
    quantity > 0 && handleQuantity(id, quantity, "add");
  };
  const removeQuantity = ({ id, quantity }) => {
    quantity > 1 && handleQuantity(id, quantity, "remove");
  };

  const handleQuantity = async (id, qty, operation) => {
    const quantity = operation === "add" ? qty + 1 : qty - 1;
    // setTimeout(async () => {
    await dispatch(updateQuantity({ id, quantity }));
    await dispatch(productsWithCategory());
    // }, 1500);
  };

  const handleOrder = () => {
    setOrderStatus(true);
  };

  const placeOrder = async () => {
    await dispatch(addOrder({ add_id: add, data: orderArr }));
    await dispatch(delAllCart({ cart_id: cartIDVal }));
    await dispatch(productsWithCategory());
  };

  let total_price = products
    ?.filter((cur) => cartProductIDVal?.includes(cur?.id))
    .reduce(
      (prev, cur) =>
        (prev += cur.price * cur?.carts[0]?.product_cart?.quantity),
      0
    );

  let total_cross_price = products
    ?.filter((cur) => cartProductIDVal?.includes(cur?.id))
    .reduce(
      (prev, cur) =>
        (prev += cur.cross_price * cur?.carts[0]?.product_cart?.quantity),
      0
    );

  let orderArr = products
    ?.filter((cur) => cartProductIDVal?.includes(cur?.id))
    .map((cur) => {
      return {
        prod_id: cur.id,
        price: cur.price,
        cross_price: cur.cross_price,
        total: cur.price * cur?.carts[0]?.product_cart?.quantity,
        quantity: cur?.carts[0]?.product_cart?.quantity,
      };
    });
  return (
    <>
      <div className="container-fluid my-5">
        <div className="row justify-content-between">
          <div className="col-lg-8 col-12 position-relative">
            {cartProductIDVal &&
              cartProductIDVal?.length > 0 &&
              !orderStatus && (
                <div className="container-fluid border">
                  <div
                    className="d-flex row p-2 py-3"
                    style={{ background: "gainsboro" }}
                  >
                    <b className="col-3 text-center">Image</b>
                    <b className="col-8 text-center">Description</b>
                  </div>

                  {products &&
                    products?.length > 0 &&
                    products
                      ?.filter((cur) => cartProductIDVal?.includes(cur?.id))
                      ?.map((p) => {
                        return (
                          <div className="d-flex row border" key={p?.id}>
                            <div className="col-3 d-flex justify-content-center p-2">
                              <img
                                src={p?.img_url}
                                alt=""
                                className="w-100"
                                style={{
                                  maxWidth: "200px",
                                  aspectRatio: "1/1",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                            <div className="col-8">
                              <div className="py-3 h-100">
                                <h6 className="d-flex gap-2 align-items-center">
                                  <span>{p?.name}</span>
                                  <span
                                    className="rounded-pill border p-1 px-2"
                                    style={{ fontSize: "14px" }}
                                  >
                                    {p?.brand_name}
                                  </span>
                                </h6>
                                <p>{p?.description}</p>
                                <div className="d-flex align-items-center gap-2">
                                  <span
                                    className="text-secondary"
                                    style={{ fontSize: "14px" }}
                                  >
                                    <s>
                                      {" "}
                                      &#8377;{" "}
                                      {p?.cross_price.toLocaleString("en-IN")}
                                    </s>
                                  </span>
                                  <span className="text-dark">
                                    &#8377; {p?.price.toLocaleString("en-IN")}
                                  </span>
                                  <span
                                    className="text-success"
                                    style={{ fontSize: "15px" }}
                                  >
                                    <b>
                                      {" "}
                                      {(
                                        ((p?.cross_price - p?.price) /
                                          p?.cross_price) *
                                        100
                                      ).toFixed(2)}
                                      % off
                                    </b>
                                  </span>
                                </div>
                                <div className="d-flex mt-3 gap-4">
                                  <div
                                    className="input-group"
                                    style={{ width: "120px" }}
                                  >
                                    <span
                                      className="input-group-text input-group-sm"
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        removeQuantity(
                                          p?.carts[0]?.product_cart
                                        )
                                      }
                                    >
                                      {" "}
                                      -{" "}
                                    </span>
                                    <input
                                      type="text"
                                      className="form-control"
                                      aria-label="Quantity"
                                      disabled={true}
                                      value={
                                        p?.carts[0]?.product_cart?.quantity
                                      }
                                      style={{ textAlign: "center" }}
                                    />
                                    <span
                                      className="input-group-text"
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        addQuantity(p?.carts[0]?.product_cart)
                                      }
                                    >
                                      {" "}
                                      +
                                    </span>
                                  </div>
                                  <button
                                    className="btn btn-outline-danger"
                                    onClick={() => removeItem(p?.id)}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  <div
                    className="d-flex row p-2 py-3"
                    style={{ background: "gainsboro" }}
                  >
                    <div className="col-12 p-2 py-1 d-flex justify-content-end">
                      <button
                        className="btn btn-primary p-2 px-5 "
                        onClick={() => setOpen(true)}
                      >
                        PLACE ORDER
                      </button>
                    </div>
                  </div>
                </div>
              )}

            {cartProductIDVal &&
              cartProductIDVal?.length === 0 &&
              !orderStatus && (
                <div className="container-fluid border">
                  <div className="row border">
                    <div
                      className="col-12 p-4 gap-4"
                      style={{ display: "grid", placeItems: "center" }}
                    >
                      <h2>Cart is empty</h2>
                      <AddShoppingCartIcon sx={{ fontSize: 150 }} />
                      <Link to="/products">
                        <button className="btn btn-outline-primary">
                          View Products...
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

            {/* show address and address form  */}
            {orderStatus && (
              <Address
                title={"Delivery Addresses"}
                radio={true}
                setAdd={setAdd}
              />
            )}
          </div>
          <div className="col-lg-4 col-12 position-relative">
            <div
              className="container-fluid border position-sticky"
              style={{ top: "80px", bottom: "0px" }}
            >
              <div className="row border" style={{ background: "gainsboro" }}>
                <div className="col-12">
                  <h6 className="text-dark p-2 py-3 mb-0">PRICE DETAILS</h6>
                </div>
              </div>
              <div className="row p-2 py-3 gap-2 border">
                <div className="d-flex justify-content-between">
                  <h6>Price ({cartProductIDVal?.length}) items</h6>
                  <h6> &#8377; {total_cross_price.toLocaleString("en-IN")} </h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6>Discount</h6>
                  <h6 className="text-success">
                    {" "}
                    &#8377;{" "}
                    {(total_price - total_cross_price).toLocaleString("en-IN")}
                  </h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6>Delivery charges</h6>
                  <h6 className="text-success"> Free</h6>
                </div>
                <div className="px-3">
                  <hr />
                </div>
                <div className="d-flex justify-content-between">
                  <h6 style={{ fontSize: "18px" }}>Total Amount</h6>
                  <h6 style={{ fontSize: "18px" }}>
                    &#8377; {total_price.toLocaleString("en-IN")}
                  </h6>
                </div>
                <div className="px-3">
                  <hr />
                </div>
                <div className="">
                  <h6 className="text-success">
                    You will save ₹{" "}
                    {(total_cross_price - total_price).toLocaleString("en-IN")}{" "}
                    on this order
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Confirm
        open={open}
        setOpen={setOpen}
        msg="Do you want to place order all products? "
        action={handleOrder}
      />
    </>
  );
};

export default Cart;
