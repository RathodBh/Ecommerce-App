import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsWithCategory } from "../../store/slices/productSlice";
import { lastOrder } from "../../store/slices/orderSlice";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const Order = () => {
  const { products } = useSelector((state) => state.product);
  const { lastOrderVal, lastOrderAdd } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsWithCategory());
    dispatch(lastOrder());
  }, []);

  const lastOrderProducts = lastOrderVal?.map((c) => {
    const res = products.find((p) => p.id === c.prod_id);
    if (res) {
      return {
        ...c,
        img: res?.img_url,
        name: res?.name,
        description: res?.description,
        brand_name: res?.brand_name,
      };
    }
    return c;
  });
  console.log(
    "🚀 ~ file: Order.jsx:30 ~ lastOrderProducts ~ lastOrderProducts:",
    lastOrderProducts
  );

  let total_amount = 0;
  return (
    <div className="container my-2">
      <div className="row p-2 py-3 " style={{ background: "gainsboro" }}>
        <div className="col-12 d-flex justify-content-between align-items-center">
          <div className="part1">
            <h5 className="d-flex justify-content-center align-items-center">
              {" "}
              Last Order Details:
            </h5>
            <h6>
              <CalendarMonthIcon />{" "}
              {lastOrderProducts &&
                lastOrderProducts.length > 0 &&
                lastOrderProducts[0].createdAt}
            </h6>
          </div>
          <div className="d-flex gap-3">
            <LocationOnIcon className="text-secondary" />
            <div className="text-secondary">
              <h6>{lastOrderAdd.addr}</h6>
              <h6 className="">
                {lastOrderAdd.city}, {lastOrderAdd.state}
              </h6>
            </div>
          </div>
        </div>
      </div>
      {lastOrderProducts &&
        lastOrderProducts?.map((p) => {
          total_amount += p?.total;
          return (
            <Fragment key={p?.id}>
              <div className="d-flex row border bg-light" key={p?.id}>
                <div className="col-3 d-flex justify-content-center p-2">
                  <img
                    src={p?.img}
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
                      <span className="text-dark" style={{ fontSize: "14px" }}>
                        &#8377; {p?.price.toLocaleString("en-IN")}
                      </span>
                      <span
                        className="text-secondary"
                        style={{ fontSize: "14px" }}
                      >
                        <b>
                          {" x "}
                          {p?.quantity}
                        </b>
                      </span>
                      <span
                        className="text-success"
                        style={{ fontSize: "15px" }}
                      >
                        <b>
                          {" = "}
                          {p?.total?.toLocaleString("en-IN")}
                        </b>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          );
        })}
      <div
        className="d-flex row p-2 py-3 justify-content-between"
        style={{ background: "gainsboro" }}
      >
        <h6 className="mb-0">
          Total:{" "}
          <span className="text-primary">
            &#8377; {total_amount.toLocaleString("en-IN")}
          </span>
        </h6>
      </div>
    </div>
  );
};

export default Order;
