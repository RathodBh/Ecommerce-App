import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartData, deleteCart, getCartID } from "../../store/slices/cartSlice";

const Cart = () => {
  const { cartDataVal, cartIDVal } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cartData());
    dispatch(getCartID());
  }, []);

  const removeItem =  (id) => {
    console.log(id, cartIDVal);
     dispatch(deleteCart({ prod_id: id, cart_id: cartIDVal }));
  };

  return (
    <>
      <div className="container my-5">
        <div className="my-2 d-flex justify-content-between row">
          <div className="col-12">
            <h5>Your Cart</h5>
          </div>
        </div>
        <div className="container border border-primary">
          <div className="d-flex row p-2 py-3 bg-primary text-light">
            <div className="col-1 text-center">Delete</div>
            <div className="col-3 text-center">Image</div>
            <div className="col-7 text-center">Description</div>
          </div>
          {cartDataVal?.length > 0 &&
            cartDataVal?.map((p) => {
              return (
                <div className="d-flex row my-3 shadow" key={p?.id}>
                  <div className="col-1">
                    <input type="checkbox" style={{ height: "30px" }} />
                  </div>
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
                  <div className="col-7">
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
                          <s> &#8377; {p?.cross_price}</s>
                        </span>
                        <span className="text-dark">&#8377; {p?.price}</span>
                        <span
                          className="text-success"
                          style={{ fontSize: "15px" }}
                        >
                          <b>
                            {" "}
                            {(
                              ((p?.cross_price - p?.price) / p?.cross_price) *
                              100
                            ).toFixed(2)}
                            % off
                          </b>
                        </span>
                      </div>
                      <div className="d-flex mt-3 gap-4">
                        <div className="input-group" style={{ width: "120px" }}>
                          <span className="input-group-text input-group-sm">
                            {" "}
                            -{" "}
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            aria-label="Amount (to the nearest dollar)"
                            disabled={true}
                          />
                          <span className="input-group-text"> + </span>
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
        </div>
      </div>
    </>
  );
};

export default Cart;
