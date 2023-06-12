import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, cartProductID } from "../../store/slices/cartSlice";
import { getToken } from "../../utils/functions";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
    dispatch(cartProductID());
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-12 position-relative">
      <div className="card m-1 border h-100">
        <Link to={`/products/${p?.id}`}>
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
        </Link>
        <div className="card-body">
          <Link to={`/products/${p?.id}`} className="text-decoration-none">
            <h5 className="card-title ">
              {p?.name?.length > 19 ? p?.name.substr(0, 19) + "..." : p?.name}
            </h5>
          </Link>
          <p className="card-text">
            {p?.description?.length > 50
              ? p?.description.substr(0, 50) + "..."
              : p?.description}
          </p>
          <div className="d-flex gap-2 align-items-center flex-wrap">
            <h6 className="mb-0">&#8377;{p?.price.toLocaleString("en-IN")}</h6>
            <span className="text-secondary" style={{ fontSize: "15px" }}>
              <s> &#8377; {p?.cross_price.toLocaleString("en-IN")}</s>
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
          {/* {cart?.includes(p?.id) ? (
            <button className="btn btn-warning" onClick={handleAddCart}>
              Add to cart
            </button>
          ) : ( */}
          <button
            className="btn btn-primary "
            onClick={handleAddCart}
          >
            Add to cart
          </button>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default Card;
