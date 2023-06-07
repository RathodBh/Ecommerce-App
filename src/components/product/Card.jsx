import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, deleteCart } from "../../store/slices/cartSlice";
import { getToken } from "../../utils/functions";
import { toast } from "react-toastify";

const Card = ({ product: p, cart, cartId }) => {
  const dispatch = useDispatch();
  const handleAddCart = async () => {
    const token = getToken();
    if (!token) {
      toast.error("Login required");
      return;
    }
    const prod_id = p?.id;
    dispatch(addToCart({ prod_id, cart_id: cartId }));
  };

  const handleDelCart = async () => {
    const token = getToken();
    if (!token) {
      toast.error("Login required");
      return;
    }
    const prod_id = p?.id;
    dispatch(deleteCart({ prod_id, cart_id: cartId }));
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
      <div className="card m-1 border">
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
            {p?.name?.length > 19 ? p?.name.substr(0, 19) + "..." : p?.name}
          </h5>
          <p className="card-text">
            {p?.description?.length > 50
              ? p?.description.substr(0, 50) + "..."
              : p?.description}
          </p>
          <div className="d-flex gap-3 align-items-center">
            <h6 className="mb-0">&#8377;{p?.price}</h6>
            <span className="text-secondary" style={{ fontSize: "15px" }}>
              <s> &#8377; {p?.cross_price}</s>
            </span>
            <span className="text-success" style={{ fontSize: "12px" }}>
              <b>
                {" "}
                {(((p?.cross_price - p?.price) / p?.cross_price) * 100).toFixed(
                  2
                )}
                % off
              </b>
            </span>
          </div>
          {cart?.includes(p?.id) ? (
            <button className="btn btn-warning" onClick={handleDelCart}>
              Remove
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleAddCart}>
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
